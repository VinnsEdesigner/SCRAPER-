// status.js — FAB dot status + auth badge update

import { setBadge } from './shell.js';
import { getToken } from '../storage.js';

export function setStatus(color, msg) {
  const fab = document.getElementById('__venom_fab__');
  if (!fab) return;

  const dot = fab.querySelector('.vn-fab-dot');
  if (!dot) return;

  dot.className = 'vn-fab-dot';
  if (color === 'green') dot.classList.add('vn-green');
  else if (color === 'amber') dot.classList.add('vn-amber');
  else if (color === 'red')   dot.classList.add('vn-red');

  fab.setAttribute('data-status', msg || '');
}

export function refreshAuthBadge() {
  const token = getToken();
  if (token) {
    setBadge('auth', 'authed', 'active');
  } else {
    setBadge('auth', 'unauthed', 'err');
  }
}
