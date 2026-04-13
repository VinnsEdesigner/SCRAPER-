// ask.js — AGENT tab v4: fixed history pipeline + sessionId + tool badges + slash commands

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets, getSessionId } from '../storage.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

// ── State ────────────────────────────────────────────────────────────────────
let convo           = [];
let suggestedPrompt = null;
let sessionId       = getSessionId();   // real UUID from storage, NOT Date.now()
let pinnedModel     = null;             // set by /model command, null = auto

const HISTORY_KEY = 'vn_chat_sessions';

// Slash commands definition — what we intercept
const SLASH_COMMANDS = {
  'model':    '/model <name|reset|?>  — pin a model for this session',
  'clear':    '/clear                 — wipe current conversation',
  'page':     '/page                  — capture page text as snippet',
  'images':   '/images                — capture all images on page',
  'sync':     '/sync                  — sync snippets to backend',
  'snippets': '/snippets              — jump to snippets tab',
  'help':     '/help                  — show all commands',
};

const MODEL_ALIASES = ['groq','llama','devstral','mistral','gemini','gemini-lite','gemma-26','gemma-31','reset'];

// ── Build tab ─────────────────────────────────────────────────────────────────
export function buildAgentTab() {
  const container = document.getElementById('vn-tab-agent');
  if (!container) return;

  container.innerHTML = `
    <div class="vn-history-drawer" id="vn-history-drawer">
      <div class="vn-history-hdr">
        <span>CHAT HISTORY</span>
        <button class="vn-btn-icon" id="vn-drawer-close">✕</button>
      </div>
      <button class="vn-history-new" id="vn-new-chat">＋ New Chat</button>
      <div class="vn-history-list" id="vn-history-list"></div>
    </div>

    <div class="vn-agent-top">
      <button class="vn-hamburger" id="vn-hamburger">☰</button>
      <span class="vn-agent-label" id="vn-session-label">SESSION</span>
      <span class="vn-model-pill" id="vn-model-pill" style="display:none"></span>
    </div>

    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Anything buddy😏..</span>
      </div>
    </div>

    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject ↗</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>

    <div class="vn-bottom-area" id="vn-bottom-area">
      <div class="vn-slash-popup" id="vn-slash-popup" style="display:none">
        <div class="vn-slash-list" id="vn-slash-list"></div>
      </div>
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="🧑‍💻 ask anything — type / for commands" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">↑</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `;

  bindAgentEvents();
  renderHistory();
  updateSessionLabel();
}

// ── Event binding ─────────────────────────────────────────────────────────────
function bindAgentEvents() {
  document.getElementById('vn-send-btn')?.addEventListener('click', sendMessage);
  document.getElementById('vn-suggest-btn')?.addEventListener('click', generateSuggest);
  document.getElementById('vn-inject-btn')?.addEventListener('click', doInject);
  document.getElementById('vn-inject-dismiss')?.addEventListener('click', hideBanner);
  document.getElementById('vn-hamburger')?.addEventListener('click', openDrawer);
  document.getElementById('vn-drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('vn-new-chat')?.addEventListener('click', newChat);

  const input = document.getElementById('vn-agent-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    if (e.key === 'Escape') hideSlashPopup();
  });

  input.addEventListener('input', () => {
    const val = input.value;
    if (val.startsWith('/') && val.length >= 1) {
      renderSlashPopup(val);
    } else {
      hideSlashPopup();
    }
  });

  // Hide popup when clicking outside
  document.addEventListener('click', (e) => {
    const popup = document.getElementById('vn-slash-popup');
    const bottomArea = document.getElementById('vn-bottom-area');
    if (popup && bottomArea && !bottomArea.contains(e.target)) {
      hideSlashPopup();
    }
  });
}

// ── Slash popup render ────────────────────────────────────────────────────────
function renderSlashPopup(val) {
  const popup = document.getElementById('vn-slash-popup');
  const list  = document.getElementById('vn-slash-list');
  if (!popup || !list) return;

  // Extract the command part (before any space)
  const typed   = val.slice(1).split(' ')[0].toLowerCase();
  const matches = Object.keys(SLASH_COMMANDS).filter((cmd) => cmd.startsWith(typed));

  if (matches.length === 0) { hideSlashPopup(); return; }

  list.innerHTML = matches.map((cmd) => `
    <div class="vn-slash-item" data-cmd="/${cmd}">
      <span class="vn-slash-cmd">${SLASH_COMMANDS[cmd]}</span>
    </div>
  `).join('');

  // Bind click handlers on newly rendered items
  list.querySelectorAll('.vn-slash-item').forEach((item) => {
    // Use mousedown not click — fires before blur/focusout
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const input = document.getElementById('vn-agent-input');
      if (input) {
        input.value = item.dataset.cmd + (item.dataset.cmd === '/help' || item.dataset.cmd === '/clear' || item.dataset.cmd === '/page' || item.dataset.cmd === '/images' || item.dataset.cmd === '/sync' || item.dataset.cmd === '/snippets' ? '' : ' ');
        input.focus();
      }
      hideSlashPopup();
    });
  });

  popup.style.display = 'block';
}

function hideSlashPopup() {
  const popup = document.getElementById('vn-slash-popup');
  if (popup) popup.style.display = 'none';
}

// ── Slash command handler ─────────────────────────────────────────────────────
// Returns true if consumed, false if falls through to normal send
function handleSlashCommand(raw) {
  const trimmed = raw.trim();
  const spaceIdx = trimmed.indexOf(' ');
  const cmd = (spaceIdx === -1 ? trimmed.slice(1) : trimmed.slice(1, spaceIdx)).toLowerCase();
  const arg = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim();

  switch (cmd) {
    case 'model': {
      if (!arg || arg === '?') {
        const current = pinnedModel || 'auto (modelRouter decides)';
        addBubble('agent', `📍 Current model: **${current}**\nValid aliases: ${MODEL_ALIASES.join(', ')}`);
        return true;
      }
      if (arg === 'reset') {
        pinnedModel = null;
        updateModelPill();
        addBubble('agent', '🔄 Model reset to auto — modelRouter decides');
        return true;
      }
      if (MODEL_ALIASES.includes(arg.toLowerCase())) {
        pinnedModel = arg.toLowerCase();
        updateModelPill();
        addBubble('agent', `📌 Model pinned: **${pinnedModel}**\nAll requests this session will use this model.`);
        return true;
      }
      addBubble('agent', `❓ Unknown alias: "${arg}"\nValid: ${MODEL_ALIASES.join(', ')}`);
      return true;
    }

    case 'clear': {
      convo = [];
      const el = document.getElementById('vn-convo');
      if (el) el.innerHTML = `<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>Cleared 🧹 fresh start</span></div>`;
      return true;
    }

    case 'page': {
      import('../dom-reader.js').then(({ readPage }) => {
        const page = readPage();
        import('../storage.js').then(({ addSnippet }) => {
          addSnippet({ text: page.content, type: 'research', url: page.url, title: page.title });
          import('./snippets.js').then(({ renderSnippets }) => renderSnippets()).catch(() => {});
          addBubble('agent', `📄 Page captured → research snippet (${page.content.length} chars)`);
        });
      }).catch(() => addBubble('agent', '⚠ Could not capture page content'));
      return true;
    }

    case 'images': {
      const imgs = Array.from(document.images)
        .filter((img) => img.naturalWidth > 100 && img.src && !img.src.startsWith('data:'))
        .slice(0, 10);
      if (imgs.length === 0) { addBubble('agent', '🖼️ No suitable images found'); return true; }
      import('../storage.js').then(({ addSnippet }) => {
        imgs.forEach((img) => addSnippet({ text: img.src, type: 'image', url: img.src, title: img.alt || 'image' }));
        import('./snippets.js').then(({ renderSnippets }) => renderSnippets()).catch(() => {});
        addBubble('agent', `🖼️ Captured ${imgs.length} image${imgs.length !== 1 ? 's' : ''} as snippets`);
      });
      return true;
    }

    case 'sync': {
      addBubble('agent', '⇅ Syncing...');
      import('../sync.js').then(({ syncToBackend }) => {
        syncToBackend((type, msg) => {
          setStatus(type === 'success' ? 'green' : type === 'error' ? 'red' : 'amber', msg);
          if (type !== 'syncing') addBubble('agent', `${type === 'success' ? '✅' : '⚠'} ${msg}`);
        });
      });
      return true;
    }

    case 'snippets': {
      import('./tabs.js').then(({ switchTab }) => switchTab('snippets')).catch(() => {});
      return true;
    }

    case 'help': {
      const lines = Object.values(SLASH_COMMANDS).map((hint) => hint.trim()).join('\n');
      addBubble('agent', `**Slash commands:**\n${lines}`);
      return true;
    }

    default:
      return false; // Unknown → send as normal message
  }
}

// ── Model pill ────────────────────────────────────────────────────────────────
function updateModelPill() {
  const pill = document.getElementById('vn-model-pill');
  if (!pill) return;
  if (pinnedModel) {
    pill.textContent   = `📌 ${pinnedModel}`;
    pill.style.display = 'inline-block';
  } else {
    pill.style.display = 'none';
  }
}

// ── Session label ─────────────────────────────────────────────────────────────
function updateSessionLabel() {
  const lbl = document.getElementById('vn-session-label');
  if (lbl) lbl.textContent = sessionId.slice(0, 8).toUpperCase();
}

// ── SEND MESSAGE — FIXED HISTORY PIPELINE ────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('vn-agent-input');
  const msg   = input?.value?.trim();
  if (!msg) return;

  hideSlashPopup();

  // Slash command intercept — only when starts with /
  if (msg.startsWith('/')) {
    const handled = handleSlashCommand(msg);
    if (handled) { input.value = ''; return; }
    // Unknown /command → fall through to normal send
  }

  // BUG FIX — History timing:
  // historySnapshot = prior turns BEFORE current message
  // Push user message to convo[] BEFORE sending (so it's in local history)
  // Push assistant reply AFTER receiving it
  const historySnapshot = convo.slice();       // prior turns only
  convo.push({ role: 'user', content: msg });  // push NOW

  addBubble('user', msg);
  input.value = '';

  setStatus('amber', 'thinking...');
  setBadge('model', 'thinking...', 'warn');

  // Pass real sessionId + preferredModel
  const result = await askLiteAgent(msg, getSnippets(), historySnapshot, {
    sessionId:      String(sessionId),
    preferredModel: pinnedModel || null,
  });

  const { reply, model, escalated, error, tools_used } = result;

  if (error) {
    addBubble('agent', `⚠ ${error}`);
    setStatus('red', 'error');
    showWarn(error);
    setBadge('model', 'error', 'err');
    convo.push({ role: 'assistant', content: `⚠ ${error}` });
    return;
  }

  convo.push({ role: 'assistant', content: reply });

  // Tool badge in label
  const toolLabel = (tools_used?.length)
    ? `${model || 'lite'} · 🔧 ${tools_used.join(', ')}`
    : (model || 'lite');

  addBubble('agent', reply, toolLabel);
  setStatus('green', escalated ? 'done (escalated)' : 'done');
  setBadge('model', model || 'lite', 'active');
  saveSession(convo);
}

// ── Suggest prompt ────────────────────────────────────────────────────────────
async function generateSuggest() {
  setStatus('amber', 'generating...');
  const result = await askLiteAgent(
    'Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt.',
    getSnippets(), convo,
    { sessionId: String(sessionId), preferredModel: pinnedModel || null }
  );
  if (result.error || !result.reply) {
    setStatus('red', 'suggestion failed');
    showWarn('Suggestion failed: ' + (result.error || 'empty'));
    return;
  }
  suggestedPrompt = result.reply;
  showBanner(result.reply);
  setStatus('green', 'ready to inject');
}

// ── Bubble builder ────────────────────────────────────────────────────────────
function addBubble(type, text, model) {
  const convoEl = document.getElementById('vn-convo');
  if (!convoEl) return;

  const msgEl = document.createElement('div');
  msgEl.className = `vn-msg vn-msg-${type}`;

  const label = document.createElement('div');
  label.className = 'vn-msg-label';
  label.textContent = type === 'user' ? 'YOU' : (model ? `NExY · ${model}` : 'NExY');
  msgEl.appendChild(label);

  parseContent(text).forEach((node) => msgEl.appendChild(node));
  convoEl.appendChild(msgEl);
  convoEl.scrollTop = convoEl.scrollHeight;
}

// ── Content parser ────────────────────────────────────────────────────────────
function parseContent(text) {
  const nodes = [];
  const parts = text.split(/(```[\s\S]*?```)/g);

  parts.forEach((part) => {
    if (part.startsWith('```')) {
      const inner = part.slice(3, -3);
      const nl    = inner.indexOf('\n');
      const hint  = nl >= 0 ? inner.slice(0, nl).trim() : '';
      const code  = nl >= 0 ? inner.slice(nl + 1).trim() : inner.trim();
      nodes.push(buildCodeBlock(hint, code));
    } else if (looksLikeAsciiTree(part)) {
      const pre = document.createElement('pre');
      pre.className = 'vn-ascii-block';
      pre.textContent = normalizeAsciiTree(part.trim());
      nodes.push(pre);
    } else if (part.trim()) {
      const span = document.createElement('span');
      span.textContent = part;
      span.style.whiteSpace = 'pre-wrap';
      nodes.push(span);
    }
  });

  return nodes;
}

// ── Code block ────────────────────────────────────────────────────────────────
function buildCodeBlock(hint, code) {
  const lang    = detectLang(hint, code);
  const wrapper = document.createElement('div');
  wrapper.className = 'vn-code-block';

  wrapper.innerHTML = `
    <div class="vn-code-header">
      <span class="vn-code-lang">#${lang}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${syntaxHighlight(code, lang)}</div>
  `;

  wrapper.querySelector('.vn-code-copy').onclick = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    const btn = wrapper.querySelector('.vn-code-copy');
    btn.textContent = 'copied!';
    setTimeout(() => { if (btn) btn.textContent = 'copy'; }, 1500);
  };
  return wrapper;
}

function syntaxHighlight(code, lang) {
  let e = escapeHtml(code);
  getHighlightRules(lang).forEach(([p, cls]) => { e = e.replace(p, (m) => `<span class="sh-${cls}">${m}</span>`); });
  return e;
}

function getHighlightRules(lang) {
  const str = [/(&quot;|&#x27;)(.*?)(\1)/g, 'str'];
  const cmt = [/\/\/[^\n]*/g, 'cmt'];
  const hcmt = [/#[^\n]*/g, 'cmt'];
  const num = [/\b(\d+\.?\d*)\b/g, 'num'];
  const kw2 = [/\b(true|false|null|undefined|None|True|False)\b/g, 'kw2'];
  if (['js','ts','jsx','tsx'].includes(lang)) return [
    cmt, str,
    [/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g, 'kw'],
    kw2, num, [/\b([A-Z][a-zA-Z0-9_]*)\b/g, 'cls'], [/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 'fn'],
  ];
  if (['py','python'].includes(lang)) return [
    hcmt, str,
    [/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield)\b/g, 'kw'],
    kw2, num,
  ];
  if (['sh','bash'].includes(lang)) return [hcmt, str, [/\b(if|then|else|fi|for|do|done|echo|cd|ls|mkdir|rm|git|npm|node)\b/g, 'kw'], [/\$[a-zA-Z_]\w*/g, 'var'], num];
  if (lang === 'json') return [str, kw2, num];
  if (lang === 'css')  return [[/\/\*[\s\S]*?\*\//g,'cmt'], str, [/([a-zA-Z-]+)\s*:/g,'kw'], num];
  if (lang === 'html') return [[/&lt;!--[\s\S]*?--&gt;/g,'cmt'], [/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,'kw'], str];
  return [str, num, kw2];
}

function detectLang(hint, code) {
  const h = (hint||'').toLowerCase().trim();
  const m = { js:'js',javascript:'js',jsx:'jsx',ts:'ts',typescript:'ts',tsx:'tsx',py:'py',python:'py',sh:'sh',bash:'sh',shell:'sh',json:'json',css:'css',html:'html' };
  if (m[h]) return m[h];
  if (/(def |import |from .* import|print\(|elif )/m.test(code)) return 'py';
  if (/(const |let |var |function |=>|require\()/m.test(code)) return 'js';
  if (/(#!\/bin\/|echo |grep |npm |git )/m.test(code)) return 'sh';
  return h || 'code';
}

function looksLikeAsciiTree(t) {
  return t.trim().split('\n').filter((l) => /[├└│─]/.test(l)).length >= 2;
}

function normalizeAsciiTree(t) {
  return t.replace(/\|--/g,'├── ').replace(/\+--/g,'├── ').replace(/`--/g,'└── ').replace(/\|  /g,'│   ');
}

// ── Banner ────────────────────────────────────────────────────────────────────
function showBanner(text) {
  const b = document.getElementById('vn-inject-banner');
  const t = document.getElementById('vn-inject-text');
  if (b && t) { t.textContent = text.slice(0, 180); b.classList.add('vn-show'); }
}

function hideBanner() {
  document.getElementById('vn-inject-banner')?.classList.remove('vn-show');
  suggestedPrompt = null;
}

function doInject() {
  const text = suggestedPrompt || document.getElementById('vn-inject-text')?.textContent;
  if (!text) return;
  const r = injectIntoPage(text);
  hideBanner();
  if (r === false) { setStatus('red', 'no input'); showWarn('No writable input found'); }
  else setStatus('green', r === 'clipboard' ? 'copied' : 'injected ↗');
}

function injectIntoPage(text) {
  if (!text) return false;
  for (const sel of ['textarea:not([disabled]):not([readonly])','div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]']) {
    const el = document.querySelector(sel);
    if (!el) continue;
    try {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.focus(); el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      if (el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        return true;
      }
    } catch {}
  }
  try { navigator.clipboard.writeText(text); return 'clipboard'; } catch { return false; }
}

// ── Drawer ────────────────────────────────────────────────────────────────────
function openDrawer()  { document.getElementById('vn-history-drawer')?.classList.add('vn-open'); renderHistory(); }
function closeDrawer() { document.getElementById('vn-history-drawer')?.classList.remove('vn-open'); }

function newChat() {
  convo = [];
  import('../storage.js').then(({ resetSession, getSessionId: gsi }) => {
    resetSession();
    sessionId = gsi();
    updateSessionLabel();
  }).catch(() => { sessionId = String(Date.now()); updateSessionLabel(); });

  const el = document.getElementById('vn-convo');
  if (el) el.innerHTML = `<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>Fresh start 🧹</span></div>`;
  closeDrawer();
}

function saveSession(messages) {
  if (!messages?.length) return;
  try {
    const sessions = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const idx      = sessions.findIndex((s) => s.id === sessionId);
    const preview  = messages.find((m) => m.role === 'user')?.content?.slice(0, 60) || 'Chat';
    const entry    = { id: sessionId, ts: new Date().toLocaleTimeString(), preview, messages: messages.slice() };
    if (idx >= 0) sessions[idx] = entry; else sessions.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, 20)));
  } catch {}
}

function renderHistory() {
  const list = document.getElementById('vn-history-list');
  if (!list) return;
  try {
    const sessions = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (!sessions.length) { list.innerHTML = `<div class="vn-history-empty">No sessions yet</div>`; return; }
    list.innerHTML = sessions.map((s) => `
      <div class="vn-history-item" data-id="${s.id}">
        <div class="vn-history-preview">${escapeHtml(s.preview)}</div>
        <div class="vn-history-meta">${s.messages.length} msgs · ${s.ts}</div>
      </div>`).join('');
    list.querySelectorAll('.vn-history-item').forEach((el) => {
      el.onclick = () => restoreSession(el.dataset.id);
    });
  } catch {}
}

function restoreSession(id) {
  try {
    const sessions = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const session  = sessions.find((s) => s.id === id);
    if (!session) return;
    convo     = session.messages.slice();
    sessionId = session.id;
    updateSessionLabel();
    const el = document.getElementById('vn-convo');
    if (!el) return;
    el.innerHTML = '';
    convo.forEach((m) => addBubble(m.role === 'user' ? 'user' : 'agent', m.content));
    closeDrawer();
  } catch {}
}

// ── Utils ─────────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
