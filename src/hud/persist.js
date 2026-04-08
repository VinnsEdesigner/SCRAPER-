// persist.js — localStorage persistence + poll

import { pollSettings } from '../sync.js';
import { getToken } from '../storage.js';
import { renderSnippets } from './snippets.js';

const POLL_MS = 15000;
let pollTimer = null;

export function startPoll() {
  pollTimer = setInterval(async () => {
    if (!document.getElementById('__venom_panel__')) {
      clearInterval(pollTimer);
      pollTimer = null;
      return;
    }
    
    const token = getToken();
    const settings = await pollSettings(token);
    
    if (settings) {
      if (settings.snippet_limit) {
        localStorage.setItem('vn_snippet_limit', settings.snippet_limit);
      }
      renderSnippets();
    }
  }, POLL_MS);
}

export function stopPoll() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}
