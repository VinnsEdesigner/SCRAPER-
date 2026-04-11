/**
 * @file sync.js
 * @location /scraper/src/sync.js
 *
 * @purpose
 * Syncs staged snippets from localStorage to the backend via
 * POST /api/scraper-agent. Polls backend for settings updates
 * via GET /api/sync every 15 seconds.
 *
 * Handles all four snippet types:
 *   code     → text content + source URL
 *   research → text content + source URL
 *   image    → URL as text (NEVER base64 — LAW 22)
 *              + mime_type + metadata
 *   file     → text content + file_size + metadata
 *
 * LAW 22 enforcement:
 *   base64 data (data: prefix) is detected and stripped
 *   before sending. Image snippets send URL only.
 *
 * @exports
 *   syncToBackend(onStatus) → Promise<boolean>
 *   pollSettings(token)     → Promise<Object|null>
 *
 * @imports
 *   ./storage    → getToken, getSessionId, getSnippets, clearSnippets
 *   ./dom-reader → readPage
 *
 * @env-vars
 *   __BACKEND_URL__ — replaced at build time by esbuild
 */

import { getToken, getSessionId, getSnippets, clearSnippets } from './storage.js';
import { readPage } from './dom-reader.js';

const BACKEND = __BACKEND_URL__;   // replaced at build time

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SYNC_TIMEOUT_MS     = 30_000;  // 30s — generous for mobile networks
const POLL_TIMEOUT_MS     = 10_000;  // 10s for settings poll
const MAX_TEXT_LENGTH     = 2000;    // matches SCRAPER.MAX_SNIPPET_LENGTH
const MAX_URL_LENGTH      = 2048;    // reasonable URL cap

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect if a string is base64 image data.
 * Base64 must NEVER be sent to backend (LAW 22).
 *
 * @param {string} str
 * @returns {boolean}
 */
function isBase64Data(str) {
  if (!str || typeof str !== 'string') return false;
  return str.trimStart().startsWith('data:');
}

/**
 * Sanitize a snippet's text field before sending to backend.
 * Strips base64 data (LAW 22), truncates to MAX_TEXT_LENGTH.
 * For image snippets: text should be a URL, not content.
 *
 * @param {Object} snippet
 * @returns {string}
 */
function sanitizeText(snippet) {
  const raw = typeof snippet.text === 'string' ? snippet.text : '';

  // LAW 22 — never send base64 to backend
  if (isBase64Data(raw)) {
    console.warn('[VENOM sync] base64 detected in snippet text — stripped before sync', {
      number: snippet.number,
      type:   snippet.type,
    });
    // For image type: fall back to URL if available
    if (snippet.type === 'image' && typeof snippet.url === 'string') {
      return snippet.url.slice(0, MAX_URL_LENGTH);
    }
    return '';  // no safe fallback — send empty
  }

  return raw.slice(0, MAX_TEXT_LENGTH);
}

/**
 * Build a sync-safe snippet payload from a stored snippet.
 * Includes all fields backend needs for each type.
 *
 * @param {Object} snippet
 * @returns {Object}
 */
function buildSyncPayload(snippet) {
  const base = {
    number: snippet.number,
    text:   sanitizeText(snippet),
    type:   snippet.type   || 'research',
    url:    typeof snippet.url   === 'string'
      ? snippet.url.slice(0, MAX_URL_LENGTH)
      : (typeof window !== 'undefined' ? window.location.href : ''),
    title:  typeof snippet.title === 'string'
      ? snippet.title.slice(0, 200)
      : (typeof document !== 'undefined' ? document.title.slice(0, 200) : ''),
  };

  // image-specific fields
  if (snippet.type === 'image') {
    if (snippet.mime_type && typeof snippet.mime_type === 'string') {
      base.mime_type = snippet.mime_type;
    }
    if (typeof snippet.file_size === 'number') {
      base.file_size = snippet.file_size;
    }
    if (snippet.metadata && typeof snippet.metadata === 'object') {
      // Strip any base64 from metadata before sending
      const safeMeta = { ...snippet.metadata };
      if (safeMeta.base64 || isBase64Data(safeMeta.data || '')) {
        delete safeMeta.base64;
        delete safeMeta.data;
      }
      base.metadata = safeMeta;
    }
  }

  // file-specific fields
  if (snippet.type === 'file') {
    if (typeof snippet.file_size === 'number') {
      base.file_size = snippet.file_size;
    }
    if (snippet.metadata && typeof snippet.metadata === 'object') {
      base.metadata = { ...snippet.metadata };
    }
  }

  return base;
}

// ─────────────────────────────────────────────────────────────────────────────
// SYNC TO BACKEND
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sync all staged snippets to the backend.
 * Clears localStorage snippets on success.
 *
 * @param {Function} onStatus - (type: 'syncing'|'success'|'error', msg: string) => void
 * @returns {Promise<boolean>} true on success, false on failure
 */
export async function syncToBackend(onStatus) {
  const token    = getToken();
  const snippets = getSnippets();

  if (!token) {
    onStatus('error', 'Login to dashboard first');
    return false;
  }

  if (!snippets || snippets.length === 0) {
    onStatus('error', 'No snippets staged');
    return false;
  }

  // Build sync-safe payloads — strips base64, adds type-specific fields
  const payload = snippets.map(buildSyncPayload);

  // Filter out any snippets that ended up with empty text
  // (e.g. image snippets whose base64 was stripped and had no URL)
  const validPayload = payload.filter((s) => {
    if (!s.text && s.type !== 'image') return false;
    if (s.type === 'image' && !s.text && !s.url) return false;
    return true;
  });

  if (validPayload.length === 0) {
    onStatus('error', 'No valid snippets to sync after sanitisation');
    return false;
  }

  onStatus('syncing', `Syncing ${validPayload.length} snippet${validPayload.length !== 1 ? 's' : ''}...`);

  try {
    const res = await fetch(`${BACKEND}/api/scraper-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId:   getSessionId(),
        snippets:    validPayload,
        pageContext: readPage(),
      }),
      signal: AbortSignal.timeout(SYNC_TIMEOUT_MS),
    });

    const data = await res.json();

    if (!res.ok) {
      onStatus('error', data.message || `Sync failed (${res.status})`);
      return false;
    }

    // Clear staged snippets on success
    clearSnippets();

    const saved = data.saved || 0;
    onStatus('success', `✓ ${saved} snippet${saved !== 1 ? 's' : ''} synced`);
    return true;

  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      onStatus('error', 'Sync timed out — check connection');
    } else {
      onStatus('error', 'Backend unreachable — snippets buffered locally');
    }
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POLL SETTINGS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Poll backend for settings updates.
 * Called every 15 seconds by hud/persist.js.
 * Returns settings object or null on failure.
 *
 * @param {string} token
 * @returns {Promise<Object|null>}
 */
export async function pollSettings(token) {
  if (!token) return null;

  try {
    const res = await fetch(`${BACKEND}/api/sync`, {
      headers: { Authorization: `Bearer ${token}` },
      signal:  AbortSignal.timeout(POLL_TIMEOUT_MS),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.settings || null;

  } catch {
    // Network failure or timeout — silent, poll will retry in 15s
    return null;
  }
}
