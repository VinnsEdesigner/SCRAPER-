// styles.js — VENOM HUD v2 CSS — crisp white/gray two-tone dark system

export function injectStyles() {
  if (document.getElementById('__venom_styles__')) return;

  const style = document.createElement('style');
  style.id = '__venom_styles__';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

    /* ── CSS VARS ─────────────────────────────────────────────────────── */
    :root {
      --vn-bg:       #0a0a0a;
      --vn-bg2:      #111111;
      --vn-bg3:      #1a1a1a;
      --vn-border:   #222222;
      --vn-border2:  #2e2e2e;
      --vn-text:     #ffffff;
      --vn-muted:    #888888;
      --vn-dim:      #444444;
      --vn-red:      #ef4444;
      --vn-red-dim:  rgba(239,68,68,0.15);
      --vn-amber:    #f59e0b;
      --vn-cyan:     #22d3ee;
      --vn-mono:     'JetBrains Mono', 'Courier New', monospace;
      --vn-sans:     'Inter', system-ui, sans-serif;
    }

    /* ── LIGHT MODE OVERRIDE ──────────────────────────────────────────── */
    #__venom_panel__.vn-theme-light {
      --vn-bg:      #ffffff;
      --vn-bg2:     #f4f4f4;
      --vn-bg3:     #ebebeb;
      --vn-border:  #d0d0d0;
      --vn-border2: #c0c0c0;
      --vn-text:    #000000;
      --vn-muted:   #555555;
      --vn-dim:     #999999;
    }

    /* ── FAB ──────────────────────────────────────────────────────────── */
    #__venom_fab__ {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 52px;
      height: 52px;
      background: #0a0a0a;
      border: 1.5px solid #2e2e2e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 2147483646;
      box-shadow: 0 0 0 1px rgba(239,68,68,0.2), 0 4px 20px rgba(0,0,0,0.7);
      user-select: none;
      touch-action: none;
    }
    #__venom_fab__.vn-dragging { cursor: grabbing; opacity: 0.9; }

    .vn-fab-dot {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #333;
      border: 1.5px solid #0a0a0a;
      transition: background 0.2s;
    }
    .vn-fab-dot.vn-green  { background: var(--vn-cyan); box-shadow: 0 0 6px var(--vn-cyan); }
    .vn-fab-dot.vn-amber  { background: var(--vn-amber); box-shadow: 0 0 6px var(--vn-amber); }
    .vn-fab-dot.vn-red    { background: var(--vn-red); box-shadow: 0 0 6px var(--vn-red); }

    /* ── PANEL ────────────────────────────────────────────────────────── */
    #__venom_panel__ {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 55vh;
      background: var(--vn-bg);
      border-top: 1.5px solid var(--vn-border2);
      font-family: var(--vn-mono);
      font-size: 12px;
      color: var(--vn-text);
      z-index: 2147483645;
      display: none;
      flex-direction: column;
      box-shadow: 0 -8px 40px rgba(0,0,0,0.85);
    }
    #__venom_panel__.vn-open { display: flex; }

    /* ── DRAG HANDLE ──────────────────────────────────────────────────── */
    .vn-drag-handle {
      width: 100%;
      height: 18px;
      background: var(--vn-bg2);
      cursor: ns-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--vn-border);
      flex-shrink: 0;
    }
    .vn-drag-handle::after {
      content: '';
      width: 36px;
      height: 3px;
      background: var(--vn-border2);
      border-radius: 2px;
    }

    /* ── HEADER / LOGO BAR ────────────────────────────────────────────── */
    .vn-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      background: var(--vn-bg2);
      border-bottom: 1px solid var(--vn-border);
      position: relative;
      flex-shrink: 0;
    }
    .vn-logo {
      font-family: var(--vn-mono);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 3px;
      color: var(--vn-red);
      text-transform: uppercase;
    }
    .vn-logo-icon { margin-right: 6px; }

    /* Status badges row */
    .vn-status-bar {
      display: flex;
      gap: 6px;
      align-items: center;
      padding: 4px 12px;
      background: var(--vn-bg);
      border-bottom: 1px solid var(--vn-border);
      overflow-x: auto;
      scrollbar-width: none;
      flex-shrink: 0;
    }
    .vn-status-bar::-webkit-scrollbar { display: none; }
    .vn-badge-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 7px;
      border-radius: 100px;
      border: 1px solid var(--vn-border);
      font-size: 9px;
      font-family: var(--vn-mono);
      color: var(--vn-muted);
      white-space: nowrap;
      background: var(--vn-bg2);
    }
    .vn-badge-pill .dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: var(--vn-dim);
    }
    .vn-badge-pill.active .dot { background: var(--vn-cyan); box-shadow: 0 0 4px var(--vn-cyan); }
    .vn-badge-pill.warn .dot   { background: var(--vn-amber); }
    .vn-badge-pill.err .dot    { background: var(--vn-red); }
    .vn-badge-pill.active { color: var(--vn-text); border-color: var(--vn-border2); }
    .vn-badge-pill.err    { color: var(--vn-red); border-color: var(--vn-red); background: var(--vn-red-dim); }

    /* ── TABS ─────────────────────────────────────────────────────────── */
    .vn-tabs {
      display: flex;
      background: var(--vn-bg2);
      border-bottom: 1px solid var(--vn-border);
      padding: 0 8px;
      overflow-x: auto;
      scrollbar-width: none;
      flex-shrink: 0;
    }
    .vn-tabs::-webkit-scrollbar { display: none; }
    .vn-tab {
      background: none;
      border: none;
      color: var(--vn-muted);
      padding: 10px 14px;
      cursor: pointer;
      font-size: 10px;
      font-family: var(--vn-mono);
      font-weight: 500;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      letter-spacing: 0.5px;
      transition: color 0.15s;
    }
    .vn-tab.vn-active {
      color: var(--vn-text);
      border-bottom-color: var(--vn-red);
    }

    /* ── TAB CONTENT ──────────────────────────────────────────────────── */
    .vn-tab-content {
      flex: 1;
      overflow-y: auto;
      display: none;
      flex-direction: column;
      min-height: 0;
    }
    .vn-tab-content.vn-active { display: flex; }

    /* ── WARN BANNER ──────────────────────────────────────────────────── */
    .vn-warn-banner {
      margin: 8px 12px 0;
      padding: 7px 10px;
      background: rgba(239,68,68,0.08);
      border: 1px solid var(--vn-red);
      border-radius: 5px;
      font-size: 10px;
      color: var(--vn-red);
      font-family: var(--vn-mono);
      display: none;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .vn-warn-banner.vn-show { display: flex; }
    .vn-warn-icon { font-size: 11px; flex-shrink: 0; }

    /* ── AGENT TAB ────────────────────────────────────────────────────── */
    .vn-agent-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-bottom: 1px solid var(--vn-border);
      flex-shrink: 0;
    }
    .vn-agent-label {
      font-size: 9px;
      color: var(--vn-muted);
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .vn-hamburger {
      background: none;
      border: 1px solid var(--vn-border);
      color: var(--vn-muted);
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
      font-family: var(--vn-mono);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .vn-hamburger:active { opacity: 0.7; }

    /* Chat history drawer */
    .vn-history-drawer {
      position: absolute;
      top: 0; left: 0;
      width: 75%;
      height: 100%;
      background: var(--vn-bg2);
      border-right: 1px solid var(--vn-border2);
      z-index: 10;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .vn-history-drawer.vn-open { display: flex; }
    .vn-history-hdr {
      padding: 12px;
      border-bottom: 1px solid var(--vn-border);
      font-size: 10px;
      color: var(--vn-muted);
      letter-spacing: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .vn-history-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }
    .vn-history-item {
      padding: 8px;
      border-bottom: 1px solid var(--vn-border);
      cursor: pointer;
      font-size: 10px;
      color: var(--vn-muted);
    }
    .vn-history-item:hover { color: var(--vn-text); }
    .vn-history-new {
      margin: 8px;
      padding: 8px;
      background: none;
      border: 1px solid var(--vn-border2);
      border-radius: 5px;
      color: var(--vn-text);
      font-size: 10px;
      font-family: var(--vn-mono);
      cursor: pointer;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .vn-history-new:active { opacity: 0.7; }

    /* Convo area */
    .vn-convo {
      flex: 1;
      overflow-y: auto;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 0;
    }

    /* Chat bubbles */
    .vn-msg {
      max-width: 88%;
      padding: 7px 10px;
      border-radius: 8px;
      font-size: 11px;
      line-height: 1.5;
      font-family: var(--vn-mono);
      word-break: break-word;
    }
    .vn-msg-user {
      align-self: flex-end;
      background: var(--vn-bg3);
      border: 1.5px solid var(--vn-red);
      color: var(--vn-text);
      border-bottom-right-radius: 2px;
    }
    .vn-msg-agent {
      align-self: flex-start;
      background: var(--vn-bg2);
      border: 1.5px solid var(--vn-border2);
      color: var(--vn-muted);
      border-bottom-left-radius: 2px;
    }
    .vn-msg-agent .vn-msg-label {
      font-size: 8px;
      color: var(--vn-dim);
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .vn-msg-user .vn-msg-label {
      font-size: 8px;
      color: var(--vn-red);
      margin-bottom: 4px;
      text-align: right;
      letter-spacing: 0.5px;
    }

    /* Code block inside message */
    .vn-code-block {
      margin-top: 6px;
      background: #050505;
      border: 1px solid var(--vn-border2);
      border-radius: 5px;
      overflow: hidden;
    }
    .vn-code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      background: var(--vn-bg3);
      border-bottom: 1px solid var(--vn-border);
    }
    .vn-code-lang {
      font-size: 8px;
      color: var(--vn-red);
      font-family: var(--vn-mono);
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .vn-code-copy {
      background: none;
      border: none;
      color: var(--vn-dim);
      font-size: 9px;
      cursor: pointer;
      font-family: var(--vn-mono);
      padding: 2px 4px;
    }
    .vn-code-copy:active { color: var(--vn-text); }
    .vn-code-body {
      padding: 8px;
      font-size: 10px;
      font-family: var(--vn-mono);
      color: #e6edf3;
      overflow-x: auto;
      white-space: pre;
      line-height: 1.5;
    }

    /* ASCII tree block */
    .vn-ascii-block {
      margin-top: 6px;
      background: #050505;
      border: 1px solid var(--vn-border);
      border-left: 2px solid var(--vn-dim);
      border-radius: 4px;
      padding: 8px;
      font-size: 10px;
      font-family: var(--vn-mono);
      color: var(--vn-muted);
      white-space: pre;
      overflow-x: auto;
      line-height: 1.6;
    }

    /* Inject banner */
    .vn-inject-banner {
      margin: 0 12px 6px;
      background: rgba(124,58,237,0.08);
      border: 1px solid #7c3aed;
      border-radius: 6px;
      padding: 8px 10px;
      display: none;
      flex-shrink: 0;
    }
    .vn-inject-banner.vn-show { display: block; }
    .vn-inject-text {
      font-size: 10px;
      color: var(--vn-text);
      margin-bottom: 7px;
      line-height: 1.5;
      font-family: var(--vn-mono);
    }
    .vn-inject-row { display: flex; gap: 6px; }

    /* Input row — pinned bottom */
    .vn-bottom-area {
      padding: 8px 12px;
      border-top: 1px solid var(--vn-border);
      background: var(--vn-bg2);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .vn-input-row { display: flex; gap: 6px; align-items: flex-end; }
    .vn-input {
      flex: 1;
      background: var(--vn-bg);
      border: 1px solid var(--vn-border2);
      border-radius: 6px;
      color: var(--vn-text);
      padding: 8px 10px;
      font-size: 11px;
      font-family: var(--vn-mono);
      resize: none;
      outline: none;
      line-height: 1.4;
    }
    .vn-input::placeholder { color: var(--vn-dim); }
    .vn-input:focus { border-color: var(--vn-border2); box-shadow: 0 0 0 1px rgba(239,68,68,0.2); }

    /* ── SNIPPETS TAB ─────────────────────────────────────────────────── */
    .vn-snippets-inner {
      flex: 1;
      overflow-y: auto;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .vn-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .vn-section {
      background: var(--vn-bg2);
      border: 1px solid var(--vn-border);
      border-radius: 6px;
      padding: 8px;
    }
    .vn-sec-hdr {
      font-size: 9px;
      color: var(--vn-dim);
      letter-spacing: 0.8px;
      margin-bottom: 6px;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .vn-badge {
      color: var(--vn-muted);
      background: var(--vn-bg3);
      border: 1px solid var(--vn-border);
      border-radius: 3px;
      padding: 1px 5px;
      font-size: 8px;
    }
    .vn-snip-list { display: flex; flex-direction: column; gap: 2px; }
    .vn-snip-item {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 4px 0;
      border-bottom: 1px solid var(--vn-border);
      font-size: 10px;
    }
    .vn-snip-item:last-child { border: none; }
    .vn-snip-num { color: var(--vn-dim); font-size: 8px; min-width: 16px; font-family: var(--vn-mono); }
    .vn-snip-preview {
      flex: 1;
      color: var(--vn-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 10px;
    }
    .vn-snip-type {
      font-size: 8px;
      color: var(--vn-dim);
      padding: 1px 4px;
      background: var(--vn-bg3);
      border: 1px solid var(--vn-border);
      border-radius: 3px;
      font-family: var(--vn-mono);
    }

    /* Selection overlay */
    .vn-sel-overlay {
      position: fixed;
      background: var(--vn-bg2);
      border: 1px solid var(--vn-border2);
      border-radius: 6px;
      padding: 5px 7px;
      display: none;
      gap: 6px;
      z-index: 2147483647;
      box-shadow: 0 4px 16px rgba(0,0,0,0.7);
    }
    .vn-sel-overlay.vn-show { display: flex; }

    /* ── SETTINGS TAB ─────────────────────────────────────────────────── */
    .vn-settings-inner {
      flex: 1;
      overflow-y: auto;
      padding: 10px 12px;
    }
    .vn-setting-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 0;
      border-bottom: 1px solid var(--vn-border);
    }
    .vn-setting-row:last-child { border: none; }
    .vn-setting-label {
      font-size: 11px;
      color: var(--vn-text);
      font-family: var(--vn-mono);
    }
    .vn-setting-sub {
      font-size: 9px;
      color: var(--vn-dim);
      margin-top: 2px;
    }
    .vn-slider {
      width: 100px;
      height: 3px;
      background: var(--vn-bg3);
      border-radius: 2px;
      outline: none;
      -webkit-appearance: none;
    }
    .vn-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      background: var(--vn-text);
      border-radius: 50%;
      cursor: pointer;
    }
    .vn-slider::-moz-range-thumb {
      width: 14px; height: 14px;
      background: var(--vn-text);
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
    .vn-theme-row { display: flex; gap: 6px; }

    /* ── BUTTONS ──────────────────────────────────────────────────────── */
    .vn-btn {
      background: var(--vn-bg3);
      border: 1px solid var(--vn-border2);
      color: var(--vn-text);
      border-radius: 5px;
      padding: 7px 12px;
      cursor: pointer;
      font-size: 10px;
      font-family: var(--vn-mono);
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    .vn-btn:active { opacity: 0.75; }
    .vn-btn.vn-selected {
      background: var(--vn-red);
      border-color: var(--vn-red);
      color: #fff;
    }
    .vn-btn-sm {
      background: var(--vn-bg3);
      border: 1px solid var(--vn-border2);
      color: var(--vn-text);
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 10px;
      font-family: var(--vn-mono);
    }
    .vn-btn-sm:active { opacity: 0.7; }
    .vn-btn-ghost {
      background: none;
      border-color: transparent;
      color: var(--vn-muted);
    }
    .vn-btn-icon {
      background: none;
      border: none;
      color: var(--vn-dim);
      cursor: pointer;
      padding: 0 2px;
      font-size: 14px;
      line-height: 1;
    }
    .vn-btn-icon:active { color: var(--vn-red); }
    .vn-btn-full {
      width: 100%;
      padding: 9px;
      text-align: center;
    }
    .vn-btn-send {
      background: var(--vn-red);
      border: none;
      color: #fff;
      border-radius: 6px;
      padding: 8px 13px;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      flex-shrink: 0;
    }
    .vn-btn-send:active { opacity: 0.8; }
  `;

  document.head.appendChild(style);
}
