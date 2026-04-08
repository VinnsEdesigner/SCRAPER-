// shell.js — FAB + panel structure

import { injectStyles } from './styles.js';

const FAB_ID = '__venom_fab__';
const PANEL_ID = '__venom_panel__';

let panelOpen = false;

export function buildShell() {
  injectStyles();
  
  const fab = document.createElement('div');
  fab.id = FAB_ID;
  fab.innerHTML = `
    🕷️
    <span class="vn-fab-dot"></span>
  `;
  
  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.innerHTML = `
    <div class="vn-drag-handle" id="vn-drag-handle"></div>
    
    <div class="vn-tabs">
      <button class="vn-tab vn-active" data-tab="agent">NExY 🧑‍💻 AGENT</button>
      <button class="vn-tab" data-tab="snippets">SNIPPETS</button>
      <button class="vn-tab" data-tab="settings">SETTINGS</button>
    </div>
    
    <div class="vn-tab-content vn-active" id="vn-tab-agent"></div>
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
  if (panel) {
    panel.classList.toggle('vn-open', panelOpen);
  }
}

export function isPanelOpen() {
  return panelOpen;
}

export function destroyShell() {
  document.getElementById(FAB_ID)?.remove();
  document.getElementById(PANEL_ID)?.remove();
  panelOpen = false;
}

export function getFab() {
  return document.getElementById(FAB_ID);
}

export function getPanel() {
  return document.getElementById(PANEL_ID);
}
