"use strict";(()=>{var N="nexus_scraper_snippets",D="nexus_scraper_session",Be="nexus_auth_token";function p(){return localStorage.getItem(Be)||null}function y(){let e=localStorage.getItem(D);return e||(e=crypto.randomUUID(),localStorage.setItem(D,e)),e}function v(){try{return JSON.parse(localStorage.getItem(N)||"[]")}catch{return[]}}function w(e){localStorage.setItem(N,JSON.stringify(e))}function Y(e){let t=v(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),w(t),o}function q(e){let t=v().filter(n=>n.number!==e);w(t)}function E(){localStorage.removeItem(N)}function F(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

    /* \u2500\u2500 CSS VARS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 LIGHT MODE OVERRIDE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 FAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 PANEL \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 DRAG HANDLE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 HEADER / LOGO BAR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 TABS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 TAB CONTENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .vn-tab-content {
      flex: 1;
      overflow-y: auto;
      display: none;
      flex-direction: column;
      min-height: 0;
    }
    .vn-tab-content.vn-active { display: flex; }

    /* \u2500\u2500 WARN BANNER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 AGENT TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* Input row \u2014 pinned bottom */
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

    /* \u2500\u2500 SNIPPETS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 SETTINGS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 BUTTONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  `,document.head.appendChild(e)}var U="__venom_fab__",j="__venom_panel__",C=!1;function J(){F();let e=document.createElement("div");e.id=U,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=j,t.innerHTML=`
    <div class="vn-drag-handle" id="vn-drag-handle"></div>

    <div class="vn-header">
      <span class="vn-logo"><span class="vn-logo-icon">\u{1F577}\uFE0F</span>VENOM</span>
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
      <span class="vn-warn-icon">\u26A0</span>
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
  `,e.onclick=Le,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Le(){C=!C;let e=document.getElementById(j);e&&e.classList.toggle("vn-open",C)}function z(){return document.getElementById(U)}function x(){return document.getElementById(j)}function f(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function u(e,t,n){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var X=["agent","snippets","settings"];function Z(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;K(o)}})}function K(e){if(!X.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function W(){let e=localStorage.getItem("vn_last_tab");e&&X.includes(e)&&K(e)}function _(){return{url:location.href,title:document.title||"",content:Ae()}}function Ae(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var G="https://vinnsedesigner-vinns-ai-backend.hf.space";async function $(e,t=[],n=[]){let o=p();if(!o)return{error:"Not authenticated \u2014 open dashboard and login first"};let r=_(),i=n.slice(-10),s={message:e,pageContext:r,history:i,snippets:t.map(a=>({type:a.type,text:a.text}))};try{let a=await fetch(`${G}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(s)}),d=await a.json();return a.ok?d.escalate===!0?await Ne(e,t,r,o,i):{reply:d.reply,model:d.model,escalated:!1}:{error:d.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function Ne(e,t,n,o,r){try{let i=await fetch(`${G}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,history:r,snippets:t.map(a=>({type:a.type,text:a.text})),stream:!1})}),s=await i.json();return i.ok?{reply:s.response||s.reply||"",model:s.model_used||s.model||"agent",escalated:!0}:{error:s.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function l(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function V(){p()?u("auth","authed","active"):u("auth","unauthed","err")}var m=[],k=null,I=Date.now(),T="vn_chat_sessions";function ee(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
    <div class="vn-history-drawer" id="vn-history-drawer">
      <div class="vn-history-hdr">
        <span>CHAT HISTORY</span>
        <button class="vn-btn-icon" id="vn-drawer-close">\u2715</button>
      </div>
      <button class="vn-history-new" id="vn-new-chat">\uFF0B New Chat</button>
      <div class="vn-history-list" id="vn-history-list"></div>
    </div>

    <div class="vn-agent-top">
      <button class="vn-hamburger" id="vn-hamburger">\u2630</button>
      <span class="vn-agent-label" id="vn-session-label">NEW SESSION</span>
    </div>

    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Ask me anything about this page...</span>
      </div>
    </div>

    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject \u2197</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>

    <div class="vn-bottom-area">
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,Ce(),ne())}function Ce(){document.getElementById("vn-send-btn")?.addEventListener("click",Q),document.getElementById("vn-suggest-btn")?.addEventListener("click",je),document.getElementById("vn-inject-btn")?.addEventListener("click",Ye),document.getElementById("vn-inject-dismiss")?.addEventListener("click",te),document.getElementById("vn-hamburger")?.addEventListener("click",Fe),document.getElementById("vn-drawer-close")?.addEventListener("click",O),document.getElementById("vn-new-chat")?.addEventListener("click",Ue),document.getElementById("vn-agent-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),Q())})}async function Q(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;m.push({role:"user",content:t}),S("user",t),e.value="",l("amber","thinking..."),u("model","thinking...","warn");let{reply:n,model:o,escalated:r,error:i}=await $(t,v(),m);if(i){S("agent",`\u26A0 ${i}`),l("red","error"),f(i),u("model","error","err"),m.push({role:"assistant",content:`\u26A0 ${i}`});return}m.push({role:"assistant",content:n}),S("agent",n,o),l("green",r?"done (escalated)":"done"),u("model",o||"lite","active"),Je(m)}async function je(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";l("amber","generating...");let{reply:t,error:n}=await $(e,v(),m);if(n||!t){l("red","suggestion failed"),f("Suggestion failed: "+(n||"empty reply"));return}k=t,De(t),l("green","ready to inject")}function S(e,t,n){let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let i=document.createElement("div");i.className="vn-msg-label",i.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(i),ze(t).forEach(s=>r.appendChild(s)),o.appendChild(r),o.scrollTop=o.scrollHeight}function ze(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let r=o.slice(3,-3),i=r.indexOf(`
`),s=i>=0?r.slice(0,i).trim():"",a=i>=0?r.slice(i+1).trim():r.trim();t.push($e(s,a))}else if(Pe(o)){let r=document.createElement("pre");r.className="vn-ascii-block",r.textContent=Re(o.trim()),t.push(r)}else if(o.trim()){let r=document.createElement("span");r.textContent=o,r.style.whiteSpace="pre-wrap",t.push(r)}}),t}function $e(e,t){let n=He(e,t),o=document.createElement("div");o.className="vn-code-block";let r=Oe(t,n);return o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${r}</div>
  `,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let i=o.querySelector(".vn-code-copy");i.textContent="copied!",setTimeout(()=>{i&&(i.textContent="copy")},1500)},o}function Oe(e,t){let n=oe(e);return Me(t).forEach(([r,i])=>{n=n.replace(r,s=>`<span class="sh-${i}">${s}</span>`)}),n}function Me(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\/\/[^\n]*/g,"cmt"],o=[/#[^\n]*/g,"cmt"],r=[/\b(\d+\.?\d*)\b/g,"num"],i=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[n,t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[o,t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,"fn"]]:["sh","bash","shell","zsh"].includes(e)?[o,t,[/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_][a-zA-Z0-9_]*/g,"var"],r]:e==="json"?[t,[/\b(true|false|null)\b/g,"kw2"],r]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/([a-zA-Z-]+)\s*:/g,"kw"],[/#[0-9a-fA-F]{3,6}\b/g,"num"],r]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],t]:[t,r,i]}function He(e,t){let n=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",zsh:"sh",json:"json",css:"css",html:"html",sql:"sql",yaml:"yaml",yml:"yaml",md:"md",markdown:"md",cpp:"cpp",c:"c",java:"java",rs:"rs",go:"go",rb:"rb"};return o[n]?o[n]:/^\s*\{[\s\S]*\}\s*$/.test(t)&&/"[^"]+"\s*:/.test(t)?"json":/^<(!DOCTYPE|html|head|body|div|span|p )/i.test(t.trim())?"html":/(def |import |from .* import|print\(|elif |:\s*$)/m.test(t)?"py":/(const |let |var |function |=>|require\(|module\.exports)/m.test(t)?"js":/(#!\/bin\/(bash|sh)|echo |grep |awk |sed |curl |npm |git )/m.test(t)?"sh":/SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(t)?"sql":/^\s*[\w-]+\s*:/m.test(t)&&!/{/.test(t)?"yaml":/^(\/\/|\/\*|#include|using namespace|public class|fn |impl )/m.test(t)?"code":n||"code"}function Pe(e){let t=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(o=>t.test(o)).length>=2}function Re(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function De(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function te(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),k=null}function Ye(){let e=k||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=qe(e);te(),k=null,t===!1?(l("red","no input found"),f("No writable input found on this page")):l("green",t==="clipboard"?"copied to clipboard":"injected \u2197")}function qe(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function Fe(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),ne()}function O(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function Ue(){m=[],I=Date.now();let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Ask me anything about this page...</span>
      </div>
    `);let t=document.getElementById("vn-session-label");t&&(t.textContent="NEW SESSION"),O()}function Je(e){if(!(!e||e.length===0))try{let t=JSON.parse(localStorage.getItem(T)||"[]"),n=t.findIndex(i=>i.id===I),o=e.find(i=>i.role==="user")?.content?.slice(0,60)||"Chat",r={id:I,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};n>=0?t[n]=r:t.unshift(r),localStorage.setItem(T,JSON.stringify(t.slice(0,20)))}catch{}}function ne(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(T)||"[]");if(t.length===0){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${oe(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>
    `).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>Xe(Number(n.dataset.id))})}catch{}}function Xe(e){try{let n=JSON.parse(localStorage.getItem(T)||"[]").find(i=>i.id===e);if(!n)return;m=n.messages.slice(),I=n.id;let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",m.forEach(i=>{S(i.role==="user"?"user":"agent",i.content)});let r=document.getElementById("vn-session-label");r&&(r.textContent=n.preview.slice(0,20)+"..."),O()}catch{}}function oe(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}var re=null;function ie(e){document.addEventListener("selectionchange",()=>{clearTimeout(re),re=setTimeout(()=>{let t=B();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=B();t&&e(t)},50)})}function B(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var se="https://vinnsedesigner-vinns-ai-backend.hf.space";async function ae(e){let t=p(),n=v();if(!t)return e("error","Login to dashboard first"),!1;if(n.length===0)return e("error","No snippets staged"),!1;e("syncing",`Syncing ${n.length} snippets...`);try{let o=await fetch(`${se}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:y(),snippets:n.map(i=>({number:i.number,text:i.text,type:i.type,url:i.url||location.href,title:i.title||document.title})),pageContext:_()})}),r=await o.json();return o.ok?(E(),e("success",`\u2713 ${r.saved} snippets synced`),!0):(e("error",r.message||"Sync failed"),!1)}catch{return e("error","Backend unreachable \u2014 buffered locally"),!1}}async function le(e){if(!e)return null;try{let t=await fetch(`${se}/api/sync`,{headers:{Authorization:`Bearer ${e}`}});return t.ok?(await t.json()).settings:null}catch{return null}}var c=null,b=[];function ve(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
    <div class="vn-snippets-inner">
      <div class="vn-sections">
        <div class="vn-section">
          <div class="vn-sec-hdr">REPO <span class="vn-badge" id="vn-repo-count">0</span></div>
          <div class="vn-snip-list" id="vn-repo-list"></div>
        </div>
        <div class="vn-section">
          <div class="vn-sec-hdr">RESEARCH <span class="vn-badge" id="vn-research-count">0</span></div>
          <div class="vn-snip-list" id="vn-research-list"></div>
        </div>
      </div>

      <!-- Undo bar (hidden by default) -->
      <div class="vn-undo-bar" id="vn-undo-bar">
        <span id="vn-undo-text">Snippet removed</span>
        <button class="vn-btn-sm" id="vn-undo-btn">Undo</button>
      </div>
    </div>

    <div class="vn-snip-footer">
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">\u21C5 SYNC TO BACKEND</button>
    </div>

    <!-- View modal -->
    <div class="vn-modal-overlay" id="vn-view-modal">
      <div class="vn-modal">
        <div class="vn-modal-hdr">
          <span id="vn-modal-title">SNIPPET</span>
          <button class="vn-btn-icon" id="vn-modal-close">\u2715</button>
        </div>
        <div class="vn-modal-body" id="vn-modal-body"></div>
      </div>
    </div>
  `,We(),Ze(),Ge(),g())}function Ze(){document.getElementById("vn-modal-close")?.addEventListener("click",de),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&de()})}function Ke(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");!t||!o||(n.textContent=`#${e.number} \xB7 ${e.type} \xB7 ${e.title||"snippet"}`,o.textContent=e.text,t.classList.add("vn-show"))}function de(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}function We(){c||(c=document.createElement("div"),c.className="vn-sel-overlay",c.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(c),c.querySelector("#vn-sel-repo").onclick=()=>ce("code"),c.querySelector("#vn-sel-research").onclick=()=>ce("research"),document.addEventListener("click",e=>{c.contains(e.target)||M()}))}function pe(e){!c||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();c.style.top=`${n.bottom+8}px`,c.style.left=`${Math.max(0,n.left)}px`,c.classList.add("vn-show")},300)}function M(){c?.classList.remove("vn-show")}function ce(e){let t=B();if(!t)return;let n=v(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");if(n.length>=o){l("red",`Max ${o} snippets`),f(`Snippet limit (${o}) reached \u2014 sync or clear first`),M();return}Y({text:t,type:e,url:location.href,title:document.title}),g(),M(),l("green",`#${n.length+1} staged`)}function Ge(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await ae((e,t)=>{l(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&f(t),e==="success"&&g()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",Qe)}function Ve(e){let n=v().find(r=>r.number===e);if(!n)return;q(e),g();let o={snippet:n,timer:null};b.push(o),ue(`Snippet #${e} removed`),o.timer=setTimeout(()=>{b=b.filter(r=>r.snippet.number!==e),b.length===0&&me()},5e3)}function Qe(){let e=b.pop();if(!e)return;clearTimeout(e.timer);let t=v();t.push(e.snippet),t.sort((n,o)=>n.number-o.number),w(t),g(),b.length===0?me():ue(`Snippet #${b[b.length-1].snippet.number} removed`)}function ue(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function me(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function g(){let e=v(),t=e.filter(s=>s.type==="code"),n=e.filter(s=>s.type==="research"),o=document.getElementById("vn-repo-list"),r=document.getElementById("vn-research-list");document.getElementById("vn-repo-count")&&(document.getElementById("vn-repo-count").textContent=t.length),document.getElementById("vn-research-count")&&(document.getElementById("vn-research-count").textContent=n.length),u("snippets",`${e.length} snippets`,e.length>0?"active":"");let i=(s,a)=>{s&&(s.innerHTML=a.length===0?'<div class="vn-snip-empty">\u2014</div>':a.map(et).join(""),s.querySelectorAll(".vn-snip-view").forEach(d=>{d.onclick=()=>{let h=e.find(Te=>Te.number===Number(d.dataset.num));h&&Ke(h)}}),s.querySelectorAll(".vn-snip-del").forEach(d=>{d.onclick=()=>Ve(Number(d.dataset.num))}))};i(o,t),i(r,n)}function et(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${tt(e.text.slice(0,45))}</span>
      <span class="vn-snip-type">${e.type}</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del vn-btn-icon"  data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function tt(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function be(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
    <div class="vn-settings-inner">
      <div class="vn-setting-row">
        <div>
          <div class="vn-setting-label">Panel Height</div>
          <div class="vn-setting-sub" id="vn-height-val">${t}vh</div>
        </div>
        <input type="range" class="vn-slider" id="vn-height-slider" min="25" max="85" value="${t}">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Theme</div>
        <div class="vn-theme-row">
          <button class="vn-btn ${n==="oled"?"vn-selected":""}" id="vn-theme-oled">OLED</button>
          <button class="vn-btn ${n==="light"?"vn-selected":""}" id="vn-theme-light">Light</button>
        </div>
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Snippet Limit</div>
        <input type="number" class="vn-input" id="vn-snippet-limit"
          value="${o}" min="1" max="100"
          style="width:60px;padding:6px 8px;">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Clear Snippets</div>
        <button class="vn-btn" id="vn-clear-snippets" style="color:var(--vn-red);border-color:var(--vn-red)">
          Clear All
        </button>
      </div>
    </div>
  `,nt()}function nt(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),i=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let s=e.value;t.textContent=`${s}vh`;let a=x();a&&(a.style.height=`${s}vh`),localStorage.setItem("vn_panel_height",s)}),n?.addEventListener("click",()=>{ge("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{ge("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let s=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",s),r.value=s}),i?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(E(),g())})}function ge(e){let t=x();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var L=!1,fe,xe,H,P,A=!1,he,ye;function we(){ot(),rt()}function ot(){let e=z();if(!e)return;function t(r,i){L=!0,fe=r,xe=i;let s=e.getBoundingClientRect();H=s.left,P=s.top,e.style.right="auto",e.style.bottom="auto",e.style.left=H+"px",e.style.top=P+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,i){if(!L)return;let s=r-fe,a=i-xe,d=Math.max(0,Math.min(window.innerWidth-56,H+s)),h=Math.max(0,Math.min(window.innerHeight-56,P+a));e.style.left=d+"px",e.style.top=h+"px",localStorage.setItem("vn_fab_left",d),localStorage.setItem("vn_fab_top",h)}function o(){L=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let i=r.touches[0];t(i.clientX,i.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!L)return;r.preventDefault();let i=r.touches[0];n(i.clientX,i.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function rt(){let e=document.getElementById("vn-drag-handle"),t=x();if(!e||!t)return;function n(i){A=!0,he=i,ye=t.offsetHeight}function o(i){if(!A)return;let s=he-i,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,ye+s));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){A=!1}e.addEventListener("mousedown",i=>{i.preventDefault(),n(i.clientY)}),document.addEventListener("mousemove",i=>o(i.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",i=>{n(i.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{A&&(i.preventDefault(),o(i.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function Ee(){let e=z();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function _e(){let e=x();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}var it=15e3,R=null;function Se(){R=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(R),R=null;return}let e=p(),t=await le(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),g())},it)}function ke(){document.getElementById("__venom_fab__")||(J(),Z(),ee(),ve(),be(),we(),Ee(),_e(),W(),ie(e=>pe(e)),V(),Se(),l("green","ready"))}function Ie(){let e=p();y(),ke(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Ie()})();})();
