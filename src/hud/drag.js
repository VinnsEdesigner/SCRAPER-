// drag.js — FAB drag (x+y) + panel height resize

import { getFab, getPanel } from './shell.js';

let fabDragging = false;
let fabStartX, fabStartY, fabOrigRight, fabOrigBottom;

let panelResizing = false;
let panelStartY, panelOrigHeight;

export function initDrag() {
  initFabDrag();
  initPanelResize();
}

function initFabDrag() {
  const fab = getFab();
  if (!fab) return;
  
  function onStart(clientX, clientY) {
    fabDragging = true;
    fabStartX = clientX;
    fabStartY = clientY;
    
    const rect = fab.getBoundingClientRect();
    fabOrigRight = window.innerWidth - rect.right;
    fabOrigBottom = window.innerHeight - rect.bottom;
    
    fab.style.transition = 'none';
    fab.classList.add('vn-dragging');
  }
  
  function onMove(clientX, clientY) {
    if (!fabDragging) return;
    
    const dx = clientX - fabStartX;
    const dy = clientY - fabStartY;
    
    const newRight = Math.max(0, fabOrigRight - dx);
    const newBottom = Math.max(0, fabOrigBottom + dy);
    
    const maxRight = window.innerWidth - 60;
    const maxBottom = window.innerHeight - 60;
    
    fab.style.right = Math.min(newRight, maxRight) + 'px';
    fab.style.bottom = Math.min(newBottom, maxBottom) + 'px';
    
    localStorage.setItem('vn_fab_right', fab.style.right);
    localStorage.setItem('vn_fab_bottom', fab.style.bottom);
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
  const panel = getPanel();
  if (!handle || !panel) return;
  
  function onStart(clientY) {
    panelResizing = true;
    panelStartY = clientY;
    panelOrigHeight = panel.offsetHeight;
  }
  
  function onMove(clientY) {
    if (!panelResizing) return;
    
    const dy = panelStartY - clientY;
    const newHeight = panelOrigHeight + dy;
    
    const minHeight = window.innerHeight * 0.3;
    const maxHeight = window.innerHeight * 0.8;
    
    const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
    panel.style.height = `${clampedHeight}px`;
    
    const vh = Math.round((clampedHeight / window.innerHeight) * 100);
    localStorage.setItem('vn_panel_height', vh);
  }
  
  function onEnd() {
    panelResizing = false;
  }
  
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    onStart(e.clientY);
  });
  
  document.addEventListener('mousemove', (e) => onMove(e.clientY));
  document.addEventListener('mouseup', onEnd);
  
  handle.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    onStart(t.clientY);
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    if (!panelResizing) return;
    e.preventDefault();
    const t = e.touches[0];
    onMove(t.clientY);
  }, { passive: false });
  
  document.addEventListener('touchend', onEnd);
}

export function restoreFabPosition() {
  const fab = getFab();
  if (!fab) return;
  
  const right = localStorage.getItem('vn_fab_right');
  const bottom = localStorage.getItem('vn_fab_bottom');
  
  if (right) fab.style.right = right;
  if (bottom) fab.style.bottom = bottom;
}

export function restorePanelHeight() {
  const panel = getPanel();
  if (!panel) return;
  
  const vh = parseInt(localStorage.getItem('vn_panel_height') || '50');
  panel.style.height = `${vh}vh`;
}
