"use strict";(()=>{var Tt=Object.defineProperty;var v=(e,t)=>()=>(e&&(t=e(e=0)),t);var z=(e,t)=>{for(var n in t)Tt(e,n,{get:t[n],enumerable:!0})};var H={};z(H,{addSnippet:()=>G,clearSnippets:()=>j,getSessionId:()=>I,getSnippets:()=>m,getToken:()=>u,removeSnippet:()=>Q,resetSession:()=>Bt,saveSnippets:()=>N,setToken:()=>$t});function u(){return localStorage.getItem(Se)||null}function $t(e){localStorage.setItem(Se,e)}function I(){let e=localStorage.getItem(V);return e||(e=crypto.randomUUID(),localStorage.setItem(V,e)),e}function Bt(){localStorage.removeItem(V),localStorage.removeItem(P)}function m(){try{return JSON.parse(localStorage.getItem(P)||"[]")}catch{return[]}}function N(e){localStorage.setItem(P,JSON.stringify(e))}function G(e){let t=m(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),N(t),o}function Q(e){let t=m().filter(n=>n.number!==e);N(t)}function j(){localStorage.removeItem(P)}var P,V,Se,f=v(()=>{"use strict";P="nexus_scraper_snippets",V="nexus_scraper_session",Se="nexus_auth_token"});var _e,ke=v(()=>{_e=`
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
`});var Ie,Le=v(()=>{Ie=`
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
`});var Te,$e=v(()=>{Te=`
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
`});var Be,Ae=v(()=>{Be=`
.vn-agent-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 12px;
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0;
}
.vn-agent-label { font-size: 11px; color: var(--vn-muted); letter-spacing: 0.5px; }
.vn-hamburger {
  background: none;
  border: 1px solid var(--vn-border);
  color: var(--vn-muted);
  border-radius: 4px; padding: 4px 10px;
  cursor: pointer; font-size: 13px; font-family: var(--vn-mono);
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
  display: flex; justify-ctent: space-between; align-items: center;
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
.vn-history-preview {
  font-size: 12px; color: var(--vn-text); margin-bottom: 3px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.vn-history-meta  { font-size: 10px; color: var(--vn-dim); }
.vn-history-empty { padding: 14px; font-size: 12px; color: var(--vn-dim); }

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

.vn-bottom-area {
  padding: 9px 12px;
  border-top: 1px solid var(--vn-border);
  background: var(--vn-bg2); flex-shrink: 0;
  display: flex; flex-direction: column; gap: 7px;
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
`});var Ce,ze=v(()=>{Ce=`
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
`});var Ne,je=v(()=>{Ne=`
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
`});var Me,Oe=v(()=>{Me=`
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
`});var Pe,He=v(()=>{Pe=`
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
`});function Re(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[_e,Ie,Te,Be,Ce,Ne,Me,Pe].join(`
`),document.head.appendChild(e)}var De=v(()=>{ke();Le();$e();Ae();ze();je();Oe();He()});function Ue(){Re();let e=document.createElement("div");e.id=qe,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=te,t.innerHTML=`
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
  `,e.onclick=At,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function At(){ee=!ee;let e=document.getElementById(te);e&&e.classList.toggle("vn-open",ee)}function ne(){return document.getElementById(qe)}function B(){return document.getElementById(te)}function w(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function E(e,t,n){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var qe,te,ee,L=v(()=>{De();qe="__venom_fab__",te="__venom_panel__",ee=!1});var Xe={};z(Xe,{initTabs:()=>oe,restoreLastTab:()=>se,switchTab:()=>re});function oe(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;re(o)}})}function re(e){if(!Ye.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function se(){let e=localStorage.getItem("vn_last_tab");e&&Ye.includes(e)&&re(e)}var Ye,ie=v(()=>{Ye=["agent","snippets","settings"]});var Fe={};z(Fe,{readPage:()=>M});function M(){return{url:location.href,title:document.title||"",content:Ct()}}function Ct(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var R=v(()=>{});function l(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function Ze(){u()?E("auth","authed","active"):E("auth","unauthed","err")}var D=v(()=>{L();f()});function Ge(e){document.addEventListener("selectionchange",()=>{clearTimeout(Ve),Ve=setTimeout(()=>{let t=q();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=q();t&&e(t)},50)})}function q(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var Ve,le=v(()=>{Ve=null});var nt={};z(nt,{pollSettings:()=>ce,syncToBackend:()=>de});function tt(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function Kt(e){let t=typeof e.text=="string"?e.text:"";return tt(t)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,et):""):t.slice(0,Wt)}function Jt(e){let t={number:e.number,text:Kt(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,et):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(t.mime_type=e.mime_type),typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let n={...e.metadata};(n.base64||tt(n.data||""))&&(delete n.base64,delete n.data),t.metadata=n}return e.type==="file"&&(typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(t.metadata={...e.metadata})),t}async function de(e){let t=u(),n=m();if(!t)return e("error","Login to dashboard first"),!1;if(!n||n.length===0)return e("error","No snippets staged"),!1;let r=n.map(Jt).filter(s=>!(!s.text&&s.type!=="image"||s.type==="image"&&!s.text&&!s.url));if(r.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${r.length} snippet${r.length!==1?"s":""}...`);try{let s=await fetch(`${Qe}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:I(),snippets:r,pageContext:M()}),signal:AbortSignal.timeout(Xt)}),i=await s.json();if(!s.ok)return e("error",i.message||`Sync failed (${s.status})`),!1;j();let a=i.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(s){return s.name==="TimeoutError"||s.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function ce(e){if(!e)return null;try{let t=await fetch(`${Qe}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(Ft)});return t.ok&&(await t.json()).settings||null}catch{return null}}var Qe,Xt,Ft,Wt,et,U=v(()=>{f();R();Qe="https://vinnsedesigner-vinns-ai-backend.hf.space",Xt=3e4,Ft=1e4,Wt=2e3,et=2048});var ge={};z(ge,{buildSnippetsTab:()=>ue,renderSnippets:()=>x,showSelectionOverlay:()=>me});function c(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function X(e){return!e||typeof e!="number"?"":e<1024?`${e}B`:e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}function it(e){return{js:"\u{1F7E8}",ts:"\u{1F537}",jsx:"\u{1F7E6}",tsx:"\u{1F537}",py:"\u{1F40D}",json:"\u{1F4CB}",md:"\u{1F4DD}",txt:"\u{1F4C4}",css:"\u{1F3A8}",html:"\u{1F310}",sql:"\u{1F5C4}\uFE0F",yaml:"\u2699\uFE0F",yml:"\u2699\uFE0F",sh:"\u26A1",rs:"\u{1F980}",go:"\u{1F439}",rb:"\u{1F48E}",java:"\u2615"}[(e||"").toLowerCase()]||"\u{1F4C1}"}function Vt(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function pe(e){let t=e.text||e.url||"";return!t||Vt(t)?null:t}function ue(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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
  `,Qt(),Gt(),x())}function Gt(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await de((e,t)=>{l(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&w(t),e==="success"&&x()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",tn),document.getElementById("vn-modal-close")?.addEventListener("click",st),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&st()})}function Qt(){g||(g=document.createElement("div"),g.className="vn-sel-overlay",g.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(g),g.querySelector("#vn-sel-repo").addEventListener("click",()=>ot("code")),g.querySelector("#vn-sel-research").addEventListener("click",()=>ot("research")),document.addEventListener("click",e=>{g.contains(e.target)||ve()}))}function me(e){!g||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();g.style.top=`${n.bottom+8}px`,g.style.left=`${Math.max(0,n.left)}px`,g.classList.add("vn-show")},300)}function ve(){g?.classList.remove("vn-show")}function ot(e){let t=q();if(!t)return;let n=m(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20",10);if(n.length>=o){l("red",`Max ${o} snippets`),w(`Snippet limit (${o}) reached \u2014 sync or clear first`),ve();return}G({text:t,type:e,url:location.href,title:document.title}),x(),ve(),l("green",`#${n.length+1} staged`)}function rt(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");if(!(!t||!o||!n)){if(n.textContent=`#${e.number} \xB7 ${e.type}`+(e.title?` \xB7 ${e.title.slice(0,30)}`:""),e.type==="image"){let r=pe(e),s=A.get(e.number),i=X(e.file_size),a=e.mime_type||"";o.innerHTML=`
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
      ${s?`<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis</div>
             <div class="vn-modal-analysis-body">${c(s)}</div>
           </div>`:`<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${e.number}">
             \u{1F50D} Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${e.number}"></div>`}
    `,s||o.querySelector(`#vn-analyze-modal-${e.number}`)?.addEventListener("click",()=>at(e,o))}else if(e.type==="file"){let r=e.metadata?.extension||"",s=X(e.file_size),i=it(r);o.innerHTML=`
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${i}</span>
        ${r?`<span class="vn-snippet-type">.${c(r)}</span>`:""}
        ${s?`<span class="vn-snippet-type">${c(s)}</span>`:""}
      </div>
      <div class="vn-modal-file-url">${c(e.url||"")}</div>
      <pre class="vn-modal-file-content">${c((e.text||"").slice(0,3e3))}</pre>
    `}else o.innerHTML=`
      <pre class="vn-modal-text">${c((e.text||"").slice(0,3e3))}</pre>
    `;t.classList.add("vn-show")}}function st(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}async function at(e,t){let n=u();if(!n){w("Login to dashboard first");return}let o=`vn-analyze-modal-${e.number}`,r=`vn-analyze-result-${e.number}`,s=t.querySelector(`#${o}`),i=t.querySelector(`#${r}`);s&&(s.textContent="\u23F3 Analyzing...",s.disabled=!0),i&&(i.textContent=""),l("amber","analyzing image...");try{let a=pe(e),d=a?{imageUrl:a,mimeType:e.mime_type||"image/jpeg",question:"Describe this image in detail."}:null;if(!d)throw new Error("No valid image URL for analysis");let h=await fetch(`${Zt}/api/vision`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(d),signal:AbortSignal.timeout(3e4)}),$=await h.json();if(!h.ok)throw new Error($.message||`Vision API error (${h.status})`);let b=$.analysis||"No analysis returned";A.set(e.number,b),i&&(i.innerHTML=`
        <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis \xB7 <span class="vn-model-tag">${c($.model||"")}</span></div>
        <div class="vn-modal-analysis-body">${c(b)}</div>
      `),s&&(s.style.display="none"),l("green","analysis complete")}catch(a){let d=a.name==="TimeoutError"||a.name==="AbortError"?"Analysis timed out \u2014 try again":a.message||"Analysis failed";i&&(i.textContent=`\u26A0 ${d}`),s&&(s.textContent="\u{1F50D} Retry Analysis",s.disabled=!1),l("red","analysis failed"),w(d)}}function en(e){let n=m().find(r=>r.number===e);if(!n)return;Q(e),x(),A.delete(e);let o={snippet:n,timer:null};S.push(o),lt(`Snippet #${e} removed`),o.timer=setTimeout(()=>{S=S.filter(r=>r.snippet.number!==e),S.length===0&&dt()},5e3)}function tn(){let e=S.pop();if(!e)return;clearTimeout(e.timer);let t=m();t.push(e.snippet),t.sort((n,o)=>n.number-o.number),N(t),x(),S.length===0?dt():lt(`Snippet #${S[S.length-1].snippet.number} removed`)}function lt(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function dt(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function x(){let e=m(),t=e.filter(i=>i.type==="code"),n=e.filter(i=>i.type==="research"),o=e.filter(i=>i.type==="image"),r=e.filter(i=>i.type==="file"),s=(i,a)=>{let d=document.getElementById(i);d&&(d.textContent=a)};s("vn-repo-count",t.length),s("vn-research-count",n.length),s("vn-image-count",o.length),s("vn-file-count",r.length),E("snip",`${e.length} snippets`,e.length>0?"active":""),Y("vn-repo-list",t,on),Y("vn-research-list",n,rn),Y("vn-image-list",o,sn),Y("vn-file-list",r,an),nn(e)}function Y(e,t,n){let o=document.getElementById(e);if(o){if(t.length===0){o.innerHTML='<div class="vn-snip-empty">\u2014</div>';return}o.innerHTML=t.map(n).join("")}}function nn(e){document.querySelectorAll(".vn-snip-view").forEach(t=>{t.addEventListener("click",()=>{let n=e.find(o=>o.number===Number(t.dataset.num));n&&rt(n)})}),document.querySelectorAll(".vn-snip-del").forEach(t=>{t.addEventListener("click",()=>{en(Number(t.dataset.num))})}),document.querySelectorAll(".vn-snip-analyze").forEach(t=>{t.addEventListener("click",async()=>{let n=e.find(r=>r.number===Number(t.dataset.num));if(!n)return;rt(n);let o=document.getElementById("vn-modal-body");o&&!A.has(n.number)&&await at(n,o)})})}function on(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function rn(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function sn(e){let t=pe(e),n=X(e.file_size);return`
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
  `}function an(e){let t=e.metadata?.extension||"",n=X(e.file_size),o=it(t),r=(e.text||e.url||"").slice(0,40);return`
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${o}</span>
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${c(r)}</span>
      <div class="vn-snip-badges">
        ${t?`<span class="vn-snip-type">.${c(t)}</span>`:""}
        ${n?`<span class="vn-snip-type">${c(n)}</span>`:""}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}var Zt,g,S,A,C=v(()=>{f();le();U();D();L();Zt="https://vinnsedesigner-vinns-ai-backend.hf.space",g=null,S=[],A=new Map});f();L();ie();f();R();var We="https://vinnsedesigner-vinns-ai-backend.hf.space",zt=10,Nt=2e3,jt=2048,Mt=3e4,Ot=6e4,Pt=20;function Ht(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function Rt(e){let t=typeof e.text=="string"?e.text:"";return Ht(t)?(console.warn("[VENOM mini-agent] base64 stripped from snippet before send",{type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,jt):""):t.slice(0,Nt)}function Dt(e){if(!e||typeof e!="object"||!new Set(["code","research","image","file"]).has(e.type))return null;let n=Rt(e);return!n&&e.type!=="image"||!n&&e.type==="image"&&!e.url?null:{type:e.type,text:n||e.url||""}}function Ke(e){return!Array.isArray(e)||e.length===0?[]:e.slice(0,Pt).map(Dt).filter(Boolean)}function Je(e){if(!Array.isArray(e)||e.length===0)return[];let t=new Set(["user","assistant","system"]);return e.filter(n=>n&&t.has(n.role)&&n.content).slice(-zt).map(n=>({role:n.role,content:String(n.content).slice(0,1e3)}))}function qt(){return u()||null}function Ut(){try{return M()}catch(e){return console.warn("[VENOM mini-agent] buildPageContext failed",e.message),{url:typeof window<"u"?window.location.href:"",title:typeof document<"u"?document.title:"",content:""}}}async function Yt(e,t,n,o,r){try{let s=await fetch(`${We}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,history:Je(r),snippets:Ke(t),context:"bookmarklet",stream:!1}),signal:AbortSignal.timeout(Ot)}),i=await s.json();return s.ok?{reply:i.reply||i.response||"",model:i.model_used||i.model||"agent",escalated:!0,tools_used:i.tools_used||[],searched:!1}:{error:i.message||`Full agent error (${s.status})`,escalated:!0}}catch(s){return{error:s.name==="TimeoutError"||s.name==="AbortError"?"Full agent timed out \u2014 try again":"Full agent unreachable \u2014 check connection",escalated:!0}}}async function ae(e,t=[],n=[],o={}){let{sessionId:r=null}=o,s=qt();if(!s)return{error:"Not authenticated \u2014 open dashboard and login first"};if(!e||typeof e!="string"||!e.trim())return{error:"Message is required"};let i=e.trim(),a=Ut(),d=Ke(t),h=Je(n),$={message:i,pageContext:a,history:h,snippets:d,sessionId:r||null},b,k;try{k=await fetch(`${We}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify($),signal:AbortSignal.timeout(Mt)}),b=await k.json()}catch(Z){return{error:Z.name==="TimeoutError"||Z.name==="AbortError"?"Lite agent timed out \u2014 check connection":"Backend unreachable \u2014 check connection"}}return k.ok?b.escalate===!0?Yt(i,t,a,s,n):{reply:b.reply||"",model:b.model||"lite",escalated:!1,tools_used:b.tools_used||[],searched:b.searched||!1}:k.status===503?{error:"All AI providers are currently unavailable \u2014 try again shortly"}:k.status===429?{error:b.message||"Rate limit reached \u2014 try again in a few minutes"}:k.status===401?{error:"Session expired \u2014 open dashboard and login again"}:{error:b.message||`Request failed (${k.status})`}}f();D();L();var y=[],F=null,T=I(),_=null,W="vn_chat_sessions",be={model:{args:!0,hint:"/model <name|reset|?>"},clear:{args:!1,hint:"/clear"},page:{args:!1,hint:"/page"},images:{args:!1,hint:"/images"},sync:{args:!1,hint:"/sync"},snippets:{args:!1,hint:"/snippets"},help:{args:!1,hint:"/help"}},fe=["groq","llama","devstral","mistral","gemini","gemini-lite","gemma-26","gemma-31","reset"];function pt(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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

    <div class="vn-slash-popup" id="vn-slash-popup" style="display:none">
      <div class="vn-slash-list" id="vn-slash-list"></div>
    </div>

    <div class="vn-bottom-area">
      <div class="vn-input-row">
        <textarea class="vn-input" id="vn-agent-input" placeholder="\u{1F9D1}\u200D\u{1F4BB} anything to ask \u{1F642}" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,ln(),mt(),he())}function ln(){document.getElementById("vn-send-btn")?.addEventListener("click",vt),document.getElementById("vn-suggest-btn")?.addEventListener("click",vn),document.getElementById("vn-inject-btn")?.addEventListener("click",yn),document.getElementById("vn-inject-dismiss")?.addEventListener("click",ut),document.getElementById("vn-hamburger")?.addEventListener("click",En),document.getElementById("vn-drawer-close")?.addEventListener("click",xe),document.getElementById("vn-new-chat")?.addEventListener("click",Sn);let e=document.getElementById("vn-agent-input");e?.addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),vt()),t.key==="Escape"&&O()}),e?.addEventListener("input",()=>{let t=e.value;t.startsWith("/")?dn(t):O()})}function dn(e){let t=document.getElementById("vn-slash-popup"),n=document.getElementById("vn-slash-list");if(!t||!n)return;let o=e.slice(1).toLowerCase().split(" ")[0],r=Object.keys(be).filter(s=>s.startsWith(o));if(r.length===0){O();return}n.innerHTML=r.map(s=>`
    <div class="vn-slash-item" data-cmd="/${s}">
      <span class="vn-slash-cmd">${be[s].hint}</span>
    </div>
  `).join(""),n.querySelectorAll(".vn-slash-item").forEach(s=>{s.addEventListener("click",()=>{let i=document.getElementById("vn-agent-input");i&&(i.value=s.dataset.cmd+" "),O(),i?.focus()})}),t.style.display="block"}function O(){let e=document.getElementById("vn-slash-popup");e&&(e.style.display="none")}function cn(e){let t=e.trim().split(/\s+/),n=t[0].slice(1).toLowerCase(),o=t.slice(1).join(" ").trim();switch(n){case"model":return!o||o==="?"?(p("agent",`\u{1F4CD} Current model: **${_||"auto (modelRouter)"}**
Available: ${fe.join(", ")}`),!0):o==="reset"?(_=null,ct(),p("agent","\u{1F504} Model reset to auto \u2014 modelRouter decides"),!0):fe.includes(o.toLowerCase())?(_=o.toLowerCase(),ct(),p("agent",`\u{1F4CC} Model pinned to **${_}** for this session`),!0):(p("agent",`\u2753 Unknown model "${o}". Valid: ${fe.join(", ")}`),!0);case"clear":{y=[];let r=document.getElementById("vn-convo");return r&&(r.innerHTML=`
        <div class="vn-msg vn-msg-agent">
          <div class="vn-msg-label">NExY</div>
          <span>Cleared \u{1F9F9} fresh session</span>
        </div>`),!0}case"page":return Promise.resolve().then(()=>(R(),Fe)).then(({readPage:r})=>{let s=r();Promise.resolve().then(()=>(f(),H)).then(({addSnippet:i})=>{i({text:s.content,type:"research",url:s.url,title:s.title}),Promise.resolve().then(()=>(C(),ge)).then(({renderSnippets:a})=>a()),p("agent",`\u{1F4C4} Page captured as research snippet \u2014 ${s.content.length} chars`)})}).catch(()=>p("agent","\u26A0 Could not capture page")),!0;case"images":{let r=Array.from(document.images).filter(s=>s.naturalWidth>100&&s.src&&!s.src.startsWith("data:")).slice(0,10);return r.length===0?(p("agent","\u{1F5BC}\uFE0F No suitable images found on this page"),!0):(Promise.resolve().then(()=>(f(),H)).then(({addSnippet:s})=>{r.forEach(i=>{s({text:i.src,type:"image",url:i.src,title:i.alt||"image"})}),Promise.resolve().then(()=>(C(),ge)).then(({renderSnippets:i})=>i()),p("agent",`\u{1F5BC}\uFE0F Captured ${r.length} image${r.length!==1?"s":""} as snippets`)}),!0)}case"sync":return Promise.resolve().then(()=>(U(),nt)).then(({syncToBackend:r})=>{r((s,i)=>{l(s==="success"?"green":s==="error"?"red":"amber",i)})}),p("agent","\u21C5 Syncing snippets to backend..."),!0;case"snippets":return Promise.resolve().then(()=>(ie(),Xe)).then(({switchTab:r})=>r("snippets")),!0;case"help":{let r=Object.values(be).map(s=>s.hint).join(`
`);return p("agent",`**Slash commands:**
${r}`),!0}default:return!1}}function ct(){let e=document.getElementById("vn-model-pill");e&&(_?(e.textContent=`\u{1F4CC} ${_}`,e.style.display="inline-block"):e.style.display="none")}function he(){let e=document.getElementById("vn-session-label");e&&(e.textContent=T.slice(0,8).toUpperCase())}async function vt(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;if(O(),t.startsWith("/")&&cn(t)){e.value="";return}let n=y.slice();y.push({role:"user",content:t}),p("user",t),e.value="",l("amber","thinking..."),E("model","thinking...","warn");let o=await ae(t,m(),n,{sessionId:String(T),preferredModel:_||null}),{reply:r,model:s,escalated:i,error:a,tools_used:d}=o;if(a){p("agent",`\u26A0 ${a}`),l("red","error"),w(a),E("model","error","err"),y.push({role:"assistant",content:`\u26A0 ${a}`});return}y.push({role:"assistant",content:r});let h=d&&d.length>0?`${s||"lite"} \xB7 \u{1F527}${d.join(",")}`:s||"lite";p("agent",r,h),l("green",i?"done (escalated)":"done"),E("model",s||"lite","active"),_n(y)}async function vn(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";l("amber","generating...");let t=await ae(e,m(),y,{sessionId:String(T),preferredModel:_||null}),{reply:n,error:o}=t;if(o||!n){l("red","suggestion failed"),w("Suggestion failed: "+(o||"empty reply"));return}F=n,xn(n),l("green","ready to inject")}function p(e,t,n){let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let s=document.createElement("div");s.className="vn-msg-label",s.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(s),pn(t).forEach(i=>r.appendChild(i)),o.appendChild(r),o.scrollTop=o.scrollHeight}function pn(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let r=o.slice(3,-3),s=r.indexOf(`
`),i=s>=0?r.slice(0,s).trim():"",a=s>=0?r.slice(s+1).trim():r.trim();t.push(un(i,a))}else if(bn(o)){let r=document.createElement("pre");r.className="vn-ascii-block",r.textContent=hn(o.trim()),t.push(r)}else if(o.trim()){let r=document.createElement("span");r.textContent=o,r.style.whiteSpace="pre-wrap",t.push(r)}}),t}function un(e,t){let n=fn(e,t),o=document.createElement("div");o.className="vn-code-block";let r=mn(t,n);return o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${r}</div>
  `,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let s=o.querySelector(".vn-code-copy");s.textContent="copied!",setTimeout(()=>{s&&(s.textContent="copy")},1500)},o}function mn(e,t){let n=gt(e);return gn(t).forEach(([r,s])=>{n=n.replace(r,i=>`<span class="sh-${s}">${i}</span>`)}),n}function gn(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\/\/[^\n]*/g,"cmt"],o=[/#[^\n]*/g,"cmt"],r=[/\b(\d+\.?\d*)\b/g,"num"],s=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[n,t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],s,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[o,t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g,"kw"],s,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,"fn"]]:["sh","bash","shell","zsh"].includes(e)?[o,t,[/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_][a-zA-Z0-9_]*/g,"var"],r]:e==="json"?[t,[/\b(true|false|null)\b/g,"kw2"],r]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/([a-zA-Z-]+)\s*:/g,"kw"],r]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],t]:[t,r,s]}function fn(e,t){let n=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",zsh:"sh",json:"json",css:"css",html:"html"};return o[n]?o[n]:/^\s*\{[\s\S]*\}\s*$/.test(t)&&/"[^"]+"\s*:/.test(t)?"json":/(def |import |from .* import|print\(|elif |:\s*$)/m.test(t)?"py":/(const |let |var |function |=>|require\(|module\.exports)/m.test(t)?"js":/(#!\/bin\/(bash|sh)|echo |grep |awk |npm |git )/m.test(t)?"sh":n||"code"}function bn(e){let t=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(n=>t.test(n)).length>=2}function hn(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function xn(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function ut(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),F=null}function yn(){let e=F||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=wn(e);ut(),F=null,t===!1?(l("red","no input found"),w("No writable input found on this page")):l("green",t==="clipboard"?"copied to clipboard":"injected \u2197")}function wn(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function En(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),mt()}function xe(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function Sn(){y=[],Promise.resolve().then(()=>(f(),H)).then(({resetSession:t,getSessionId:n})=>{t(),T=n(),he()});let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
    <div class="vn-msg vn-msg-agent">
      <div class="vn-msg-label">NExY</div>
      <span>Ask me anything about this page...</span>
    </div>`),xe()}function _n(e){if(!(!e||e.length===0))try{let t=JSON.parse(localStorage.getItem(W)||"[]"),n=t.findIndex(s=>s.id===T),o=e.find(s=>s.role==="user")?.content?.slice(0,60)||"Chat",r={id:T,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};n>=0?t[n]=r:t.unshift(r),localStorage.setItem(W,JSON.stringify(t.slice(0,20)))}catch{}}function mt(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(W)||"[]");if(t.length===0){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${gt(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>
    `).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>kn(n.dataset.id)})}catch{}}function kn(e){try{let n=JSON.parse(localStorage.getItem(W)||"[]").find(r=>r.id===e);if(!n)return;y=n.messages.slice(),T=n.id,he();let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",y.forEach(r=>p(r.role==="user"?"user":"agent",r.content)),xe()}catch{}}function gt(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}C();L();f();C();function bt(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
  `,In()}function In(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),s=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let i=e.value;t.textContent=`${i}vh`;let a=B();a&&(a.style.height=`${i}vh`),localStorage.setItem("vn_panel_height",i)}),n?.addEventListener("click",()=>{ft("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{ft("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let i=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",i),r.value=i}),s?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(j(),x())})}function ft(e){let t=B();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}L();var K=!1,ht,xt,ye,we,J=!1,yt,wt;function Et(){Ln(),Tn()}function Ln(){let e=ne();if(!e)return;function t(r,s){K=!0,ht=r,xt=s;let i=e.getBoundingClientRect();ye=i.left,we=i.top,e.style.right="auto",e.style.bottom="auto",e.style.left=ye+"px",e.style.top=we+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,s){if(!K)return;let i=r-ht,a=s-xt,d=Math.max(0,Math.min(window.innerWidth-56,ye+i)),h=Math.max(0,Math.min(window.innerHeight-56,we+a));e.style.left=d+"px",e.style.top=h+"px",localStorage.setItem("vn_fab_left",d),localStorage.setItem("vn_fab_top",h)}function o(){K=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let s=r.touches[0];t(s.clientX,s.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!K)return;r.preventDefault();let s=r.touches[0];n(s.clientX,s.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function Tn(){let e=document.getElementById("vn-drag-handle"),t=B();if(!e||!t)return;function n(s){J=!0,yt=s,wt=t.offsetHeight}function o(s){if(!J)return;let i=yt-s,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,wt+i));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){J=!1}e.addEventListener("mousedown",s=>{s.preventDefault(),n(s.clientY)}),document.addEventListener("mousemove",s=>o(s.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",s=>{n(s.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",s=>{J&&(s.preventDefault(),o(s.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function St(){let e=ne();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function _t(){let e=B();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}U();f();C();var $n=15e3,Ee=null;function kt(){Ee=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(Ee),Ee=null;return}let e=u(),t=await ce(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),x())},$n)}le();D();function It(){document.getElementById("__venom_fab__")||(Ue(),oe(),pt(),ue(),bt(),Et(),St(),_t(),se(),Ge(e=>me(e)),Ze(),kt(),l("green","ready"))}function Lt(){let e=u();I(),It(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Lt()})();})();
