// sync.js — POST snippets to /api/scraper-agent

import { getToken, getSessionId, getSnippets, clearSnippets } from './storage.js';
import { readPage } from './dom-reader.js';

const BACKEND = '__BACKEND_URL__'; // replaced at build time

export async function syncToBackend(onStatus) {
  const token    = getToken();
  const snippets = getSnippets();

  if (!token) {
    onStatus('error', 'Login to dashboard first');
    return false;
  }

  if (snippets.length === 0) {
    onStatus('error', 'No snippets staged');
    return false;
  }

  onStatus('syncing', `Syncing ${snippets.length} snippets...`);

  try {
    const res = await fetch(`${BACKEND}/api/scraper-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId:   getSessionId(),
        snippets:    snippets.map((s) => ({
          number: s.number,
          text:   s.text,
          type:   s.type,
          url:    s.url || location.href,
          title:  s.title || document.title,
        })),
        pageContext: readPage(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      onStatus('error', data.message || 'Sync failed');
      return false;
    }

    clearSnippets();
    onStatus('success', `✓ ${data.saved} snippets synced`);
    return true;
  } catch (err) {
    onStatus('error', 'Backend unreachable — buffered locally');
    return false;
  }
}

export async function pollSettings(token) {
  if (!token) return null;
  try {
    const res = await fetch(`${BACKEND}/api/sync`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.settings;
  } catch {
    return null;
  }
}
