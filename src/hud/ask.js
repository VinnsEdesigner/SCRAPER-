// ask.js — AGENT tab v4: fixed history pipeline + sessionId + tool badges + slash commands

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets, getSessionId } from '../storage.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

// ── State ────────────────────────────────────────────────────────────────────
let convo        = [];          // current session messages [{role,content}]
let suggestedPrompt = null;
let sessionId    = getSessionId();  // real UUID from storage, NOT Date.now()
let pinnedModel  = null;        // set by /model slash command, null = auto
const HISTORY_KEY = 'vn_chat_sessions';

// ── Slash command definitions ─────────────────────────────────────────────────
const SLASH_COMMANDS = {
  model:    { args: true,  hint: '/model <name|reset|?>' },
  clear:    { args: false, hint: '/clear' },
  page:     { args: false, hint: '/page' },
  images:   { args: false, hint: '/images' },
  sync:     { args: false, hint: '/sync' },
  snippets: { args: false, hint: '/snippets' },
  help:     { args: false, hint: '/help' },
};

// Valid model aliases for slash command
const MODEL_ALIASES = ['groq', 'llama', 'devstral', 'mistral', 'gemini', 'gemini-lite', 'gemma-26', 'gemma-31', 'reset'];

// ── Build tab ────────────────────────────────────────────────────────────────
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

    <div class="vn-slash-popup" id="vn-slash-popup" style="display:none">
      <div class="vn-slash-list" id="vn-slash-list"></div>
    </div>

    <div class="vn-bottom-area">
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="🧑‍💻 anything to ask 🙂" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">↑</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `;

  bindAgentEvents();
  renderHistory();
  updateSessionLabel();
}

function bindAgentEvents() {
  document.getElementById('vn-send-btn')?.addEventListener('click', sendMessage);
  document.getElementById('vn-suggest-btn')?.addEventListener('click', generateSuggest);
  document.getElementById('vn-inject-btn')?.addEventListener('click', doInject);
  document.getElementById('vn-inject-dismiss')?.addEventListener('click', hideBanner);
  document.getElementById('vn-hamburger')?.addEventListener('click', openDrawer);
  document.getElementById('vn-drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('vn-new-chat')?.addEventListener('click', newChat);

  const input = document.getElementById('vn-agent-input');
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    if (e.key === 'Escape') hideSlashPopup();
  });

  // Slash command autocomplete
  input?.addEventListener('input', () => {
    const val = input.value;
    if (val.startsWith('/')) {
      showSlashPopup(val);
    } else {
      hideSlashPopup();
    }
  });
}

// ── Slash command popup ───────────────────────────────────────────────────────
function showSlashPopup(val) {
  const popup    = document.getElementById('vn-slash-popup');
  const list     = document.getElementById('vn-slash-list');
  if (!popup || !list) return;

  const typed   = val.slice(1).toLowerCase().split(' ')[0];
  const matches = Object.keys(SLASH_COMMANDS).filter((cmd) => cmd.startsWith(typed));

  if (matches.length === 0) { hideSlashPopup(); return; }

  list.innerHTML = matches.map((cmd) => `
    <div class="vn-slash-item" data-cmd="/${cmd}">
      <span class="vn-slash-cmd">${SLASH_COMMANDS[cmd].hint}</span>
    </div>
  `).join('');

  list.querySelectorAll('.vn-slash-item').forEach((item) => {
    item.addEventListener('click', () => {
      const input = document.getElementById('vn-agent-input');
      if (input) input.value = item.dataset.cmd + ' ';
      hideSlashPopup();
      input?.focus();
    });
  });

  popup.style.display = 'block';
}

function hideSlashPopup() {
  const popup = document.getElementById('vn-slash-popup');
  if (popup) popup.style.display = 'none';
}

// ── Slash command handler ─────────────────────────────────────────────────────
// Returns true if command was consumed (do not send to backend).
// Returns false if unknown command or falls through.
function handleSlashCommand(raw) {
  const parts   = raw.trim().split(/\s+/);
  const cmd     = parts[0].slice(1).toLowerCase();
  const arg     = parts.slice(1).join(' ').trim();

  switch (cmd) {
    case 'model': {
      if (!arg || arg === '?') {
        // Show current model status
        const current = pinnedModel || 'auto (modelRouter)';
        addBubble('agent', `📍 Current model: **${current}**\nAvailable: ${MODEL_ALIASES.join(', ')}`);
        return true;
      }
      if (arg === 'reset') {
        pinnedModel = null;
        updateModelPill();
        addBubble('agent', '🔄 Model reset to auto — modelRouter decides');
        return true;
      }
      // Validate alias
      if (MODEL_ALIASES.includes(arg.toLowerCase())) {
        pinnedModel = arg.toLowerCase();
        updateModelPill();
        addBubble('agent', `📌 Model pinned to **${pinnedModel}** for this session`);
        return true;
      }
      addBubble('agent', `❓ Unknown model "${arg}". Valid: ${MODEL_ALIASES.join(', ')}`);
      return true;
    }

    case 'clear': {
      convo = [];
      const convoEl = document.getElementById('vn-convo');
      if (convoEl) convoEl.innerHTML = `
        <div class="vn-msg vn-msg-agent">
          <div class="vn-msg-label">NExY</div>
          <span>Cleared 🧹 fresh session</span>
        </div>`;
      return true;
    }

    case 'page': {
      // Capture page text → add as research snippet
      import('../dom-reader.js').then(({ readPage }) => {
        const page = readPage();
        import('../storage.js').then(({ addSnippet }) => {
          addSnippet({ text: page.content, type: 'research', url: page.url, title: page.title });
          import('./snippets.js').then(({ renderSnippets }) => renderSnippets());
          addBubble('agent', `📄 Page captured as research snippet — ${page.content.length} chars`);
        });
      }).catch(() => addBubble('agent', '⚠ Could not capture page'));
      return true;
    }

    case 'images': {
      // Capture all visible images → add as image snippets
      const imgs = Array.from(document.images)
        .filter((img) => img.naturalWidth > 100 && img.src && !img.src.startsWith('data:'))
        .slice(0, 10);
      if (imgs.length === 0) {
        addBubble('agent', '🖼️ No suitable images found on this page');
        return true;
      }
      import('../storage.js').then(({ addSnippet }) => {
        imgs.forEach((img) => {
          addSnippet({ text: img.src, type: 'image', url: img.src, title: img.alt || 'image' });
        });
        import('./snippets.js').then(({ renderSnippets }) => renderSnippets());
        addBubble('agent', `🖼️ Captured ${imgs.length} image${imgs.length !== 1 ? 's' : ''} as snippets`);
      });
      return true;
    }

    case 'sync': {
      import('../sync.js').then(({ syncToBackend }) => {
        syncToBackend((type, msg) => {
          setStatus(type === 'success' ? 'green' : type === 'error' ? 'red' : 'amber', msg);
        });
      });
      addBubble('agent', '⇅ Syncing snippets to backend...');
      return true;
    }

    case 'snippets': {
      // Switch to snippets tab
      import('./tabs.js').then(({ switchTab }) => switchTab('snippets'));
      return true;
    }

    case 'help': {
      const helpText = Object.values(SLASH_COMMANDS).map((c) => c.hint).join('\n');
      addBubble('agent', `**Slash commands:**\n${helpText}`);
      return true;
    }

    default:
      return false; // Unknown command — let it fall through to normal send
  }
}

// ── Model pill display ────────────────────────────────────────────────────────
function updateModelPill() {
  const pill = document.getElementById('vn-model-pill');
  if (!pill) return;
  if (pinnedModel) {
    pill.textContent = `📌 ${pinnedModel}`;
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

// ── Send message — FIXED HISTORY PIPELINE ────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('vn-agent-input');
  const msg   = input?.value?.trim();
  if (!msg) return;

  hideSlashPopup();

  // Slash command check — only if message starts with /
  if (msg.startsWith('/')) {
    const handled = handleSlashCommand(msg);
    if (handled) {
      input.value = '';
      return;
    }
    // Unknown /command → falls through to normal send
  }

  // BUG1+BUG8 FIX:
  // Push user message to convo BEFORE sending so history is complete.
  // historySnapshot = convo WITHOUT the current message (for the backend history param).
  // After agent replies, push assistant message.
  const historySnapshot = convo.slice(); // snapshot of prior turns (excludes current)
  convo.push({ role: 'user', content: msg });

  addBubble('user', msg);
  input.value = '';

  setStatus('amber', 'thinking...');
  setBadge('model', 'thinking...', 'warn');

  // BUG2 FIX: pass real sessionId (UUID from storage) + preferredModel
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

  // Push assistant reply to convo
  convo.push({ role: 'assistant', content: reply });

  // BUG3 FIX: read tools_used and show badge
  const toolsLabel = (tools_used && tools_used.length > 0)
    ? `${model || 'lite'} · 🔧${tools_used.join(',')}` 
    : (model || 'lite');

  addBubble('agent', reply, toolsLabel);
  setStatus('green', escalated ? 'done (escalated)' : 'done');
  setBadge('model', model || 'lite', 'active');

  // Save full session to history
  saveSession(convo);
}

// ── Suggest prompt ────────────────────────────────────────────────────────────
async function generateSuggest() {
  const prompt = `Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.`;
  setStatus('amber', 'generating...');
  const result = await askLiteAgent(prompt, getSnippets(), convo, {
    sessionId:      String(sessionId),
    preferredModel: pinnedModel || null,
  });
  const { reply, error } = result;
  if (error || !reply) {
    setStatus('red', 'suggestion failed');
    showWarn('Suggestion failed: ' + (error || 'empty reply'));
    return;
  }
  suggestedPrompt = reply;
  showBanner(reply);
  setStatus('green', 'ready to inject');
}

// ── DOM: add chat bubble ──────────────────────────────────────────────────────
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

// ── Content parser: code fences → IDE block, ASCII tree → pre block ───────────
function parseContent(text) {
  const nodes = [];
  const parts  = text.split(/(```[\s\S]*?```)/g);

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

// ── IDE code block with syntax highlighting ───────────────────────────────────
function buildCodeBlock(hint, code) {
  const lang    = detectLang(hint, code);
  const wrapper = document.createElement('div');
  wrapper.className = 'vn-code-block';

  const highlighted = syntaxHighlight(code, lang);

  wrapper.innerHTML = `
    <div class="vn-code-header">
      <span class="vn-code-lang">#${lang}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${highlighted}</div>
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
  let escaped = escapeHtml(code);
  const rules = getHighlightRules(lang);
  rules.forEach(([pattern, cls]) => {
    escaped = escaped.replace(pattern, (m) => `<span class="sh-${cls}">${m}</span>`);
  });
  return escaped;
}

function getHighlightRules(lang) {
  const strings  = [/(&quot;|&#x27;)(.*?)(\1)/g, 'str'];
  const comments = [/\/\/[^\n]*/g, 'cmt'];
  const hashCmt  = [/#[^\n]*/g, 'cmt'];
  const numbers  = [/\b(\d+\.?\d*)\b/g, 'num'];
  const boolNull = [/\b(true|false|null|undefined|None|True|False)\b/g, 'kw2'];

  if (['js','ts','jsx','tsx'].includes(lang)) return [
    comments, strings,
    [/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g, 'kw'],
    boolNull, numbers,
    [/\b([A-Z][a-zA-Z0-9_]*)\b/g, 'cls'],
    [/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, 'fn'],
  ];
  if (['py','python'].includes(lang)) return [
    hashCmt, strings,
    [/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g, 'kw'],
    boolNull, numbers,
    [/\b([A-Z][a-zA-Z0-9_]*)\b/g, 'cls'],
    [/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g, 'fn'],
  ];
  if (['sh','bash','shell','zsh'].includes(lang)) return [
    hashCmt, strings,
    [/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g, 'kw'],
    [/\$[a-zA-Z_][a-zA-Z0-9_]*/g, 'var'], numbers,
  ];
  if (lang === 'json') return [strings, [/\b(true|false|null)\b/g, 'kw2'], numbers];
  if (lang === 'css')  return [[/\/\*[\s\S]*?\*\//g, 'cmt'], strings, [/([a-zA-Z-]+)\s*:/g, 'kw'], numbers];
  if (lang === 'html') return [[/&lt;!--[\s\S]*?--&gt;/g, 'cmt'], [/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g, 'kw'], strings];
  return [strings, numbers, boolNull];
}

function detectLang(hint, code) {
  const h = (hint || '').toLowerCase().trim();
  const fenceMap = { js:'js',javascript:'js',jsx:'jsx',ts:'ts',typescript:'ts',tsx:'tsx',
    py:'py',python:'py',sh:'sh',bash:'sh',shell:'sh',zsh:'sh',json:'json',css:'css',html:'html' };
  if (fenceMap[h]) return fenceMap[h];
  if (/^\s*\{[\s\S]*\}\s*$/.test(code) && /"[^"]+"\s*:/.test(code)) return 'json';
  if (/(def |import |from .* import|print\(|elif |:\s*$)/m.test(code)) return 'py';
  if (/(const |let |var |function |=>|require\(|module\.exports)/m.test(code)) return 'js';
  if (/(#!\/bin\/(bash|sh)|echo |grep |awk |npm |git )/m.test(code)) return 'sh';
  return h || 'code';
}

function looksLikeAsciiTree(text) {
  const treeChars = /[├└│─┤┬┴┼]/;
  return text.trim().split('\n').filter((l) => treeChars.test(l)).length >= 2;
}

function normalizeAsciiTree(text) {
  return text.replace(/\|--/g, '├── ').replace(/\+--/g, '├── ')
    .replace(/`--/g, '└── ').replace(/\|  /g, '│   ');
}

// ── Banner helpers ────────────────────────────────────────────────────────────
function showBanner(text) {
  const banner = document.getElementById('vn-inject-banner');
  const textEl = document.getElementById('vn-inject-text');
  if (banner && textEl) { textEl.textContent = text.slice(0, 180); banner.classList.add('vn-show'); }
}

function hideBanner() {
  document.getElementById('vn-inject-banner')?.classList.remove('vn-show');
  suggestedPrompt = null;
}

function doInject() {
  const text = suggestedPrompt || document.getElementById('vn-inject-text')?.textContent;
  if (!text) return;
  const result = injectIntoPage(text);
  hideBanner(); suggestedPrompt = null;
  if (result === false) { setStatus('red', 'no input found'); showWarn('No writable input found on this page'); }
  else setStatus('green', result === 'clipboard' ? 'copied to clipboard' : 'injected ↗');
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
    } catch { continue; }
  }
  try { navigator.clipboard.writeText(text); return 'clipboard'; } catch { return false; }
}

// ── History drawer ────────────────────────────────────────────────────────────
function openDrawer() {
  document.getElementById('vn-history-drawer')?.classList.add('vn-open');
  renderHistory();
}

function closeDrawer() {
  document.getElementById('vn-history-drawer')?.classList.remove('vn-open');
}

function newChat() {
  convo     = [];
  // Generate a new session UUID
  import('../storage.js').then(({ resetSession, getSessionId }) => {
    resetSession();
    sessionId = getSessionId();
    updateSessionLabel();
  });

  const convoEl = document.getElementById('vn-convo');
  if (convoEl) convoEl.innerHTML = `
    <div class="vn-msg vn-msg-agent">
      <div class="vn-msg-label">NExY</div>
      <span>Ask me anything about this page...</span>
    </div>`;

  closeDrawer();
}

function saveSession(messages) {
  if (!messages || messages.length === 0) return;
  try {
    const sessions = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const idx      = sessions.findIndex((s) => s.id === sessionId);
    const preview  = messages.find((m) => m.role === 'user')?.content?.slice(0, 60) || 'Chat';
    const entry    = { id: sessionId, ts: new Date().toLocaleTimeString(), preview, messages: messages.slice() };
    if (idx >= 0) sessions[idx] = entry;
    else sessions.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessions.slice(0, 20)));
  } catch {}
}

function renderHistory() {
  const list = document.getElementById('vn-history-list');
  if (!list) return;
  try {
    const sessions = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (sessions.length === 0) {
      list.innerHTML = `<div class="vn-history-empty">No sessions yet</div>`;
      return;
    }
    list.innerHTML = sessions.map((s) => `
      <div class="vn-history-item" data-id="${s.id}">
        <div class="vn-history-preview">${escapeHtml(s.preview)}</div>
        <div class="vn-history-meta">${s.messages.length} msgs · ${s.ts}</div>
      </div>
    `).join('');
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

    const convoEl = document.getElementById('vn-convo');
    if (!convoEl) return;
    convoEl.innerHTML = '';
    convo.forEach((msg) => addBubble(msg.role === 'user' ? 'user' : 'agent', msg.content));

    closeDrawer();
  } catch {}
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
