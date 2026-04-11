"use strict";(()=>{var M="nexus_scraper_snippets",J="nexus_scraper_session",Ke="nexus_auth_token";function p(){return localStorage.getItem(Ke)||null}function E(){let e=localStorage.getItem(J);return e||(e=crypto.randomUUID(),localStorage.setItem(J,e)),e}function u(){try{return JSON.parse(localStorage.getItem(M)||"[]")}catch{return[]}}function _(e){localStorage.setItem(M,JSON.stringify(e))}function W(e){let n=u(),t=n.length+1,o={...e,number:t,created_at:Date.now()};return n.push(o),_(n),o}function Z(e){let n=u().filter(t=>t.number!==e);_(n)}function S(){localStorage.removeItem(M)}var G=`
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
`;var V=`
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
`;var Q=`
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
`;var ee=`
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
`;var ne=`
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
`;var te=`
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
`;var oe=`
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
`;var re=`
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
`;function ie(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[G,V,Q,ee,ne,te,oe,re].join(`
`),document.head.appendChild(e)}var se="__venom_fab__",H="__venom_panel__",O=!1;function ae(){ie();let e=document.createElement("div");e.id=se,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let n=document.createElement("div");return n.id=H,n.innerHTML=`
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
  `,e.onclick=Je,document.body.appendChild(e),document.body.appendChild(n),{fab:e,panel:n}}function Je(){O=!O;let e=document.getElementById(H);e&&e.classList.toggle("vn-open",O)}function P(){return document.getElementById(se)}function y(){return document.getElementById(H)}function m(e){let n=document.getElementById("vn-warn-banner"),t=document.getElementById("vn-warn-text");!n||!t||(t.textContent=e,n.classList.add("vn-show"),clearTimeout(n._timer),n._timer=setTimeout(()=>n.classList.remove("vn-show"),5e3))}function g(e,n,t){let o=document.getElementById(`vn-badge-${e}`),r=document.getElementById(`vn-badge-${e}-text`);!o||!r||(o.className="vn-badge-pill"+(t?" "+t:""),r.textContent=n)}var le=["agent","snippets","settings"];function de(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(t=>{t.onclick=()=>{let o=t.dataset.tab;ce(o)}})}function ce(e){if(!le.includes(e))return;let n=document.getElementById("__venom_panel__");if(!n)return;n.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),n.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let t=document.getElementById(`vn-tab-${e}`);t&&t.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function ve(){let e=localStorage.getItem("vn_last_tab");e&&le.includes(e)&&ce(e)}function k(){return{url:location.href,title:document.title||"",content:We()}}function We(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),n=[],t;for(;t=e.nextNode();){let o=t.textContent.trim();o.length>0&&n.push(o)}return n.join(" ").replace(/\s+/g," ").slice(0,5e3)}var pe="https://vinnsedesigner-vinns-ai-backend.hf.space";async function D(e,n=[],t=[]){let o=p();if(!o)return{error:"Not authenticated \u2014 open dashboard and login first"};let r=k(),i=t.slice(-10),s={message:e,pageContext:r,history:i,snippets:n.map(a=>({type:a.type,text:a.text}))};try{let a=await fetch(`${pe}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(s)}),c=await a.json();return a.ok?c.escalate===!0?await Ze(e,n,r,o,i):{reply:c.reply,model:c.model,escalated:!1}:{error:c.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function Ze(e,n,t,o,r){try{let i=await fetch(`${pe}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:t,history:r,snippets:n.map(a=>({type:a.type,text:a.text})),stream:!1})}),s=await i.json();return i.ok?{reply:s.response||s.reply||"",model:s.model_used||s.model||"agent",escalated:!0}:{error:s.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function l(e,n){let t=document.getElementById("__venom_fab__");if(!t)return;let o=t.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),t.setAttribute("data-status",n||""))}function ue(){p()?g("auth","authed","active"):g("auth","unauthed","err")}var f=[],L=null,T=Date.now(),$="vn_chat_sessions";function ge(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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
  `,Ge(),be())}function Ge(){document.getElementById("vn-send-btn")?.addEventListener("click",me),document.getElementById("vn-suggest-btn")?.addEventListener("click",Ve),document.getElementById("vn-inject-btn")?.addEventListener("click",ln),document.getElementById("vn-inject-dismiss")?.addEventListener("click",fe),document.getElementById("vn-hamburger")?.addEventListener("click",cn),document.getElementById("vn-drawer-close")?.addEventListener("click",R),document.getElementById("vn-new-chat")?.addEventListener("click",vn),document.getElementById("vn-agent-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),me())})}async function me(){let e=document.getElementById("vn-agent-input"),n=e?.value?.trim();if(!n)return;f.push({role:"user",content:n}),I("user",n),e.value="",l("amber","thinking..."),g("model","thinking...","warn");let{reply:t,model:o,escalated:r,error:i}=await D(n,u(),f);if(i){I("agent",`\u26A0 ${i}`),l("red","error"),m(i),g("model","error","err"),f.push({role:"assistant",content:`\u26A0 ${i}`});return}f.push({role:"assistant",content:t}),I("agent",t,o),l("green",r?"done (escalated)":"done"),g("model",o||"lite","active"),pn(f)}async function Ve(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";l("amber","generating...");let{reply:n,error:t}=await D(e,u(),f);if(t||!n){l("red","suggestion failed"),m("Suggestion failed: "+(t||"empty reply"));return}L=n,an(n),l("green","ready to inject")}function I(e,n,t){let o=document.getElementById("vn-convo");if(!o)return;let r=document.createElement("div");r.className=`vn-msg vn-msg-${e}`;let i=document.createElement("div");i.className="vn-msg-label",i.textContent=e==="user"?"YOU":t?`NExY \xB7 ${t}`:"NExY",r.appendChild(i),Qe(n).forEach(s=>r.appendChild(s)),o.appendChild(r),o.scrollTop=o.scrollHeight}function Qe(e){let n=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let r=o.slice(3,-3),i=r.indexOf(`
`),s=i>=0?r.slice(0,i).trim():"",a=i>=0?r.slice(i+1).trim():r.trim();n.push(en(s,a))}else if(rn(o)){let r=document.createElement("pre");r.className="vn-ascii-block",r.textContent=sn(o.trim()),n.push(r)}else if(o.trim()){let r=document.createElement("span");r.textContent=o,r.style.whiteSpace="pre-wrap",n.push(r)}}),n}function en(e,n){let t=on(e,n),o=document.createElement("div");o.className="vn-code-block";let r=nn(n,t);return o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${t}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${r}</div>
  `,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(n).catch(()=>{});let i=o.querySelector(".vn-code-copy");i.textContent="copied!",setTimeout(()=>{i&&(i.textContent="copy")},1500)},o}function nn(e,n){let t=he(e);return tn(n).forEach(([r,i])=>{t=t.replace(r,s=>`<span class="sh-${i}">${s}</span>`)}),t}function tn(e){let n=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],t=[/\/\/[^\n]*/g,"cmt"],o=[/#[^\n]*/g,"cmt"],r=[/\b(\d+\.?\d*)\b/g,"num"],i=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[t,n,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[o,n,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g,"kw"],i,r,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,"fn"]]:["sh","bash","shell","zsh"].includes(e)?[o,n,[/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_][a-zA-Z0-9_]*/g,"var"],r]:e==="json"?[n,[/\b(true|false|null)\b/g,"kw2"],r]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],n,[/([a-zA-Z-]+)\s*:/g,"kw"],[/#[0-9a-fA-F]{3,6}\b/g,"num"],r]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],n]:[n,r,i]}function on(e,n){let t=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",zsh:"sh",json:"json",css:"css",html:"html",sql:"sql",yaml:"yaml",yml:"yaml",md:"md",markdown:"md",cpp:"cpp",c:"c",java:"java",rs:"rs",go:"go",rb:"rb"};return o[t]?o[t]:/^\s*\{[\s\S]*\}\s*$/.test(n)&&/"[^"]+"\s*:/.test(n)?"json":/^<(!DOCTYPE|html|head|body|div|span|p )/i.test(n.trim())?"html":/(def |import |from .* import|print\(|elif |:\s*$)/m.test(n)?"py":/(const |let |var |function |=>|require\(|module\.exports)/m.test(n)?"js":/(#!\/bin\/(bash|sh)|echo |grep |awk |sed |curl |npm |git )/m.test(n)?"sh":/SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(n)?"sql":/^\s*[\w-]+\s*:/m.test(n)&&!/{/.test(n)?"yaml":/^(\/\/|\/\*|#include|using namespace|public class|fn |impl )/m.test(n)?"code":t||"code"}function rn(e){let n=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(o=>n.test(o)).length>=2}function sn(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function an(e){let n=document.getElementById("vn-inject-banner"),t=document.getElementById("vn-inject-text");n&&t&&(t.textContent=e.slice(0,180),n.classList.add("vn-show"))}function fe(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),L=null}function ln(){let e=L||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let n=dn(e);fe(),L=null,n===!1?(l("red","no input found"),m("No writable input found on this page")):l("green",n==="clipboard"?"copied to clipboard":"injected \u2197")}function dn(e){if(!e||typeof e!="string")return!1;let n=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let t of n){let o=document.querySelector(t);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function cn(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),be()}function R(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function vn(){f=[],T=Date.now();let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Ask me anything about this page...</span>
      </div>
    `);let n=document.getElementById("vn-session-label");n&&(n.textContent="NEW SESSION"),R()}function pn(e){if(!(!e||e.length===0))try{let n=JSON.parse(localStorage.getItem($)||"[]"),t=n.findIndex(i=>i.id===T),o=e.find(i=>i.role==="user")?.content?.slice(0,60)||"Chat",r={id:T,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};t>=0?n[t]=r:n.unshift(r),localStorage.setItem($,JSON.stringify(n.slice(0,20)))}catch{}}function be(){let e=document.getElementById("vn-history-list");if(e)try{let n=JSON.parse(localStorage.getItem($)||"[]");if(n.length===0){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=n.map(t=>`
      <div class="vn-history-item" data-id="${t.id}">
        <div class="vn-history-preview">${he(t.preview)}</div>
        <div class="vn-history-meta">${t.messages.length} msgs \xB7 ${t.ts}</div>
      </div>
    `).join(""),e.querySelectorAll(".vn-history-item").forEach(t=>{t.onclick=()=>un(Number(t.dataset.id))})}catch{}}function un(e){try{let t=JSON.parse(localStorage.getItem($)||"[]").find(i=>i.id===e);if(!t)return;f=t.messages.slice(),T=t.id;let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",f.forEach(i=>{I(i.role==="user"?"user":"agent",i.content)});let r=document.getElementById("vn-session-label");r&&(r.textContent=t.preview.slice(0,20)+"..."),R()}catch{}}function he(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}var xe=null;function ye(e){document.addEventListener("selectionchange",()=>{clearTimeout(xe),xe=setTimeout(()=>{let n=B();n&&e(n)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let n=B();n&&e(n)},50)})}function B(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let n=e.toString().trim();return n.length>0?n.slice(0,2e3):""}var we="https://vinnsedesigner-vinns-ai-backend.hf.space",mn=3e4,gn=1e4,fn=2e3,Ee=2048;function _e(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function bn(e){let n=typeof e.text=="string"?e.text:"";return _e(n)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,Ee):""):n.slice(0,fn)}function hn(e){let n={number:e.number,text:bn(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,Ee):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(n.mime_type=e.mime_type),typeof e.file_size=="number"&&(n.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let t={...e.metadata};(t.base64||_e(t.data||""))&&(delete t.base64,delete t.data),n.metadata=t}return e.type==="file"&&(typeof e.file_size=="number"&&(n.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(n.metadata={...e.metadata})),n}async function Se(e){let n=p(),t=u();if(!n)return e("error","Login to dashboard first"),!1;if(!t||t.length===0)return e("error","No snippets staged"),!1;let r=t.map(hn).filter(i=>!(!i.text&&i.type!=="image"||i.type==="image"&&!i.text&&!i.url));if(r.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${r.length} snippet${r.length!==1?"s":""}...`);try{let i=await fetch(`${we}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({sessionId:E(),snippets:r,pageContext:k()}),signal:AbortSignal.timeout(mn)}),s=await i.json();if(!i.ok)return e("error",s.message||`Sync failed (${i.status})`),!1;S();let a=s.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(i){return i.name==="TimeoutError"||i.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function ke(e){if(!e)return null;try{let n=await fetch(`${we}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout(gn)});return n.ok&&(await n.json()).settings||null}catch{return null}}var xn="https://vinnsedesigner-vinns-ai-backend.hf.space",v=null,h=[];var w=new Map;function d(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function C(e){return!e||typeof e!="number"?"":e<1024?`${e}B`:e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}function $e(e){return{js:"\u{1F7E8}",ts:"\u{1F537}",jsx:"\u{1F7E6}",tsx:"\u{1F537}",py:"\u{1F40D}",json:"\u{1F4CB}",md:"\u{1F4DD}",txt:"\u{1F4C4}",css:"\u{1F3A8}",html:"\u{1F310}",sql:"\u{1F5C4}\uFE0F",yaml:"\u2699\uFE0F",yml:"\u2699\uFE0F",sh:"\u26A1",rs:"\u{1F980}",go:"\u{1F439}",rb:"\u{1F48E}",java:"\u2615"}[(e||"").toLowerCase()]||"\u{1F4C1}"}function yn(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function Y(e){let n=e.text||e.url||"";return!n||yn(n)?null:n}function Be(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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

        <div class="vn-section">
          <div class="vn-sec-hdr">
            IMAGE
            <span class="vn-badge" id="vn-image-count">0</span>
          </div>
          <div class="vn-snip-list" id="vn-image-list"></div>
        </div>

        <div class="vn-section">
          <div class="vn-sec-hdr">
            FILE
            <span class="vn-badge" id="vn-file-count">0</span>
          </div>
          <div class="vn-snip-list" id="vn-file-list"></div>
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
  `,En(),wn(),b())}function wn(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await Se((e,n)=>{l(e==="success"?"green":e==="error"?"red":"amber",n),e==="error"&&m(n),e==="success"&&b()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",Sn),document.getElementById("vn-modal-close")?.addEventListener("click",Te),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&Te()})}function En(){v||(v=document.createElement("div"),v.className="vn-sel-overlay",v.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(v),v.querySelector("#vn-sel-repo").addEventListener("click",()=>Ie("code")),v.querySelector("#vn-sel-research").addEventListener("click",()=>Ie("research")),document.addEventListener("click",e=>{v.contains(e.target)||q()}))}function ze(e){!v||!e||setTimeout(()=>{let n=window.getSelection();if(!n||n.rangeCount===0)return;let t=n.getRangeAt(0).getBoundingClientRect();v.style.top=`${t.bottom+8}px`,v.style.left=`${Math.max(0,t.left)}px`,v.classList.add("vn-show")},300)}function q(){v?.classList.remove("vn-show")}function Ie(e){let n=B();if(!n)return;let t=u(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20",10);if(t.length>=o){l("red",`Max ${o} snippets`),m(`Snippet limit (${o}) reached \u2014 sync or clear first`),q();return}W({text:n,type:e,url:location.href,title:document.title}),b(),q(),l("green",`#${t.length+1} staged`)}function Le(e){let n=document.getElementById("vn-view-modal"),t=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");if(!(!n||!o||!t)){if(t.textContent=`#${e.number} \xB7 ${e.type}`+(e.title?` \xB7 ${e.title.slice(0,30)}`:""),e.type==="image"){let r=Y(e),i=w.get(e.number),s=C(e.file_size),a=e.mime_type||"";o.innerHTML=`
      <div class="vn-modal-image-wrap">
        ${r?`<img class="vn-modal-thumbnail"
                  src="${d(r)}"
                  alt="snippet #${e.number}"
                  loading="lazy" />`:'<div class="vn-modal-no-thumb">\u{1F5BC}\uFE0F No preview</div>'}
        <div class="vn-modal-image-meta">
          ${a?`<span class="vn-snip-type">${d(a)}</span>`:""}
          ${s?`<span class="vn-snip-type">${d(s)}</span>`:""}
        </div>
      </div>
      ${i?`<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis</div>
             <div class="vn-modal-analysis-body">${d(i)}</div>
           </div>`:`<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${e.number}">
             \u{1F50D} Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${e.number}"></div>`}
    `,i||o.querySelector(`#vn-analyze-modal-${e.number}`)?.addEventListener("click",()=>Ce(e,o))}else if(e.type==="file"){let r=e.metadata?.extension||"",i=C(e.file_size),s=$e(r);o.innerHTML=`
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${s}</span>
        ${r?`<span class="vn-snip-type">.${d(r)}</span>`:""}
        ${i?`<span class="vn-snip-type">${d(i)}</span>`:""}
      </div>
      <div class="vn-modal-file-url">${d(e.url||"")}</div>
      <pre class="vn-modal-file-content">${d((e.text||"").slice(0,3e3))}</pre>
    `}else o.innerHTML=`
      <pre class="vn-modal-text">${d((e.text||"").slice(0,3e3))}</pre>
    `;n.classList.add("vn-show")}}function Te(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}async function Ce(e,n){let t=p();if(!t){m("Login to dashboard first");return}let o=`vn-analyze-modal-${e.number}`,r=`vn-analyze-result-${e.number}`,i=n.querySelector(`#${o}`),s=n.querySelector(`#${r}`);i&&(i.textContent="\u23F3 Analyzing...",i.disabled=!0),s&&(s.textContent=""),l("amber","analyzing image...");try{let a=Y(e),c=a?{imageUrl:a,mimeType:e.mime_type||"image/jpeg",question:"Describe this image in detail."}:null;if(!c)throw new Error("No valid image URL for analysis");let x=await fetch(`${xn}/api/vision`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(c),signal:AbortSignal.timeout(3e4)}),j=await x.json();if(!x.ok)throw new Error(j.message||`Vision API error (${x.status})`);let K=j.analysis||"No analysis returned";w.set(e.number,K),s&&(s.innerHTML=`
        <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis \xB7 <span class="vn-model-tag">${d(j.model||"")}</span></div>
        <div class="vn-modal-analysis-body">${d(K)}</div>
      `),i&&(i.style.display="none"),l("green","analysis complete")}catch(a){let c=a.name==="TimeoutError"||a.name==="AbortError"?"Analysis timed out \u2014 try again":a.message||"Analysis failed";s&&(s.textContent=`\u26A0 ${c}`),i&&(i.textContent="\u{1F50D} Retry Analysis",i.disabled=!1),l("red","analysis failed"),m(c)}}function _n(e){let t=u().find(r=>r.number===e);if(!t)return;Z(e),b(),w.delete(e);let o={snippet:t,timer:null};h.push(o),Ae(`Snippet #${e} removed`),o.timer=setTimeout(()=>{h=h.filter(r=>r.snippet.number!==e),h.length===0&&Ne()},5e3)}function Sn(){let e=h.pop();if(!e)return;clearTimeout(e.timer);let n=u();n.push(e.snippet),n.sort((t,o)=>t.number-o.number),_(n),b(),h.length===0?Ne():Ae(`Snippet #${h[h.length-1].snippet.number} removed`)}function Ae(e){let n=document.getElementById("vn-undo-bar"),t=document.getElementById("vn-undo-text");n&&t&&(t.textContent=e,n.classList.add("vn-show"))}function Ne(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function b(){let e=u(),n=e.filter(s=>s.type==="code"),t=e.filter(s=>s.type==="research"),o=e.filter(s=>s.type==="image"),r=e.filter(s=>s.type==="file"),i=(s,a)=>{let c=document.getElementById(s);c&&(c.textContent=a)};i("vn-repo-count",n.length),i("vn-research-count",t.length),i("vn-image-count",o.length),i("vn-file-count",r.length),g("snippets",`${e.length} snippets`,e.length>0?"active":""),z("vn-repo-list",n,In),z("vn-research-list",t,Ln),z("vn-image-list",o,Tn),z("vn-file-list",r,$n),kn(e)}function z(e,n,t){let o=document.getElementById(e);if(o){if(n.length===0){o.innerHTML='<div class="vn-snip-empty">\u2014</div>';return}o.innerHTML=n.map(t).join("")}}function kn(e){document.querySelectorAll(".vn-snip-view").forEach(n=>{n.addEventListener("click",()=>{let t=e.find(o=>o.number===Number(n.dataset.num));t&&Le(t)})}),document.querySelectorAll(".vn-snip-del").forEach(n=>{n.addEventListener("click",()=>{_n(Number(n.dataset.num))})}),document.querySelectorAll(".vn-snip-analyze").forEach(n=>{n.addEventListener("click",async()=>{let t=e.find(r=>r.number===Number(n.dataset.num));if(!t)return;Le(t);let o=document.getElementById("vn-modal-body");o&&!w.has(t.number)&&await Ce(t,o)})})}function In(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function Ln(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function Tn(e){let n=Y(e),t=C(e.file_size);return`
    <div class="vn-snip-item vn-snip-item-image${w.has(e.number)?" vn-analyzed":""}">
      ${n?`<img class="vn-snip-thumb"
                src="${d(n)}"
                alt="img #${e.number}"
                loading="lazy" />`:'<span class="vn-snip-no-thumb">\u{1F5BC}\uFE0F</span>'}
      <div class="vn-snip-image-info">
        <span class="vn-snip-num">#${e.number}</span>
        ${t?`<span class="vn-snip-type">${d(t)}</span>`:""}
        ${w.has(e.number)?'<span class="vn-snip-type vn-analyzed-badge">\u2713 analyzed</span>':""}
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
  `}function $n(e){let n=e.metadata?.extension||"",t=C(e.file_size),o=$e(n),r=(e.text||e.url||"").slice(0,40);return`
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${o}</span>
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d(r)}</span>
      <div class="vn-snip-badges">
        ${n?`<span class="vn-snip-type">.${d(n)}</span>`:""}
        ${t?`<span class="vn-snip-type">${d(t)}</span>`:""}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function Me(){let e=document.getElementById("vn-tab-settings");if(!e)return;let n=parseInt(localStorage.getItem("vn_panel_height")||"55"),t=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
    <div class="vn-settings-inner">
      <div class="vn-setting-row">
        <div>
          <div class="vn-setting-label">Panel Height</div>
          <div class="vn-setting-sub" id="vn-height-val">${n}vh</div>
        </div>
        <input type="range" class="vn-slider" id="vn-height-slider" min="25" max="85" value="${n}">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Theme</div>
        <div class="vn-theme-row">
          <button class="vn-btn ${t==="oled"?"vn-selected":""}" id="vn-theme-oled">OLED</button>
          <button class="vn-btn ${t==="light"?"vn-selected":""}" id="vn-theme-light">Light</button>
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
  `,Bn()}function Bn(){let e=document.getElementById("vn-height-slider"),n=document.getElementById("vn-height-val"),t=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),r=document.getElementById("vn-snippet-limit"),i=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let s=e.value;n.textContent=`${s}vh`;let a=y();a&&(a.style.height=`${s}vh`),localStorage.setItem("vn_panel_height",s)}),t?.addEventListener("click",()=>{je("oled"),t.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{je("light"),o.classList.add("vn-selected"),t?.classList.remove("vn-selected")}),r?.addEventListener("change",()=>{let s=Math.max(1,Math.min(100,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",s),r.value=s}),i?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(S(),b())})}function je(e){let n=y();n&&(n.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&n.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var A=!1,Oe,He,F,U,N=!1,Pe,De;function Re(){zn(),Cn()}function zn(){let e=P();if(!e)return;function n(r,i){A=!0,Oe=r,He=i;let s=e.getBoundingClientRect();F=s.left,U=s.top,e.style.right="auto",e.style.bottom="auto",e.style.left=F+"px",e.style.top=U+"px",e.style.transition="none",e.classList.add("vn-dragging")}function t(r,i){if(!A)return;let s=r-Oe,a=i-He,c=Math.max(0,Math.min(window.innerWidth-56,F+s)),x=Math.max(0,Math.min(window.innerHeight-56,U+a));e.style.left=c+"px",e.style.top=x+"px",localStorage.setItem("vn_fab_left",c),localStorage.setItem("vn_fab_top",x)}function o(){A=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),n(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>t(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let i=r.touches[0];n(i.clientX,i.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!A)return;r.preventDefault();let i=r.touches[0];t(i.clientX,i.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function Cn(){let e=document.getElementById("vn-drag-handle"),n=y();if(!e||!n)return;function t(i){N=!0,Pe=i,De=n.offsetHeight}function o(i){if(!N)return;let s=Pe-i,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,De+s));n.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function r(){N=!1}e.addEventListener("mousedown",i=>{i.preventDefault(),t(i.clientY)}),document.addEventListener("mousemove",i=>o(i.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",i=>{t(i.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{N&&(i.preventDefault(),o(i.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",r)}function qe(){let e=P();if(!e)return;let n=localStorage.getItem("vn_fab_left"),t=localStorage.getItem("vn_fab_top");n&&t&&(e.style.right="auto",e.style.bottom="auto",e.style.left=n+"px",e.style.top=t+"px")}function Ye(){let e=y();if(!e)return;let n=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${n}vh`}var An=15e3,X=null;function Fe(){X=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(X),X=null;return}let e=p(),n=await ke(e);n&&(n.snippet_limit&&localStorage.setItem("vn_snippet_limit",n.snippet_limit),b())},An)}function Ue(){document.getElementById("__venom_fab__")||(ae(),de(),ge(),Be(),Me(),Re(),qe(),Ye(),ve(),ye(e=>ze(e)),ue(),Fe(),l("green","ready"))}function Xe(){let e=p();E(),Ue(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Xe()})();})();
