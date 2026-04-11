/**
 * @file mini-agent.js
 * @location /scraper/src/mini-agent.js
 *
 * @purpose
 * Bookmarklet-side agent client. Handles all communication between
 * the VENOM HUD and the backend agent endpoints.
 *
 * Responsibilities:
 *   1. askLiteAgent()     — sends user message + history to POST /api/lite-agent
 *   2. escalateToAgent()  — escalates to POST /api/agent when lite signals needed
 *   3. injectIntoPage()   — injects text into writable page inputs
 *   4. handleEscalation() — decides escalation based on response flags
 *   5. buildPageContext() — assembles current page context for backend
 *   6. buildSnippetPayload() — sanitizes snippets before sending
 *
 * Conversation history contract:
 *   - History is passed in from hud/ask.js (maintained per-session in localStorage)
 *   - max 10 turns trimmed here before sending
 *   - Each turn: { role: 'user'|'assistant', content: string }
 *   - Backend (scraper-agent.js) also persists turns to Supabase for full memory
 *
 * LAW 22 enforcement:
 *   - Image snippets: only URL sent, never base64
 *   - isBase64() guard on all snippet text fields
 *   - base64 stripped silently + warning logged
 *
 * Escalation logic:
 *   - Lite agent returns { escalate: true } when task requires full tools
 *   - escalateToAgent() fires POST /api/agent with full context
 *   - Escalation is transparent to the user — same reply shape returned
 *
 * @exports
 *   askLiteAgent(message, snippets, history)   → Promise<AgentResult>
 *   injectIntoPage(text)                        → boolean | 'clipboard'
 *   buildPageContext()                          → PageContext
 *
 * @imports
 *   ./storage    → getToken
 *   ./dom-reader → readPage
 *
 * @env-vars
 *   __BACKEND_URL__ — replaced at build time by esbuild define
 */

import { getToken }  from './storage.js';
import { readPage }  from './dom-reader.js';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const BACKEND = __BACKEND_URL__;   // replaced at build time

/** Max conversation turns sent to backend — keeps token usage bounded */
const MAX_HISTORY_TURNS      = 10;

/** Max snippet text length per snippet — matches SCRAPER.MAX_SNIPPET_LENGTH */
const MAX_SNIPPET_TEXT_LEN   = 2000;

/** Max URL length for image snippet content */
const MAX_URL_LEN            = 2048;

/** Request timeout for lite agent (ms) */
const LITE_TIMEOUT_MS        = 30_000;

/** Request timeout for full agent escalation (ms) */
const ESCALATE_TIMEOUT_MS    = 60_000;

/** Max snippets sent per request — matches SCRAPER.MAX_SNIPPETS_COUNT */
const MAX_SNIPPETS_PER_REQ   = 20;

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS (JSDoc only — esbuild strips these)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} PageContext
 * @property {string} url     - current page URL
 * @property {string} title   - current page title
 * @property {string} content - extracted DOM text (max 5000 chars)
 */

/**
 * @typedef {Object} Snippet
 * @property {string} type    - 'code'|'research'|'image'|'file'
 * @property {string} text    - text content or URL (image type)
 * @property {string} [url]   - source URL
 * @property {string} [mime_type] - MIME type (image type only)
 */

/**
 * @typedef {Object} HistoryTurn
 * @property {'user'|'assistant'} role
 * @property {string}             content
 */

/**
 * @typedef {Object} AgentResult
 * @property {string}   [reply]     - agent response text
 * @property {string}   [model]     - model string used
 * @property {boolean}  [escalated] - whether lite escalated to full agent
 * @property {string[]} [tools_used]
 * @property {boolean}  [searched]
 * @property {string}   [error]     - error message if failed
 */

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect if a string is base64 image data.
 * LAW 22 — base64 must never be sent to backend.
 *
 * @param {string} str
 * @returns {boolean}
 */
function isBase64(str) {
  if (!str || typeof str !== 'string') return false;
  return str.trimStart().startsWith('data:');
}

/**
 * Sanitize a snippet text field before sending.
 * Strips base64 (LAW 22), truncates to MAX_SNIPPET_TEXT_LEN.
 * Image snippets use URL as content — not binary data.
 *
 * @param {Snippet} snippet
 * @returns {string} sanitized text
 */
function sanitizeSnippetText(snippet) {
  const raw = typeof snippet.text === 'string' ? snippet.text : '';

  // LAW 22 — strip base64, never send to backend
  if (isBase64(raw)) {
    console.warn('[VENOM mini-agent] base64 stripped from snippet before send', {
      type:   snippet.type,
    });

    // Image fallback: use URL if available
    if (snippet.type === 'image' && typeof snippet.url === 'string') {
      return snippet.url.slice(0, MAX_URL_LEN);
    }

    return ''; // no safe fallback
  }

  return raw.slice(0, MAX_SNIPPET_TEXT_LEN);
}

/**
 * Build a sanitized snippet payload for the backend.
 * Matches the shape expected by api/lite-agent.js.
 *
 * @param {Snippet} snippet
 * @returns {{ type: string, text: string } | null}
 */
function buildSnippetPayload(snippet) {
  if (!snippet || typeof snippet !== 'object') return null;

  const validTypes = new Set(['code', 'research', 'image', 'file']);
  if (!validTypes.has(snippet.type)) return null;

  const text = sanitizeSnippetText(snippet);

  // Skip empty snippets (except image which might have URL-only content)
  if (!text && snippet.type !== 'image') return null;
  if (!text && snippet.type === 'image' && !snippet.url) return null;

  return {
    type: snippet.type,
    text: text || snippet.url || '',
  };
}

/**
 * Build sanitized snippets array for request body.
 * Filters invalid snippets, limits count.
 *
 * @param {Snippet[]} snippets
 * @returns {{ type: string, text: string }[]}
 */
function buildSnippetsArray(snippets) {
  if (!Array.isArray(snippets) || snippets.length === 0) return [];

  return snippets
    .slice(0, MAX_SNIPPETS_PER_REQ)
    .map(buildSnippetPayload)
    .filter(Boolean);
}

/**
 * Build sanitized conversation history for request body.
 * Limits to MAX_HISTORY_TURNS, validates role + content.
 *
 * @param {HistoryTurn[]} history
 * @returns {{ role: string, content: string }[]}
 */
function buildHistoryArray(history) {
  if (!Array.isArray(history) || history.length === 0) return [];

  const validRoles = new Set(['user', 'assistant', 'system']);

  return history
    .filter((m) => m && validRoles.has(m.role) && m.content)
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({
      role:    m.role,
      content: String(m.content).slice(0, 1000),
    }));
}

/**
 * Get auth token or return null if not set.
 * Avoids calling getToken() multiple times in one function.
 *
 * @returns {string | null}
 */
function getAuthToken() {
  return getToken() || null;
}

/**
 * Build current page context.
 * Wraps dom-reader.readPage() with safe fallbacks.
 *
 * @returns {PageContext}
 */
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

/**
 * Inject text into the first writable input found on the page.
 *
 * Selector priority:
 *   1. textarea (not disabled/readonly)
 *   2. div[contenteditable="true"]
 *   3. input[type="text"] (not disabled)
 *   4. [role="textbox"]
 *
 * Fallback: copy to clipboard if no input found.
 *
 * @param {string} text
 * @returns {boolean | 'clipboard'} true = injected, 'clipboard' = copied, false = failed
 */
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
        // Trigger React/Vue synthetic events
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }

      if (el.contentEditable === 'true') {
        el.focus();
        // execCommand is deprecated but still the most reliable cross-browser method
        // for contenteditable injection — no viable alternative on Android Chrome
        document.execCommand('selectAll',   false, null);
        document.execCommand('insertText',  false, text);
        return true;
      }
    } catch (err) {
      console.warn('[VENOM mini-agent] Injection failed for selector', selector, err.message);
      continue;
    }
  }

  // Fallback: clipboard
  try {
    navigator.clipboard.writeText(text);
    return 'clipboard';
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ESCALATION TO FULL AGENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Escalate a request to the full agent (POST /api/agent).
 * Called when lite agent returns { escalate: true }.
 *
 * Full agent has access to all dashboard tools — file writes,
 * GitHub ops, multi-step tasks, etc. Bookmarklet context is passed
 * via the context flag so toolInjector still enforces read-only mode
 * for write tools.
 *
 * @param {string}      message
 * @param {Snippet[]}   snippets
 * @param {PageContext} pageContext
 * @param {string}      token
 * @param {HistoryTurn[]} history
 * @returns {Promise<AgentResult>}
 */
async function escalateToAgent(message, snippets, pageContext, token, history) {
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
        history:  buildHistoryArray(history),
        snippets: buildSnippetsArray(snippets),
        context:  'bookmarklet',   // toolInjector enforces read-only
        stream:   false,           // bookmarklet never streams
      }),
      signal: AbortSignal.timeout(ESCALATE_TIMEOUT_MS),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error:     data.message || `Full agent error (${res.status})`,
        escalated: true,
      };
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
      error:     isTimeout
        ? 'Full agent timed out — try again'
        : 'Full agent unreachable — check connection',
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
 * Handles the full request lifecycle:
 *   1. Auth check — returns error if not logged in
 *   2. Build sanitized request body
 *   3. POST /api/lite-agent
 *   4. Handle escalation if backend signals { escalate: true }
 *   5. Return normalized AgentResult
 *
 * All errors are returned as { error: string } — never thrown.
 * Callers (hud/ask.js) check result.error to determine failure.
 *
 * @param {string}        message    - current user message
 * @param {Snippet[]}     snippets   - staged snippets from storage.js
 * @param {HistoryTurn[]} history    - conversation history [{role, content}]
 * @param {Object}        [options]
 * @param {string}        [options.sessionId] - current session UUID
 * @returns {Promise<AgentResult>}
 */
export async function askLiteAgent(message, snippets = [], history = [], options = {}) {
  const { sessionId = null } = options;

  // ── Auth check ─────────────────────────────────────────────────────────────
  const token = getAuthToken();
  if (!token) {
    return {
      error: 'Not authenticated — open dashboard and login first',
    };
  }

  // ── Input validation ────────────────────────────────────────────────────────
  if (!message || typeof message !== 'string' || !message.trim()) {
    return { error: 'Message is required' };
  }

  const cleanMessage   = message.trim();
  const pageContext    = buildPageContext();
  const cleanSnippets  = buildSnippetsArray(snippets);
  const cleanHistory   = buildHistoryArray(history);

  // ── Build request body ──────────────────────────────────────────────────────
  const body = {
    message:     cleanMessage,
    pageContext,
    history:     cleanHistory,
    snippets:    cleanSnippets,
    sessionId:   sessionId || null,
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
    // 503 = all providers down
    if (response.status === 503) {
      return {
        error: 'All AI providers are currently unavailable — try again shortly',
      };
    }

    // 429 = rate limited
    if (response.status === 429) {
      const retryAfter = data.message || 'Rate limit reached — try again in a few minutes';
      return { error: retryAfter };
    }

    // 401 = auth failed
    if (response.status === 401) {
      return {
        error: 'Session expired — open dashboard and login again',
      };
    }

    return {
      error: data.message || `Request failed (${response.status})`,
    };
  }

  // ── Escalation ──────────────────────────────────────────────────────────────
  // Backend signals escalation when the task requires full agent tools.
  // e.g. "write this file to the repo" from the bookmarklet → escalated.
  if (data.escalate === true) {
    return escalateToAgent(
      cleanMessage,
      snippets,       // raw snippets — escalateToAgent sanitizes them
      pageContext,
      token,
      history
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  return {
    reply:      data.reply     || '',
    model:      data.model     || 'lite',
    escalated:  false,
    tools_used: data.tools_used || [],
    searched:   data.searched   || false,
  };
}
