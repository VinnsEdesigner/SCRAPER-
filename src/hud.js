// hud.js — floating collapsible draggable mini UI

import { getToken, getSnippets, addSnippet, removeSnippet, clearSnippets } from './storage.js';
import { initSelection, getSelected }    from './selection.js';
import { syncToBackend, pollSettings }   from './sync.js';
import { askLiteAgent, injectIntoPage }  from './mini-agent.js';

const HUD_ID  = '__nexus_hud__';
const POLL_MS = 15000;

let pollTimer    = null;
let collapsed    = false;
let settings     = { prompt_injection: true, snippet_limit: 20 };
let pendingSuggest = null; // stores current suggestion text

export function initHud() {
  if (document.getElementById(HUD_ID)) return;

  injectStyles();
  const hud = buildHud();
  document.body.appendChild(hud);

  initSelection((text) => showSelectionBar(text));
  startPoll();
  renderSnippets();
  makeDraggable(hud);
}

// ── BUILD ─────────────────────────────────────────────────────────────────────

function buildHud() {
  const hud = document.createElement('div');
  hud.id    = HUD_ID;
  hud.innerHTML = `
    <div class="nx-header" id="nx-hdr">
      <span class="nx-title">&#x1F577; scraper <span class="nx-dot" id="nx-dot">&#x25CF;</span></span>
      <span class="nx-staged" id="nx-staged">0 staged</span>
      <button class="nx-btn-icon" id="nx-collapse">&#x2212;</button>
      <button class="nx-btn-icon" id="nx-close">&#xD7;</button>
    </div>

    <div class="nx-body" id="nx-body">

      <div class="nx-sel-bar" id="nx-sel-bar" style="display:none">
        <span class="nx-sel-preview" id="nx-sel-preview"></span>
        <button class="nx-btn-sm" id="nx-add-code">+ code</button>
        <button class="nx-btn-sm" id="nx-add-research">+ research</button>
        <button class="nx-btn-sm nx-btn-ghost" id="nx-sel-dismiss">&#x2715;</button>
      </div>

      <div class="nx-inject-banner" id="nx-inject-banner" style="display:none">
        <span class="nx-inject-text" id="nx-inject-text"></span>
        <div class="nx-inject-row">
          <button class="nx-btn-sm" id="nx-inject-btn">inject &#x2197;</button>
          <button class="nx-btn-sm nx-btn-ghost" id="nx-inject-dismiss">dismiss</button>
        </div>
      </div>

      <div class="nx-section">
        <textarea class="nx-input" id="nx-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <div class="nx-row">
          <button class="nx-btn" id="nx-ask-btn">ask</button>
          <button class="nx-btn nx-btn-outline" id="nx-suggest-btn">suggest prompt</button>
        </div>
        <div class="nx-reply" id="nx-reply" style="display:none"></div>
      </div>

      <div class="nx-section">
        <div class="nx-sec-hdr">STAGED SNIPPETS <span id="nx-count">0/20</span></div>
        <div class="nx-snippets" id="nx-snippets-list"></div>
      </div>

      <button class="nx-btn nx-btn-full" id="nx-sync-btn">&#x21C5; sync to dashboard</button>

      <div class="nx-footer">
        <span class="nx-status" id="nx-status">&#x25CF; not synced</span>
        <span class="nx-model"  id="nx-model">llama-3.3-70b</span>
      </div>
    </div>
  `;

  bindEvents(hud);
  return hud;
}

// ── EVENTS ────────────────────────────────────────────────────────────────────

function bindEvents(hud) {
  hud.querySelector('#nx-collapse').onclick     = toggleCollapse;
  hud.querySelector('#nx-close').onclick        = destroyHud;

  hud.querySelector('#nx-add-code').onclick     = () => stageSelected('code');
  hud.querySelector('#nx-add-research').onclick = () => stageSelected('research');
  hud.querySelector('#nx-sel-dismiss').onclick  = hideSelectionBar;

  hud.querySelector('#nx-inject-dismiss').onclick = hideInjectBanner;
  hud.querySelector('#nx-inject-btn').onclick     = doInject;

  hud.querySelector('#nx-ask-btn').onclick      = doAsk;
  hud.querySelector('#nx-suggest-btn').onclick  = doSuggest;
  hud.querySelector('#nx-sync-btn').onclick     = doSync;

  hud.querySelector('#nx-agent-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      doAsk();
    }
  });
}

// ── DRAG ──────────────────────────────────────────────────────────────────────

function makeDraggable(hud) {
  const header = hud.querySelector('#nx-hdr');
  let dragging  = false;
  let startX, startY, origRight, origBottom;

  function onStart(clientX, clientY) {
    dragging    = true;
    startX      = clientX;
    startY      = clientY;
    // Use right/bottom so position stays stable on scroll
    const rect  = hud.getBoundingClientRect();
    origRight   = window.innerWidth  - rect.right;
    origBottom  = window.innerHeight - rect.bottom;
    hud.style.transition = 'none';
  }

  function onMove(clientX, clientY) {
    if (!dragging) return;
    const dx       = clientX - startX;
    const dy       = clientY - startY;
    const newRight  = Math.max(0, origRight  - dx);
    const newBottom = Math.max(0, origBottom + dy);
    // Clamp to viewport
    const maxRight  = window.innerWidth  - 60;
    const maxBottom = window.innerHeight - 60;
    hud.style.right  = Math.min(newRight,  maxRight)  + 'px';
    hud.style.bottom = Math.min(newBottom, maxBottom) + 'px';
  }

  function onEnd() { dragging = false; }

  // Mouse
  header.addEventListener('mousedown',  (e) => { e.preventDefault(); onStart(e.clientX, e.clientY); });
  document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  document.addEventListener('mouseup',   onEnd);

  // Touch (mobile)
  header.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    onStart(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    e.preventDefault();
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  }, { passive: false });
  document.addEventListener('touchend', onEnd);
}

// ── ACTIONS ───────────────────────────────────────────────────────────────────

function stageSelected(type) {
  const text = getSelected();
  if (!text) return;

  const snippets = getSnippets();
  if (snippets.length >= settings.snippet_limit) {
    setStatus('error', `Max ${settings.snippet_limit} snippets reached`);
    return;
  }

  addSnippet({ text, type, url: location.href, title: document.title });
  renderSnippets();
  hideSelectionBar();
  setStatus('ok', `#${getSnippets().length} staged`);
}

async function doAsk() {
  const inputEl = document.getElementById('nx-agent-input');
  const msg     = inputEl?.value?.trim();
  if (!msg) return;

  // Clear previous reply
  const replyEl = document.getElementById('nx-reply');
  replyEl.style.display = 'none';
  replyEl.textContent   = '';

  setStatus('syncing', 'asking...');
  replyEl.style.display = 'block';
  replyEl.textContent   = '...';

  const { reply, model, escalated, error } = await askLiteAgent(msg, getSnippets());

  if (error) {
    replyEl.textContent = `\u26A0 ${error}`;
    setStatus('error', error);
    return;
  }

  replyEl.textContent = reply;
  setStatus('ok', escalated ? 'done (full agent)' : 'done');
  const modelEl = document.getElementById('nx-model');
  if (modelEl) modelEl.textContent = model || 'groq';
}

async function doSuggest() {
  // Gate behind settings
  if (!settings.prompt_injection) {
    setStatus('error', 'Prompt injection disabled in settings');
    return;
  }

  const prompt = `Based on this page, suggest a concise prompt I can send to my AI assistant to ${
    document.title ? 'understand "' + document.title.slice(0, 40) + '"' : 'get help with this page'
  }. Reply with only the suggested prompt, nothing else.`;

  setStatus('syncing', 'generating...');

  const { reply, error } = await askLiteAgent(prompt, getSnippets());

  if (error || !reply) {
    setStatus('error', error || 'Suggestion failed');
    return;
  }

  pendingSuggest = reply;
  showInjectBanner(reply);
  setStatus('ok', 'suggestion ready — tap inject');
}

async function doSync() {
  await syncToBackend((type, msg) => {
    setStatus(type === 'success' ? 'ok' : type, msg);
    if (type === 'success') renderSnippets();
  });
}

function doInject() {
  // Gate behind settings
  if (!settings.prompt_injection) {
    setStatus('error', 'Prompt injection disabled in settings');
    hideInjectBanner();
    return;
  }

  const text = pendingSuggest || document.getElementById('nx-inject-text')?.textContent;
  if (!text) return;

  const result = injectIntoPage(text);
  hideInjectBanner();
  pendingSuggest = null;

  if (result === false) {
    setStatus('error', 'No input found on page');
  } else {
    setStatus('ok', result === 'clipboard' ? 'copied to clipboard' : 'injected \u2197');
  }
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function renderSnippets() {
  const snippets  = getSnippets();
  const listEl    = document.getElementById('nx-snippets-list');
  const countEl   = document.getElementById('nx-count');
  const stagedEl  = document.getElementById('nx-staged');
  if (!listEl) return;

  countEl.textContent  = `${snippets.length}/${settings.snippet_limit}`;
  stagedEl.textContent = `${snippets.length} staged`;

  listEl.innerHTML = snippets.map((s) => `
    <div class="nx-snip-item">
      <span class="nx-snip-num">#${s.number}</span>
      <span class="nx-snip-preview">${escapeHtml(s.text.slice(0, 60))}...</span>
      <span class="nx-snip-type">${s.type}</span>
      <button class="nx-btn-icon nx-del" data-num="${s.number}">&#x1F5D1;</button>
    </div>
  `).join('');

  listEl.querySelectorAll('.nx-del').forEach((btn) => {
    btn.onclick = () => {
      removeSnippet(Number(btn.dataset.num));
      renderSnippets();
    };
  });
}

function showSelectionBar(text) {
  const bar     = document.getElementById('nx-sel-bar');
  const preview = document.getElementById('nx-sel-preview');
  if (!bar || !preview) return;
  preview.textContent = text.slice(0, 50) + (text.length > 50 ? '...' : '');
  bar.style.display   = 'flex';
}

function hideSelectionBar() {
  const bar = document.getElementById('nx-sel-bar');
  if (bar) bar.style.display = 'none';
}

function showInjectBanner(text) {
  const banner = document.getElementById('nx-inject-banner');
  const textEl = document.getElementById('nx-inject-text');
  if (!banner || !textEl) return;
  textEl.textContent   = text.slice(0, 150);
  banner.style.display = 'block';
}

function hideInjectBanner() {
  const banner = document.getElementById('nx-inject-banner');
  if (banner) banner.style.display = 'none';
  pendingSuggest = null;
}

// ── STATUS ────────────────────────────────────────────────────────────────────

function setStatus(type, msg) {
  const el  = document.getElementById('nx-status');
  const dot = document.getElementById('nx-dot');
  if (!el) return;
  el.textContent = '\u25CF ' + msg;
  // Map type → css class
  el.className = 'nx-status';
  if (type === 'ok')      el.style.color = '#22d3ee';
  if (type === 'error')   el.style.color = '#ef4444';
  if (type === 'syncing') el.style.color = '#f59e0b';
  if (type === 'success') el.style.color = '#22d3ee';
  if (dot) {
    dot.style.color = el.style.color;
  }
}

// ── COLLAPSE ──────────────────────────────────────────────────────────────────

function toggleCollapse() {
  collapsed       = !collapsed;
  const body      = document.getElementById('nx-body');
  const btn       = document.getElementById('nx-collapse');
  if (body) body.style.display = collapsed ? 'none' : 'block';
  if (btn)  btn.textContent    = collapsed ? '+' : '\u2212';
}

// ── DESTROY (clean up timers) ─────────────────────────────────────────────────

function destroyHud() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
  const hud = document.getElementById(HUD_ID);
  if (hud) hud.remove();
  window.__nexus_scraper_loaded__ = false;
}

// ── POLL SETTINGS ─────────────────────────────────────────────────────────────

function startPoll() {
  pollTimer = setInterval(async () => {
    // Stop polling if HUD was removed
    if (!document.getElementById(HUD_ID)) {
      clearInterval(pollTimer);
      pollTimer = null;
      return;
    }
    const token = getToken();
    const s     = await pollSettings(token);
    if (s) settings = { ...settings, ...s };
    // Re-render count in case snippet_limit changed
    renderSnippets();
  }, POLL_MS);
}

// ── UTILS ─────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── STYLES ────────────────────────────────────────────────────────────────────

function injectStyles() {
  if (document.getElementById('__nexus_styles__')) return;
  const style = document.createElement('style');
  style.id    = '__nexus_styles__';
  style.textContent = `
    #__nexus_hud__ {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      max-height: 82vh;
      background: #0a0a0a;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      font-family: 'Geist Mono', 'Courier New', monospace;
      font-size: 12px;
      color: #e6edf3;
      z-index: 2147483647;
      box-shadow: 0 8px 32px rgba(0,0,0,0.9);
      overflow: hidden;
      user-select: none;
    }
    #__nexus_hud__ .nx-header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: #111;
      border-bottom: 1px solid #1e1e1e;
      cursor: move;
      touch-action: none;
    }
    #__nexus_hud__ .nx-title  { font-weight: bold; flex: 1; font-size: 12px; }
    #__nexus_hud__ .nx-dot    { font-size: 8px; color: #7d8590; }
    #__nexus_hud__ .nx-staged { color: #7d8590; font-size: 10px; }
    #__nexus_hud__ .nx-btn-icon {
      background: none;
      border: none;
      color: #484f58;
      cursor: pointer;
      padding: 0 4px;
      font-size: 14px;
      line-height: 1;
    }
    #__nexus_hud__ .nx-body {
      padding: 10px;
      overflow-y: auto;
      max-height: calc(82vh - 40px);
    }
    #__nexus_hud__ .nx-section { margin-bottom: 10px; }
    #__nexus_hud__ .nx-sec-hdr {
      font-size: 9px;
      color: #484f58;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    #__nexus_hud__ .nx-input {
      width: 100%;
      background: #111;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      color: #e6edf3;
      padding: 6px 8px;
      font-size: 11px;
      font-family: inherit;
      resize: none;
      box-sizing: border-box;
      outline: none;
    }
    #__nexus_hud__ .nx-input:focus { border-color: #444; }
    #__nexus_hud__ .nx-row { display: flex; gap: 6px; margin-top: 6px; }
    #__nexus_hud__ .nx-btn {
      background: #1e1e1e;
      border: 1px solid #2e2e2e;
      color: #e6edf3;
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font-size: 11px;
      font-family: inherit;
    }
    #__nexus_hud__ .nx-btn:active { opacity: 0.7; }
    #__nexus_hud__ .nx-btn-outline { background: none; }
    #__nexus_hud__ .nx-btn-full   { width: 100%; margin-top: 8px; text-align: center; }
    #__nexus_hud__ .nx-btn-sm {
      background: #111;
      border: 1px solid #2e2e2e;
      color: #b1bac4;
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 10px;
      font-family: inherit;
    }
    #__nexus_hud__ .nx-btn-ghost { border-color: transparent; color: #484f58; }
    #__nexus_hud__ .nx-sel-bar {
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
      background: #111;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      padding: 5px 8px;
      margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-sel-preview {
      flex: 1;
      color: #484f58;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    #__nexus_hud__ .nx-inject-banner {
      background: #0d1117;
      border: 1px solid #7c3aed;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-inject-text {
      font-size: 10px;
      color: #b1bac4;
      display: block;
      margin-bottom: 6px;
      line-height: 1.4;
      word-break: break-word;
    }
    #__nexus_hud__ .nx-inject-row { display: flex; gap: 6px; }
    #__nexus_hud__ .nx-reply {
      margin-top: 6px;
      padding: 6px 8px;
      background: #111;
      border-radius: 6px;
      font-size: 10px;
      color: #b1bac4;
      max-height: 100px;
      overflow-y: auto;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap;
    }
    #__nexus_hud__ .nx-snippets { max-height: 120px; overflow-y: auto; }
    #__nexus_hud__ .nx-snip-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 0;
      border-bottom: 1px solid #111;
    }
    #__nexus_hud__ .nx-snip-item:last-child { border: none; }
    #__nexus_hud__ .nx-snip-num     { color: #484f58; font-size: 9px; min-width: 22px; }
    #__nexus_hud__ .nx-snip-preview {
      flex: 1;
      color: #7d8590;
      font-size: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    #__nexus_hud__ .nx-snip-type   { font-size: 8px; color: #333; padding: 1px 4px; }
    #__nexus_hud__ .nx-del         { font-size: 11px; color: #333; }
    #__nexus_hud__ .nx-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #111;
    }
    #__nexus_hud__ .nx-status { font-size: 9px; color: #7d8590; }
    #__nexus_hud__ .nx-model  { font-size: 9px; color: #333; }
  `;
  document.head.appendChild(style);
}
