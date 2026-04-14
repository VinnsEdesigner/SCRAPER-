// ask.js — AGENT tab v5: fuzzy slash commands + snippet-aware context

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets, getSessionId } from '../storage.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

// ── State ─────────────────────────────────────────────────────────────────────
let convo           = [];
let suggestedPrompt = null;
let sessionId       = getSessionId();
let pinnedModel     = null;

const HISTORY_KEY = 'vn_chat_sessions';

// All valid slash commands
const SLASH_COMMANDS = {
  model:    '/model <name|reset|?>  — pin a model (groq, devstral, mistral, gemini)',
  clear:    '/clear                 — wipe conversation',
  page:     '/page                  — capture page text → research snippet',
  images:   '/images                — capture all images on page',
  sync:     '/sync                  — sync snippets to backend',
  snippets: '/snippets              — open snippets tab',
  help:     '/help                  — list all commands',
};

const NO_ARG_CMDS  = new Set(['clear','page','images','sync','snippets','help']);
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
        <span>Anything buddy😏.. (type / for commands)</span>
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
        <textarea class="vn-input" id="vn-agent-input" placeholder="ask anything — / for commands" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">↑</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `;

  bindAgentEvents();
  renderHistory();
  updateSessionLabel();
}

// ── Events ─────────────────────────────────────────────────────────────────────
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
    if (input.value.startsWith('/')) renderSlashPopup(input.value);
    else hideSlashPopup();
  });

  // Hide popup clicking outside the bottom area
  document.addEventListener('click', (e) => {
    const ba = document.getElementById('vn-bottom-area');
    if (ba && !ba.contains(e.target)) hideSlashPopup();
  });
}

// ── Slash popup ───────────────────────────────────────────────────────────────

/**
 * Fuzzy slash command matching.
 * "/model_grog" → matches "model" (startsWith)
 * "/pageforbes" → matches "page" (startsWith)
 * "/m" → shows model, etc.
 */
function fuzzyMatchCmd(typed) {
  if (!typed) return Object.keys(SLASH_COMMANDS);
  const lower = typed.toLowerCase();
  // Strip underscores/hyphens from typed for fuzzy match
  const clean = lower.replace(/[_\-]/g, '');
  return Object.keys(SLASH_COMMANDS).filter((cmd) =>
    cmd.startsWith(lower) || cmd.startsWith(clean) || lower.startsWith(cmd)
  );
}

function renderSlashPopup(val) {
  const popup = document.getElementById('vn-slash-popup');
  const list  = document.getElementById('vn-slash-list');
  if (!popup || !list) return;

  // Extract typed command — everything after / up to first space
  const afterSlash = val.slice(1);
  const spaceIdx   = afterSlash.indexOf(' ');
  const typed      = spaceIdx === -1 ? afterSlash : afterSlash.slice(0, spaceIdx);

  const matches = fuzzyMatchCmd(typed);
  if (!matches.length) { hideSlashPopup(); return; }

  list.innerHTML = matches.map((cmd) => `
    <div class="vn-slash-item" data-cmd="/${cmd}">
      <span class="vn-slash-cmd">${SLASH_COMMANDS[cmd]}</span>
    </div>
  `).join('');

  list.querySelectorAll('.vn-slash-item').forEach((item) => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const inp = document.getElementById('vn-agent-input');
      if (inp) {
        const noArg = NO_ARG_CMDS.has(item.dataset.cmd.slice(1));
        inp.value = item.dataset.cmd + (noArg ? '' : ' ');
        inp.focus();
        // Move cursor to end
        inp.selectionStart = inp.selectionEnd = inp.value.length;
      }
      hideSlashPopup();
    });
  });

  popup.style.display = 'block';
}

function hideSlashPopup() {
  const p = document.getElementById('vn-slash-popup');
  if (p) p.style.display = 'none';
}

// ── Slash command handler ─────────────────────────────────────────────────────

/**
 * Parse a slash command from raw input.
 * Handles: /model_grog → /model groq (underscore tolerance)
 *          /pageforbes → /page (prefix match)
 *          /model groq → /model groq (normal)
 *
 * Returns true if command consumed, false if falls through.
 */
function handleSlashCommand(raw) {
  const trimmed = raw.trim();

  // Extract everything after /
  const afterSlash = trimmed.slice(1);
  const spaceIdx   = afterSlash.indexOf(' ');
  const rawCmd     = spaceIdx === -1 ? afterSlash : afterSlash.slice(0, spaceIdx);
  const rawArg     = spaceIdx === -1 ? '' : afterSlash.slice(spaceIdx + 1).trim();

  // Fuzzy resolve command: /model_grog → cmd="model", leftover="grog"
  const matches = fuzzyMatchCmd(rawCmd.toLowerCase());
  if (!matches.length) return false; // unknown → send as normal message

  const cmd = matches[0]; // use best match

  // For commands with args embedded in rawCmd (like /modelgrog or /model_grog)
  // extract the leftover as the arg if no space was found
  let arg = rawArg;
  if (!arg && rawCmd.length > cmd.length) {
    // There was extra text after the command name fused together
    const leftover = rawCmd.slice(cmd.length).replace(/^[_\-\s]+/, '');
    if (leftover) arg = leftover;
  }

  switch (cmd) {
    case 'model': {
      if (!arg || arg === '?') {
        addBubble('agent', `📍 Pinned model: **${pinnedModel || 'auto (modelRouter)'}**\nAliases: ${MODEL_ALIASES.join(', ')}`);
        return true;
      }
      if (arg === 'reset') {
        pinnedModel = null; updateModelPill();
        addBubble('agent', '🔄 Model back to auto — modelRouter decides');
        return true;
      }
      // Fuzzy match model alias: "grog" → "groq", "devstr" → "devstral"
      const found = MODEL_ALIASES.find((a) => a.startsWith(arg.toLowerCase()) || arg.toLowerCase().startsWith(a.slice(0, 3)));
      if (found && found !== 'reset') {
        pinnedModel = found; updateModelPill();
        addBubble('agent', `📌 Model pinned: **${pinnedModel}** — all requests this session`);
        return true;
      }
      addBubble('agent', `❓ Unknown model alias: "${arg}"\nValid: ${MODEL_ALIASES.filter((a) => a !== 'reset').join(', ')}`);
      return true;
    }

    case 'clear': {
      convo = [];
      const el = document.getElementById('vn-convo');
      if (el) el.innerHTML = `<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>🧹 Cleared</span></div>`;
      return true;
    }

    case 'page': {
      import('../dom-reader.js').then(({ readPage }) => {
        const page = readPage();
        import('../storage.js').then(({ addSnippet }) => {
          addSnippet({ text: page.content, type: 'research', url: page.url, title: page.title });
          import('./snippets.js').then(({ renderSnippets }) => renderSnippets()).catch(() => {});
          addBubble('agent', `📄 Page captured → research snippet (${page.content.length} chars from ${page.title || page.url})`);
        });
      }).catch(() => addBubble('agent', '⚠ Could not read page content'));
      return true;
    }

    case 'images': {
      const imgs = Array.from(document.images)
        .filter((img) => img.naturalWidth > 100 && img.src && !img.src.startsWith('data:'))
        .slice(0, 10);
      if (!imgs.length) { addBubble('agent', '🖼️ No suitable images found on this page'); return true; }
      import('../storage.js').then(({ addSnippet }) => {
        imgs.forEach((img) => addSnippet({ text: img.src, type: 'image', url: img.src, title: img.alt || 'image' }));
        import('./snippets.js').then(({ renderSnippets }) => renderSnippets()).catch(() => {});
        addBubble('agent', `🖼️ Captured ${imgs.length} image${imgs.length > 1 ? 's' : ''} as snippets`);
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
      const lines = Object.values(SLASH_COMMANDS).join('\n');
      addBubble('agent', `**Slash commands:**\n${lines}`);
      return true;
    }

    default:
      return false;
  }
}

// ── Model pill ────────────────────────────────────────────────────────────────
function updateModelPill() {
  const pill = document.getElementById('vn-model-pill');
  if (!pill) return;
  if (pinnedModel) { pill.textContent = `📌 ${pinnedModel}`; pill.style.display = 'inline-block'; }
  else             { pill.style.display = 'none'; }
}

function updateSessionLabel() {
  const lbl = document.getElementById('vn-session-label');
  if (lbl) lbl.textContent = sessionId.slice(0, 8).toUpperCase();
}

// ── Send message ──────────────────────────────────────────────────────────────
async function sendMessage() {
  const input = document.getElementById('vn-agent-input');
  const msg   = input?.value?.trim();
  if (!msg) return;

  hideSlashPopup();

  // Slash command check — only when starts with /
  if (msg.startsWith('/')) {
    const handled = handleSlashCommand(msg);
    if (handled) { input.value = ''; return; }
    // Unknown /xyz → falls through to normal send
  }

  // History snapshot = prior turns only (excludes current)
  // User message pushed BEFORE sending so it's in local state
  const historySnapshot = convo.slice();
  convo.push({ role: 'user', content: msg });

  addBubble('user', msg);
  input.value = '';
  setStatus('amber', 'thinking...');
  setBadge('model', 'thinking...', 'warn');

  const result = await askLiteAgent(msg, getSnippets(), historySnapshot, {
    sessionId:      String(sessionId),
    preferredModel: pinnedModel || null,
  });

  // If null error (PIN prompt shown), bail silently
  if (result.error === null) {
    convo.pop(); // remove the user message we pushed
    setBadge('model', 'idle', '');
    setStatus('green', 'ready');
    return;
  }

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

  const toolLabel = tools_used?.length
    ? `${model || 'lite'} · 🔧 ${tools_used.join(', ')}`
    : (model || 'lite');

  addBubble('agent', reply, toolLabel);
  setStatus('green', escalated ? 'done (escalated)' : 'done');
  setBadge('model', model || 'lite', 'active');
  saveSession(convo);
}

// ── Suggest ────────────────────────────────────────────────────────────────────
async function generateSuggest() {
  setStatus('amber', 'generating...');
  const result = await askLiteAgent(
    'Based on this page, suggest one concise prompt I can ask my AI assistant. Reply with ONLY the prompt, nothing else.',
    getSnippets(), convo,
    { sessionId: String(sessionId), preferredModel: pinnedModel || null }
  );
  if (result.error === null) { setStatus('green', 'ready'); return; }
  if (result.error || !result.reply) { setStatus('red', 'failed'); showWarn('Suggestion failed: ' + (result.error || 'empty')); return; }
  suggestedPrompt = result.reply;
  showBanner(result.reply);
  setStatus('green', 'ready to inject');
}

// ── Bubble ─────────────────────────────────────────────────────────────────────
function addBubble(type, text, model) {
  const convoEl = document.getElementById('vn-convo');
  if (!convoEl) return;
  const msgEl  = document.createElement('div');
  msgEl.className = `vn-msg vn-msg-${type}`;
  const label = document.createElement('div');
  label.className = 'vn-msg-label';
  label.textContent = type === 'user' ? 'YOU' : (model ? `NExY · ${model}` : 'NExY');
  msgEl.appendChild(label);
  parseContent(text).forEach((n) => msgEl.appendChild(n));
  convoEl.appendChild(msgEl);
  convoEl.scrollTop = convoEl.scrollHeight;
}

// ── Content parser ────────────────────────────────────────────────────────────
function parseContent(text) {
  const nodes = [];
  text.split(/(```[\s\S]*?```)/g).forEach((part) => {
    if (part.startsWith('```')) {
      const inner = part.slice(3, -3);
      const nl    = inner.indexOf('\n');
      const hint  = nl >= 0 ? inner.slice(0, nl).trim() : '';
      const code  = nl >= 0 ? inner.slice(nl + 1).trim() : inner.trim();
      nodes.push(buildCodeBlock(hint, code));
    } else if (part.trim().split('\n').filter((l) => /[├└│─]/.test(l)).length >= 2) {
      const pre = document.createElement('pre');
      pre.className  = 'vn-ascii-block';
      pre.textContent = part.trim().replace(/\|--/g,'├── ').replace(/\+--/g,'├── ').replace(/`--/g,'└── ').replace(/\|  /g,'│   ');
      nodes.push(pre);
    } else if (part.trim()) {
      const span = document.createElement('span');
      span.textContent  = part;
      span.style.whiteSpace = 'pre-wrap';
      nodes.push(span);
    }
  });
  return nodes;
}

function buildCodeBlock(hint, code) {
  const lang    = detectLang(hint, code);
  const wrapper = document.createElement('div');
  wrapper.className = 'vn-code-block';
  wrapper.innerHTML = `
    <div class="vn-code-header">
      <span class="vn-code-lang">#${lang}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${syntaxHighlight(code, lang)}</div>`;
  wrapper.querySelector('.vn-code-copy').onclick = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    const b = wrapper.querySelector('.vn-code-copy');
    b.textContent = 'copied!';
    setTimeout(() => { if (b) b.textContent = 'copy'; }, 1500);
  };
  return wrapper;
}

function syntaxHighlight(code, lang) {
  let e = escapeHtml(code);
  getRules(lang).forEach(([p, c]) => { e = e.replace(p, (m) => `<span class="sh-${c}">${m}</span>`); });
  return e;
}

function getRules(lang) {
  const s = [/(&quot;|&#x27;)(.*?)(\1)/g,'str'], n = [/\b\d+\.?\d*\b/g,'num'], k2 = [/\b(true|false|null|undefined)\b/g,'kw2'];
  if (['js','ts','jsx','tsx'].includes(lang)) return [[/\/\/[^\n]*/g,'cmt'],s,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|throw|try|catch|switch|case|break|continue|default)\b/g,'kw'],k2,n,[/\b[A-Z][a-zA-Z0-9_]*\b/g,'cls'],[/\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g,'fn']];
  if (['py','python'].includes(lang)) return [[/#[^\n]*/g,'cmt'],s,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|try|except|finally|raise|lambda|pass|yield)\b/g,'kw'],k2,n];
  if (['sh','bash'].includes(lang)) return [[/#[^\n]*/g,'cmt'],s,[/\b(if|then|else|fi|for|do|done|echo|cd|ls|rm|git|npm|node)\b/g,'kw'],[/\$[a-zA-Z_]\w*/g,'var'],n];
  if (lang==='json') return [s,k2,n];
  if (lang==='css')  return [[/\/\*[\s\S]*?\*\//g,'cmt'],s,[/[a-zA-Z-]+\s*:/g,'kw'],n];
  if (lang==='html') return [[/&lt;!--[\s\S]*?--&gt;/g,'cmt'],[/&lt;\/?[a-zA-Z][a-zA-Z0-9-]*/g,'kw'],s];
  return [s,n,k2];
}

function detectLang(hint, code) {
  const h = (hint||'').toLowerCase().trim();
  const m = {js:'js',javascript:'js',jsx:'jsx',ts:'ts',typescript:'ts',tsx:'tsx',py:'py',python:'py',sh:'sh',bash:'sh',shell:'sh',json:'json',css:'css',html:'html'};
  if (m[h]) return m[h];
  if (/(def |from .* import|elif |print\()/m.test(code)) return 'py';
  if (/(const |let |var |function |=>|require\()/m.test(code)) return 'js';
  if (/(#!\/bin\/|echo |grep |npm )/m.test(code)) return 'sh';
  return h || 'code';
}

// ── Banner ─────────────────────────────────────────────────────────────────────
function showBanner(text) {
  const b = document.getElementById('vn-inject-banner');
  const t = document.getElementById('vn-inject-text');
  if (b && t) { t.textContent = text.slice(0, 180); b.classList.add('vn-show'); }
}
function hideBanner() { document.getElementById('vn-inject-banner')?.classList.remove('vn-show'); suggestedPrompt = null; }
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
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') { el.focus(); el.value = text; el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return true; }
      if (el.contentEditable === 'true') { el.focus(); document.execCommand('selectAll',false,null); document.execCommand('insertText',false,text); return true; }
    } catch {}
  }
  try { navigator.clipboard.writeText(text); return 'clipboard'; } catch { return false; }
}

// ── History drawer ────────────────────────────────────────────────────────────
function openDrawer()  { document.getElementById('vn-history-drawer')?.classList.add('vn-open'); renderHistory(); }
function closeDrawer() { document.getElementById('vn-history-drawer')?.classList.remove('vn-open'); }

function newChat() {
  convo = [];
  import('../storage.js').then(({ resetSession, getSessionId: gsi }) => {
    resetSession(); sessionId = gsi(); updateSessionLabel();
  }).catch(() => { sessionId = crypto.randomUUID(); updateSessionLabel(); });
  const el = document.getElementById('vn-convo');
  if (el) el.innerHTML = `<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>🧹 Fresh session</span></div>`;
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
    convo = session.messages.slice(); sessionId = session.id; updateSessionLabel();
    const el = document.getElementById('vn-convo');
    if (!el) return;
    el.innerHTML = '';
    convo.forEach((m) => addBubble(m.role === 'user' ? 'user' : 'agent', m.content));
    closeDrawer();
  } catch {}
}

function escapeHtml(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}
