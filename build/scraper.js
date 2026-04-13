"use strict";(()=>{var $t=Object.defineProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var N=(e,t)=>{for(var n in t)$t(e,n,{get:t[n],enumerable:!0})};var R={};N(R,{addSnippet:()=>G,clearSnippets:()=>j,getSessionId:()=>L,getSnippets:()=>m,getToken:()=>u,removeSnippet:()=>Q,resetSession:()=>At,saveSnippets:()=>M,setToken:()=>Bt});function u(){return localStorage.getItem(_e)||null}function Bt(e){localStorage.setItem(_e,e)}function L(){let e=localStorage.getItem(Z);return e||(e=crypto.randomUUID(),localStorage.setItem(Z,e)),e}function At(){localStorage.removeItem(Z),localStorage.removeItem(H)}function m(){try{return JSON.parse(localStorage.getItem(H)||"[]")}catch{return[]}}function M(e){localStorage.setItem(H,JSON.stringify(e))}function G(e){let t=m(),n=t.length>0?Math.max(...t.map(r=>r.number||0))+1:1,s={...e,number:n,created_at:Date.now()};return t.push(s),M(t),s}function Q(e){let t=m().filter(n=>n.number!==e);M(t)}function j(){localStorage.removeItem(H)}var H,Z,_e,f=v(()=>{"use strict";H="nexus_scraper_snippets",Z="nexus_scraper_session",_e="nexus_auth_token"});var ke,Ie=v(()=>{ke=`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --vn-bg:      #0a0a0a;
  --vn-bg2:     #111111;
  --vn-bg3:     #1a1a1a;
  --vn-border:  #222222;
  --vn-border2: #2e2e2e;
  --vn-text:    #ffffff;
  --vn-muted:   #888888;
  --vn-dim:     #444444;
  --vn-red:     #ef4444;
  --vn-red-dim: rgba(239,68,68,0.12);
  --vn-amber:   #f59e0b;
  --vn-cyan:    #22d3ee;
  --vn-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* Syntax highlight tokens */
  --sh-kw:  #ff7b72;
  --sh-kw2: #79c0ff;
  --sh-str: #a5d6ff;
  --sh-cmt: #484f58;
  --sh-num: #f2cc60;
  --sh-fn:  #d2a8ff;
  --sh-cls: #ffa657;
  --sh-var: #79c0ff;
}

#__venom_panel__.vn-theme-light {
  --vn-bg:      #ffffff;
  --vn-bg2:     #f5f5f5;
  --vn-bg3:     #ebebeb;
  --vn-border:  #d0d0d0;
  --vn-border2: #c0c0c0;
  --vn-text:    #000000;
  --vn-muted:   #555555;
  --vn-dim:     #999999;
}
`});var Le,Te=v(()=>{Le=`
#__venom_fab__ {
  position: fixed;
  bottom: 80px; right: 20px;
  width: 52px; height: 52px;
  background: #0a0a0a;
  border: 1.5px solid #2e2e2e;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 2147483646;
  box-shadow: 0 0 0 1px rgba(239,68,68,0.25), 0 4px 20px rgba(0,0,0,0.7);
  user-select: none;
  touch-action: none;
}
#__venom_fab__.vn-dragging { opacity: 0.9; }

.vn-fab-dot {
  position: absolute; top: 3px; right: 3px;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #333;
  border: 1.5px solid #0a0a0a;
  transition: background 0.2s;
}
.vn-fab-dot.vn-green { background: var(--vn-cyan); box-shadow: 0 0 6px var(--vn-cyan); }
.vn-fab-dot.vn-amber { background: var(--vn-amber); box-shadow: 0 0 6px var(--vn-amber); }
.vn-fab-dot.vn-red   { background: var(--vn-red);   box-shadow: 0 0 6px var(--vn-red); }
`});var $e,Be=v(()=>{$e=`
#__venom_panel__ {
  position: fixed; left: 0; bottom: 0;
  width: 100vw; height: 55vh;
  background: var(--vn-bg);
  border-top: 1.5px solid var(--vn-border2);
  font-family: var(--vn-mono);
  font-size: 13px; color: var(--vn-text);
  z-index: 2147483645;
  display: none; flex-direction: column;
  box-shadow: 0 -8px 40px rgba(0,0,0,0.85);
}
#__venom_panel__.vn-open { display: flex; }

.vn-drag-handle {
  width: 100%; height: 18px;
  background: var(--vn-bg2);
  cursor: ns-resize;
  display: flex; align-items: center; justify-content: center;
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0;
}
.vn-drag-handle::after {
  content: ''; width: 36px; height: 3px;
  background: var(--vn-border2); border-radius: 2px;
}

.vn-header {
  display: flex; align-items: center; justify-content: center;
  padding: 7px 12px;
  background: var(--vn-bg2);
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0;
}
.vn-logo {
  font-family: var(--vn-mono);
  font-size: 15px; font-weight: 700;
  letter-spacing: 4px; color: var(--vn-red);
  text-transform: uppercase;
}

.vn-status-bar {
  display: flex; gap: 6px; align-items: center;
  padding: 4px 10px;
  background: var(--vn-bg);
  border-bottom: 1px solid var(--vn-border);
  overflow-x: auto; scrollbar-width: none;
  flex-shrink: 0;
}
.vn-status-bar::-webkit-scrollbar { display: none; }
.vn-badge-pill {
  display: flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 100px;
  border: 1px solid var(--vn-border);
  font-size: 11px; font-family: var(--vn-mono);
  color: var(--vn-muted); white-space: nowrap;
  background: var(--vn-bg2);
}
.vn-badge-pill .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--vn-dim); }
.vn-badge-pill.active .dot { background: var(--vn-cyan); box-shadow: 0 0 4px var(--vn-cyan); }
.vn-badge-pill.warn .dot   { background: var(--vn-amber); }
.vn-badge-pill.err .dot    { background: var(--vn-red); }
.vn-badge-pill.active { color: var(--vn-text); border-color: var(--vn-border2); }
.vn-badge-pill.err    { color: var(--vn-red); border-color: var(--vn-red); background: var(--vn-red-dim); }

.vn-warn-banner {
  margin: 6px 10px 0;
  padding: 7px 10px;
  background: var(--vn-red-dim);
  border: 1px solid var(--vn-red);
  border-radius: 5px;
  font-size: 12px; color: var(--vn-red);
  font-family: var(--vn-mono);
  display: none; align-items: center; gap: 6px;
  flex-shrink: 0;
}
.vn-warn-banner.vn-show { display: flex; }

.vn-tabs {
  display: flex;
  background: var(--vn-bg2);
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0;
}
.vn-tab {
  flex: 1;
  background: none;
  border: none;
  border-right: 1px solid var(--vn-border);
  color: var(--vn-muted);
  padding: 11px 0;
  cursor: pointer;
  font-size: 11px; font-family: var(--vn-mono);
  font-weight: 600; text-align: center;
  letter-spacing: 0.8px; text-transform: uppercase;
  border-bottom: 2px solid transparent;
}
.vn-tab:last-child { border-right: none; }
.vn-tab.vn-active {
  color: var(--vn-text);
  border-bottom-color: var(--vn-red);
  background: var(--vn-bg3);
}

.vn-tab-content {
  flex: 1; overflow-y: auto;
  display: none; flex-direction: column;
  min-height: 0;
}
.vn-tab-content.vn-active { display: flex; }
`});var Ae,Ce=v(()=>{Ae=`
.vn-agent-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 12px;
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0; gap: 8px;
}
.vn-agent-label { font-size: 11px; color: var(--vn-muted); letter-spacing: 0.5px; flex: 1; }
.vn-hamburger {
  background: none;
  border: 1px solid var(--vn-border);
  color: var(--vn-muted);
  border-radius: 4px; padding: 4px 10px;
  cursor: pointer; font-size: 13px; font-family: var(--vn-mono);
  flex-shrink: 0;
}

/* Model pin pill \u2014 shows when /model is active */
.vn-model-pill {
  font-size: 10px;
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(239,68,68,0.4);
  color: var(--vn-red);
  border-radius: 100px;
  padding: 2px 8px;
  font-family: var(--vn-mono);
  white-space: nowrap;
  flex-shrink: 0;
}

.vn-history-drawer {
  position: absolute; top: 0; left: 0;
  width: 78%; height: 100%;
  background: var(--vn-bg2);
  border-right: 1px solid var(--vn-border2);
  z-index: 10;
  display: none; flex-direction: column; overflow: hidden;
}
.vn-history-drawer.vn-open { display: flex; }
.vn-history-hdr {
  padding: 12px 14px;
  border-bottom: 1px solid var(--vn-border);
  font-size: 12px; font-weight: 600;
  color: var(--vn-muted); letter-spacing: 1px;
  display: flex; justify-content: space-between; align-items: center;
}
.vn-history-new {
  margin: 10px; padding: 9px;
  background: none;
  border: 1px solid var(--vn-border2); border-radius: 5px;
  color: var(--vn-text); font-size: 12px; font-family: var(--vn-mono);
  cursor: pointer; text-align: center;
}
.vn-history-new:active { opacity: 0.7; }
.vn-history-list { flex: 1; overflow-y: auto; }
.vn-history-item { padding: 10px 14px; border-bottom: 1px solid var(--vn-border); cursor: pointer; }
.vn-history-item:active { background: var(--vn-bg3); }
.vn-history-preview { font-size: 12px; color: var(--vn-text); margin-bottom: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vn-history-meta    { font-size: 10px; color: var(--vn-dim); }
.vn-history-empty   { padding: 14px; font-size: 12px; color: var(--vn-dim); }

.vn-convo {
  flex: 1; overflow-y: auto; padding: 12px;
  display: flex; flex-direction: column; gap: 10px; min-height: 0;
}
.vn-msg {
  max-width: 90%; padding: 9px 12px; border-radius: 10px;
  font-size: 13px; line-height: 1.6; font-family: var(--vn-mono);
  word-break: break-word;
}
.vn-msg-user {
  align-self: flex-end;
  background: var(--vn-bg3);
  border: 1.5px solid var(--vn-red);
  color: var(--vn-text);
  border-bottom-right-radius: 3px;
}
.vn-msg-agent {
  align-self: flex-start;
  background: var(--vn-bg2);
  border: 1.5px solid var(--vn-border2);
  color: var(--vn-muted);
  border-bottom-left-radius: 3px;
}
.vn-msg-label {
  font-size: 10px; color: var(--vn-dim);
  margin-bottom: 5px; letter-spacing: 0.5px; font-weight: 600;
}
.vn-msg-user .vn-msg-label { color: var(--vn-red); text-align: right; }

.vn-inject-banner {
  margin: 0 10px 6px;
  background: rgba(124,58,237,0.08);
  border: 1px solid #7c3aed; border-radius: 6px;
  padding: 9px 11px; display: none; flex-shrink: 0;
}
.vn-inject-banner.vn-show { display: block; }
.vn-inject-text {
  font-size: 12px; color: var(--vn-text);
  margin-bottom: 8px; line-height: 1.5; font-family: var(--vn-mono);
}
.vn-inject-row { display: flex; gap: 6px; }

/* \u2500\u2500 SLASH COMMAND POPUP \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Appears above the input row when user types / */
.vn-slash-popup {
  position: absolute;
  bottom: 100%;          /* sits just above the bottom-area */
  left: 0; right: 0;
  background: var(--vn-bg2);
  border: 1px solid var(--vn-border2);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  z-index: 50;
  max-height: 180px;
  overflow-y: auto;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.6);
}
.vn-slash-list {
  display: flex; flex-direction: column;
}
.vn-slash-item {
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid var(--vn-border);
  transition: background 0.1s;
}
.vn-slash-item:last-child { border-bottom: none; }
.vn-slash-item:hover,
.vn-slash-item:active { background: var(--vn-bg3); }
.vn-slash-cmd {
  font-size: 12px;
  color: var(--vn-text);
  font-family: var(--vn-mono);
  letter-spacing: 0.3px;
}
/* \u2500\u2500 END SLASH POPUP \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.vn-bottom-area {
  padding: 9px 12px;
  border-top: 1px solid var(--vn-border);
  background: var(--vn-bg2); flex-shrink: 0;
  display: flex; flex-direction: column; gap: 7px;
  position: relative;  /* needed for slash popup absolute positioning */
}
.vn-input-row { display: flex; gap: 7px; align-items: flex-end; }
.vn-input {
  flex: 1; background: var(--vn-bg);
  border: 1px solid var(--vn-border2); border-radius: 6px;
  color: var(--vn-text); padding: 9px 11px;
  font-size: 13px; font-family: var(--vn-mono);
  resize: none; outline: none; line-height: 1.5;
}
.vn-input::placeholder { color: var(--vn-dim); }
.vn-input:focus { box-shadow: 0 0 0 1px rgba(239,68,68,0.3); }

.vn-sel-overlay {
  position: fixed; background: var(--vn-bg2);
  border: 1px solid var(--vn-border2); border-radius: 6px;
  padding: 5px 7px; display: none; gap: 6px;
  z-index: 2147483647; box-shadow: 0 4px 16px rgba(0,0,0,0.7);
}
.vn-sel-overlay.vn-show { display: flex; }
`});var ze,Ne=v(()=>{ze=`
.vn-code-block {
  margin-top: 8px; background: #0d0d0d;
  border: 1px solid var(--vn-border2); border-radius: 6px;
  overflow: hidden; max-width: 100%;
}
.vn-code-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 5px 10px;
  background: var(--vn-bg3);
  border-bottom: 1px solid var(--vn-border);
}
.vn-code-lang {
  font-size: 10px; color: var(--vn-red);
  font-family: var(--vn-mono); font-weight: 700; letter-spacing: 0.5px;
}
.vn-code-copy {
  background: none; border: none;
  color: var(--vn-dim); font-size: 11px;
  cursor: pointer; font-family: var(--vn-mono); padding: 2px 6px;
}
.vn-code-copy:active { color: var(--vn-text); }
.vn-code-body {
  padding: 10px 12px;
  font-size: 12px; font-family: var(--vn-mono);
  color: #e6edf3; overflow-x: auto;
  white-space: pre; line-height: 1.6; tab-size: 2;
}

/* Syntax token colors */
.sh-kw  { color: var(--sh-kw);  font-weight: 600; }
.sh-kw2 { color: var(--sh-kw2); }
.sh-str { color: var(--sh-str); }
.sh-cmt { color: var(--sh-cmt); font-style: italic; }
.sh-num { color: var(--sh-num); }
.sh-fn  { color: var(--sh-fn);  }
.sh-cls { color: var(--sh-cls); }
.sh-var { color: var(--sh-var); }

.vn-ascii-block {
  margin-top: 8px; background: #0d0d0d;
  border: 1px solid var(--vn-border);
  border-left: 2px solid var(--vn-dim); border-radius: 4px;
  padding: 10px 12px;
  font-size: 12px; font-family: var(--vn-mono);
  color: var(--vn-muted); white-space: pre;
  overflow-x: auto; line-height: 1.7;
}
`});var Me,je=v(()=>{Me=`
.vn-snippets-inner {
  flex: 1; overflow-y: auto; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 10px;
}
.vn-snip-footer {
  padding: 8px 12px;
  border-top: 1px solid var(--vn-border);
  background: var(--vn-bg2); flex-shrink: 0;
}
.vn-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.vn-section {
  background: var(--vn-bg2); border: 1px solid var(--vn-border);
  border-radius: 6px; padding: 9px;
}
.vn-sec-hdr {
  font-size: 10px; color: var(--vn-dim); letter-spacing: 0.8px;
  margin-bottom: 7px; text-transform: uppercase; font-weight: 600;
  display: flex; justify-content: space-between; align-items: center;
}
.vn-badge {
  color: var(--vn-muted); background: var(--vn-bg3);
  border: 1px solid var(--vn-border); border-radius: 3px;
  padding: 1px 5px; font-size: 9px;
}
.vn-snip-list { display: flex; flex-direction: column; gap: 2px; }
.vn-snip-empty { font-size: 11px; color: var(--vn-dim); padding: 4px 0; }
.vn-snip-item {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 0; border-bottom: 1px solid var(--vn-border); font-size: 12px;
}
.vn-snip-item:last-child { border: none; }
.vn-snip-num   { color: var(--vn-dim); font-size: 10px; min-width: 18px; }
.vn-snip-preview {
  flex: 1; color: var(--vn-muted); font-size: 11px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.vn-snip-type {
  font-size: 9px; color: var(--vn-dim); padding: 1px 4px;
  background: var(--vn-bg3); border: 1px solid var(--vn-border); border-radius: 3px;
}

.vn-undo-bar {
  display: none; align-items: center; justify-content: space-between;
  padding: 8px 10px; background: var(--vn-bg3);
  border: 1px solid var(--vn-border2); border-radius: 5px;
  font-size: 12px; color: var(--vn-muted);
}
.vn-undo-bar.vn-show { display: flex; }

.vn-modal-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 20; display: none;
  align-items: center; justify-content: center; padding: 16px;
}
.vn-modal-overlay.vn-show { display: flex; }
.vn-modal {
  background: var(--vn-bg2); border: 1px solid var(--vn-border2);
  border-radius: 8px; width: 100%; max-height: 80%;
  display: flex; flex-direction: column; overflow: hidden;
}
.vn-modal-hdr {
  padding: 10px 14px; border-bottom: 1px solid var(--vn-border);
  font-size: 11px; color: var(--vn-muted);
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0;
}
.vn-modal-body {
  flex: 1; overflow-y: auto; padding: 14px;
  font-size: 13px; font-family: var(--vn-mono);
  color: var(--vn-text); white-space: pre-wrap;
  word-break: break-word; line-height: 1.6;
}
`});var Oe,Pe=v(()=>{Oe=`
.vn-settings-inner { flex: 1; overflow-y: auto; padding: 12px; }
.vn-setting-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 13px 0; border-bottom: 1px solid var(--vn-border);
}
.vn-setting-row:last-child { border: none; }
.vn-setting-label { font-size: 13px; color: var(--vn-text); font-family: var(--vn-mono); }
.vn-setting-sub   { font-size: 10px; color: var(--vn-dim); margin-top: 2px; }
.vn-theme-row { display: flex; gap: 7px; }

.vn-slider {
  width: 100px; height: 3px;
  background: var(--vn-bg3); border-radius: 2px;
  outline: none; -webkit-appearance: none;
}
.vn-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  background: var(--vn-text); border-radius: 50%; cursor: pointer;
}
.vn-slider::-moz-range-thumb {
  width: 14px; height: 14px;
  background: var(--vn-text); border-radius: 50%;
  cursor: pointer; border: none;
}
`});var He,Re=v(()=>{He=`
.vn-btn {
  background: var(--vn-bg3); border: 1px solid var(--vn-border2);
  color: var(--vn-text); border-radius: 5px; padding: 8px 14px;
  cursor: pointer; font-size: 12px; font-family: var(--vn-mono);
  font-weight: 500; letter-spacing: 0.3px;
}
.vn-btn:active { opacity: 0.75; }
.vn-btn.vn-selected { background: var(--vn-red); border-color: var(--vn-red); color: #fff; }

.vn-btn-sm {
  background: var(--vn-bg3); border: 1px solid var(--vn-border2);
  color: var(--vn-text); border-radius: 4px; padding: 6px 11px;
  cursor: pointer; font-size: 11px; font-family: var(--vn-mono);
}
.vn-btn-sm:active { opacity: 0.7; }
.vn-btn-ghost { background: none; border-color: transparent; color: var(--vn-muted); }

.vn-btn-icon {
  background: none; border: none; color: var(--vn-dim);
  cursor: pointer; padding: 0 3px; font-size: 15px; line-height: 1;
}
.vn-btn-icon:active { color: var(--vn-red); }

.vn-btn-full { width: 100%; padding: 10px; text-align: center; }

.vn-btn-send {
  background: var(--vn-red); border: none; color: #fff;
  border-radius: 6px; padding: 9px 14px;
  cursor: pointer; font-size: 16px; line-height: 1; flex-shrink: 0;
}
.vn-btn-send:active { opacity: 0.8; }
`});function De(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[ke,Le,$e,Ae,ze,Me,Oe,He].join(`
`),document.head.appendChild(e)}var qe=v(()=>{Ie();Te();Be();Ce();Ne();je();Pe();Re()});function Ye(){De();let e=document.createElement("div");e.id=Ue,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=te,t.innerHTML=`
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
  `,e.onclick=Ct,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Ct(){ee=!ee;let e=document.getElementById(te);e&&e.classList.toggle("vn-open",ee)}function ne(){return document.getElementById(Ue)}function B(){return document.getElementById(te)}function y(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function w(e,t,n){let s=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!s||!r||(s.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var Ue,te,ee,T=v(()=>{qe();Ue="__venom_fab__",te="__venom_panel__",ee=!1});var Xe={};N(Xe,{initTabs:()=>oe,restoreLastTab:()=>se,switchTab:()=>re});function oe(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let s=n.dataset.tab;re(s)}})}function re(e){if(!Fe.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(s=>{s.classList.toggle("vn-active",s.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(s=>{s.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function se(){let e=localStorage.getItem("vn_last_tab");e&&Fe.includes(e)&&re(e)}var Fe,ie=v(()=>{Fe=["agent","snippets","settings"]});var We={};N(We,{readPage:()=>O});function O(){return{url:location.href,title:document.title||"",content:zt()}}function zt(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(s){let r=s.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let s=n.textContent.trim();s.length>0&&t.push(s)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var D=v(()=>{});function d(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let s=n.querySelector(".vn-fab-dot");s&&(s.className="vn-fab-dot",e==="green"?s.classList.add("vn-green"):e==="amber"?s.classList.add("vn-amber"):e==="red"&&s.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function Ze(){u()?w("auth","authed","active"):w("auth","unauthed","err")}var q=v(()=>{T();f()});function Qe(e){document.addEventListener("selectionchange",()=>{clearTimeout(Ge),Ge=setTimeout(()=>{let t=U();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=U();t&&e(t)},50)})}function U(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var Ge,le=v(()=>{Ge=null});var ot={};N(ot,{pollSettings:()=>ce,syncToBackend:()=>de});function nt(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function Jt(e){let t=typeof e.text=="string"?e.text:"";return nt(t)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,tt):""):t.slice(0,Kt)}function Vt(e){let t={number:e.number,text:Jt(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,tt):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(t.mime_type=e.mime_type),typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let n={...e.metadata};(n.base64||nt(n.data||""))&&(delete n.base64,delete n.data),t.metadata=n}return e.type==="file"&&(typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(t.metadata={...e.metadata})),t}async function de(e){let t=u(),n=m();if(!t)return e("error","Login to dashboard first"),!1;if(!n||n.length===0)return e("error","No snippets staged"),!1;let r=n.map(Vt).filter(o=>!(!o.text&&o.type!=="image"||o.type==="image"&&!o.text&&!o.url));if(r.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${r.length} snippet${r.length!==1?"s":""}...`);try{let o=await fetch(`${et}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:L(),snippets:r,pageContext:O()}),signal:AbortSignal.timeout(Xt)}),i=await o.json();if(!o.ok)return e("error",i.message||`Sync failed (${o.status})`),!1;j();let a=i.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(o){return o.name==="TimeoutError"||o.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function ce(e){if(!e)return null;try{let t=await fetch(`${et}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(Wt)});return t.ok&&(await t.json()).settings||null}catch{return null}}var et,Xt,Wt,Kt,tt,Y=v(()=>{f();D();et="https://vinnsedesigner-vinns-ai-backend.hf.space",Xt=3e4,Wt=1e4,Kt=2e3,tt=2048});var ge={};N(ge,{buildSnippetsTab:()=>ue,renderSnippets:()=>h,showSelectionOverlay:()=>me});function c(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function X(e){return!e||typeof e!="number"?"":e<1024?`${e}B`:e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}function at(e){return{js:"\u{1F7E8}",ts:"\u{1F537}",jsx:"\u{1F7E6}",tsx:"\u{1F537}",py:"\u{1F40D}",json:"\u{1F4CB}",md:"\u{1F4DD}",txt:"\u{1F4C4}",css:"\u{1F3A8}",html:"\u{1F310}",sql:"\u{1F5C4}\uFE0F",yaml:"\u2699\uFE0F",yml:"\u2699\uFE0F",sh:"\u26A1",rs:"\u{1F980}",go:"\u{1F439}",rb:"\u{1F48E}",java:"\u2615"}[(e||"").toLowerCase()]||"\u{1F4C1}"}function Gt(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function pe(e){let t=e.text||e.url||"";return!t||Gt(t)?null:t}function ue(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
    <div class="vn-snippets-inner">
      <div class="vn-sections">

        <div class="vn-section">
          <div class="vn-sec-hdr">
            REPO
            <span class="vn-badge" id="vn-repo-count">0</span>
          </div>
          <div class="vn-snippets-list" id="vn-repo-list"></div>
        </div>

        <div class="vn-section">
          <div class="vn-sec-hdr">
            RESEARCH
            <span class="vn-badge" id="vn-research-count">0</span>
          </div>
          <div class="vn-snippets-list" id="vn-research-list"></div>
        </div>

        <div class="vn-section">
          <div class="vn-sec-hdr">
            IMAGE
            <span class="vn-badge" id="vn-image-count">0</span>
          </div>
          <div class="vn-snippets-list" id="vn-image-list"></div>
        </div>

        <div class="vn-section">
          <div class="vn-sec-hdr">
            FILE
            <span class="vn-badge" id="vn-file-count">0</span>
          </div>
          <div class="vn-snippets-list" id="vn-file-list"></div>
        </div>

      </div>

      <div class="vn-undo-bar" id="vn-undo-bar">
        <span id="vn-undo-text">Snippet removed</span>
        <button class="vn-btn-sm" id="vn-undo-btn">Undo</button>
      </div>
    </div>

    <div class="vn-snip-footer">
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">\u21C5 SYNC TO BACKEND</button>
    </div>

    <div class="vn-modal-overlay" id="vn-view-modal">
      <div class="vn-modal">
        <div class="vn-modal-hdr">
          <span id="vn-modal-title">SNIPPET</span>
          <button class="vn-btn-icon" id="vn-modal-close">\u2715</button>
        </div>
        <div class="vn-modal-body" id="vn-modal-body"></div>
      </div>
    </div>
  `,en(),Qt(),h())}function Qt(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await de((e,t)=>{d(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&y(t),e==="success"&&h()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",nn),document.getElementById("vn-modal-close")?.addEventListener("click",it),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&it()})}function en(){g||(g=document.createElement("div"),g.className="vn-sel-overlay",g.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(g),g.querySelector("#vn-sel-repo").addEventListener("click",()=>rt("code")),g.querySelector("#vn-sel-research").addEventListener("click",()=>rt("research")),document.addEventListener("click",e=>{g.contains(e.target)||ve()}))}function me(e){!g||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();g.style.top=`${n.bottom+8}px`,g.style.left=`${Math.max(0,n.left)}px`,g.classList.add("vn-show")},300)}function ve(){g?.classList.remove("vn-show")}function rt(e){let t=U();if(!t)return;let n=m(),s=parseInt(localStorage.getItem("vn_snippet_limit")||"20",10);if(n.length>=s){d("red",`Max ${s} snippets`),y(`Snippet limit (${s}) reached \u2014 sync or clear first`),ve();return}G({text:t,type:e,url:location.href,title:document.title}),h(),ve(),d("green",`#${n.length+1} staged`)}function st(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),s=document.getElementById("vn-modal-body");if(!(!t||!s||!n)){if(n.textContent=`#${e.number} \xB7 ${e.type}`+(e.title?` \xB7 ${e.title.slice(0,30)}`:""),e.type==="image"){let r=pe(e),o=A.get(e.number),i=X(e.file_size),a=e.mime_type||"";s.innerHTML=`
      <div class="vn-modal-image-wrap">
        ${r?`<img class="vn-modal-thumbnail"
                  src="${c(r)}"
                  alt="snippet #${e.number}"
                  loading="lazy" />`:'<div class="vn-modal-no-thumb">\u{1F5BC}\uFE0F No preview</div>'}
        <div class="vn-modal-image-meta">
          ${a?`<span class="vn-snippet-type">${c(a)}</span>`:""}
          ${i?`<span class="vn-snippet-type">${c(i)}</span>`:""}
        </div>
      </div>
      ${o?`<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis</div>
             <div class="vn-modal-analysis-body">${c(o)}</div>
           </div>`:`<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${e.number}">
             \u{1F50D} Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${e.number}"></div>`}
    `,o||s.querySelector(`#vn-analyze-modal-${e.number}`)?.addEventListener("click",()=>lt(e,s))}else if(e.type==="file"){let r=e.metadata?.extension||"",o=X(e.file_size),i=at(r);s.innerHTML=`
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${i}</span>
        ${r?`<span class="vn-snippet-type">.${c(r)}</span>`:""}
        ${o?`<span class="vn-snippet-type">${c(o)}</span>`:""}
      </div>
      <div class="vn-modal-file-url">${c(e.url||"")}</div>
      <pre class="vn-modal-file-content">${c((e.text||"").slice(0,3e3))}</pre>
    `}else s.innerHTML=`
      <pre class="vn-modal-text">${c((e.text||"").slice(0,3e3))}</pre>
    `;t.classList.add("vn-show")}}function it(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}async function lt(e,t){let n=u();if(!n){y("Login to dashboard first");return}let s=`vn-analyze-modal-${e.number}`,r=`vn-analyze-result-${e.number}`,o=t.querySelector(`#${s}`),i=t.querySelector(`#${r}`);o&&(o.textContent="\u23F3 Analyzing...",o.disabled=!0),i&&(i.textContent=""),d("amber","analyzing image...");try{let a=pe(e),l=a?{imageUrl:a,mimeType:e.mime_type||"image/jpeg",question:"Describe this image in detail."}:null;if(!l)throw new Error("No valid image URL for analysis");let b=await fetch(`${Zt}/api/vision`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(l),signal:AbortSignal.timeout(3e4)}),$=await b.json();if(!b.ok)throw new Error($.message||`Vision API error (${b.status})`);let P=$.analysis||"No analysis returned";A.set(e.number,P),i&&(i.innerHTML=`
        <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis \xB7 <span class="vn-model-tag">${c($.model||"")}</span></div>
        <div class="vn-modal-analysis-body">${c(P)}</div>
      `),o&&(o.style.display="none"),d("green","analysis complete")}catch(a){let l=a.name==="TimeoutError"||a.name==="AbortError"?"Analysis timed out \u2014 try again":a.message||"Analysis failed";i&&(i.textContent=`\u26A0 ${l}`),o&&(o.textContent="\u{1F50D} Retry Analysis",o.disabled=!1),d("red","analysis failed"),y(l)}}function tn(e){let n=m().find(r=>r.number===e);if(!n)return;Q(e),h(),A.delete(e);let s={snippet:n,timer:null};E.push(s),dt(`Snippet #${e} removed`),s.timer=setTimeout(()=>{E=E.filter(r=>r.snippet.number!==e),E.length===0&&ct()},5e3)}function nn(){let e=E.pop();if(!e)return;clearTimeout(e.timer);let t=m();t.push(e.snippet),t.sort((n,s)=>n.number-s.number),M(t),h(),E.length===0?ct():dt(`Snippet #${E[E.length-1].snippet.number} removed`)}function dt(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function ct(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function h(){let e=m(),t=e.filter(i=>i.type==="code"),n=e.filter(i=>i.type==="research"),s=e.filter(i=>i.type==="image"),r=e.filter(i=>i.type==="file"),o=(i,a)=>{let l=document.getElementById(i);l&&(l.textContent=a)};o("vn-repo-count",t.length),o("vn-research-count",n.length),o("vn-image-count",s.length),o("vn-file-count",r.length),w("snip",`${e.length} snippets`,e.length>0?"active":""),F("vn-repo-list",t,rn),F("vn-research-list",n,sn),F("vn-image-list",s,an),F("vn-file-list",r,ln),on(e)}function F(e,t,n){let s=document.getElementById(e);if(s){if(t.length===0){s.innerHTML='<div class="vn-snip-empty">\u2014</div>';return}s.innerHTML=t.map(n).join("")}}function on(e){document.querySelectorAll(".vn-snip-view").forEach(t=>{t.addEventListener("click",()=>{let n=e.find(s=>s.number===Number(t.dataset.num));n&&st(n)})}),document.querySelectorAll(".vn-snip-del").forEach(t=>{t.addEventListener("click",()=>{tn(Number(t.dataset.num))})}),document.querySelectorAll(".vn-snip-analyze").forEach(t=>{t.addEventListener("click",async()=>{let n=e.find(r=>r.number===Number(t.dataset.num));if(!n)return;st(n);let s=document.getElementById("vn-modal-body");s&&!A.has(n.number)&&await lt(n,s)})})}function rn(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function sn(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function an(e){let t=pe(e),n=X(e.file_size);return`
    <div class="vn-snip-item vn-snip-item-image${A.has(e.number)?" vn-analyzed":""}">
      ${t?`<img class="vn-snip-thumb"
                src="${c(t)}"
                alt="img #${e.number}"
                loading="lazy" />`:'<span class="vn-snip-no-thumb">\u{1F5BC}\uFE0F</span>'}
      <div class="vn-snip-image-info">
        <span class="vn-snip-num">#${e.number}</span>
        ${n?`<span class="vn-snip-type">${c(n)}</span>`:""}
        ${A.has(e.number)?'<span class="vn-snip-type vn-analyzed-badge">\u2713 analyzed</span>':""}
      </div>
      <div class="vn-snip-actions">
        <button class="vn-snip-analyze vn-btn-icon" data-num="${e.number}"
                title="analyze">\u{1F50D}</button>
        <button class="vn-snip-view    vn-btn-icon" data-num="${e.number}"
                title="view">\u{1F441}</button>
        <button class="vn-snip-del     vn-btn-icon" data-num="${e.number}"
                title="delete">\u{1F5D1}</button>
      </div>
    </div>
  `}function ln(e){let t=e.metadata?.extension||"",n=X(e.file_size),s=at(t),r=(e.text||e.url||"").slice(0,40);return`
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${s}</span>
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c(r)}</span>
      <div class="vn-snip-badges">
        ${t?`<span class="vn-snip-type">.${c(t)}</span>`:""}
        ${n?`<span class="vn-snip-type">${c(n)}</span>`:""}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}var Zt,g,E,A,C=v(()=>{f();le();Y();q();T();Zt="https://vinnsedesigner-vinns-ai-backend.hf.space",g=null,E=[],A=new Map});f();T();ie();f();D();var Ke="https://vinnsedesigner-vinns-ai-backend.hf.space",Nt=10,Mt=2e3,jt=2048,Ot=3e4,Pt=6e4,Ht=20;function Rt(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function Dt(e){let t=typeof e.text=="string"?e.text:"";return Rt(t)?(console.warn("[VENOM mini-agent] base64 stripped from snippet before send",{type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,jt):""):t.slice(0,Mt)}function qt(e){if(!e||typeof e!="object"||!new Set(["code","research","image","file"]).has(e.type))return null;let n=Dt(e);return!n&&e.type!=="image"||!n&&e.type==="image"&&!e.url?null:{type:e.type,text:n||e.url||""}}function Je(e){return!Array.isArray(e)||e.length===0?[]:e.slice(0,Ht).map(qt).filter(Boolean)}function Ve(e){if(!Array.isArray(e)||e.length===0)return[];let t=new Set(["user","assistant","system"]);return e.filter(n=>n&&t.has(n.role)&&n.content).slice(-Nt).map(n=>({role:n.role,content:String(n.content).slice(0,1e3)}))}function Ut(){return u()||null}function Yt(){try{return O()}catch(e){return console.warn("[VENOM mini-agent] buildPageContext failed",e.message),{url:typeof window<"u"?window.location.href:"",title:typeof document<"u"?document.title:"",content:""}}}async function Ft(e,t,n,s,r,o){try{let i=await fetch(`${Ke}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({message:e,pageContext:n,history:Ve(r),snippets:Je(t),sessionId:o||null,context:"bookmarklet",stream:!1}),signal:AbortSignal.timeout(Pt)}),a=await i.json();return i.ok?{reply:a.reply||a.response||"",model:a.model_used||a.model||"agent",escalated:!0,tools_used:a.tools_used||[],searched:!1}:{error:a.message||`Full agent error (${i.status})`,escalated:!0}}catch(i){return{error:i.name==="TimeoutError"||i.name==="AbortError"?"Full agent timed out \u2014 try again":"Full agent unreachable",escalated:!0}}}async function ae(e,t=[],n=[],s={}){let{sessionId:r=null,preferredModel:o=null}=s,i=Ut();if(!i)return{error:"Not authenticated \u2014 open dashboard and login first"};if(!e||typeof e!="string"||!e.trim())return{error:"Message is required"};let a=e.trim(),l=Yt(),b=Je(t),$=Ve(n),P={message:a,pageContext:l,history:$,snippets:b,sessionId:r||null,preferredModel:o||null},S,I;try{I=await fetch(`${Ke}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(P),signal:AbortSignal.timeout(Ot)}),S=await I.json()}catch(Ee){return{error:Ee.name==="TimeoutError"||Ee.name==="AbortError"?"Lite agent timed out \u2014 check connection":"Backend unreachable \u2014 check connection"}}return I.ok?S.escalate===!0?Ft(a,t,l,i,n,r):{reply:S.reply||"",model:S.model||"lite",escalated:!1,tools_used:S.tools_used||[],searched:S.searched||!1}:I.status===503?{error:"All AI providers are currently unavailable \u2014 try again shortly"}:I.status===429?{error:S.message||"Rate limit reached \u2014 try again in a few minutes"}:I.status===401?{error:"Session expired \u2014 open dashboard and login again"}:{error:S.message||`Request failed (${I.status})`}}f();q();T();var x=[],he=null,k=L(),_=null,W="vn_chat_sessions",be={model:"/model <name|reset|?>  \u2014 pin a model for this session",clear:"/clear                 \u2014 wipe current conversation",page:"/page                  \u2014 capture page text as snippet",images:"/images                \u2014 capture all images on page",sync:"/sync                  \u2014 sync snippets to backend",snippets:"/snippets              \u2014 jump to snippets tab",help:"/help                  \u2014 show all commands"},fe=["groq","llama","devstral","mistral","gemini","gemini-lite","gemma-26","gemma-31","reset"];function ut(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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
      <span class="vn-agent-label" id="vn-session-label">SESSION</span>
      <span class="vn-model-pill" id="vn-model-pill" style="display:none"></span>
    </div>

    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Anything buddy\u{1F60F}..</span>
      </div>
    </div>

    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject \u2197</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>

    <div class="vn-bottom-area" id="vn-bottom-area">
      <div class="vn-slash-popup" id="vn-slash-popup" style="display:none">
        <div class="vn-slash-list" id="vn-slash-list"></div>
      </div>
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="\u{1F9D1}\u200D\u{1F4BB} ask anything \u2014 type / for commands" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,dn(),gt(),K())}function dn(){document.getElementById("vn-send-btn")?.addEventListener("click",pt),document.getElementById("vn-suggest-btn")?.addEventListener("click",pn),document.getElementById("vn-inject-btn")?.addEventListener("click",wn),document.getElementById("vn-inject-dismiss")?.addEventListener("click",mt),document.getElementById("vn-hamburger")?.addEventListener("click",En),document.getElementById("vn-drawer-close")?.addEventListener("click",xe),document.getElementById("vn-new-chat")?.addEventListener("click",_n);let e=document.getElementById("vn-agent-input");e&&(e.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),pt()),t.key==="Escape"&&z()}),e.addEventListener("input",()=>{let t=e.value;t.startsWith("/")&&t.length>=1?cn(t):z()}),document.addEventListener("click",t=>{let n=document.getElementById("vn-slash-popup"),s=document.getElementById("vn-bottom-area");n&&s&&!s.contains(t.target)&&z()}))}function cn(e){let t=document.getElementById("vn-slash-popup"),n=document.getElementById("vn-slash-list");if(!t||!n)return;let s=e.slice(1).split(" ")[0].toLowerCase(),r=Object.keys(be).filter(o=>o.startsWith(s));if(r.length===0){z();return}n.innerHTML=r.map(o=>`
    <div class="vn-slash-item" data-cmd="/${o}">
      <span class="vn-slash-cmd">${be[o]}</span>
    </div>
  `).join(""),n.querySelectorAll(".vn-slash-item").forEach(o=>{o.addEventListener("mousedown",i=>{i.preventDefault();let a=document.getElementById("vn-agent-input");a&&(a.value=o.dataset.cmd+(o.dataset.cmd==="/help"||o.dataset.cmd==="/clear"||o.dataset.cmd==="/page"||o.dataset.cmd==="/images"||o.dataset.cmd==="/sync"||o.dataset.cmd==="/snippets"?"":" "),a.focus()),z()})}),t.style.display="block"}function z(){let e=document.getElementById("vn-slash-popup");e&&(e.style.display="none")}function vn(e){let t=e.trim(),n=t.indexOf(" "),s=(n===-1?t.slice(1):t.slice(1,n)).toLowerCase(),r=n===-1?"":t.slice(n+1).trim();switch(s){case"model":return!r||r==="?"?(p("agent",`\u{1F4CD} Current model: **${_||"auto (modelRouter decides)"}**
Valid aliases: ${fe.join(", ")}`),!0):r==="reset"?(_=null,vt(),p("agent","\u{1F504} Model reset to auto \u2014 modelRouter decides"),!0):fe.includes(r.toLowerCase())?(_=r.toLowerCase(),vt(),p("agent",`\u{1F4CC} Model pinned: **${_}**
All requests this session will use this model.`),!0):(p("agent",`\u2753 Unknown alias: "${r}"
Valid: ${fe.join(", ")}`),!0);case"clear":{x=[];let o=document.getElementById("vn-convo");return o&&(o.innerHTML='<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>Cleared \u{1F9F9} fresh start</span></div>'),!0}case"page":return Promise.resolve().then(()=>(D(),We)).then(({readPage:o})=>{let i=o();Promise.resolve().then(()=>(f(),R)).then(({addSnippet:a})=>{a({text:i.content,type:"research",url:i.url,title:i.title}),Promise.resolve().then(()=>(C(),ge)).then(({renderSnippets:l})=>l()).catch(()=>{}),p("agent",`\u{1F4C4} Page captured \u2192 research snippet (${i.content.length} chars)`)})}).catch(()=>p("agent","\u26A0 Could not capture page content")),!0;case"images":{let o=Array.from(document.images).filter(i=>i.naturalWidth>100&&i.src&&!i.src.startsWith("data:")).slice(0,10);return o.length===0?(p("agent","\u{1F5BC}\uFE0F No suitable images found"),!0):(Promise.resolve().then(()=>(f(),R)).then(({addSnippet:i})=>{o.forEach(a=>i({text:a.src,type:"image",url:a.src,title:a.alt||"image"})),Promise.resolve().then(()=>(C(),ge)).then(({renderSnippets:a})=>a()).catch(()=>{}),p("agent",`\u{1F5BC}\uFE0F Captured ${o.length} image${o.length!==1?"s":""} as snippets`)}),!0)}case"sync":return p("agent","\u21C5 Syncing..."),Promise.resolve().then(()=>(Y(),ot)).then(({syncToBackend:o})=>{o((i,a)=>{d(i==="success"?"green":i==="error"?"red":"amber",a),i!=="syncing"&&p("agent",`${i==="success"?"\u2705":"\u26A0"} ${a}`)})}),!0;case"snippets":return Promise.resolve().then(()=>(ie(),Xe)).then(({switchTab:o})=>o("snippets")).catch(()=>{}),!0;case"help":{let o=Object.values(be).map(i=>i.trim()).join(`
`);return p("agent",`**Slash commands:**
${o}`),!0}default:return!1}}function vt(){let e=document.getElementById("vn-model-pill");e&&(_?(e.textContent=`\u{1F4CC} ${_}`,e.style.display="inline-block"):e.style.display="none")}function K(){let e=document.getElementById("vn-session-label");e&&(e.textContent=k.slice(0,8).toUpperCase())}async function pt(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;if(z(),t.startsWith("/")&&vn(t)){e.value="";return}let n=x.slice();x.push({role:"user",content:t}),p("user",t),e.value="",d("amber","thinking..."),w("model","thinking...","warn");let s=await ae(t,m(),n,{sessionId:String(k),preferredModel:_||null}),{reply:r,model:o,escalated:i,error:a,tools_used:l}=s;if(a){p("agent",`\u26A0 ${a}`),d("red","error"),y(a),w("model","error","err"),x.push({role:"assistant",content:`\u26A0 ${a}`});return}x.push({role:"assistant",content:r});let b=l?.length?`${o||"lite"} \xB7 \u{1F527} ${l.join(", ")}`:o||"lite";p("agent",r,b),d("green",i?"done (escalated)":"done"),w("model",o||"lite","active"),kn(x)}async function pn(){d("amber","generating...");let e=await ae("Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt.",m(),x,{sessionId:String(k),preferredModel:_||null});if(e.error||!e.reply){d("red","suggestion failed"),y("Suggestion failed: "+(e.error||"empty"));return}he=e.reply,yn(e.reply),d("green","ready to inject")}function p(e,t,n){let s=document.getElementById("vn-convo");if(!s)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let o=document.createElement("div");o.className="vn-msg-label",o.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(o),un(t).forEach(i=>r.appendChild(i)),s.appendChild(r),s.scrollTop=s.scrollHeight}function un(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(s=>{if(s.startsWith("```")){let r=s.slice(3,-3),o=r.indexOf(`
`),i=o>=0?r.slice(0,o).trim():"",a=o>=0?r.slice(o+1).trim():r.trim();t.push(mn(i,a))}else if(hn(s)){let r=document.createElement("pre");r.className="vn-ascii-block",r.textContent=xn(s.trim()),t.push(r)}else if(s.trim()){let r=document.createElement("span");r.textContent=s,r.style.whiteSpace="pre-wrap",t.push(r)}}),t}function mn(e,t){let n=bn(e,t),s=document.createElement("div");return s.className="vn-code-block",s.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${gn(t,n)}</div>
  `,s.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let r=s.querySelector(".vn-code-copy");r.textContent="copied!",setTimeout(()=>{r&&(r.textContent="copy")},1500)},s}function gn(e,t){let n=ft(e);return fn(t).forEach(([s,r])=>{n=n.replace(s,o=>`<span class="sh-${r}">${o}</span>`)}),n}function fn(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\/\/[^\n]*/g,"cmt"],s=[/#[^\n]*/g,"cmt"],r=[/\b(\d+\.?\d*)\b/g,"num"],o=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[n,t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],o,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[s,t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield)\b/g,"kw"],o,r]:["sh","bash"].includes(e)?[s,t,[/\b(if|then|else|fi|for|do|done|echo|cd|ls|mkdir|rm|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_]\w*/g,"var"],r]:e==="json"?[t,o,r]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/([a-zA-Z-]+)\s*:/g,"kw"],r]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],t]:[t,r,o]}function bn(e,t){let n=(e||"").toLowerCase().trim(),s={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",json:"json",css:"css",html:"html"};return s[n]?s[n]:/(def |import |from .* import|print\(|elif )/m.test(t)?"py":/(const |let |var |function |=>|require\()/m.test(t)?"js":/(#!\/bin\/|echo |grep |npm |git )/m.test(t)?"sh":n||"code"}function hn(e){return e.trim().split(`
`).filter(t=>/[├└│─]/.test(t)).length>=2}function xn(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function yn(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function mt(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),he=null}function wn(){let e=he||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=Sn(e);mt(),t===!1?(d("red","no input"),y("No writable input found")):d("green",t==="clipboard"?"copied":"injected \u2197")}function Sn(e){if(!e)return!1;for(let t of["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]']){let n=document.querySelector(t);if(n)try{if(n.tagName==="TEXTAREA"||n.tagName==="INPUT")return n.focus(),n.value=e,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(n.contentEditable==="true")return n.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function En(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),gt()}function xe(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function _n(){x=[],Promise.resolve().then(()=>(f(),R)).then(({resetSession:t,getSessionId:n})=>{t(),k=n(),K()}).catch(()=>{k=String(Date.now()),K()});let e=document.getElementById("vn-convo");e&&(e.innerHTML='<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>Fresh start \u{1F9F9}</span></div>'),xe()}function kn(e){if(e?.length)try{let t=JSON.parse(localStorage.getItem(W)||"[]"),n=t.findIndex(o=>o.id===k),s=e.find(o=>o.role==="user")?.content?.slice(0,60)||"Chat",r={id:k,ts:new Date().toLocaleTimeString(),preview:s,messages:e.slice()};n>=0?t[n]=r:t.unshift(r),localStorage.setItem(W,JSON.stringify(t.slice(0,20)))}catch{}}function gt(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(W)||"[]");if(!t.length){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${ft(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>`).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>In(n.dataset.id)})}catch{}}function In(e){try{let n=JSON.parse(localStorage.getItem(W)||"[]").find(r=>r.id===e);if(!n)return;x=n.messages.slice(),k=n.id,K();let s=document.getElementById("vn-convo");if(!s)return;s.innerHTML="",x.forEach(r=>p(r.role==="user"?"user":"agent",r.content)),xe()}catch{}}function ft(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}C();T();f();C();function ht(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",s=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
          value="${s}" min="1" max="100"
          style="width:60px;padding:6px 8px;">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Clear Snippets</div>
        <button class="vn-btn" id="vn-clear-snippets" style="color:var(--vn-red);border-color:var(--vn-red)">
          Clear All
        </button>
      </div>
    </div>
  `,Ln()}function Ln(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),s=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),o=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let i=e.value;t.textContent=`${i}vh`;let a=B();a&&(a.style.height=`${i}vh`),localStorage.setItem("vn_panel_height",i)}),n?.addEventListener("click",()=>{bt("oled"),n.classList.add("vn-selected"),s?.classList.remove("vn-selected")}),s?.addEventListener("click",()=>{bt("light"),s.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let i=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",i),r.value=i}),o?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(j(),h())})}function bt(e){let t=B();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}T();var J=!1,xt,yt,ye,we,V=!1,wt,St;function Et(){Tn(),$n()}function Tn(){let e=ne();if(!e)return;function t(r,o){J=!0,xt=r,yt=o;let i=e.getBoundingClientRect();ye=i.left,we=i.top,e.style.right="auto",e.style.bottom="auto",e.style.left=ye+"px",e.style.top=we+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,o){if(!J)return;let i=r-xt,a=o-yt,l=Math.max(0,Math.min(window.innerWidth-56,ye+i)),b=Math.max(0,Math.min(window.innerHeight-56,we+a));e.style.left=l+"px",e.style.top=b+"px",localStorage.setItem("vn_fab_left",l),localStorage.setItem("vn_fab_top",b)}function s(){J=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",s),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let o=r.touches[0];t(o.clientX,o.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!J)return;r.preventDefault();let o=r.touches[0];n(o.clientX,o.clientY)},{passive:!1}),document.addEventListener("touchend",s)}function $n(){let e=document.getElementById("vn-drag-handle"),t=B();if(!e||!t)return;function n(o){V=!0,wt=o,St=t.offsetHeight}function s(o){if(!V)return;let i=wt-o,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,St+i));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){V=!1}e.addEventListener("mousedown",o=>{o.preventDefault(),n(o.clientY)}),document.addEventListener("mousemove",o=>s(o.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",o=>{n(o.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",o=>{V&&(o.preventDefault(),s(o.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function _t(){let e=ne();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function kt(){let e=B();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}Y();f();C();var Bn=15e3,Se=null;function It(){Se=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(Se),Se=null;return}let e=u(),t=await ce(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),h())},Bn)}le();q();function Lt(){document.getElementById("__venom_fab__")||(Ye(),oe(),ut(),ue(),ht(),Et(),_t(),kt(),se(),Qe(e=>me(e)),Ze(),It(),d("green","ready"))}function Tt(){let e=u();L(),Lt(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Tt()})();})();
