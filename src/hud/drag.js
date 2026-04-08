// drag.js — FAB full-screen drag + panel height resize

import { getFab, getPanel } from './shell.js';

let fabDragging  = false;
let fabStartX, fabStartY, fabOrigLeft, fabOrigTop;

let panelResizing = false;
let panelStartY, panelOrigHeight;

export function initDrag() {
  initFabDrag();
  initPanelResize();
}

function initFabDrag() {
  const fab = getFab();
  if (!fab) return;

  // Switch to top/left positioning for full-screen drag
  function onStart(clientX, clientY) {
    fabDragging = true;
    fabStartX   = clientX;
    fabStartY   = clientY;

    const rect  = fab.getBoundingClientRect();
    fabOrigLeft = rect.left;
    fabOrigTop  = rect.top;

    // Switch to absolute left/top so we can go anywhere
    fab.style.right  = 'auto';
    fab.style.bottom = 'auto';
    fab.style.left   = fabOrigLeft + 'px';
    fab.style.top    = fabOrigTop  + 'px';
    fab.style.transition = 'none';
    fab.classList.add('vn-dragging');
  }

  function onMove(clientX, clientY) {
    if (!fabDragging) return;

    const dx = clientX - fabStartX;
    const dy = clientY - fabStartY;

    const newLeft = Math.max(0, Math.min(window.innerWidth  - 56, fabOrigLeft + dx));
    const newTop  = Math.max(0, Math.min(window.innerHeight - 56, fabOrigTop  + dy));

    fab.style.left = newLeft + 'px';
    fab.style.top  = newTop  + 'px';

    localStorage.setItem('vn_fab_left', newLeft);
    localStorage.setItem('vn_fab_top',  newTop);
  }

  function onEnd() {
    fabDragging = false;
    fab.classList.remove('vn-dragging');
  }

  fab.addEventListener('mousedown', (e) => {
    if (e.target !== fab && !e.target.classList.contains('vn-fab-dot')) return;
    e.preventDefault();
    e.stopPropagation();
    onStart(e.clientX, e.clientY);
  });

  document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
  document.addEventListener('mouseup', onEnd);

  fab.addEventListener('touchstart', (e) => {
    if (e.target !== fab && !e.target.classList.contains('vn-fab-dot')) return;
    const t = e.touches[0];
    onStart(t.clientX, t.clientY);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!fabDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    onMove(t.clientX, t.clientY);
  }, { passive: false });

  document.addEventListener('touchend', onEnd);
}

function initPanelResize() {
  const handle = document.getElementById('vn-drag-handle');
  const panel  = getPanel();
  if (!handle || !panel) return;

  function onStart(clientY) {
    panelResizing  = true;
    panelStartY    = clientY;
    panelOrigHeight = panel.offsetHeight;
  }

  function onMove(clientY) {
    if (!panelResizing) return;
    const dy = panelStartY - clientY;
    const newH = Math.max(
      window.innerHeight * 0.25,
      Math.min(window.innerHeight * 0.85, panelOrigHeight + dy)
    );
    panel.style.height = newH + 'px';
    localStorage.setItem('vn_panel_height', Math.round((newH / window.innerHeight) * 100));
  }

  function onEnd() { panelResizing = false; }

  handle.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(e.clientY); });
  document.addEventListener('mousemove', (e) => onMove(e.clientY));
  document.addEventListener('mouseup', onEnd);

  handle.addEventListener('touchstart', (e) => {
    onStart(e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!panelResizing) return;
    e.preventDefault();
    onMove(e.touches[0].clientY);
  }, { passive: false });

  document.addEventListener('touchend', onEnd);
}

export function restoreFabPosition() {
  const fab = getFab();
  if (!fab) return;

  const left = localStorage.getItem('vn_fab_left');
  const top  = localStorage.getItem('vn_fab_top');

  if (left && top) {
    fab.style.right  = 'auto';
    fab.style.bottom = 'auto';
    fab.style.left   = left + 'px';
    fab.style.top    = top  + 'px';
  }
  // else keep default CSS bottom/right
}

export function restorePanelHeight() {
  const panel = getPanel();
  if (!panel) return;
  const vh = parseInt(localStorage.getItem('vn_panel_height') || '55');
  panel.style.height = `${vh}vh`;
}
