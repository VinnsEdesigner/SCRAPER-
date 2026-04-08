"use strict";(()=>{var k="nexus_scraper_snippets",M="nexus_scraper_session",_e="nexus_auth_token";function v(){return localStorage.getItem(_e)||null}function x(){let e=localStorage.getItem(M);return e||(e=crypto.randomUUID(),localStorage.setItem(M,e)),e}function p(){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch{return[]}}function P(e){localStorage.setItem(k,JSON.stringify(e))}function R(e){let t=p(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),P(t),o}function D(e){let t=p().filter(n=>n.number!==e);P(t)}function h(){localStorage.removeItem(k)}function Y(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=`
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
  `,document.head.appendChild(e)}var F="__venom_fab__",T="__venom_panel__",I=!1;function q(){Y();let e=document.createElement("div");e.id=F,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=T,t.innerHTML=`
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
  `,e.onclick=Se,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Se(){I=!I;let e=document.getElementById(T);e&&e.classList.toggle("vn-open",I)}function L(){return document.getElementById(F)}function b(){return document.getElementById(T)}function m(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function u(e,t,n){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var X=["agent","snippets","settings"];function J(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;K(o)}})}function K(e){if(!X.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function W(){let e=localStorage.getItem("vn_last_tab");e&&X.includes(e)&&K(e)}function y(){return{url:location.href,title:document.title||"",content:ke()}}function ke(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var G="https://vinnsedesigner-vinns-ai-backend.hf.space";async function B(e,t=[]){let n=v();if(!n)return{error:"Not authenticated \u2014 open dashboard and login first"};let o=y(),r={message:e,pageContext:o,snippets:t.map(i=>({type:i.type,text:i.text}))};try{let i=await fetch(`${G}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)}),a=await i.json();return i.ok?a.escalate===!0?await Ie(e,t,o,n):{reply:a.reply,model:a.model,escalated:!1}:{error:a.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function Ie(e,t,n,o){try{let r=await fetch(`${G}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,snippets:t.map(a=>({type:a.type,text:a.text})),stream:!1})}),i=await r.json();return r.ok?{reply:i.response||i.reply||"",model:i.model_used||i.model||"agent",escalated:!0}:{error:i.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function s(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function U(){v()?u("auth","authed","active"):u("auth","unauthed","err")}var Q=[],w=null,C="vn_chat_history";function Z(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
    <!-- History drawer (slides in from left) -->
    <div class="vn-history-drawer" id="vn-history-drawer">
      <div class="vn-history-hdr">
        <span>CHAT HISTORY</span>
        <button class="vn-btn-icon" id="vn-drawer-close">\u2715</button>
      </div>
      <button class="vn-history-new" id="vn-new-chat">\uFF0B New Chat</button>
      <div class="vn-history-list" id="vn-history-list"></div>
    </div>

    <!-- Top bar -->
    <div class="vn-agent-top">
      <button class="vn-hamburger" id="vn-hamburger">\u2630 History</button>
      <span class="vn-agent-label" id="vn-session-label">SESSION</span>
    </div>

    <!-- Scrollable conversation -->
    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        Ask me anything about this page...
      </div>
    </div>

    <!-- Inject banner (above bottom area) -->
    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject \u2197</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>

    <!-- Pinned bottom: input + actions -->
    <div class="vn-bottom-area">
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,Te(),te())}function Te(){document.getElementById("vn-send-btn")?.addEventListener("click",V),document.getElementById("vn-suggest-btn")?.addEventListener("click",Le),document.getElementById("vn-inject-btn")?.addEventListener("click",Oe),document.getElementById("vn-inject-dismiss")?.addEventListener("click",ee),document.getElementById("vn-hamburger")?.addEventListener("click",He),document.getElementById("vn-drawer-close")?.addEventListener("click",A),document.getElementById("vn-new-chat")?.addEventListener("click",Me),document.getElementById("vn-agent-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),V())}),document.getElementById("vn-convo")?.addEventListener("click",A)}async function V(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;N("user",t),e.value="",s("amber","thinking..."),u("model","thinking...","warn");let{reply:n,model:o,escalated:r,error:i}=await B(t,p());if(i){N("agent",`\u26A0 ${i}`),s("red","error"),m(i),u("model","error","err");return}N("agent",n,o),s("green",r?"done (escalated)":"done"),u("model",o||"lite","active"),Pe(t,n)}async function Le(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";s("amber","generating...");let{reply:t,error:n}=await B(e,p());if(n||!t){s("red","suggestion failed"),m("Suggestion failed: "+(n||"empty reply"));return}w=t,ze(t),s("green","ready to inject")}function N(e,t,n){Q.push({type:e,text:t});let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let i=document.createElement("div");i.className="vn-msg-label",i.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(i),Be(t).forEach(l=>r.appendChild(l)),o.appendChild(r),o.scrollTop=o.scrollHeight}function Be(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let r=o.slice(3,-3).split(`
`),i=(r[0]?.trim()||"code").toLowerCase(),a=r.slice(1).join(`
`).trim();t.push(Ne(i,a))}else if(Ae(o)){let r=document.createElement("div");r.className="vn-ascii-block",r.textContent=je(o.trim()),t.push(r)}else if(o.trim()){let r=document.createElement("span");r.textContent=o,r.style.whiteSpace="pre-wrap",t.push(r)}}),t}function Ne(e,t){let n=document.createElement("div");n.className="vn-code-block";let o=Ce(e);return n.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${o}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${ne(t)}</div>
  `,n.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{}),n.querySelector(".vn-code-copy").textContent="copied!",setTimeout(()=>{let r=n.querySelector(".vn-code-copy");r&&(r.textContent="copy")},1500)},n}function Ce(e){let t=e.toLowerCase();return["js","javascript","jsx","ts","typescript","tsx"].includes(t)?"js":["py","python"].includes(t)?"py":["sh","bash","shell","zsh"].includes(t)?"shell":["json"].includes(t)?"json":["css"].includes(t)?"css":["html"].includes(t)?"html":["sql"].includes(t)?"sql":["yaml","yml"].includes(t)?"yaml":["md","markdown"].includes(t)?"md":t||"code"}function Ae(e){let t=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(r=>t.test(r)).length>=2}function je(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function ze(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function ee(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),w=null}function Oe(){let e=w||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=$e(e);ee(),w=null,t===!1?(s("red","no input found"),m("No writable input found on this page")):s("green",t==="clipboard"?"copied to clipboard":"injected \u2197")}function $e(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function He(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),te()}function A(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function Me(){Q=[];let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        Ask me anything about this page...
      </div>
    `),A(),document.getElementById("vn-session-label").textContent="NEW SESSION"}function Pe(e,t){try{let n=JSON.parse(localStorage.getItem(C)||"[]");n.unshift({id:Date.now(),ts:new Date().toLocaleTimeString(),preview:e.slice(0,50),reply:t.slice(0,100)}),localStorage.setItem(C,JSON.stringify(n.slice(0,30)))}catch{}}function te(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(C)||"[]");if(t.length===0){e.innerHTML='<div style="padding:12px;font-size:10px;color:var(--vn-dim)">No history yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div style="color:var(--vn-text);font-size:10px;margin-bottom:3px">${ne(n.preview)}</div>
        <div style="font-size:9px;color:var(--vn-dim)">${n.ts}</div>
      </div>
    `).join("")}catch{}}function ne(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}var oe=null;function re(e){document.addEventListener("selectionchange",()=>{clearTimeout(oe),oe=setTimeout(()=>{let t=E();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=E();t&&e(t)},50)})}function E(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var ie="https://vinnsedesigner-vinns-ai-backend.hf.space";async function ae(e){let t=v(),n=p();if(!t)return e("error","Login to dashboard first"),!1;if(n.length===0)return e("error","No snippets staged"),!1;e("syncing",`Syncing ${n.length} snippets...`);try{let o=await fetch(`${ie}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:x(),snippets:n.map(i=>({number:i.number,text:i.text,type:i.type,url:i.url||location.href,title:i.title||document.title})),pageContext:y()})}),r=await o.json();return o.ok?(h(),e("success",`\u2713 ${r.saved} snippets synced`),!0):(e("error",r.message||"Sync failed"),!1)}catch{return e("error","Backend unreachable \u2014 buffered locally"),!1}}async function se(e){if(!e)return null;try{let t=await fetch(`${ie}/api/sync`,{headers:{Authorization:`Bearer ${e}`}});return t.ok?(await t.json()).settings:null}catch{return null}}var d=null;function le(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
    <div class="vn-snippets-inner">
      <div class="vn-sections">
        <div class="vn-section">
          <div class="vn-sec-hdr">
            REPO
            <span class="vn-badge" id="vn-repo-count">0</span>
          </div>
          <div class="vn-snip-list" id="vn-repo-list"></div>
        </div>

        <div class="vn-section">
          <div class="vn-sec-hdr">
            RESEARCH
            <span class="vn-badge" id="vn-research-count">0</span>
          </div>
          <div class="vn-snip-list" id="vn-research-list"></div>
        </div>
      </div>
    </div>

    <div style="padding:8px 12px;border-top:1px solid var(--vn-border);background:var(--vn-bg2);flex-shrink:0;">
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">\u21C5 SYNC TO BACKEND</button>
    </div>
  `,Re(),De(),g())}function Re(){d||(d=document.createElement("div"),d.className="vn-sel-overlay",d.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(d),d.querySelector("#vn-sel-repo").onclick=()=>de("code"),d.querySelector("#vn-sel-research").onclick=()=>de("research"),document.addEventListener("click",e=>{d.contains(e.target)||j()}))}function ce(e){!d||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();d.style.top=`${n.bottom+8}px`,d.style.left=`${Math.max(0,n.left)}px`,d.classList.add("vn-show")},300)}function j(){d?.classList.remove("vn-show")}function de(e){let t=E();if(!t)return;let n=p(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");if(n.length>=o){s("red",`Max ${o} snippets`),m(`Snippet limit (${o}) reached \u2014 sync or clear first`),j();return}R({text:t,type:e,url:location.href,title:document.title}),g(),j(),s("green",`#${n.length+1} staged`)}function De(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await ae((e,t)=>{s(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&m(t),e==="success"&&g()})})}function g(){let e=p(),t=e.filter(c=>c.type==="code"),n=e.filter(c=>c.type==="research"),o=document.getElementById("vn-repo-list"),r=document.getElementById("vn-research-list"),i=document.getElementById("vn-repo-count"),a=document.getElementById("vn-research-count");i&&(i.textContent=t.length),a&&(a.textContent=n.length),u("snippets",`${e.length} snippets`,e.length>0?"active":"");let l=(c,f)=>{c&&(c.innerHTML=f.length===0?'<div style="font-size:10px;color:var(--vn-dim);padding:4px 0">\u2014</div>':f.map(Ye).join(""),c.querySelectorAll(".vn-btn-icon").forEach(H=>{H.onclick=()=>{D(Number(H.dataset.num)),g()}}))};l(o,t),l(r,n)}function Ye(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${Fe(e.text.slice(0,55))}</span>
      <span class="vn-snip-type">${e.type}</span>
      <button class="vn-btn-icon" data-num="${e.number}">\u{1F5D1}</button>
    </div>
  `}function Fe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function pe(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
  `,qe()}function qe(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),i=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let a=e.value;t.textContent=`${a}vh`;let l=b();l&&(l.style.height=`${a}vh`),localStorage.setItem("vn_panel_height",a)}),n?.addEventListener("click",()=>{ve("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{ve("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let a=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",a),r.value=a}),i?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(h(),g())})}function ve(e){let t=b();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var _=!1,ue,ge,z,O,S=!1,me,be;function fe(){Xe(),Je()}function Xe(){let e=L();if(!e)return;function t(r,i){_=!0,ue=r,ge=i;let a=e.getBoundingClientRect();z=a.left,O=a.top,e.style.right="auto",e.style.bottom="auto",e.style.left=z+"px",e.style.top=O+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,i){if(!_)return;let a=r-ue,l=i-ge,c=Math.max(0,Math.min(window.innerWidth-56,z+a)),f=Math.max(0,Math.min(window.innerHeight-56,O+l));e.style.left=c+"px",e.style.top=f+"px",localStorage.setItem("vn_fab_left",c),localStorage.setItem("vn_fab_top",f)}function o(){_=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let i=r.touches[0];t(i.clientX,i.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!_)return;r.preventDefault();let i=r.touches[0];n(i.clientX,i.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function Je(){let e=document.getElementById("vn-drag-handle"),t=b();if(!e||!t)return;function n(i){S=!0,me=i,be=t.offsetHeight}function o(i){if(!S)return;let a=me-i,l=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,be+a));t.style.height=l+"px",localStorage.setItem("vn_panel_height",Math.round(l/window.innerHeight*100))}function r(){S=!1}e.addEventListener("mousedown",i=>{i.preventDefault(),n(i.clientY)}),document.addEventListener("mousemove",i=>o(i.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",i=>{n(i.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{S&&(i.preventDefault(),o(i.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function xe(){let e=L();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function he(){let e=b();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}var Ke=15e3,$=null;function ye(){$=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval($),$=null;return}let e=v(),t=await se(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),g())},Ke)}function we(){document.getElementById("__venom_fab__")||(q(),J(),Z(),le(),pe(),fe(),xe(),he(),W(),re(e=>ce(e)),U(),ye(),s("green","ready"))}function Ee(){let e=v();x(),we(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Ee()})();})();
