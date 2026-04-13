/**
 * @file mini-agent.js
 * @location /SCRAPER-/src/mini-agent.js
 *
 * BUG FIXED:
 *   OLD: options = {} always from ask.js → sessionId: null every request
 *        backend gets null sessionId → loadSessionHistory(userId, null) → always []
 *        agent flies completely blind, causes hallucination on follow-up turns
 *   FIX: options.sessionId and options.preferredModel both forwarded in fetch body
 *
 * This is a thin HTTP client. All AI logic lives in backend/api/lite-agent.js.
 * This file has one job: serialize the request and deserialize the response.
 */

import { getAuthToken } from './auth.js';

const BACKEND_URL = 'https://vinnsedesigner-vinns-ai-backend.hf.space';

/**
 * Send a message to the lite agent backend.
 *
 * @param {string}   message        - user's message text
 * @param {Array}    snippets        - staged snippets [{ type, text/content }]
 * @param {Array}    history         - conversation history [{ role, content }]
 * @param {Object}   options
 * @param {string}   [options.sessionId]      - current session ID (REQUIRED for memory)
 * @param {string}   [options.preferredModel] - model override from /model slash command
 * @returns {Promise<{ reply, model, tokens_used, searched, tools_used }>}
 */
export async function askLiteAgent(message, snippets = [], history = [], options = {}) {
  const {
    sessionId      = null,
    preferredModel = null,
  } = options;

  const token = getAuthToken();
  if (!token) throw new Error('Not authenticated — no auth token found');

  // Normalize snippets: backend expects { type, text } shape
  const normalizedSnippets = Array.isArray(snippets)
    ? snippets
        .filter((s) => s && s.type)
        .map((s) => ({
          type: s.type,
          text: s.text || s.content || '',  // LAW 11 — reads 'content' field too
        }))
    : [];

  // Normalize history: only pass valid role/content pairs
  const normalizedHistory = Array.isArray(history)
    ? history
        .filter((m) => m && m.role && m.content)
        .map((m) => ({ role: m.role, content: String(m.content) }))
    : [];

  // Get page context for the request
  const pageContext = getPageContext();

  const body = {
    message,
    snippets:      normalizedSnippets,
    history:       normalizedHistory,
    pageContext,
    sessionId:     sessionId ? String(sessionId) : null,    // BUG FIX — was always null
    preferredModel: preferredModel || null,                  // BUG FIX — was never forwarded
  };

  let response;
  try {
    response = await fetch(`${BACKEND_URL}/api/lite-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:    JSON.stringify(body),
      signal:  AbortSignal.timeout(30_000),
    });
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      throw new Error('Request timed out after 30s — backend may be cold starting');
    }
    throw new Error(`Network error: ${err.message}`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Backend returned non-JSON response (status ${response.status})`);
  }

  if (!response.ok) {
    const errMsg = data?.message || data?.error || `HTTP ${response.status}`;
    if (response.status === 503) throw new Error('all_providers_down');
    if (response.status === 401) throw new Error('Authentication expired — please re-login');
    if (response.status === 429) throw new Error('Rate limit hit — slow down a bit 😅');
    throw new Error(errMsg);
  }

  return {
    reply:       data.reply       || '',
    model:       data.model       || 'unknown',
    tokens_used: data.tokens_used || 0,
    searched:    data.searched    || false,
    tools_used:  data.tools_used  || [],
  };
}

// ── PAGE CONTEXT COLLECTOR ─────────────────────────────────────────────────────
// Runs in the injected bookmarklet context — reads current page DOM.
// Capped at 3000 chars — enough for agent, not wasteful.

function getPageContext() {
  try {
    return {
      url:     window.location.href || '',
      title:   document.title       || '',
      content: (document.body?.innerText || '').slice(0, 3000),
    };
  } catch {
    return { url: '', title: '', content: '' };
  }
}
