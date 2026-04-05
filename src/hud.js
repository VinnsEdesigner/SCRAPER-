// hud.js — floating collapsible mini UI

import { getToken, getSnippets, addSnippet, removeSnippet } from './storage.js';
import { initSelection, getSelected }   from './selection.js';
import { syncToBackend, pollSettings }  from './sync.js';
import { askLiteAgent, injectIntoPage } from './mini-agent.js';

const HUD_ID  = '__nexus_hud__';
const POLL_MS = 15000;

let pollTimer = null;
let collapsed = false;
let settings  = { prompt_injection: true, snippet_limit: 20 };

export function initHud() {
  if (document.getElementById(HUD_ID)) return;

  injectStyles();
  const hud = buildHud();
  document.body.appendChild(hud);

  initSelection((text) => showSelectionBar(text));
  startPoll();
  renderSnippets();
}

// ── BUILD ─────────────────────────────────────────────────────────────────────

function buildHud() {
  const hud = document.createElement('div');
  hud.id    = HUD_ID;
  hud.innerHTML = `
    <div class="nx-header">
      <span class="nx-title">🕷 scraper <span class="nx-dot" id="nx-dot">●</span></span>
      <span class="nx-staged" id="nx-staged">0 staged</span>
      <button class="nx-btn-icon" id="nx-collapse">−</button>
      <button class="nx-btn-icon" id="nx-close">×</button>
    </div>

    <div class="nx-body" id="nx-body">

      <!-- Selection bar (hidden until text selected) -->
      <div class="nx-selection-bar" id="nx-sel-bar" style="display:none">
        <span class="nx-sel-preview" id="nx-sel-preview"></span>
        <button class="nx-btn-sm" id="nx-add-code">+ code</button>
        <button class="nx-btn-sm" id="nx-add-research">+ research</button>
        <button class="nx-btn-sm nx-btn-ghost" id="nx-sel-dismiss">✕</button>
      </div>

      <!-- Inject banner ABOVE input row (never covered by snippets) -->
      <div class="nx-inject-banner" id="nx-inject-banner" style="display:none">
        <span class="nx-inject-text" id="nx-inject-text"></span>
        <div class="nx-inject-actions">
          <button class="nx-btn-sm" id="nx-inject-btn">inject ↗</button>
          <button class="nx-btn-sm nx-btn-ghost" id="nx-inject-dismiss">dismiss</button>
        </div>
      </div>

      <!-- Lite agent -->
      <div class="nx-section">
        <textarea class="nx-input" id="nx-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <div class="nx-row">
          <button class="nx-btn" id="nx-ask-btn">ask</button>
          <button class="nx-btn nx-btn-outline" id="nx-suggest-btn">suggest prompt</button>
        </div>
        <div class="nx-reply" id="nx-reply" style="display:none"></div>
      </div>

      <!-- Snippets — scrollable after 3 items -->
      <div class="nx-section">
        <div class="nx-section-header">STAGED SNIPPETS <span id="nx-count">0/20</span></div>
        <div class="nx-snippets" id="nx-snippets-list"></div>
      </div>

      <!-- Sync -->
      <button class="nx-btn nx-btn-full" id="nx-sync-btn">⇅ sync to dashboard</button>
      <div class="nx-footer">
        <span class="nx-status" id="nx-status">● not synced</span>
        <span class="nx-model" id="nx-model">llama-3.3-70b</span>
      </div>
    </div>
  `;

  bindEvents(hud);
  return hud;
}

// ── EVENTS ────────────────────────────────────────────────────────────────────

function bindEvents(hud) {
  hud.querySelector('#nx-collapse').onclick = toggleCollapse;
  hud.querySelector('#nx-close').onclick    = () => hud.remove();

  hud.querySelector('#nx-add-code').onclick     = () => stageSelected('code');
  hud.querySelector('#nx-add-research').onclick = () => stageSelected('research');
  hud.querySelector('#nx-sel-dismiss').onclick  = hideSelectionBar;

  hud.querySelector('#nx-inject-dismiss').onclick = hideInjectBanner;
  hud.querySelector('#nx-inject-btn').onclick     = doInject;

  hud.querySelector('#nx-ask-btn').onclick     = doAsk;
  hud.querySelector('#nx-suggest-btn').onclick = doSuggest;
  hud.querySelector('#nx-sync-btn').onclick    = doSync;

  hud.querySelector('#nx-agent-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doAsk(); }
  });
}

// ── ACTIONS ───────────────────────────────────────────────────────────────────

function stageSelected(type) {
  const text = getSelected();
  if (!text) return;

  const snippets = getSnippets();
  if (snippets.length >= settings.snippet_limit) {
    setStatus('error', `Max ${settings.snippet_limit} snippets`);
    return;
  }

  addSnippet({ text, type, url: location.href, title: document.title });
  renderSnippets();
  hideSelectionBar();
  setStatus('ok', `#${getSnippets().length} staged`);
}

async function doAsk() {
  const input = document.getElementById('nx-agent-input');
  const msg   = input?.value?.trim();
  if (!msg) return;

  setStatus('syncing', 'asking...');
  const replyEl = document.getElementById('nx-reply');
  replyEl.style.display = 'block';
  replyEl.textContent   = '...';

  const { reply, error } = await askLiteAgent(msg, getSnippets());

  if (error) {
    replyEl.textContent = `⚠ ${error}`;
    setStatus('error', error);
  } else {
    replyEl.textContent = reply;
    setStatus('ok', 'done');
    document.getElementById('nx-model').textContent = 'groq';
  }
}

async function doSuggest() {
  const msg = `Based on this page content, suggest a concise prompt I can send to my AI assistant to ${document.title ? 'understand ' + document.title : 'get help with this page'}.`;
  setStatus('syncing', 'generating...');

  const { reply, error } = await askLiteAgent(msg, getSnippets());
  if (reply && !error) {
    showInjectBanner(reply);
    setStatus('ok', 'suggestion ready');
  } else {
    setStatus('error', error || 'failed');
  }
}

async function doSync() {
  await syncToBackend((type, msg) => {
    setStatus(type === 'success' ? 'ok' : type, msg);
    if (type === 'success') renderSnippets();
  });
}

function doInject() {
  const text = document.getElementById('nx-inject-text')?.textContent;
  if (!text) return;
  const result = injectIntoPage(text);
  hideInjectBanner();
  setStatus('ok', result === 'clipboard' ? 'copied to clipboard' : 'injected ↗');
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function renderSnippets() {
  const snippets = getSnippets();
  const list     = document.getElementById('nx-snippets-list');
  const countEl  = document.getElementById('nx-count');
  const stagedEl = document.getElementById('nx-staged');

  if (!list) return;
  countEl.textContent  = `${snippets.length}/${settings.snippet_limit}`;
  stagedEl.textContent = `${snippets.length} staged`;

  list.innerHTML = snippets.map((s) => `
    <div class="nx-snippet-item">
      <span class="nx-snippet-num">#${s.number}</span>
      <span class="nx-snippet-preview">${escapeHtml(s.text.slice(0, 60))}...</span>
      <span class="nx-snippet-type">${s.type}</span>
      <button class="nx-btn-icon nx-del" data-num="${s.number}">🗑</button>
    </div>
  `).join('');

  list.querySelectorAll('.nx-del').forEach((btn) => {
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
  textEl.textContent   = text.slice(0, 120);
  banner.style.display = 'block';
}

function hideInjectBanner() {
  const banner = document.getElementById('nx-inject-banner');
  if (banner) banner.style.display = 'none';
}

function setStatus(type, msg) {
  const el  = document.getElementById('nx-status');
  const dot = document.getElementById('nx-dot');
  if (!el) return;
  el.textContent = msg;
  el.className   = `nx-status nx-status-${type}`;
  if (dot) dot.className = `nx-dot nx-dot-${type}`;
}

function toggleCollapse() {
  collapsed = !collapsed;
  const body = document.getElementById('nx-body');
  const btn  = document.getElementById('nx-collapse');
  if (body) body.style.display = collapsed ? 'none' : 'block';
  if (btn)  btn.textContent    = collapsed ? '+' : '−';
}

// ── POLL ──────────────────────────────────────────────────────────────────────

function startPoll() {
  pollTimer = setInterval(async () => {
    const token = getToken();
    const s     = await pollSettings(token);
    if (s) settings = { ...settings, ...s };
  }, POLL_MS);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectStyles() {
  if (document.getElementById('__nexus_styles__')) return;
  const style = document.createElement('style');
  style.id    = '__nexus_styles__';
  style.textContent = `
    #__nexus_hud__ {
      position: fixed; bottom: 20px; right: 20px;
      width: 320px; max-height: 80vh;
      background: #0a0a0a; border: 1px solid #2e2e2e;
      border-radius: 12px; font-family: 'Geist Mono', monospace;
      font-size: 12px; color: #e6edf3; z-index: 999999;
      box-shadow: 0 8px 32px rgba(0,0,0,0.9);
      overflow: hidden;
    }
    #__nexus_hud__ .nx-header {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 12px; background: #111; border-bottom: 1px solid #1e1e1e;
      cursor: move;
    }
    #__nexus_hud__ .nx-title { font-weight: bold; flex: 1; }
    #__nexus_hud__ .nx-dot   { color: #7d8590; font-size: 8px; }
    #__nexus_hud__ .nx-dot-ok      { color: #22d3ee; }
    #__nexus_hud__ .nx-dot-error   { color: #ef4444; }
    #__nexus_hud__ .nx-dot-syncing { color: #f59e0b; }
    #__nexus_hud__ .nx-staged { color: #7d8590; font-size: 11px; }
    #__nexus_hud__ .nx-btn-icon {
      background: none; border: none; color: #7d8590;
      cursor: pointer; padding: 0 4px; font-size: 14px;
    }
    #__nexus_hud__ .nx-body { padding: 10px; overflow-y: auto; max-height: 60vh; }
    #__nexus_hud__ .nx-section { margin-bottom: 10px; }
    #__nexus_hud__ .nx-section-header {
      font-size: 10px; color: #7d8590; letter-spacing: 0.5px;
      margin-bottom: 6px; text-transform: uppercase;
    }
    #__nexus_hud__ .nx-input {
      width: 100%; background: #111; border: 1px solid #2e2e2e;
      border-radius: 6px; color: #e6edf3; padding: 6px 8px;
      font-size: 12px; font-family: inherit; resize: none; box-sizing: border-box;
    }
    #__nexus_hud__ .nx-row { display: flex; gap: 6px; margin-top: 6px; }
    #__nexus_hud__ .nx-btn {
      background: #1e1e1e; border: 1px solid #2e2e2e;
      color: #e6edf3; border-radius: 6px; padding: 4px 10px;
      cursor: pointer; font-size: 11px; font-family: inherit;
    }
    #__nexus_hud__ .nx-btn:hover { background: #2e2e2e; }
    #__nexus_hud__ .nx-btn-outline { background: none; }
    #__nexus_hud__ .nx-btn-full { width: 100%; margin-top: 8px; }
    #__nexus_hud__ .nx-btn-sm {
      background: #111; border: 1px solid #2e2e2e; color: #b1bac4;
      border-radius: 4px; padding: 2px 8px; cursor: pointer;
      font-size: 11px; font-family: inherit;
    }
    #__nexus_hud__ .nx-btn-ghost { border-color: transparent; color: #7d8590; }
    #__nexus_hud__ .nx-selection-bar {
      display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
      background: #111; border: 1px solid #2e2e2e; border-radius: 6px;
      padding: 6px 8px; margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-sel-preview {
      flex: 1; color: #7d8590; font-size: 11px; overflow: hidden;
      text-overflow: ellipsis; white-space: nowrap;
    }
    #__nexus_hud__ .nx-inject-banner {
      background: #0d1117; border: 1px solid #7c3aed;
      border-radius: 6px; padding: 8px; margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-inject-text { font-size: 11px; color: #b1bac4; display: block; margin-bottom: 6px; }
    #__nexus_hud__ .nx-inject-actions { display: flex; gap: 6px; }
    #__nexus_hud__ .nx-reply {
      margin-top: 6px; padding: 6px 8px; background: #111;
      border-radius: 6px; font-size: 11px; color: #b1bac4;
      max-height: 80px; overflow-y: auto;
    }
    #__nexus_hud__ .nx-snippets { max-height: 120px; overflow-y: auto; }
    #__nexus_hud__ .nx-snippet-item {
      display: flex; align-items: center; gap: 4px;
      padding: 4px 0; border-bottom: 1px solid #111;
    }
    #__nexus_hud__ .nx-snippet-num  { color: #7d8590; font-size: 10px; min-width: 24px; }
    #__nexus_hud__ .nx-snippet-preview { flex: 1; color: #7d8590; font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #__nexus_hud__ .nx-snippet-type  { font-size: 9px; color: #484f58; }
    #__nexus_hud__ .nx-footer {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 8px; padding-top: 6px; border-top: 1px solid #111;
    }
    #__nexus_hud__ .nx-status { font-size: 10px; color: #7d8590; }
    #__nexus_hud__ .nx-model  { font-size: 10px; color: #484f58; }
  `;
  document.head.appendChild(style);
}
