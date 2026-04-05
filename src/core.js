// core.js — init, auth token check, session start

import { getToken, getSessionId } from './storage.js';
import { initHud }                from './hud.js';

export function init() {
  // Check for existing auth token
  const token = getToken();

  // Initialise session ID early so it's ready before any sync
  getSessionId();

  // Mount HUD regardless — it will show login message if no token
  initHud();

  if (!token) {
    console.log('[Nexus Scraper] No auth token — open dashboard and login first');
  }
}
