// core.js — init, auth token check, session start

import { getToken, getSessionId } from './storage.js';
import { initHud } from './hud/index.js';

export function init() {
  const token = getToken();
  getSessionId();
  
  initHud();
  
  if (!token) {
    console.log('[VENOM Scraper] No auth token — open dashboard and login first');
  }
}
