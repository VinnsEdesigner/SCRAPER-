"use strict";(()=>{var At=Object.defineProperty;var u=(e,t)=>()=>(e&&(t=e(e=0)),t);var j=(e,t)=>{for(var n in t)At(e,n,{get:t[n],enumerable:!0})};var q={};j(q,{addSnippet:()=>oe,clearSnippets:()=>O,getSessionId:()=>B,getSnippets:()=>b,getToken:()=>f,removeSnippet:()=>re,resetSession:()=>zt,saveSnippets:()=>P,setToken:()=>D});function f(){return localStorage.getItem(Le)||null}function D(e){localStorage.setItem(Le,e)}function B(){let e=localStorage.getItem(ne);return e||(e=crypto.randomUUID(),localStorage.setItem(ne,e)),e}function zt(){localStorage.removeItem(ne),localStorage.removeItem(R)}function b(){try{return JSON.parse(localStorage.getItem(R)||"[]")}catch{return[]}}function P(e){localStorage.setItem(R,JSON.stringify(e))}function oe(e){let t=b(),n=t.length>0?Math.max(...t.map(r=>r.number||0))+1:1,o={...e,number:n,created_at:Date.now()};return t.push(o),P(t),o}function re(e){let t=b().filter(n=>n.number!==e);P(t)}function O(){localStorage.removeItem(R)}var R,ne,Le,y=u(()=>{"use strict";R="nexus_scraper_snippets",ne="nexus_scraper_session",Le="nexus_auth_token"});var Te,$e=u(()=>{Te=`
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
`});var Be,Ce=u(()=>{Be=`
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
`});var Ae,ze=u(()=>{Ae=`
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
`});var Ne,Me=u(()=>{Ne=`
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
`});var je,Pe=u(()=>{je=`
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
`});var Oe,He=u(()=>{Oe=`
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
`});var Re,De=u(()=>{Re=`
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
`});var qe,Ue=u(()=>{qe=`
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
`});function Ye(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[Te,Be,Ae,Ne,je,Oe,Re,qe].join(`
`),document.head.appendChild(e)}var We=u(()=>{$e();Ce();ze();Me();Pe();He();De();Ue()});function Fe(){Ye();let e=document.createElement("div");e.id=Xe,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=ie,t.innerHTML=`
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
  `,e.onclick=Nt,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Nt(){se=!se;let e=document.getElementById(ie);e&&e.classList.toggle("vn-open",se)}function ae(){return document.getElementById(Xe)}function A(){return document.getElementById(ie)}function k(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function E(e,t,n){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var Xe,ie,se,C=u(()=>{We();Xe="__venom_fab__",ie="__venom_panel__",se=!1});var Ke={};j(Ke,{initTabs:()=>le,restoreLastTab:()=>ce,switchTab:()=>de});function le(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;de(o)}})}function de(e){if(!Je.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function ce(){let e=localStorage.getItem("vn_last_tab");e&&Je.includes(e)&&de(e)}var Je,ve=u(()=>{Je=["agent","snippets","settings"]});var Ve={};j(Ve,{readPage:()=>H});function H(){return{url:location.href,title:document.title||"",content:Mt()}}function Mt(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var U=u(()=>{});function v(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function Qe(){f()?E("auth","authed","active"):E("auth","unauthed","err")}var X=u(()=>{C();y()});function tt(e){document.addEventListener("selectionchange",()=>{clearTimeout(et),et=setTimeout(()=>{let t=F();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=F();t&&e(t)},50)})}function F(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var et,ue=u(()=>{et=null});var st={};j(st,{pollSettings:()=>ge,syncToBackend:()=>me});function rt(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function Gt(e){let t=typeof e.text=="string"?e.text:"";return rt(t)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,ot):""):t.slice(0,Zt)}function Qt(e){let t={number:e.number,text:Gt(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,ot):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(t.mime_type=e.mime_type),typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let n={...e.metadata};(n.base64||rt(n.data||""))&&(delete n.base64,delete n.data),t.metadata=n}return e.type==="file"&&(typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(t.metadata={...e.metadata})),t}async function me(e){let t=f(),n=b();if(!t)return e("error","Login to dashboard first"),!1;if(!n||n.length===0)return e("error","No snippets staged"),!1;let r=n.map(Qt).filter(s=>!(!s.text&&s.type!=="image"||s.type==="image"&&!s.text&&!s.url));if(r.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${r.length} snippet${r.length!==1?"s":""}...`);try{let s=await fetch(`${nt}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:B(),snippets:r,pageContext:H()}),signal:AbortSignal.timeout(Kt)}),i=await s.json();if(!s.ok)return e("error",i.message||`Sync failed (${s.status})`),!1;O();let a=i.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(s){return s.name==="TimeoutError"||s.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function ge(e){if(!e)return null;try{let t=await fetch(`${nt}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(Vt)});return t.ok&&(await t.json()).settings||null}catch{return null}}var nt,Kt,Vt,Zt,ot,J=u(()=>{y();U();nt="https://backe-nd.onrender.com",Kt=3e4,Vt=1e4,Zt=2e3,ot=2048});var ye={};j(ye,{buildSnippetsTab:()=>he,renderSnippets:()=>S,showSelectionOverlay:()=>xe});function p(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function V(e){return!e||typeof e!="number"?"":e<1024?`${e}B`:e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}function dt(e){return{js:"\u{1F7E8}",ts:"\u{1F537}",jsx:"\u{1F7E6}",tsx:"\u{1F537}",py:"\u{1F40D}",json:"\u{1F4CB}",md:"\u{1F4DD}",txt:"\u{1F4C4}",css:"\u{1F3A8}",html:"\u{1F310}",sql:"\u{1F5C4}\uFE0F",yaml:"\u2699\uFE0F",yml:"\u2699\uFE0F",sh:"\u26A1",rs:"\u{1F980}",go:"\u{1F439}",rb:"\u{1F48E}",java:"\u2615"}[(e||"").toLowerCase()]||"\u{1F4C1}"}function tn(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function be(e){let t=e.text||e.url||"";return!t||tn(t)?null:t}function he(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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
  `,on(),nn(),S())}function nn(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await me((e,t)=>{v(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&k(t),e==="success"&&S()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",sn),document.getElementById("vn-modal-close")?.addEventListener("click",lt),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&lt()})}function on(){h||(h=document.createElement("div"),h.className="vn-sel-overlay",h.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(h),h.querySelector("#vn-sel-repo").addEventListener("click",()=>it("code")),h.querySelector("#vn-sel-research").addEventListener("click",()=>it("research")),document.addEventListener("click",e=>{h.contains(e.target)||fe()}))}function xe(e){!h||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();h.style.top=`${n.bottom+8}px`,h.style.left=`${Math.max(0,n.left)}px`,h.classList.add("vn-show")},300)}function fe(){h?.classList.remove("vn-show")}function it(e){let t=F();if(!t)return;let n=b(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20",10);if(n.length>=o){v("red",`Max ${o} snippets`),k(`Snippet limit (${o}) reached \u2014 sync or clear first`),fe();return}oe({text:t,type:e,url:location.href,title:document.title}),S(),fe(),v("green",`#${n.length+1} staged`)}function at(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");if(!(!t||!o||!n)){if(n.textContent=`#${e.number} \xB7 ${e.type}`+(e.title?` \xB7 ${e.title.slice(0,30)}`:""),e.type==="image"){let r=be(e),s=z.get(e.number),i=V(e.file_size),a=e.mime_type||"";o.innerHTML=`
      <div class="vn-modal-image-wrap">
        ${r?`<img class="vn-modal-thumbnail"
                  src="${p(r)}"
                  alt="snippet #${e.number}"
                  loading="lazy" />`:'<div class="vn-modal-no-thumb">\u{1F5BC}\uFE0F No preview</div>'}
        <div class="vn-modal-image-meta">
          ${a?`<span class="vn-snippet-type">${p(a)}</span>`:""}
          ${i?`<span class="vn-snippet-type">${p(i)}</span>`:""}
        </div>
      </div>
      ${s?`<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis</div>
             <div class="vn-modal-analysis-body">${p(s)}</div>
           </div>`:`<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${e.number}">
             \u{1F50D} Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${e.number}"></div>`}
    `,s||o.querySelector(`#vn-analyze-modal-${e.number}`)?.addEventListener("click",()=>ct(e,o))}else if(e.type==="file"){let r=e.metadata?.extension||"",s=V(e.file_size),i=dt(r);o.innerHTML=`
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${i}</span>
        ${r?`<span class="vn-snippet-type">.${p(r)}</span>`:""}
        ${s?`<span class="vn-snippet-type">${p(s)}</span>`:""}
      </div>
      <div class="vn-modal-file-url">${p(e.url||"")}</div>
      <pre class="vn-modal-file-content">${p((e.text||"").slice(0,3e3))}</pre>
    `}else o.innerHTML=`
      <pre class="vn-modal-text">${p((e.text||"").slice(0,3e3))}</pre>
    `;t.classList.add("vn-show")}}function lt(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}async function ct(e,t){let n=f();if(!n){k("Login to dashboard first");return}let o=`vn-analyze-modal-${e.number}`,r=`vn-analyze-result-${e.number}`,s=t.querySelector(`#${o}`),i=t.querySelector(`#${r}`);s&&(s.textContent="\u23F3 Analyzing...",s.disabled=!0),i&&(i.textContent=""),v("amber","analyzing image...");try{let a=be(e),d=a?{imageUrl:a,mimeType:e.mime_type||"image/jpeg",question:"Describe this image in detail."}:null;if(!d)throw new Error("No valid image URL for analysis");let l=await fetch(`${en}/api/vision`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(d),signal:AbortSignal.timeout(3e4)}),c=await l.json();if(!l.ok)throw new Error(c.message||`Vision API error (${l.status})`);let m=c.analysis||"No analysis returned";z.set(e.number,m),i&&(i.innerHTML=`
        <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis \xB7 <span class="vn-model-tag">${p(c.model||"")}</span></div>
        <div class="vn-modal-analysis-body">${p(m)}</div>
      `),s&&(s.style.display="none"),v("green","analysis complete")}catch(a){let d=a.name==="TimeoutError"||a.name==="AbortError"?"Analysis timed out \u2014 try again":a.message||"Analysis failed";i&&(i.textContent=`\u26A0 ${d}`),s&&(s.textContent="\u{1F50D} Retry Analysis",s.disabled=!1),v("red","analysis failed"),k(d)}}function rn(e){let n=b().find(r=>r.number===e);if(!n)return;re(e),S(),z.delete(e);let o={snippet:n,timer:null};I.push(o),vt(`Snippet #${e} removed`),o.timer=setTimeout(()=>{I=I.filter(r=>r.snippet.number!==e),I.length===0&&pt()},5e3)}function sn(){let e=I.pop();if(!e)return;clearTimeout(e.timer);let t=b();t.push(e.snippet),t.sort((n,o)=>n.number-o.number),P(t),S(),I.length===0?pt():vt(`Snippet #${I[I.length-1].snippet.number} removed`)}function vt(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function pt(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function S(){let e=b(),t=e.filter(i=>i.type==="code"),n=e.filter(i=>i.type==="research"),o=e.filter(i=>i.type==="image"),r=e.filter(i=>i.type==="file"),s=(i,a)=>{let d=document.getElementById(i);d&&(d.textContent=a)};s("vn-repo-count",t.length),s("vn-research-count",n.length),s("vn-image-count",o.length),s("vn-file-count",r.length),E("snip",`${e.length} snippets`,e.length>0?"active":""),K("vn-repo-list",t,ln),K("vn-research-list",n,dn),K("vn-image-list",o,cn),K("vn-file-list",r,vn),an(e)}function K(e,t,n){let o=document.getElementById(e);if(o){if(t.length===0){o.innerHTML='<div class="vn-snip-empty">\u2014</div>';return}o.innerHTML=t.map(n).join("")}}function an(e){document.querySelectorAll(".vn-snip-view").forEach(t=>{t.addEventListener("click",()=>{let n=e.find(o=>o.number===Number(t.dataset.num));n&&at(n)})}),document.querySelectorAll(".vn-snip-del").forEach(t=>{t.addEventListener("click",()=>{rn(Number(t.dataset.num))})}),document.querySelectorAll(".vn-snip-analyze").forEach(t=>{t.addEventListener("click",async()=>{let n=e.find(r=>r.number===Number(t.dataset.num));if(!n)return;at(n);let o=document.getElementById("vn-modal-body");o&&!z.has(n.number)&&await ct(n,o)})})}function ln(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${p((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function dn(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${p((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function cn(e){let t=be(e),n=V(e.file_size);return`
    <div class="vn-snip-item vn-snip-item-image${z.has(e.number)?" vn-analyzed":""}">
      ${t?`<img class="vn-snip-thumb"
                src="${p(t)}"
                alt="img #${e.number}"
                loading="lazy" />`:'<span class="vn-snip-no-thumb">\u{1F5BC}\uFE0F</span>'}
      <div class="vn-snip-image-info">
        <span class="vn-snip-num">#${e.number}</span>
        ${n?`<span class="vn-snip-type">${p(n)}</span>`:""}
        ${z.has(e.number)?'<span class="vn-snip-type vn-analyzed-badge">\u2713 analyzed</span>':""}
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
  `}function vn(e){let t=e.metadata?.extension||"",n=V(e.file_size),o=dt(t),r=(e.text||e.url||"").slice(0,40);return`
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${o}</span>
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${p(r)}</span>
      <div class="vn-snip-badges">
        ${t?`<span class="vn-snip-type">.${p(t)}</span>`:""}
        ${n?`<span class="vn-snip-type">${p(n)}</span>`:""}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}var en,h,I,z,N=u(()=>{y();ue();J();X();C();en="https://backe-nd.onrender.com",h=null,I=[],z=new Map});y();C();ve();y();U();var W="https://backe-nd.onrender.com",jt=10,Pt=2e3,Ot=2048,Ht=3e4,Rt=6e4,Dt=20,qt=/snippet|image|photo|picture|capture|staged|research|forbes|vision|analyze|analyse|see the|look at the|what('s| is) in the (snippet|research|image)/i;function Ut(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function Yt(e){let t=typeof e.text=="string"?e.text:"";return Ut(t)?e.type==="image"&&typeof e.url=="string"?e.url.slice(0,Ot):"":t.slice(0,Pt)}function Wt(e){if(!e||typeof e!="object"||!new Set(["code","research","image","file"]).has(e.type))return null;let n=Yt(e);return!n&&e.type!=="image"||!n&&e.type==="image"&&!e.url?null:{type:e.type,text:n||e.url||""}}function Ze(e){return!Array.isArray(e)||!e.length?[]:e.slice(0,Dt).map(Wt).filter(Boolean)}function Ge(e){if(!Array.isArray(e)||!e.length)return[];let t=new Set(["user","assistant","system"]);return e.filter(n=>n&&t.has(n.role)&&n.content).slice(-jt).map(n=>({role:n.role,content:String(n.content).slice(0,1e3)}))}function Xt(){try{return H()}catch{return{url:window?.location?.href||"",title:document?.title||"",content:""}}}async function Ft(e){if(!e)return null;try{let t=await fetch(`${W}/api/auth/refresh`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let n=await t.json();return n.token?(D(n.token),console.log("[VENOM mini-agent] Token refreshed successfully"),n.token):null}catch{return null}}function Y(){let e=document.getElementById("vn-convo");if(!e)return;document.getElementById("vn-pin-prompt")?.remove();let t=document.createElement("div");t.id="vn-pin-prompt",t.className="vn-msg vn-msg-agent",t.innerHTML=`
    <div class="vn-msg-label">NExY \xB7 AUTH REQUIRED</div>
    <span>Session expired. Enter your PIN to continue:</span>
    <div style="display:flex;gap:8px;margin-top:8px;">
      <input type="password" id="vn-pin-input" placeholder="Enter PIN"
        style="flex:1;background:var(--vn-bg3);border:1px solid var(--vn-border2);
               border-radius:5px;color:var(--vn-text);padding:7px 10px;
               font-family:var(--vn-mono);font-size:13px;outline:none;" />
      <button id="vn-pin-submit"
        style="background:var(--vn-red);border:none;color:#fff;
               border-radius:5px;padding:7px 14px;cursor:pointer;
               font-family:var(--vn-mono);font-size:12px;">
        Login
      </button>
    </div>
    <div id="vn-pin-error" style="font-size:11px;color:var(--vn-red);margin-top:4px;display:none;">
      Wrong PIN \u2014 try again
    </div>
  `,e.appendChild(t),e.scrollTop=e.scrollHeight;let n=t.querySelector("#vn-pin-input"),o=t.querySelector("#vn-pin-submit"),r=t.querySelector("#vn-pin-error"),s=async()=>{let i=n.value.trim();if(i){o.disabled=!0,o.textContent="...",r.style.display="none";try{let a=await fetch(`${W}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pin:i}),signal:AbortSignal.timeout(1e4)}),d=await a.json();if(a.ok&&d.token){D(d.token),t.remove(),document.getElementById("vn-agent-input")?.focus();let l=document.createElement("div");l.className="vn-msg vn-msg-agent",l.innerHTML='<div class="vn-msg-label">NExY</div><span>\u2705 Back online \u2014 go ahead</span>',e.appendChild(l),e.scrollTop=e.scrollHeight}else r.style.display="block",o.disabled=!1,o.textContent="Login",n.select()}catch{r.textContent="Server unreachable \u2014 check connection",r.style.display="block",o.disabled=!1,o.textContent="Login"}}};o.addEventListener("click",s),n.addEventListener("keydown",i=>{i.key==="Enter"&&s()}),setTimeout(()=>n.focus(),100)}async function Jt(e,t,n,o,r,s){try{let i=await fetch(`${W}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,context:"bookmarklet",stream:!1,history:Ge(r),snippets:Ze(t),sessionId:s||null}),signal:AbortSignal.timeout(Rt)}),a=await i.json();return i.ok?{reply:a.reply||"",model:a.model||"agent",escalated:!0,tools_used:a.tools_used||[],searched:!1}:{error:a.message||`Full agent error (${i.status})`,escalated:!0}}catch(i){return{error:i.name==="TimeoutError"||i.name==="AbortError"?"Full agent timed out":"Full agent unreachable",escalated:!0}}}async function pe(e,t=[],n=[],o={}){let{sessionId:r=null,preferredModel:s=null}=o,i=f();if(!i)return Y(),{error:null};if(!e?.trim())return{error:"Message is required"};let a=e.trim(),d=Xt(),l=qt.test(a)?Ze(t):[],c={message:a,pageContext:d,history:Ge(n),snippets:l,sessionId:r||null,preferredModel:s||null},m=async $=>fetch(`${W}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`},body:JSON.stringify(c),signal:AbortSignal.timeout(Ht)}),x,_;try{x=await m(i),_=await x.json()}catch($){return{error:$.name==="TimeoutError"||$.name==="AbortError"?"Lite agent timed out \u2014 check connection":"Backend unreachable \u2014 check connection"}}if(x.status===401){let $=await Ft(i);if($){try{x=await m($),_=await x.json()}catch{return Y(),{error:null}}if(x.status===401)return Y(),{error:null}}else return Y(),{error:null}}return x.ok?_.escalate===!0?Jt(a,t,d,i,n,r):{reply:_.reply||"",model:_.model||"lite",escalated:!1,tools_used:_.tools_used||[],searched:_.searched||!1}:x.status===503?{error:"All AI providers unavailable \u2014 try again shortly"}:x.status===429?{error:_.message||"Rate limit \u2014 try again in a moment"}:{error:_.message||`Request failed (${x.status})`}}y();X();C();var w=[],Ee=null,T=B(),L=null,Z="vn_chat_sessions",G={model:"/model <name|reset|?>  \u2014 pin a model (groq, devstral, mistral, gemini)",clear:"/clear                 \u2014 wipe conversation",page:"/page                  \u2014 capture page text \u2192 research snippet",images:"/images                \u2014 capture all images on page",sync:"/sync                  \u2014 sync snippets to backend",snippets:"/snippets              \u2014 open snippets tab",help:"/help                  \u2014 list all commands"},pn=new Set(["clear","page","images","sync","snippets","help"]),we=["groq","llama","devstral","mistral","gemini","gemini-lite","gemma-26","gemma-31","reset"];function gt(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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
        <span>Anything buddy\u{1F60F}.. (type / for commands)</span>
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
        <textarea class="vn-input" id="vn-agent-input" placeholder="ask anything \u2014 / for commands" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,un(),ht(),Q())}function un(){document.getElementById("vn-send-btn")?.addEventListener("click",mt),document.getElementById("vn-suggest-btn")?.addEventListener("click",fn),document.getElementById("vn-inject-btn")?.addEventListener("click",Sn),document.getElementById("vn-inject-dismiss")?.addEventListener("click",bt),document.getElementById("vn-hamburger")?.addEventListener("click",kn),document.getElementById("vn-drawer-close")?.addEventListener("click",Se),document.getElementById("vn-new-chat")?.addEventListener("click",In);let e=document.getElementById("vn-agent-input");e&&(e.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),mt()),t.key==="Escape"&&M()}),e.addEventListener("input",()=>{e.value.startsWith("/")?mn(e.value):M()}),document.addEventListener("click",t=>{let n=document.getElementById("vn-bottom-area");n&&!n.contains(t.target)&&M()}))}function ft(e){if(!e)return Object.keys(G);let t=e.toLowerCase(),n=t.replace(/[_\-]/g,"");return Object.keys(G).filter(o=>o.startsWith(t)||o.startsWith(n)||t.startsWith(o))}function mn(e){let t=document.getElementById("vn-slash-popup"),n=document.getElementById("vn-slash-list");if(!t||!n)return;let o=e.slice(1),r=o.indexOf(" "),s=r===-1?o:o.slice(0,r),i=ft(s);if(!i.length){M();return}n.innerHTML=i.map(a=>`
    <div class="vn-slash-item" data-cmd="/${a}">
      <span class="vn-slash-cmd">${G[a]}</span>
    </div>
  `).join(""),n.querySelectorAll(".vn-slash-item").forEach(a=>{a.addEventListener("mousedown",d=>{d.preventDefault();let l=document.getElementById("vn-agent-input");if(l){let c=pn.has(a.dataset.cmd.slice(1));l.value=a.dataset.cmd+(c?"":" "),l.focus(),l.selectionStart=l.selectionEnd=l.value.length}M()})}),t.style.display="block"}function M(){let e=document.getElementById("vn-slash-popup");e&&(e.style.display="none")}function gn(e){let n=e.trim().slice(1),o=n.indexOf(" "),r=o===-1?n:n.slice(0,o),s=o===-1?"":n.slice(o+1).trim(),i=ft(r.toLowerCase());if(!i.length)return!1;let a=i[0],d=s;if(!d&&r.length>a.length){let l=r.slice(a.length).replace(/^[_\-\s]+/,"");l&&(d=l)}switch(a){case"model":{if(!d||d==="?")return g("agent",`\u{1F4CD} Pinned model: **${L||"auto (modelRouter)"}**
Aliases: ${we.join(", ")}`),!0;if(d==="reset")return L=null,ut(),g("agent","\u{1F504} Model back to auto \u2014 modelRouter decides"),!0;let l=we.find(c=>c.startsWith(d.toLowerCase())||d.toLowerCase().startsWith(c.slice(0,3)));return l&&l!=="reset"?(L=l,ut(),g("agent",`\u{1F4CC} Model pinned: **${L}** \u2014 all requests this session`),!0):(g("agent",`\u2753 Unknown model alias: "${d}"
Valid: ${we.filter(c=>c!=="reset").join(", ")}`),!0)}case"clear":{w=[];let l=document.getElementById("vn-convo");return l&&(l.innerHTML='<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>\u{1F9F9} Cleared</span></div>'),!0}case"page":return Promise.resolve().then(()=>(U(),Ve)).then(({readPage:l})=>{let c=l();Promise.resolve().then(()=>(y(),q)).then(({addSnippet:m})=>{m({text:c.content,type:"research",url:c.url,title:c.title}),Promise.resolve().then(()=>(N(),ye)).then(({renderSnippets:x})=>x()).catch(()=>{}),g("agent",`\u{1F4C4} Page captured \u2192 research snippet (${c.content.length} chars from ${c.title||c.url})`)})}).catch(()=>g("agent","\u26A0 Could not read page content")),!0;case"images":{let l=Array.from(document.images).filter(c=>c.naturalWidth>100&&c.src&&!c.src.startsWith("data:")).slice(0,10);return l.length?(Promise.resolve().then(()=>(y(),q)).then(({addSnippet:c})=>{l.forEach(m=>c({text:m.src,type:"image",url:m.src,title:m.alt||"image"})),Promise.resolve().then(()=>(N(),ye)).then(({renderSnippets:m})=>m()).catch(()=>{}),g("agent",`\u{1F5BC}\uFE0F Captured ${l.length} image${l.length>1?"s":""} as snippets`)}),!0):(g("agent","\u{1F5BC}\uFE0F No suitable images found on this page"),!0)}case"sync":return g("agent","\u21C5 Syncing..."),Promise.resolve().then(()=>(J(),st)).then(({syncToBackend:l})=>{l((c,m)=>{v(c==="success"?"green":c==="error"?"red":"amber",m),c!=="syncing"&&g("agent",`${c==="success"?"\u2705":"\u26A0"} ${m}`)})}),!0;case"snippets":return Promise.resolve().then(()=>(ve(),Ke)).then(({switchTab:l})=>l("snippets")).catch(()=>{}),!0;case"help":{let l=Object.values(G).join(`
`);return g("agent",`**Slash commands:**
${l}`),!0}default:return!1}}function ut(){let e=document.getElementById("vn-model-pill");e&&(L?(e.textContent=`\u{1F4CC} ${L}`,e.style.display="inline-block"):e.style.display="none")}function Q(){let e=document.getElementById("vn-session-label");e&&(e.textContent=T.slice(0,8).toUpperCase())}async function mt(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;if(M(),t.startsWith("/")&&gn(t)){e.value="";return}let n=w.slice();w.push({role:"user",content:t}),g("user",t),e.value="",v("amber","thinking..."),E("model","thinking...","warn");let o=await pe(t,b(),n,{sessionId:String(T),preferredModel:L||null});if(o.error===null){w.pop(),E("model","idle",""),v("green","ready");return}let{reply:r,model:s,escalated:i,error:a,tools_used:d}=o;if(a){g("agent",`\u26A0 ${a}`),v("red","error"),k(a),E("model","error","err"),w.push({role:"assistant",content:`\u26A0 ${a}`});return}w.push({role:"assistant",content:r});let l=d?.length?`${s||"lite"} \xB7 \u{1F527} ${d.join(", ")}`:s||"lite";g("agent",r,l),v("green",i?"done (escalated)":"done"),E("model",s||"lite","active"),Ln(w)}async function fn(){v("amber","generating...");let e=await pe("Based on this page, suggest one concise prompt I can ask my AI assistant. Reply with ONLY the prompt, nothing else.",b(),w,{sessionId:String(T),preferredModel:L||null});if(e.error===null){v("green","ready");return}if(e.error||!e.reply){v("red","failed"),k("Suggestion failed: "+(e.error||"empty"));return}Ee=e.reply,En(e.reply),v("green","ready to inject")}function g(e,t,n){let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let s=document.createElement("div");s.className="vn-msg-label",s.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(s),bn(t).forEach(i=>r.appendChild(i)),o.appendChild(r),o.scrollTop=o.scrollHeight}function bn(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(n=>{if(n.startsWith("```")){let o=n.slice(3,-3),r=o.indexOf(`
`),s=r>=0?o.slice(0,r).trim():"",i=r>=0?o.slice(r+1).trim():o.trim();t.push(hn(s,i))}else if(n.trim().split(`
`).filter(o=>/[├└│─]/.test(o)).length>=2){let o=document.createElement("pre");o.className="vn-ascii-block",o.textContent=n.trim().replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   "),t.push(o)}else if(n.trim()){let o=document.createElement("span");o.textContent=n,o.style.whiteSpace="pre-wrap",t.push(o)}}),t}function hn(e,t){let n=wn(e,t),o=document.createElement("div");return o.className="vn-code-block",o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${xn(t,n)}</div>`,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let r=o.querySelector(".vn-code-copy");r.textContent="copied!",setTimeout(()=>{r&&(r.textContent="copy")},1500)},o}function xn(e,t){let n=xt(e);return yn(t).forEach(([o,r])=>{n=n.replace(o,s=>`<span class="sh-${r}">${s}</span>`)}),n}function yn(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\b\d+\.?\d*\b/g,"num"],o=[/\b(true|false|null|undefined)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[[/\/\/[^\n]*/g,"cmt"],t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|throw|try|catch|switch|case|break|continue|default)\b/g,"kw"],o,n,[/\b[A-Z][a-zA-Z0-9_]*\b/g,"cls"],[/\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g,"fn"]]:["py","python"].includes(e)?[[/#[^\n]*/g,"cmt"],t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|try|except|finally|raise|lambda|pass|yield)\b/g,"kw"],o,n]:["sh","bash"].includes(e)?[[/#[^\n]*/g,"cmt"],t,[/\b(if|then|else|fi|for|do|done|echo|cd|ls|rm|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_]\w*/g,"var"],n]:e==="json"?[t,o,n]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/[a-zA-Z-]+\s*:/g,"kw"],n]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?[a-zA-Z][a-zA-Z0-9-]*/g,"kw"],t]:[t,n,o]}function wn(e,t){let n=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",json:"json",css:"css",html:"html"};return o[n]?o[n]:/(def |from .* import|elif |print\()/m.test(t)?"py":/(const |let |var |function |=>|require\()/m.test(t)?"js":/(#!\/bin\/|echo |grep |npm )/m.test(t)?"sh":n||"code"}function En(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function bt(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),Ee=null}function Sn(){let e=Ee||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=_n(e);bt(),t===!1?(v("red","no input"),k("No writable input found")):v("green",t==="clipboard"?"copied":"injected \u2197")}function _n(e){if(!e)return!1;for(let t of["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]']){let n=document.querySelector(t);if(n)try{if(n.tagName==="TEXTAREA"||n.tagName==="INPUT")return n.focus(),n.value=e,n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(n.contentEditable==="true")return n.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function kn(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),ht()}function Se(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function In(){w=[],Promise.resolve().then(()=>(y(),q)).then(({resetSession:t,getSessionId:n})=>{t(),T=n(),Q()}).catch(()=>{T=crypto.randomUUID(),Q()});let e=document.getElementById("vn-convo");e&&(e.innerHTML='<div class="vn-msg vn-msg-agent"><div class="vn-msg-label">NExY</div><span>\u{1F9F9} Fresh session</span></div>'),Se()}function Ln(e){if(e?.length)try{let t=JSON.parse(localStorage.getItem(Z)||"[]"),n=t.findIndex(s=>s.id===T),o=e.find(s=>s.role==="user")?.content?.slice(0,60)||"Chat",r={id:T,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};n>=0?t[n]=r:t.unshift(r),localStorage.setItem(Z,JSON.stringify(t.slice(0,20)))}catch{}}function ht(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(Z)||"[]");if(!t.length){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${xt(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>`).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>Tn(n.dataset.id)})}catch{}}function Tn(e){try{let n=JSON.parse(localStorage.getItem(Z)||"[]").find(r=>r.id===e);if(!n)return;w=n.messages.slice(),T=n.id,Q();let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",w.forEach(r=>g(r.role==="user"?"user":"agent",r.content)),Se()}catch{}}function xt(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}N();C();y();N();function wt(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
  `,$n()}function $n(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),s=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let i=e.value;t.textContent=`${i}vh`;let a=A();a&&(a.style.height=`${i}vh`),localStorage.setItem("vn_panel_height",i)}),n?.addEventListener("click",()=>{yt("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{yt("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let i=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",i),r.value=i}),s?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(O(),S())})}function yt(e){let t=A();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}C();var ee=!1,Et,St,_e,ke,te=!1,_t,kt;function It(){Bn(),Cn()}function Bn(){let e=ae();if(!e)return;function t(r,s){ee=!0,Et=r,St=s;let i=e.getBoundingClientRect();_e=i.left,ke=i.top,e.style.right="auto",e.style.bottom="auto",e.style.left=_e+"px",e.style.top=ke+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,s){if(!ee)return;let i=r-Et,a=s-St,d=Math.max(0,Math.min(window.innerWidth-56,_e+i)),l=Math.max(0,Math.min(window.innerHeight-56,ke+a));e.style.left=d+"px",e.style.top=l+"px",localStorage.setItem("vn_fab_left",d),localStorage.setItem("vn_fab_top",l)}function o(){ee=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let s=r.touches[0];t(s.clientX,s.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!ee)return;r.preventDefault();let s=r.touches[0];n(s.clientX,s.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function Cn(){let e=document.getElementById("vn-drag-handle"),t=A();if(!e||!t)return;function n(s){te=!0,_t=s,kt=t.offsetHeight}function o(s){if(!te)return;let i=_t-s,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,kt+i));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){te=!1}e.addEventListener("mousedown",s=>{s.preventDefault(),n(s.clientY)}),document.addEventListener("mousemove",s=>o(s.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",s=>{n(s.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",s=>{te&&(s.preventDefault(),o(s.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function Lt(){let e=ae();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function Tt(){let e=A();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}J();y();N();var An=15e3,Ie=null;function $t(){Ie=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(Ie),Ie=null;return}let e=f(),t=await ge(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),S())},An)}ue();X();function Bt(){document.getElementById("__venom_fab__")||(Fe(),le(),gt(),he(),wt(),It(),Lt(),Tt(),ce(),tt(e=>xe(e)),Qe(),$t(),v("green","ready"))}function Ct(){let e=f();B(),Bt(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Ct()})();})();
