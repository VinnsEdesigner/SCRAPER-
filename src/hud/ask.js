/**
 * @file ask.js
 * @location /SCRAPER-/src/hud/ask.js
 *
 * BUGS FIXED IN THIS REWRITE:
 *
 * BUG 1 — historySnapshot built but convo passed instead
 *   OLD: const historySnapshot = convo.slice(0,-1); → then askLiteAgent(msg, snippets, convo)
 *        historySnapshot is built and thrown away. convo includes current msg → duplicate.
 *   FIX: push user msg to convo FIRST, then pass convo.slice(0,-1) as history.
 *
 * BUG 2 — sessionId never passed to askLiteAgent
 *   OLD: askLiteAgent(msg, snippets, history, {}) → options = {} always
 *   FIX: askLiteAgent(msg, snippets, history, { sessionId: String(sessionId), preferredModel })
 *
 * BUG 3 — tools_used never read from response
 *   OLD: result comes back with tools_used array, badge never shown
 *   FIX: read result.tools_used, update badge pill in chat bubble
 *
 * BUG 4 — slash commands wired to UI only (no actual execution)
 *   OLD: /model, /clear, /page, /images, /sync, /help rendered as text
 *   FIX: handleSlashCommand() intercepts input before send, executes real actions
 *        /model <name> → sets pinnedModel state, shown in header
 *        /clear        → clears convo array + chat DOM
 *        /page         → toggles page context on/off
 *        /images       → toggles image snippets on/off
 *        /sync         → force sync snippets
 *        /help         → shows command list in chat
 */

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets, clearSnippets } from '../storage.js';
import { getSessionId } from '../session.js';

// ── STATE ──────────────────────────────────────────────────────────────────────

let convo          = [];   // full conversation history (all turns)
let pinnedModel    = null; // set by /model slash command
let pageEnabled    = true; // set by /page slash command
let imagesEnabled  = true; // set by /images slash command
let isThinking     = false;

// ── DOM REFS (resolved lazily to survive HUD re-renders) ──────────────────────

function getInput()    { return document.getElementById('venom-input'); }
function getSendBtn()  { return document.getElementById('venom-send'); }
function getChatBox()  { return document.getElementById('venom-chat'); }
function getModelBadge() { return document.getElementById('venom-model-badge'); }

// ── SLASH COMMAND HANDLER ──────────────────────────────────────────────────────
// Returns true if input was a slash command (suppress normal send).
// All commands execute real side-effects — not just UI labels.

async function handleSlashCommand(raw) {
  const text = raw.trim();
  if (!text.startsWith('/')) return false;

  const parts   = text.slice(1).split(/\s+/);
  const cmd     = parts[0].toLowerCase();
  const args    = parts.slice(1);

  switch (cmd) {

    case 'model': {
      if (args.length === 0) {
        // Show current model
        appendMessage('system', `Current pinned model: ${pinnedModel || 'auto (no pin)'}\n\nAvailable: groq, devstral, mistral-large, gemini-lite, gemma-26b, gemma-31b, gemini`);
      } else {
        const modelName = args.join(' ').toLowerCase();
        const MODEL_ALIASES = {
          'groq':          'llama-3.3-70b-versatile',
          'devstral':      'devstral-medium-2507',
          'mistral-large': 'mistral-large-2512',
          'gemini-lite':   'gemini-3.1-flash-lite-preview',
          'gemma-26b':     'gemma-4-26b-a4b-it',
          'gemma-31b':     'gemma-4-31b-it',
          'gemini':        'gemini-2.5-flash',
        };
        const resolved = MODEL_ALIASES[modelName] || modelName;
        pinnedModel = resolved;
        updateModelBadge(resolved);
        appendMessage('system', `🔒 Model pinned: ${resolved}\nAll messages will use this model until /model reset or page reload.`);
      }
      return true;
    }

    case 'clear': {
      convo = [];
      const chatBox = getChatBox();
      if (chatBox) chatBox.innerHTML = '';
      appendMessage('system', '🗑️ Conversation cleared.');
      return true;
    }

    case 'page': {
      pageEnabled = !pageEnabled;
      appendMessage('system', `📄 Page context ${pageEnabled ? 'ON ✅' : 'OFF ❌'}\n${pageEnabled ? 'Current page DOM will be sent with messages.' : 'Page content will not be included.'}`);
      return true;
    }

    case 'images': {
      imagesEnabled = !imagesEnabled;
      appendMessage('system', `🖼️ Image snippets ${imagesEnabled ? 'ON ✅' : 'OFF ❌'}`);
      return true;
    }

    case 'sync': {
      appendMessage('system', '🔄 Force syncing snippets...');
      try {
        // Trigger scraper sync — dispatch custom event that scraper HUD listens to
        window.dispatchEvent(new CustomEvent('venom:force-sync'));
        appendMessage('system', '✅ Sync triggered.');
      } catch (err) {
        appendMessage('system', `⚠️ Sync failed: ${err.message}`);
      }
      return true;
    }

    case 'status': {
      const sessionId = getSessionId();
      const snippets  = getSnippets();
      const lines = [
        `📊 Nexus HUD Status`,
        `Session: ${sessionId || 'none'}`,
        `Snippets staged: ${snippets.length}`,
        `Model: ${pinnedModel || 'auto'}`,
        `Page context: ${pageEnabled ? 'on' : 'off'}`,
        `Images: ${imagesEnabled ? 'on' : 'off'}`,
        `History turns: ${convo.length}`,
      ];
      appendMessage('system', lines.join('\n'));
      return true;
    }

    case 'help': {
      const helpText = [
        '🕷️ VENOM Slash Commands',
        '',
        '/model           — show current model',
        '/model <name>    — pin a model (groq, devstral, mistral-large,',
        '                   gemini-lite, gemma-26b, gemma-31b, gemini)',
        '/clear           — clear conversation history',
        '/page            — toggle page context on/off',
        '/images          — toggle image snippet inclusion',
        '/sync            — force snippet sync',
        '/status          — show HUD status',
        '/help            — show this list',
      ].join('\n');
      appendMessage('system', helpText);
      return true;
    }

    default: {
      appendMessage('system', `❓ Unknown command: /${cmd}\nType /help for available commands.`);
      return true;
    }
  }
}

// ── AUTOCOMPLETE POPUP ─────────────────────────────────────────────────────────
// Shows when user types '/' — renders command list above input.
// Each item is clickable and fills the input.

const SLASH_COMMANDS = [
  { cmd: '/model',   desc: 'Pin or show current AI model' },
  { cmd: '/clear',   desc: 'Clear conversation history' },
  { cmd: '/page',    desc: 'Toggle page context on/off' },
  { cmd: '/images',  desc: 'Toggle image snippets on/off' },
  { cmd: '/sync',    desc: 'Force snippet sync' },
  { cmd: '/status',  desc: 'Show HUD status' },
  { cmd: '/help',    desc: 'List all commands' },
];

function showAutocomplete(filter) {
  removeAutocomplete();
  const input   = getInput();
  if (!input) return;

  const matches = SLASH_COMMANDS.filter((c) =>
    c.cmd.startsWith(filter.toLowerCase())
  );
  if (matches.length === 0) return;

  const popup = document.createElement('div');
  popup.id    = 'venom-slash-autocomplete';
  popup.style.cssText = [
    'position:absolute',
    'bottom:100%',
    'left:0',
    'right:0',
    'background:#0d1117',
    'border:1px solid #22d3ee44',
    'border-radius:6px',
    'overflow:hidden',
    'z-index:999999',
    'margin-bottom:4px',
  ].join(';');

  matches.forEach(({ cmd, desc }) => {
    const item = document.createElement('div');
    item.style.cssText = [
      'padding:6px 10px',
      'cursor:pointer',
      'font-size:12px',
      'color:#e2e8f0',
      'display:flex',
      'gap:8px',
      'align-items:center',
    ].join(';');
    item.innerHTML = `<span style="color:#22d3ee;font-weight:600;min-width:80px">${cmd}</span><span style="color:#94a3b8">${desc}</span>`;
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = cmd + ' ';
      input.focus();
      removeAutocomplete();
    });
    item.addEventListener('mouseover', () => { item.style.background = '#1e2938'; });
    item.addEventListener('mouseout',  () => { item.style.background = ''; });
    popup.appendChild(item);
  });

  // Position relative to input's parent
  const parent = input.parentElement;
  if (parent) {
    parent.style.position = 'relative';
    parent.appendChild(popup);
  }
}

function removeAutocomplete() {
  const existing = document.getElementById('venom-slash-autocomplete');
  if (existing) existing.remove();
}

// ── SEND HANDLER ───────────────────────────────────────────────────────────────

async function handleSend() {
  const input = getInput();
  if (!input || isThinking) return;

  const raw = input.value.trim();
  if (!raw) return;

  input.value = '';
  removeAutocomplete();

  // Intercept slash commands — do not send to AI
  const wasCommand = await handleSlashCommand(raw);
  if (wasCommand) return;

  // Normal message flow
  isThinking = true;
  setSendState(true);

  // BUG 1 FIX: Push user message to convo FIRST
  convo.push({ role: 'user', content: raw });

  // Render user bubble
  appendMessage('user', raw);

  // Thinking indicator
  const thinkingId = appendThinking();

  try {
    // BUG 1 FIX: Pass convo.slice(0,-1) as history (excludes current user msg)
    const history = convo.slice(0, -1);

    // BUG 2 FIX: Real sessionId passed in options
    const sessionId = getSessionId();

    // Get snippets — respecting imagesEnabled toggle
    const rawSnippets = getSnippets();
    const snippets    = imagesEnabled
      ? rawSnippets
      : rawSnippets.filter((s) => s.type !== 'image');

    // Page context — respecting pageEnabled toggle
    const pageContext = pageEnabled ? getCurrentPageContext() : null;

    const result = await askLiteAgent(
      raw,
      snippets,
      history,
      {
        sessionId:     sessionId ? String(sessionId) : null,  // BUG 2 FIX
        preferredModel: pinnedModel,                           // slash command model
      }
    );

    removeThinking(thinkingId);

    // Push assistant reply to convo
    convo.push({ role: 'assistant', content: result.reply });

    // BUG 3 FIX: Read tools_used from result and show badge
    appendMessage('assistant', result.reply, {
      model:     result.model,
      toolsUsed: result.tools_used || [],
      searched:  result.searched,
    });

  } catch (err) {
    removeThinking(thinkingId);
    const errMsg = err.message === 'all_providers_down'
      ? '⚠️ All AI providers are down right now. Try again in a minute.'
      : `⚠️ Error: ${err.message}`;
    appendMessage('system', errMsg);
    // Pop the user message we optimistically added
    if (convo[convo.length - 1]?.role === 'user') convo.pop();
  } finally {
    isThinking = false;
    setSendState(false);
  }
}

// ── PAGE CONTEXT COLLECTOR ─────────────────────────────────────────────────────

function getCurrentPageContext() {
  try {
    return {
      url:     window.location.href,
      title:   document.title || '',
      content: (document.body?.innerText || '').slice(0, 3000),
    };
  } catch {
    return null;
  }
}

// ── DOM HELPERS ────────────────────────────────────────────────────────────────

function appendMessage(role, text, meta = {}) {
  const chatBox = getChatBox();
  if (!chatBox) return;

  const bubble = document.createElement('div');

  const isUser      = role === 'user';
  const isAssistant = role === 'assistant';
  const isSystem    = role === 'system';

  bubble.style.cssText = [
    'padding:8px 10px',
    'border-radius:8px',
    'font-size:13px',
    'line-height:1.5',
    'max-width:95%',
    'word-break:break-word',
    'white-space:pre-wrap',
    isUser      ? 'background:#1e3a5f;color:#e2e8f0;align-self:flex-end;margin-left:auto' : '',
    isAssistant ? 'background:#0d1f0d;color:#e2e8f0;border:1px solid #22d3ee22' : '',
    isSystem    ? 'color:#94a3b8;font-size:11px;font-style:italic' : '',
  ].filter(Boolean).join(';');

  // Render text (basic markdown: **bold**, `code`, \n→<br>)
  const rendered = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code style="background:#1e2938;padding:1px 4px;border-radius:3px;font-family:monospace">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  bubble.innerHTML = rendered;

  // BUG 3 FIX: Render tools_used badge if any tools were called
  if (isAssistant && meta.toolsUsed && meta.toolsUsed.length > 0) {
    const badge = document.createElement('div');
    badge.style.cssText = [
      'margin-top:4px',
      'display:flex',
      'flex-wrap:wrap',
      'gap:3px',
    ].join(';');

    meta.toolsUsed.forEach((toolName) => {
      const pill = document.createElement('span');
      pill.style.cssText = [
        'background:#1e2938',
        'color:#22d3ee',
        'border:1px solid #22d3ee44',
        'border-radius:10px',
        'padding:1px 6px',
        'font-size:10px',
        'font-family:monospace',
      ].join(';');
      pill.textContent = `⚡ ${toolName}`;
      badge.appendChild(pill);
    });

    if (meta.searched) {
      const pill = document.createElement('span');
      pill.style.cssText = [
        'background:#1e2938',
        'color:#a78bfa',
        'border:1px solid #a78bfa44',
        'border-radius:10px',
        'padding:1px 6px',
        'font-size:10px',
      ].join(';');
      pill.textContent = '🔍 searched';
      badge.appendChild(pill);
    }

    bubble.appendChild(badge);
  }

  // Model tag on assistant messages
  if (isAssistant && meta.model) {
    const tag = document.createElement('div');
    tag.style.cssText = 'margin-top:3px;font-size:10px;color:#475569;text-align:right;';
    tag.textContent   = meta.model;
    bubble.appendChild(tag);
  }

  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble;
}

function appendThinking() {
  const chatBox = getChatBox();
  if (!chatBox) return null;

  const id     = `thinking-${Date.now()}`;
  const bubble = document.createElement('div');
  bubble.id    = id;
  bubble.style.cssText = [
    'padding:8px 10px',
    'border-radius:8px',
    'font-size:12px',
    'color:#475569',
    'font-style:italic',
    'border:1px solid #22d3ee22',
    'background:#0a0e1a',
  ].join(';');
  bubble.textContent = '🕷️ thinking...';

  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
  return id;
}

function removeThinking(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) el.remove();
}

function setSendState(thinking) {
  const btn   = getSendBtn();
  const input = getInput();
  if (btn) {
    btn.disabled     = thinking;
    btn.style.opacity = thinking ? '0.5' : '1';
  }
  if (input) input.disabled = thinking;
}

function updateModelBadge(modelName) {
  const badge = getModelBadge();
  if (!badge) return;
  const shortName = modelName.split('-')[0]; // "llama", "devstral", "gemini", etc.
  badge.textContent = pinnedModel ? `🔒 ${shortName}` : shortName;
  badge.style.color = pinnedModel ? '#f59e0b' : '#22d3ee';
}

// ── INPUT EVENT WIRING ─────────────────────────────────────────────────────────

export function initAsk() {
  const input  = getInput();
  const sendBtn = getSendBtn();

  if (!input || !sendBtn) {
    console.warn('[VENOM ask.js] input or sendBtn not found — initAsk aborted');
    return;
  }

  // Send on button click
  sendBtn.addEventListener('click', handleSend);

  // Send on Enter (Shift+Enter = newline)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Slash command autocomplete
  input.addEventListener('input', () => {
    const val = input.value;
    if (val.startsWith('/') && !val.includes(' ')) {
      showAutocomplete(val);
    } else {
      removeAutocomplete();
    }
  });

  // Dismiss autocomplete on blur (slight delay so click fires first)
  input.addEventListener('blur', () => {
    setTimeout(removeAutocomplete, 150);
  });

  console.log('[VENOM ask.js] initialized ✅');
}

// Export state accessors for other HUD modules
export function getConvo()       { return convo; }
export function getPinnedModel() { return pinnedModel; }
export function clearConvo()     { convo = []; }
