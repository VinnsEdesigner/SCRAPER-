/**
 * @file mini-agent.js
 * @location /scraper/src/mini-agent.js
 *
 * CHANGES FROM PREVIOUS VERSION:
 *   → 401 handler now tries /api/auth/refresh before giving up
 *     If refresh succeeds: updates stored token + retries the original request
 *     If refresh fails: shows "PIN required" with inline PIN form instead of dead error
 *   → Snippet injection made context-aware:
 *     Only sends snippets to backend when message is snippet-relevant
 *     Prevents the "you have 10 images" context block polluting every message
 */

import { getToken, setToken } from './storage.js';
import { readPage }           from './dom-reader.js';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND = __BACKEND_URL__;

const MAX_HISTORY_TURNS    = 10;
const MAX_SNIPPET_TEXT_LEN = 2000;
const MAX_URL_LEN          = 2048;
const LITE_TIMEOUT_MS      = 30_000;
const ESCALATE_TIMEOUT_MS  = 60_000;
const MAX_SNIPPETS_PER_REQ = 20;

// Keywords that indicate user is talking ABOUT snippets/captures
// If message doesn't match → don't inject snippets (prevents constant repetition)
const SNIPPET_RELEVANT = /snippet|image|photo|picture|capture|staged|research|forbes|vision|analyze|analyse|see the|look at the|what('s| is) in the (snippet|research|image)/i;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isBase64(str) {
  return typeof str === 'string' && str.trimStart().startsWith('data:');
}

function sanitizeSnippetText(snippet) {
  const raw = typeof snippet.text === 'string' ? snippet.text : '';
  if (isBase64(raw)) {
    if (snippet.type === 'image' && typeof snippet.url === 'string') return snippet.url.slice(0, MAX_URL_LEN);
    return '';
  }
  return raw.slice(0, MAX_SNIPPET_TEXT_LEN);
}

function buildSnippetPayload(snippet) {
  if (!snippet || typeof snippet !== 'object') return null;
  const validTypes = new Set(['code', 'research', 'image', 'file']);
  if (!validTypes.has(snippet.type)) return null;
  const text = sanitizeSnippetText(snippet);
  if (!text && snippet.type !== 'image') return null;
  if (!text && snippet.type === 'image' && !snippet.url) return null;
  return { type: snippet.type, text: text || snippet.url || '' };
}

function buildSnippetsArray(snippets) {
  if (!Array.isArray(snippets) || !snippets.length) return [];
  return snippets.slice(0, MAX_SNIPPETS_PER_REQ).map(buildSnippetPayload).filter(Boolean);
}

function buildHistoryArray(history) {
  if (!Array.isArray(history) || !history.length) return [];
  const validRoles = new Set(['user', 'assistant', 'system']);
  return history
    .filter((m) => m && validRoles.has(m.role) && m.content)
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));
}

export function buildPageContext() {
  try { return readPage(); } catch {
    return { url: window?.location?.href || '', title: document?.title || '', content: '' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TOKEN REFRESH
// Tries to get a new JWT from /api/auth/refresh using the existing token.
// Returns new token string or null on failure.
// ─────────────────────────────────────────────────────────────────────────────

async function tryRefreshToken(oldToken) {
  if (!oldToken) return null;
  try {
    const res = await fetch(`${BACKEND}/api/auth/refresh`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${oldToken}` },
      signal:  AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      console.log('[VENOM mini-agent] Token refreshed successfully');
      return data.token;
    }
    return null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PIN RE-AUTH (inline in HUD when refresh fails)
// Shows a PIN prompt in the agent convo area to re-authenticate without
// leaving the current page.
// ─────────────────────────────────────────────────────────────────────────────

function showPinPrompt() {
  const convoEl = document.getElementById('vn-convo');
  if (!convoEl) return;

  // Remove any existing PIN prompt
  document.getElementById('vn-pin-prompt')?.remove();

  const promptEl = document.createElement('div');
  promptEl.id = 'vn-pin-prompt';
  promptEl.className = 'vn-msg vn-msg-agent';
  promptEl.innerHTML = `
    <div class="vn-msg-label">NExY · AUTH REQUIRED</div>
    <span>Session expired. Enter your PIN to continue:</span>
    <div style="display:flex;gap:8px;margin-top:8px;">
      <input type="password" id="vn-pin-input" placeholder="Enter PIN"
        style="flex:1;background:var(--vn-bg3);border:1px solid var(--vn-border2);
               border-radius:5px;color:var(--vn-text);padding:7px 10px;
               font-family:var(--vn-mono);font-size:13px;outline:none;" />
      <button id="vn-pin-submit"
        style="background:var(--vn-red);border:none;color:#fff;
               border-radius:5px;padding:7px 14px;cursor:pointer;
               font-family:var(--vn-mono);font-size:12px;">
        Login
      </button>
    </div>
    <div id="vn-pin-error" style="font-size:11px;color:var(--vn-red);margin-top:4px;display:none;">
      Wrong PIN — try again
    </div>
  `;
  convoEl.appendChild(promptEl);
  convoEl.scrollTop = convoEl.scrollHeight;

  const input     = promptEl.querySelector('#vn-pin-input');
  const submitBtn = promptEl.querySelector('#vn-pin-submit');
  const errEl     = promptEl.querySelector('#vn-pin-error');

  const doLogin = async () => {
    const pin = input.value.trim();
    if (!pin) return;

    submitBtn.disabled   = true;
    submitBtn.textContent = '...';
    errEl.style.display  = 'none';

    try {
      const res = await fetch(`${BACKEND}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ pin }),
        signal:  AbortSignal.timeout(10_000),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        promptEl.remove();
        // Re-focus the input so user can continue
        document.getElementById('vn-agent-input')?.focus();
        // Show success in convo
        const ok = document.createElement('div');
        ok.className = 'vn-msg vn-msg-agent';
        ok.innerHTML = `<div class="vn-msg-label">NExY</div><span>✅ Back online — go ahead</span>`;
        convoEl.appendChild(ok);
        convoEl.scrollTop = convoEl.scrollHeight;
      } else {
        errEl.style.display  = 'block';
        submitBtn.disabled   = false;
        submitBtn.textContent = 'Login';
        input.select();
      }
    } catch {
      errEl.textContent    = 'Server unreachable — check connection';
      errEl.style.display  = 'block';
      submitBtn.disabled   = false;
      submitBtn.textContent = 'Login';
    }
  };

  submitBtn.addEventListener('click', doLogin);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
  setTimeout(() => input.focus(), 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE INJECTION
// ─────────────────────────────────────────────────────────────────────────────

export function injectIntoPage(text) {
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

// ─────────────────────────────────────────────────────────────────────────────
// ESCALATION
// ─────────────────────────────────────────────────────────────────────────────

async function escalateToAgent(message, snippets, pageContext, token, history, sessionId) {
  try {
    const res = await fetch(`${BACKEND}/api/agent`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body:    JSON.stringify({
        message, pageContext, context: 'bookmarklet', stream: false,
        history:   buildHistoryArray(history),
        snippets:  buildSnippetsArray(snippets),
        sessionId: sessionId || null,
      }),
      signal: AbortSignal.timeout(ESCALATE_TIMEOUT_MS),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.message || `Full agent error (${res.status})`, escalated: true };
    return { reply: data.reply || '', model: data.model || 'agent', escalated: true, tools_used: data.tools_used || [], searched: false };
  } catch (err) {
    const isTimeout = err.name === 'TimeoutError' || err.name === 'AbortError';
    return { error: isTimeout ? 'Full agent timed out' : 'Full agent unreachable', escalated: true };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LITE AGENT — MAIN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {string}        message
 * @param {Snippet[]}     snippets       - all staged snippets
 * @param {HistoryTurn[]} history        - prior turns (excludes current message)
 * @param {Object}        [options]
 * @param {string}        [options.sessionId]
 * @param {string}        [options.preferredModel]
 */
export async function askLiteAgent(message, snippets = [], history = [], options = {}) {
  const { sessionId = null, preferredModel = null } = options;

  let token = getToken();
  if (!token) {
    showPinPrompt();
    return { error: null }; // suppress error — PIN prompt shown instead
  }

  if (!message?.trim()) return { error: 'Message is required' };

  const cleanMessage = message.trim();
  const pageContext  = buildPageContext();

  // SNIPPET INJECTION FIX:
  // Only send snippets when the message is actually ABOUT them.
  // This prevents the agent from talking about Forbes images when
  // the user asks about something completely different.
  const snippetsToSend = SNIPPET_RELEVANT.test(cleanMessage)
    ? buildSnippetsArray(snippets)
    : [];

  const body = {
    message:        cleanMessage,
    pageContext,
    history:        buildHistoryArray(history),
    snippets:       snippetsToSend,
    sessionId:      sessionId  || null,
    preferredModel: preferredModel || null,
  };

  const doRequest = async (authToken) => {
    return fetch(`${BACKEND}/api/lite-agent`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
      body:    JSON.stringify(body),
      signal:  AbortSignal.timeout(LITE_TIMEOUT_MS),
    });
  };

  let response, data;

  try {
    response = await doRequest(token);
    data     = await response.json();
  } catch (err) {
    const isTimeout = err.name === 'TimeoutError' || err.name === 'AbortError';
    return { error: isTimeout ? 'Lite agent timed out — check connection' : 'Backend unreachable — check connection' };
  }

  // ── 401 handling: try refresh then retry ────────────────────────────────
  if (response.status === 401) {
    const newToken = await tryRefreshToken(token);
    if (newToken) {
      // Retry with fresh token
      try {
        response = await doRequest(newToken);
        data     = await response.json();
      } catch {
        showPinPrompt();
        return { error: null };
      }
      // If still 401 after refresh → need re-login
      if (response.status === 401) {
        showPinPrompt();
        return { error: null };
      }
    } else {
      // Refresh failed → show PIN prompt
      showPinPrompt();
      return { error: null };
    }
  }

  if (!response.ok) {
    if (response.status === 503) return { error: 'All AI providers unavailable — try again shortly' };
    if (response.status === 429) return { error: data.message || 'Rate limit — try again in a moment' };
    return { error: data.message || `Request failed (${response.status})` };
  }

  if (data.escalate === true) {
    return escalateToAgent(cleanMessage, snippets, pageContext, token, history, sessionId);
  }

  return {
    reply:      data.reply      || '',
    model:      data.model      || 'lite',
    escalated:  false,
    tools_used: data.tools_used || [],
    searched:   data.searched   || false,
  };
}
