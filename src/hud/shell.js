// shell.js — FAB + panel shell with VENOM logo, status bar, warn banner

import { injectStyles } from './styles.js';

const FAB_ID   = '__venom_fab__';
const PANEL_ID = '__venom_panel__';

let panelOpen = false;

export function buildShell() {
  injectStyles();

  const fab = document.createElement('div');
  fab.id = FAB_ID;
  fab.innerHTML = `🕷️<span class="vn-fab-dot"></span>`;

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.innerHTML = `
    <div class="vn-drag-handle" id="vn-drag-handle"></div>

    <div class="vn-header">
      <span class="vn-logo"><span class="vn-logo-icon">🕷️</span>VENOM</span>
    </div>

    <div class="vn-status-bar" id="vn-status-bar">
      <div class="vn-badge-pill" id="vn-badge-model">
        <span class="dot"></span><span id="vn-badge-model-text">idle</span>
      </div>
      <div class="vn-badge-pill" id="vn-badge-snippets">
        <span class="dot"></span><span id="vn-badge-snip-text">0 snippets</span>
      </div>
      <div class="vn-badge-pill" id="vn-badge-auth">
        <span class="dot"></span><span id="vn-badge-auth-text">unauthed</span>
      </div>
    </div>

    <div class="vn-warn-banner" id="vn-warn-banner">
      <span class="vn-warn-icon">⚠</span>
      <span id="vn-warn-text"></span>
    </div>

    <div class="vn-tabs">
      <button class="vn-tab vn-active" data-tab="agent">AGENT</button>
      <button class="vn-tab" data-tab="snippets">SNIPPETS</button>
      <button class="vn-tab" data-tab="settings">SETTINGS</button>
    </div>

    <div class="vn-tab-content vn-active" id="vn-tab-agent" style="position:relative;"></div>
    <div class="vn-tab-content" id="vn-tab-snippets"></div>
    <div class="vn-tab-content" id="vn-tab-settings"></div>
  `;

  fab.onclick = togglePanel;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  return { fab, panel };
}

export function togglePanel() {
  panelOpen = !panelOpen;
  const panel = document.getElementById(PANEL_ID);
  if (panel) panel.classList.toggle('vn-open', panelOpen);
}

export function destroyShell() {
  document.getElementById(FAB_ID)?.remove();
  document.getElementById(PANEL_ID)?.remove();
  panelOpen = false;
}

export function getFab()   { return document.getElementById(FAB_ID); }
export function getPanel() { return document.getElementById(PANEL_ID); }

/** Show a red warning banner inside the panel */
export function showWarn(msg) {
  const banner = document.getElementById('vn-warn-banner');
  const text   = document.getElementById('vn-warn-text');
  if (!banner || !text) return;
  text.textContent = msg;
  banner.classList.add('vn-show');
  clearTimeout(banner._timer);
  banner._timer = setTimeout(() => banner.classList.remove('vn-show'), 5000);
}

/** Update a status badge pill */
export function setBadge(id, label, state) {
  // state: '' | 'active' | 'warn' | 'err'
  const pill = document.getElementById(`vn-badge-${id}`);
  const txt  = document.getElementById(`vn-badge-${id}-text`);
  if (!pill || !txt) return;
  pill.className = 'vn-badge-pill' + (state ? ' ' + state : '');
  txt.textContent = label;
}
