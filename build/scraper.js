"use strict";(()=>{var N="nexus_scraper_snippets",R="nexus_scraper_session",He="nexus_auth_token";function p(){return localStorage.getItem(He)||null}function y(){let e=localStorage.getItem(R);return e||(e=crypto.randomUUID(),localStorage.setItem(R,e)),e}function v(){try{return JSON.parse(localStorage.getItem(N)||"[]")}catch{return[]}}function w(e){localStorage.setItem(N,JSON.stringify(e))}function Y(e){let t=v(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),w(t),o}function q(e){let t=v().filter(n=>n.number!==e);w(t)}function E(){localStorage.removeItem(N)}var F=`
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
`;var U=`
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
`;var X=`
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
`;var J=`
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
`;var Z=`
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
`;var K=`
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
`;var W=`
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
`;var V=`
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
`;function G(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[F,U,X,J,Z,K,W,V].join(`
`),document.head.appendChild(e)}var Q="__venom_fab__",A="__venom_panel__",z=!1;function ee(){G();let e=document.createElement("div");e.id=Q,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=A,t.innerHTML=`
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
  `,e.onclick=Pe,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Pe(){z=!z;let e=document.getElementById(A);e&&e.classList.toggle("vn-open",z)}function j(){return document.getElementById(Q)}function h(){return document.getElementById(A)}function b(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function u(e,t,n){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(n?" "+n:""),r.textContent=t)}var te=["agent","snippets","settings"];function ne(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;oe(o)}})}function oe(e){if(!te.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function re(){let e=localStorage.getItem("vn_last_tab");e&&te.includes(e)&&oe(e)}function _(){return{url:location.href,title:document.title||"",content:De()}}function De(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var ie="https://vinnsedesigner-vinns-ai-backend.hf.space";async function $(e,t=[],n=[]){let o=p();if(!o)return{error:"Not authenticated \u2014 open dashboard and login first"};let r=_(),i=n.slice(-10),s={message:e,pageContext:r,history:i,snippets:t.map(a=>({type:a.type,text:a.text}))};try{let a=await fetch(`${ie}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(s)}),l=await a.json();return a.ok?l.escalate===!0?await Re(e,t,r,o,i):{reply:l.reply,model:l.model,escalated:!1}:{error:l.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function Re(e,t,n,o,r){try{let i=await fetch(`${ie}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,history:r,snippets:t.map(a=>({type:a.type,text:a.text})),stream:!1})}),s=await i.json();return i.ok?{reply:s.response||s.reply||"",model:s.model_used||s.model||"agent",escalated:!0}:{error:s.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function d(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function se(){p()?u("auth","authed","active"):u("auth","unauthed","err")}var m=[],k=null,I=Date.now(),L="vn_chat_sessions";function de(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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
  `,Ye(),ce())}function Ye(){document.getElementById("vn-send-btn")?.addEventListener("click",ae),document.getElementById("vn-suggest-btn")?.addEventListener("click",qe),document.getElementById("vn-inject-btn")?.addEventListener("click",Ge),document.getElementById("vn-inject-dismiss")?.addEventListener("click",le),document.getElementById("vn-hamburger")?.addEventListener("click",et),document.getElementById("vn-drawer-close")?.addEventListener("click",M),document.getElementById("vn-new-chat")?.addEventListener("click",tt),document.getElementById("vn-agent-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),ae())})}async function ae(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;m.push({role:"user",content:t}),S("user",t),e.value="",d("amber","thinking..."),u("model","thinking...","warn");let{reply:n,model:o,escalated:r,error:i}=await $(t,v(),m);if(i){S("agent",`\u26A0 ${i}`),d("red","error"),b(i),u("model","error","err"),m.push({role:"assistant",content:`\u26A0 ${i}`});return}m.push({role:"assistant",content:n}),S("agent",n,o),d("green",r?"done (escalated)":"done"),u("model",o||"lite","active"),nt(m)}async function qe(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";d("amber","generating...");let{reply:t,error:n}=await $(e,v(),m);if(n||!t){d("red","suggestion failed"),b("Suggestion failed: "+(n||"empty reply"));return}k=t,Ve(t),d("green","ready to inject")}function S(e,t,n){let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let i=document.createElement("div");i.className="vn-msg-label",i.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",r.appendChild(i),Fe(t).forEach(s=>r.appendChild(s)),o.appendChild(r),o.scrollTop=o.scrollHeight}function Fe(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let r=o.slice(3,-3),i=r.indexOf(`
`),s=i>=0?r.slice(0,i).trim():"",a=i>=0?r.slice(i+1).trim():r.trim();t.push(Ue(s,a))}else if(Ke(o)){let r=document.createElement("pre");r.className="vn-ascii-block",r.textContent=We(o.trim()),t.push(r)}else if(o.trim()){let r=document.createElement("span");r.textContent=o,r.style.whiteSpace="pre-wrap",t.push(r)}}),t}function Ue(e,t){let n=Ze(e,t),o=document.createElement("div");o.className="vn-code-block";let r=Xe(t,n);return o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${r}</div>
  `,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let i=o.querySelector(".vn-code-copy");i.textContent="copied!",setTimeout(()=>{i&&(i.textContent="copy")},1500)},o}function Xe(e,t){let n=ve(e);return Je(t).forEach(([r,i])=>{n=n.replace(r,s=>`<span class="sh-${i}">${s}</span>`)}),n}function Je(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\/\/[^\n]*/g,"cmt"],o=[/#[^\n]*/g,"cmt"],r=[/\b(\d+\.?\d*)\b/g,"num"],i=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[n,t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[o,t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,"fn"]]:["sh","bash","shell","zsh"].includes(e)?[o,t,[/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_][a-zA-Z0-9_]*/g,"var"],r]:e==="json"?[t,[/\b(true|false|null)\b/g,"kw2"],r]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/([a-zA-Z-]+)\s*:/g,"kw"],[/#[0-9a-fA-F]{3,6}\b/g,"num"],r]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],t]:[t,r,i]}function Ze(e,t){let n=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",zsh:"sh",json:"json",css:"css",html:"html",sql:"sql",yaml:"yaml",yml:"yaml",md:"md",markdown:"md",cpp:"cpp",c:"c",java:"java",rs:"rs",go:"go",rb:"rb"};return o[n]?o[n]:/^\s*\{[\s\S]*\}\s*$/.test(t)&&/"[^"]+"\s*:/.test(t)?"json":/^<(!DOCTYPE|html|head|body|div|span|p )/i.test(t.trim())?"html":/(def |import |from .* import|print\(|elif |:\s*$)/m.test(t)?"py":/(const |let |var |function |=>|require\(|module\.exports)/m.test(t)?"js":/(#!\/bin\/(bash|sh)|echo |grep |awk |sed |curl |npm |git )/m.test(t)?"sh":/SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(t)?"sql":/^\s*[\w-]+\s*:/m.test(t)&&!/{/.test(t)?"yaml":/^(\/\/|\/\*|#include|using namespace|public class|fn |impl )/m.test(t)?"code":n||"code"}function Ke(e){let t=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(o=>t.test(o)).length>=2}function We(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function Ve(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function le(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),k=null}function Ge(){let e=k||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=Qe(e);le(),k=null,t===!1?(d("red","no input found"),b("No writable input found on this page")):d("green",t==="clipboard"?"copied to clipboard":"injected \u2197")}function Qe(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function et(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),ce()}function M(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function tt(){m=[],I=Date.now();let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Ask me anything about this page...</span>
      </div>
    `);let t=document.getElementById("vn-session-label");t&&(t.textContent="NEW SESSION"),M()}function nt(e){if(!(!e||e.length===0))try{let t=JSON.parse(localStorage.getItem(L)||"[]"),n=t.findIndex(i=>i.id===I),o=e.find(i=>i.role==="user")?.content?.slice(0,60)||"Chat",r={id:I,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};n>=0?t[n]=r:t.unshift(r),localStorage.setItem(L,JSON.stringify(t.slice(0,20)))}catch{}}function ce(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(L)||"[]");if(t.length===0){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${ve(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>
    `).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>ot(Number(n.dataset.id))})}catch{}}function ot(e){try{let n=JSON.parse(localStorage.getItem(L)||"[]").find(i=>i.id===e);if(!n)return;m=n.messages.slice(),I=n.id;let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",m.forEach(i=>{S(i.role==="user"?"user":"agent",i.content)});let r=document.getElementById("vn-session-label");r&&(r.textContent=n.preview.slice(0,20)+"..."),M()}catch{}}function ve(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}var pe=null;function ue(e){document.addEventListener("selectionchange",()=>{clearTimeout(pe),pe=setTimeout(()=>{let t=T();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=T();t&&e(t)},50)})}function T(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var me="https://vinnsedesigner-vinns-ai-backend.hf.space",rt=3e4,it=1e4,st=2e3,ge=2048;function fe(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function at(e){let t=typeof e.text=="string"?e.text:"";return fe(t)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,ge):""):t.slice(0,st)}function dt(e){let t={number:e.number,text:at(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,ge):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(t.mime_type=e.mime_type),typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let n={...e.metadata};(n.base64||fe(n.data||""))&&(delete n.base64,delete n.data),t.metadata=n}return e.type==="file"&&(typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(t.metadata={...e.metadata})),t}async function be(e){let t=p(),n=v();if(!t)return e("error","Login to dashboard first"),!1;if(!n||n.length===0)return e("error","No snippets staged"),!1;let r=n.map(dt).filter(i=>!(!i.text&&i.type!=="image"||i.type==="image"&&!i.text&&!i.url));if(r.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${r.length} snippet${r.length!==1?"s":""}...`);try{let i=await fetch(`${me}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:y(),snippets:r,pageContext:_()}),signal:AbortSignal.timeout(rt)}),s=await i.json();if(!i.ok)return e("error",s.message||`Sync failed (${i.status})`),!1;E();let a=s.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(i){return i.name==="TimeoutError"||i.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function he(e){if(!e)return null;try{let t=await fetch(`${me}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(it)});return t.ok&&(await t.json()).settings||null}catch{return null}}var c=null,f=[];function we(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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
  `,vt(),lt(),pt(),g())}function lt(){document.getElementById("vn-modal-close")?.addEventListener("click",xe),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&xe()})}function ct(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");!t||!o||(n.textContent=`#${e.number} \xB7 ${e.type} \xB7 ${e.title||"snippet"}`,o.textContent=e.text,t.classList.add("vn-show"))}function xe(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}function vt(){c||(c=document.createElement("div"),c.className="vn-sel-overlay",c.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(c),c.querySelector("#vn-sel-repo").onclick=()=>ye("code"),c.querySelector("#vn-sel-research").onclick=()=>ye("research"),document.addEventListener("click",e=>{c.contains(e.target)||O()}))}function Ee(e){!c||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();c.style.top=`${n.bottom+8}px`,c.style.left=`${Math.max(0,n.left)}px`,c.classList.add("vn-show")},300)}function O(){c?.classList.remove("vn-show")}function ye(e){let t=T();if(!t)return;let n=v(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");if(n.length>=o){d("red",`Max ${o} snippets`),b(`Snippet limit (${o}) reached \u2014 sync or clear first`),O();return}Y({text:t,type:e,url:location.href,title:document.title}),g(),O(),d("green",`#${n.length+1} staged`)}function pt(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await be((e,t)=>{d(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&b(t),e==="success"&&g()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",mt)}function ut(e){let n=v().find(r=>r.number===e);if(!n)return;q(e),g();let o={snippet:n,timer:null};f.push(o),_e(`Snippet #${e} removed`),o.timer=setTimeout(()=>{f=f.filter(r=>r.snippet.number!==e),f.length===0&&Se()},5e3)}function mt(){let e=f.pop();if(!e)return;clearTimeout(e.timer);let t=v();t.push(e.snippet),t.sort((n,o)=>n.number-o.number),w(t),g(),f.length===0?Se():_e(`Snippet #${f[f.length-1].snippet.number} removed`)}function _e(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function Se(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function g(){let e=v(),t=e.filter(s=>s.type==="code"),n=e.filter(s=>s.type==="research"),o=document.getElementById("vn-repo-list"),r=document.getElementById("vn-research-list");document.getElementById("vn-repo-count")&&(document.getElementById("vn-repo-count").textContent=t.length),document.getElementById("vn-research-count")&&(document.getElementById("vn-research-count").textContent=n.length),u("snippets",`${e.length} snippets`,e.length>0?"active":"");let i=(s,a)=>{s&&(s.innerHTML=a.length===0?'<div class="vn-snip-empty">\u2014</div>':a.map(gt).join(""),s.querySelectorAll(".vn-snip-view").forEach(l=>{l.onclick=()=>{let x=e.find(Oe=>Oe.number===Number(l.dataset.num));x&&ct(x)}}),s.querySelectorAll(".vn-snip-del").forEach(l=>{l.onclick=()=>ut(Number(l.dataset.num))}))};i(o,t),i(r,n)}function gt(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${ft(e.text.slice(0,45))}</span>
      <span class="vn-snip-type">${e.type}</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del vn-btn-icon"  data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function ft(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Ie(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
  `,bt()}function bt(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),i=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let s=e.value;t.textContent=`${s}vh`;let a=h();a&&(a.style.height=`${s}vh`),localStorage.setItem("vn_panel_height",s)}),n?.addEventListener("click",()=>{ke("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{ke("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let s=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",s),r.value=s}),i?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(E(),g())})}function ke(e){let t=h();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var B=!1,Le,Te,H,P,C=!1,Be,Ce;function Ne(){ht(),xt()}function ht(){let e=j();if(!e)return;function t(r,i){B=!0,Le=r,Te=i;let s=e.getBoundingClientRect();H=s.left,P=s.top,e.style.right="auto",e.style.bottom="auto",e.style.left=H+"px",e.style.top=P+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(r,i){if(!B)return;let s=r-Le,a=i-Te,l=Math.max(0,Math.min(window.innerWidth-56,H+s)),x=Math.max(0,Math.min(window.innerHeight-56,P+a));e.style.left=l+"px",e.style.top=x+"px",localStorage.setItem("vn_fab_left",l),localStorage.setItem("vn_fab_top",x)}function o(){B=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let i=r.touches[0];t(i.clientX,i.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!B)return;r.preventDefault();let i=r.touches[0];n(i.clientX,i.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function xt(){let e=document.getElementById("vn-drag-handle"),t=h();if(!e||!t)return;function n(i){C=!0,Be=i,Ce=t.offsetHeight}function o(i){if(!C)return;let s=Be-i,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,Ce+s));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){C=!1}e.addEventListener("mousedown",i=>{i.preventDefault(),n(i.clientY)}),document.addEventListener("mousemove",i=>o(i.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",i=>{n(i.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{C&&(i.preventDefault(),o(i.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function ze(){let e=j();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function Ae(){let e=h();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}var yt=15e3,D=null;function je(){D=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(D),D=null;return}let e=p(),t=await he(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),g())},yt)}function $e(){document.getElementById("__venom_fab__")||(ee(),ne(),de(),we(),Ie(),Ne(),ze(),Ae(),re(),ue(e=>Ee(e)),se(),je(),d("green","ready"))}function Me(){let e=p();y(),$e(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Me()})();})();
