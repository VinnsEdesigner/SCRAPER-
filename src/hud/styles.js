// styles.js — CSS injection for VENOM HUD

export function injectStyles() {
  if (document.getElementById('__venom_styles__')) return;
  
  const style = document.createElement('style');
  style.id = '__venom_styles__';
  style.textContent = `
    /* ── FAB (floating spider icon) ──────────────────────────────────── */
    #__venom_fab__ {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 56px;
      height: 56px;
      background: rgba(10, 10, 10, 0.95);
      border: 1px solid #2e2e2e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
      user-select: none;
      transition: opacity 0.2s;
    }
    #__venom_fab__:hover { opacity: 1; background: rgba(17, 17, 17, 0.98); }
    #__venom_fab__.vn-dragging { cursor: move; }
    
    .vn-fab-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #7d8590;
      border: 2px solid #0a0a0a;
    }
    .vn-fab-dot.vn-green  { background: #22d3ee; }
    .vn-fab-dot.vn-amber  { background: #f59e0b; }
    .vn-fab-dot.vn-red    { background: #ef4444; }

    /* ── PANEL (bottom sheet) ────────────────────────────────────────── */
    #__venom_panel__ {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 50vh;
      background: #000000;
      border-top: 1px solid #2e2e2e;
      font-family: 'Geist Mono', 'Courier New', monospace;
      font-size: 12px;
      color: #e6edf3;
      z-index: 2147483645;
      display: none;
      flex-direction: column;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.8);
    }
    #__venom_panel__.vn-open { display: flex; }

    /* ── DRAG HANDLE (top edge of panel) ───────────────────────────── */
    .vn-drag-handle {
      width: 100%;
      height: 12px;
      background: #0a0a0a;
      cursor: ns-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #1e1e1e;
    }
    .vn-drag-handle::after {
      content: '';
      width: 40px;
      height: 4px;
      background: #2e2e2e;
      border-radius: 2px;
    }

    /* ── TABS (horizontal strip) ───────────────────────────────────── */
    .vn-tabs {
      display: flex;
      gap: 0;
      background: #0a0a0a;
      border-bottom: 1px solid #1e1e1e;
      padding: 0 12px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .vn-tabs::-webkit-scrollbar { display: none; }
    
    .vn-tab {
      background: none;
      border: none;
      color: #7d8590;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 11px;
      font-family: inherit;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      transition: none;
    }
    .vn-tab.vn-active {
      color: #e6edf3;
      border-bottom-color: #ef4444;
    }

    /* ── TAB CONTENT ───────────────────────────────────────────────── */
    .vn-tab-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: none;
    }
    .vn-tab-content.vn-active { display: block; }

    /* ── AGENT TAB ─────────────────────────────────────────────────── */
    .vn-agent-header {
      font-size: 10px;
      color: #7d8590;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    .vn-convo {
      max-height: 200px;
      overflow-y: auto;
      margin-bottom: 12px;
      padding: 8px;
      background: #0a0a0a;
      border-radius: 6px;
      border: 1px solid #1e1e1e;
    }
    .vn-msg {
      margin-bottom: 8px;
      padding: 6px 8px;
      background: #111;
      border-radius: 4px;
      font-size: 10px;
      line-height: 1.4;
      word-break: break-word;
    }
    .vn-msg:last-child { margin-bottom: 0; }
    .vn-msg-user { color: #b1bac4; }
    .vn-msg-agent { color: #7d8590; }
    
    .vn-inject-banner {
      background: #0d1117;
      border: 1px solid #7c3aed;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
      display: none;
    }
    .vn-inject-banner.vn-show { display: block; }
    .vn-inject-text {
      font-size: 10px;
      color: #b1bac4;
      margin-bottom: 6px;
      line-height: 1.4;
    }
    .vn-inject-row { display: flex; gap: 6px; }

    .vn-input-row { display: flex; gap: 6px; align-items: center; }
    .vn-input {
      flex: 1;
      background: #0a0a0a;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      color: #e6edf3;
      padding: 8px;
      font-size: 11px;
      font-family: inherit;
      resize: none;
      outline: none;
    }
    .vn-input:focus { border-color: #444; }

    /* ── SNIPPETS TAB ──────────────────────────────────────────────── */
    .vn-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .vn-section {
      background: #0a0a0a;
      border: 1px solid #1e1e1e;
      border-radius: 6px;
      padding: 8px;
    }
    .vn-sec-hdr {
      font-size: 9px;
      color: #484f58;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }
    .vn-badge { color: #7d8590; }
    
    .vn-snip-list {
      max-height: 160px;
      overflow-y: auto;
    }
    .vn-snip-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 0;
      border-bottom: 1px solid #111;
      font-size: 10px;
    }
    .vn-snip-item:last-child { border: none; }
    .vn-snip-num { color: #484f58; font-size: 9px; min-width: 18px; }
    .vn-snip-preview {
      flex: 1;
      color: #7d8590;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .vn-snip-type {
      font-size: 8px;
      color: #7d8590;
      padding: 2px 4px;
      background: #111;
      border-radius: 3px;
    }

    .vn-sel-overlay {
      position: fixed;
      background: rgba(10, 10, 10, 0.98);
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      padding: 6px 8px;
      display: none;
      gap: 6px;
      z-index: 2147483647;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6);
    }
    .vn-sel-overlay.vn-show { display: flex; }

    /* ── SETTINGS TAB ──────────────────────────────────────────────── */
    .vn-setting-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #111;
    }
    .vn-setting-row:last-child { border: none; }
    .vn-setting-label {
      font-size: 11px;
      color: #b1bac4;
    }
    .vn-slider {
      width: 120px;
      height: 4px;
      background: #1e1e1e;
      border-radius: 2px;
      outline: none;
      -webkit-appearance: none;
    }
    .vn-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background: #e6edf3;
      border-radius: 50%;
      cursor: pointer;
    }
    .vn-slider::-moz-range-thumb {
      width: 14px;
      height: 14px;
      background: #e6edf3;
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
    .vn-theme-row { display: flex; gap: 6px; }

    /* ── BUTTONS ───────────────────────────────────────────────────── */
    .vn-btn {
      background: #1e1e1e;
      border: 1px solid #2e2e2e;
      color: #e6edf3;
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 11px;
      font-family: inherit;
      transition: none;
    }
    .vn-btn:active { opacity: 0.8; }
    .vn-btn.vn-selected {
      background: #ef4444;
      border-color: #ef4444;
      color: #fff;
    }
    .vn-btn-sm {
      background: #111;
      border: 1px solid #2e2e2e;
      color: #b1bac4;
      border-radius: 4px;
      padding: 4px 10px;
      cursor: pointer;
      font-size: 10px;
      font-family: inherit;
    }
    .vn-btn-ghost {
      border-color: transparent;
      color: #484f58;
    }
    .vn-btn-icon {
      background: none;
      border: none;
      color: #7d8590;
      cursor: pointer;
      padding: 0;
      font-size: 16px;
      line-height: 1;
    }
    .vn-btn-full {
      width: 100%;
      margin-top: 8px;
    }
    .vn-btn-send {
      background: #1e1e1e;
      border: 1px solid #2e2e2e;
      color: #e6edf3;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }

    /* ── LOGO (never changes) ──────────────────────────────────────── */
    .vn-logo {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
    }
    .vn-logo-spider { color: #ef4444; }

    /* ── THEMES ────────────────────────────────────────────────────── */
    #__venom_panel__.vn-theme-oceanic {
      background: #e8f4f8;
      color: #1a1a1a;
      border-top-color: #b0c4de;
    }
    #__venom_panel__.vn-theme-oceanic .vn-drag-handle {
      background: #d0e8f0;
      border-bottom-color: #b0c4de;
    }
    #__venom_panel__.vn-theme-oceanic .vn-tabs {
      background: #d0e8f0;
      border-bottom-color: #b0c4de;
    }
    #__venom_panel__.vn-theme-oceanic .vn-tab { color: #4a5f7a; }
    #__venom_panel__.vn-theme-oceanic .vn-tab.vn-active { color: #1a1a1a; }
    #__venom_panel__.vn-theme-oceanic .vn-input,
    #__venom_panel__.vn-theme-oceanic .vn-convo,
    #__venom_panel__.vn-theme-oceanic .vn-section {
      background: #fff;
      border-color: #b0c4de;
      color: #1a1a1a;
    }
    #__venom_panel__.vn-theme-oceanic .vn-btn {
      background: #fff;
      border-color: #b0c4de;
      color: #1a1a1a;
    }
    #__venom_panel__.vn-theme-oceanic .vn-msg { background: #f0f8ff; color: #1a1a1a; }
  `;
  
  document.head.appendChild(style);
}
