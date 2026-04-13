/**
 * @file mini-agent.js
 * @location /scraper/src/mini-agent.js
 *
 * @purpose
 * Bookmarklet-side agent client.
 *
 * KEY CHANGES FROM PREVIOUS VERSION:
 *   → askLiteAgent() now accepts options.sessionId and options.preferredModel
 *     and forwards both to the backend in the request body.
 *   → sessionId is always a real UUID from storage.js now (ask.js fixed).
 *     It was always null before because ask.js never passed it.
 *   → preferredModel from /model slash command is forwarded to backend.
 *     Backend resolvePreferredModel() maps alias → exact model string.
 *
 * @exports
 *   askLiteAgent(message, snippets, history, options) → Promise<AgentResult>
 *   injectIntoPage(text)                              → boolean | 'clipboard'
 *   buildPageContext()                                → PageContext
 */

import { getToken }  from './storage.js';
import { readPage }  from './dom-reader.js';

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

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isBase64(str) {
  if (!str || typeof str !== 'string') return false;
  return str.trimStart().startsWith('data:');
}

function sanitizeSnippetText(snippet) {
  const raw = typeof snippet.text === 'string' ? snippet.text : '';
  if (isBase64(raw)) {
    console.warn('[VENOM mini-agent] base64 stripped from snippet before send', { type: snippet.type });
    if (snippet.type === 'image' && typeof snippet.url === 'string') {
      return snippet.url.slice(0, MAX_URL_LEN);
    }
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
  if (!Array.isArray(snippets) || snippets.length === 0) return [];
  return snippets.slice(0, MAX_SNIPPETS_PER_REQ).map(buildSnippetPayload).filter(Boolean);
}

function buildHistoryArray(history) {
  if (!Array.isArray(history) || history.length === 0) return [];
  const validRoles = new Set(['user', 'assistant', 'system']);
  return history
    .filter((m) => m && validRoles.has(m.role) && m.content)
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));
}

function getAuthToken() {
  return getToken() || null;
}

export function buildPageContext() {
  try {
    return readPage();
  } catch (err) {
    console.warn('[VENOM mini-agent] buildPageContext failed', err.message);
    return {
      url:     typeof window !== 'undefined' ? window.location.href : '',
      title:   typeof document !== 'undefined' ? document.title : '',
      content: '',
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE INJECTION
// ─────────────────────────────────────────────────────────────────────────────

export function injectIntoPage(text) {
  if (!text || typeof text !== 'string') return false;

  const SELECTORS = [
    'textarea:not([disabled]):not([readonly])',
    'div[contenteditable="true"]',
    'input[type="text"]:not([disabled])',
    '[role="textbox"]',
  ];

  for (const selector of SELECTORS) {
    const el = document.querySelector(selector);
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
        document.execCommand('selectAll',  false, null);
        document.execCommand('insertText', false, text);
        return true;
      }
    } catch (err) {
      console.warn('[VENOM mini-agent] Injection failed for selector', selector, err.message);
      continue;
    }
  }

  try { navigator.clipboard.writeText(text); return 'clipboard'; } catch { return false; }
}

// ─────────────────────────────────────────────────────────────────────────────
// ESCALATION TO FULL AGENT
// ─────────────────────────────────────────────────────────────────────────────

async function escalateToAgent(message, snippets, pageContext, token, history, sessionId) {
  try {
    const res = await fetch(`${BACKEND}/api/agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        pageContext,
        history:   buildHistoryArray(history),
        snippets:  buildSnippetsArray(snippets),
        sessionId: sessionId || null,
        context:   'bookmarklet',
        stream:    false,
      }),
      signal: AbortSignal.timeout(ESCALATE_TIMEOUT_MS),
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || `Full agent error (${res.status})`, escalated: true };
    }

    return {
      reply:      data.reply || data.response || '',
      model:      data.model_used || data.model || 'agent',
      escalated:  true,
      tools_used: data.tools_used || [],
      searched:   false,
    };
  } catch (err) {
    const isTimeout = err.name === 'TimeoutError' || err.name === 'AbortError';
    return {
      error:     isTimeout ? 'Full agent timed out — try again' : 'Full agent unreachable',
      escalated: true,
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LITE AGENT — MAIN ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Send a message to the lite agent endpoint.
 *
 * @param {string}        message
 * @param {Snippet[]}     snippets
 * @param {HistoryTurn[]} history         - conversation history EXCLUDING current message
 * @param {Object}        [options]
 * @param {string}        [options.sessionId]      - real UUID from storage.js
 * @param {string}        [options.preferredModel] - pinned model from /model slash command
 * @returns {Promise<AgentResult>}
 */
export async function askLiteAgent(message, snippets = [], history = [], options = {}) {
  const {
    sessionId      = null,
    preferredModel = null,
  } = options;

  // ── Auth check ─────────────────────────────────────────────────────────────
  const token = getAuthToken();
  if (!token) {
    return { error: 'Not authenticated — open dashboard and login first' };
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return { error: 'Message is required' };
  }

  const cleanMessage  = message.trim();
  const pageContext   = buildPageContext();
  const cleanSnippets = buildSnippetsArray(snippets);
  const cleanHistory  = buildHistoryArray(history);

  // ── Build request body ──────────────────────────────────────────────────────
  const body = {
    message:        cleanMessage,
    pageContext,
    history:        cleanHistory,
    snippets:       cleanSnippets,
    sessionId:      sessionId  || null,
    preferredModel: preferredModel || null,  // BUG2 FIX: wired through
  };

  // ── Fire request ────────────────────────────────────────────────────────────
  let data;
  let response;

  try {
    response = await fetch(`${BACKEND}/api/lite-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:   JSON.stringify(body),
      signal: AbortSignal.timeout(LITE_TIMEOUT_MS),
    });

    data = await response.json();
  } catch (err) {
    const isTimeout = err.name === 'TimeoutError' || err.name === 'AbortError';
    return {
      error: isTimeout
        ? 'Lite agent timed out — check connection'
        : 'Backend unreachable — check connection',
    };
  }

  // ── Handle HTTP errors ──────────────────────────────────────────────────────
  if (!response.ok) {
    if (response.status === 503) {
      return { error: 'All AI providers are currently unavailable — try again shortly' };
    }
    if (response.status === 429) {
      return { error: data.message || 'Rate limit reached — try again in a few minutes' };
    }
    if (response.status === 401) {
      return { error: 'Session expired — open dashboard and login again' };
    }
    return { error: data.message || `Request failed (${response.status})` };
  }

  // ── Escalation ──────────────────────────────────────────────────────────────
  if (data.escalate === true) {
    return escalateToAgent(cleanMessage, snippets, pageContext, token, history, sessionId);
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  return {
    reply:      data.reply      || '',
    model:      data.model      || 'lite',
    escalated:  false,
    tools_used: data.tools_used || [],
    searched:   data.searched   || false,
  };
}
