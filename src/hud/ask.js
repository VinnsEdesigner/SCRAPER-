// ask.js — AGENT tab: chat bubbles, IDE code blocks, ASCII renderer, history drawer

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets } from '../storage.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

let convo = [];
let suggestedPrompt = null;
const HISTORY_KEY = 'vn_chat_history';

export function buildAgentTab() {
  const container = document.getElementById('vn-tab-agent');
  if (!container) return;

  container.innerHTML = `
    <!-- History drawer (slides in from left) -->
    <div class="vn-history-drawer" id="vn-history-drawer">
      <div class="vn-history-hdr">
        <span>CHAT HISTORY</span>
        <button class="vn-btn-icon" id="vn-drawer-close">✕</button>
      </div>
      <button class="vn-history-new" id="vn-new-chat">＋ New Chat</button>
      <div class="vn-history-list" id="vn-history-list"></div>
    </div>

    <!-- Top bar -->
    <div class="vn-agent-top">
      <button class="vn-hamburger" id="vn-hamburger">☰ History</button>
      <span class="vn-agent-label" id="vn-session-label">SESSION</span>
    </div>

    <!-- Scrollable conversation -->
    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        Ask me anything about this page...
      </div>
    </div>

    <!-- Inject banner (above bottom area) -->
    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject ↗</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>

    <!-- Pinned bottom: input + actions -->
    <div class="vn-bottom-area">
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">↑</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `;

  bindAgentEvents();
  renderHistory();
}

function bindAgentEvents() {
  document.getElementById('vn-send-btn')?.addEventListener('click', sendMessage);
  document.getElementById('vn-suggest-btn')?.addEventListener('click', generateSuggest);
  document.getElementById('vn-inject-btn')?.addEventListener('click', doInject);
  document.getElementById('vn-inject-dismiss')?.addEventListener('click', hideBanner);
  document.getElementById('vn-hamburger')?.addEventListener('click', openDrawer);
  document.getElementById('vn-drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('vn-new-chat')?.addEventListener('click', newChat);

  document.getElementById('vn-agent-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Close drawer on outside click
  document.getElementById('vn-convo')?.addEventListener('click', closeDrawer);
}

async function sendMessage() {
  const input = document.getElementById('vn-agent-input');
  const msg   = input?.value?.trim();
  if (!msg) return;

  addMessage('user', msg);
  input.value = '';

  setStatus('amber', 'thinking...');
  setBadge('model', 'thinking...', 'warn');

  const { reply, model, escalated, error } = await askLiteAgent(msg, getSnippets());

  if (error) {
    addMessage('agent', `⚠ ${error}`);
    setStatus('red', 'error');
    showWarn(error);
    setBadge('model', 'error', 'err');
    return;
  }

  addMessage('agent', reply, model);
  setStatus('green', escalated ? 'done (escalated)' : 'done');
  setBadge('model', model || 'lite', 'active');
  saveHistory(msg, reply);
}

async function generateSuggest() {
  const prompt = `Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.`;

  setStatus('amber', 'generating...');

  const { reply, error } = await askLiteAgent(prompt, getSnippets());

  if (error || !reply) {
    setStatus('red', 'suggestion failed');
    showWarn('Suggestion failed: ' + (error || 'empty reply'));
    return;
  }

  suggestedPrompt = reply;
  showBanner(reply);
  setStatus('green', 'ready to inject');
}

// ── Message rendering ────────────────────────────────────────────────────────

function addMessage(type, text, model) {
  convo.push({ type, text });

  const convoEl = document.getElementById('vn-convo');
  if (!convoEl) return;

  const msgEl = document.createElement('div');
  msgEl.className = `vn-msg vn-msg-${type}`;

  const label = document.createElement('div');
  label.className = 'vn-msg-label';
  label.textContent = type === 'user' ? 'YOU' : (model ? `NExY · ${model}` : 'NExY');
  msgEl.appendChild(label);

  // Parse message for code blocks / ascii trees / plain text
  const parsed = parseContent(text);
  parsed.forEach((node) => msgEl.appendChild(node));

  convoEl.appendChild(msgEl);
  convoEl.scrollTop = convoEl.scrollHeight;
}

/**
 * Parses text into DOM nodes:
 * - ```lang ... ``` → IDE code block
 * - Lines that look like ASCII tree → .vn-ascii-block
 * - Everything else → text span
 */
function parseContent(text) {
  const nodes = [];

  // Split on code fences
  const parts = text.split(/(```[\s\S]*?```)/g);

  parts.forEach((part) => {
    if (part.startsWith('```')) {
      // Code block
      const lines = part.slice(3, -3).split('\n');
      const lang  = (lines[0]?.trim() || 'code').toLowerCase();
      const code  = lines.slice(1).join('\n').trim();
      nodes.push(buildCodeBlock(lang, code));
    } else if (looksLikeAsciiTree(part)) {
      const block = document.createElement('div');
      block.className = 'vn-ascii-block';
      block.textContent = normalizeAsciiTree(part.trim());
      nodes.push(block);
    } else if (part.trim()) {
      const span = document.createElement('span');
      span.textContent = part;
      span.style.whiteSpace = 'pre-wrap';
      nodes.push(span);
    }
  });

  return nodes;
}

function buildCodeBlock(lang, code) {
  const wrapper = document.createElement('div');
  wrapper.className = 'vn-code-block';

  const langLabel = detectLang(lang);

  wrapper.innerHTML = `
    <div class="vn-code-header">
      <span class="vn-code-lang">#${langLabel}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${escapeHtml(code)}</div>
  `;

  wrapper.querySelector('.vn-code-copy').onclick = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    wrapper.querySelector('.vn-code-copy').textContent = 'copied!';
    setTimeout(() => {
      const btn = wrapper.querySelector('.vn-code-copy');
      if (btn) btn.textContent = 'copy';
    }, 1500);
  };

  return wrapper;
}

/** Detect lang from fence hint or code content */
function detectLang(hint) {
  const h = hint.toLowerCase();
  if (['js','javascript','jsx','ts','typescript','tsx'].includes(h)) return 'js';
  if (['py','python'].includes(h)) return 'py';
  if (['sh','bash','shell','zsh'].includes(h)) return 'shell';
  if (['json'].includes(h)) return 'json';
  if (['css'].includes(h)) return 'css';
  if (['html'].includes(h)) return 'html';
  if (['sql'].includes(h)) return 'sql';
  if (['yaml','yml'].includes(h)) return 'yaml';
  if (['md','markdown'].includes(h)) return 'md';
  return h || 'code';
}

/** Detect ASCII tree patterns: ├ └ │ ─ */
function looksLikeAsciiTree(text) {
  const treeChars = /[├└│─┤┬┴┼]/;
  const lines = text.trim().split('\n');
  const treeLines = lines.filter((l) => treeChars.test(l));
  return treeLines.length >= 2;
}

/** Normalise raw ASCII to proper box-drawing chars if they're garbled */
function normalizeAsciiTree(text) {
  // Replace common ASCII approximations with proper box-drawing chars
  return text
    .replace(/\|--/g,  '├── ')
    .replace(/\+--/g,  '├── ')
    .replace(/`--/g,   '└── ')
    .replace(/\|  /g,  '│   ');
}

// ── Banner ──────────────────────────────────────────────────────────────────

function showBanner(text) {
  const banner = document.getElementById('vn-inject-banner');
  const textEl = document.getElementById('vn-inject-text');
  if (banner && textEl) {
    textEl.textContent = text.slice(0, 180);
    banner.classList.add('vn-show');
  }
}

function hideBanner() {
  document.getElementById('vn-inject-banner')?.classList.remove('vn-show');
  suggestedPrompt = null;
}

function doInject() {
  const text = suggestedPrompt || document.getElementById('vn-inject-text')?.textContent;
  if (!text) return;

  const result = injectIntoPage(text);
  hideBanner();
  suggestedPrompt = null;

  if (result === false) {
    setStatus('red', 'no input found');
    showWarn('No writable input found on this page');
  } else {
    setStatus('green', result === 'clipboard' ? 'copied to clipboard' : 'injected ↗');
  }
}

function injectIntoPage(text) {
  if (!text || typeof text !== 'string') return false;

  const selectors = [
    'textarea:not([disabled]):not([readonly])',
    'div[contenteditable="true"]',
    'input[type="text"]:not([disabled])',
    '[role="textbox"]',
  ];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    try {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.focus();
        el.value = text;
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      if (el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        return true;
      }
    } catch { continue; }
  }

  try { navigator.clipboard.writeText(text); return 'clipboard'; }
  catch { return false; }
}

// ── History drawer ───────────────────────────────────────────────────────────

function openDrawer() {
  document.getElementById('vn-history-drawer')?.classList.add('vn-open');
  renderHistory();
}

function closeDrawer() {
  document.getElementById('vn-history-drawer')?.classList.remove('vn-open');
}

function newChat() {
  convo = [];
  const convoEl = document.getElementById('vn-convo');
  if (convoEl) {
    convoEl.innerHTML = `
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        Ask me anything about this page...
      </div>
    `;
  }
  closeDrawer();
  document.getElementById('vn-session-label').textContent = 'NEW SESSION';
}

function saveHistory(userMsg, agentReply) {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    history.unshift({
      id:    Date.now(),
      ts:    new Date().toLocaleTimeString(),
      preview: userMsg.slice(0, 50),
      reply: agentReply.slice(0, 100),
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
  } catch {}
}

function renderHistory() {
  const list = document.getElementById('vn-history-list');
  if (!list) return;

  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (history.length === 0) {
      list.innerHTML = `<div style="padding:12px;font-size:10px;color:var(--vn-dim)">No history yet</div>`;
      return;
    }
    list.innerHTML = history.map((h) => `
      <div class="vn-history-item" data-id="${h.id}">
        <div style="color:var(--vn-text);font-size:10px;margin-bottom:3px">${escapeHtml(h.preview)}</div>
        <div style="font-size:9px;color:var(--vn-dim)">${h.ts}</div>
      </div>
    `).join('');
  } catch {}
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}
