"use strict";(()=>{var H="nexus_scraper_snippets",Z="nexus_scraper_session",Ve="nexus_auth_token";function p(){return localStorage.getItem(Ve)||null}function k(){let e=localStorage.getItem(Z);return e||(e=crypto.randomUUID(),localStorage.setItem(Z,e)),e}function u(){try{return JSON.parse(localStorage.getItem(H)||"[]")}catch{return[]}}function I(e){localStorage.setItem(H,JSON.stringify(e))}function V(e){let t=u(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),I(t),o}function G(e){let t=u().filter(n=>n.number!==e);I(t)}function T(){localStorage.removeItem(H)}var Q=`
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
`;var ee=`
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
`;var te=`
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
`;var ne=`
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
`;var oe=`
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
`;var re=`
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
`;var ie=`
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
`;var se=`
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
`;function ae(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=[Q,ee,te,ne,oe,re,ie,se].join(`
`),document.head.appendChild(e)}var le="__venom_fab__",D="__venom_panel__",R=!1;function de(){ae();let e=document.createElement("div");e.id=le,e.innerHTML='\u{1F577}\uFE0F<span class="vn-fab-dot"></span>';let t=document.createElement("div");return t.id=D,t.innerHTML=`
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
  `,e.onclick=Ge,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function Ge(){R=!R;let e=document.getElementById(D);e&&e.classList.toggle("vn-open",R)}function q(){return document.getElementById(le)}function E(){return document.getElementById(D)}function f(e){let t=document.getElementById("vn-warn-banner"),n=document.getElementById("vn-warn-text");!t||!n||(n.textContent=e,t.classList.add("vn-show"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.remove("vn-show"),5e3))}function g(e,t,n){let o=document.getElementById(`vn-badge-${e}`),i=document.getElementById(`vn-badge-${e}-text`);!o||!i||(o.className="vn-badge-pill"+(n?" "+n:""),i.textContent=t)}var ce=["agent","snippets","settings"];function ve(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;pe(o)}})}function pe(e){if(!ce.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function ue(){let e=localStorage.getItem("vn_last_tab");e&&ce.includes(e)&&pe(e)}function L(){return{url:location.href,title:document.title||"",content:Qe()}}function Qe(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let i=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(i)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var me="https://vinnsedesigner-vinns-ai-backend.hf.space",et=10,tt=2e3,nt=2048,ot=3e4,rt=6e4,it=20;function st(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function at(e){let t=typeof e.text=="string"?e.text:"";return st(t)?(console.warn("[VENOM mini-agent] base64 stripped from snippet before send",{type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,nt):""):t.slice(0,tt)}function lt(e){if(!e||typeof e!="object"||!new Set(["code","research","image","file"]).has(e.type))return null;let n=at(e);return!n&&e.type!=="image"||!n&&e.type==="image"&&!e.url?null:{type:e.type,text:n||e.url||""}}function fe(e){return!Array.isArray(e)||e.length===0?[]:e.slice(0,it).map(lt).filter(Boolean)}function ge(e){if(!Array.isArray(e)||e.length===0)return[];let t=new Set(["user","assistant","system"]);return e.filter(n=>n&&t.has(n.role)&&n.content).slice(-et).map(n=>({role:n.role,content:String(n.content).slice(0,1e3)}))}function dt(){return p()||null}function ct(){try{return L()}catch(e){return console.warn("[VENOM mini-agent] buildPageContext failed",e.message),{url:typeof window<"u"?window.location.href:"",title:typeof document<"u"?document.title:"",content:""}}}async function vt(e,t,n,o,i){try{let r=await fetch(`${me}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,history:ge(i),snippets:fe(t),context:"bookmarklet",stream:!1}),signal:AbortSignal.timeout(rt)}),s=await r.json();return r.ok?{reply:s.reply||s.response||"",model:s.model_used||s.model||"agent",escalated:!0,tools_used:s.tools_used||[],searched:!1}:{error:s.message||`Full agent error (${r.status})`,escalated:!0}}catch(r){return{error:r.name==="TimeoutError"||r.name==="AbortError"?"Full agent timed out \u2014 try again":"Full agent unreachable \u2014 check connection",escalated:!0}}}async function U(e,t=[],n=[],o={}){let{sessionId:i=null}=o,r=dt();if(!r)return{error:"Not authenticated \u2014 open dashboard and login first"};if(!e||typeof e!="string"||!e.trim())return{error:"Message is required"};let s=e.trim(),a=ct(),c=fe(t),x=ge(n),S={message:s,pageContext:a,history:x,snippets:c,sessionId:i||null},m,w;try{w=await fetch(`${me}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(S),signal:AbortSignal.timeout(ot)}),m=await w.json()}catch(P){return{error:P.name==="TimeoutError"||P.name==="AbortError"?"Lite agent timed out \u2014 check connection":"Backend unreachable \u2014 check connection"}}return w.ok?m.escalate===!0?vt(s,t,a,r,n):{reply:m.reply||"",model:m.model||"lite",escalated:!1,tools_used:m.tools_used||[],searched:m.searched||!1}:w.status===503?{error:"All AI providers are currently unavailable \u2014 try again shortly"}:w.status===429?{error:m.message||"Rate limit reached \u2014 try again in a few minutes"}:w.status===401?{error:"Session expired \u2014 open dashboard and login again"}:{error:m.message||`Request failed (${w.status})`}}function l(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}function be(){p()?g("auth","authed","active"):g("auth","unauthed","err")}var b=[],B=null,A=Date.now(),z="vn_chat_sessions";function xe(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
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
        <textarea class="vn-input" id="vn-agent-input" placeholder="\u{1F9D1}\u200D\u{1F4BB} anything to ask \u{1F642}" rows="2"></textarea>
        <button class="vn-btn-send" id="vn-send-btn">\u2191</button>
      </div>
      <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
    </div>
  `,pt(),we())}function pt(){document.getElementById("vn-send-btn")?.addEventListener("click",he),document.getElementById("vn-suggest-btn")?.addEventListener("click",ut),document.getElementById("vn-inject-btn")?.addEventListener("click",Et),document.getElementById("vn-inject-dismiss")?.addEventListener("click",ye),document.getElementById("vn-hamburger")?.addEventListener("click",St),document.getElementById("vn-drawer-close")?.addEventListener("click",Y),document.getElementById("vn-new-chat")?.addEventListener("click",kt),document.getElementById("vn-agent-input")?.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),he())})}async function he(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;let n=b.slice(0,-1);$("user",t),e.value="",l("amber","thinking..."),g("model","thinking...","warn");let{reply:o,model:i,escalated:r,error:s}=await U(t,u(),b);if(s){$("agent",`\u26A0 ${s}`),l("red","error"),f(s),g("model","error","err"),b.push({role:"assistant",content:`\u26A0 ${s}`});return}b.push({role:"assistant",content:o}),$("agent",o,i),l("green",r?"done (escalated)":"done"),g("model",i||"lite","active"),It(b)}async function ut(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";l("amber","generating...");let{reply:t,error:n}=await U(e,u(),b);if(n||!t){l("red","suggestion failed"),f("Suggestion failed: "+(n||"empty reply"));return}B=t,wt(t),l("green","ready to inject")}function $(e,t,n){let o=document.getElementById("vn-convo");if(!o)return;let i=document.createElement("div");i.className=`vn-msg vn-msg-${e}`;let r=document.createElement("div");r.className="vn-msg-label",r.textContent=e==="user"?"YOU":n?`NExY \xB7 ${n}`:"NExY",i.appendChild(r),mt(t).forEach(s=>i.appendChild(s)),o.appendChild(i),o.scrollTop=o.scrollHeight}function mt(e){let t=[];return e.split(/(```[\s\S]*?```)/g).forEach(o=>{if(o.startsWith("```")){let i=o.slice(3,-3),r=i.indexOf(`
`),s=r>=0?i.slice(0,r).trim():"",a=r>=0?i.slice(r+1).trim():i.trim();t.push(ft(s,a))}else if(xt(o)){let i=document.createElement("pre");i.className="vn-ascii-block",i.textContent=yt(o.trim()),t.push(i)}else if(o.trim()){let i=document.createElement("span");i.textContent=o,i.style.whiteSpace="pre-wrap",t.push(i)}}),t}function ft(e,t){let n=ht(e,t),o=document.createElement("div");o.className="vn-code-block";let i=gt(t,n);return o.innerHTML=`
    <div class="vn-code-header">
      <span class="vn-code-lang">#${n}</span>
      <button class="vn-code-copy">copy</button>
    </div>
    <div class="vn-code-body">${i}</div>
  `,o.querySelector(".vn-code-copy").onclick=()=>{navigator.clipboard?.writeText(t).catch(()=>{});let r=o.querySelector(".vn-code-copy");r.textContent="copied!",setTimeout(()=>{r&&(r.textContent="copy")},1500)},o}function gt(e,t){let n=Ee(e);return bt(t).forEach(([i,r])=>{n=n.replace(i,s=>`<span class="sh-${r}">${s}</span>`)}),n}function bt(e){let t=[/(&quot;|&#x27;)(.*?)(\1)/g,"str"],n=[/\/\/[^\n]*/g,"cmt"],o=[/#[^\n]*/g,"cmt"],i=[/\b(\d+\.?\d*)\b/g,"num"],r=[/\b(true|false|null|undefined|None|True|False)\b/g,"kw2"];return["js","ts","jsx","tsx"].includes(e)?[n,t,[/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|typeof|instanceof|this|super|throw|try|catch|finally|of|in|switch|case|break|continue|default)\b/g,"kw"],r,i,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,"fn"]]:["py","python"].includes(e)?[o,t,[/\b(def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|with|as|try|except|finally|raise|lambda|pass|break|continue|yield|global|nonlocal)\b/g,"kw"],r,i,[/\b([A-Z][a-zA-Z0-9_]*)\b/g,"cls"],[/\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,"fn"]]:["sh","bash","shell","zsh"].includes(e)?[o,t,[/\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|export|source|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|awk|sed|curl|git|npm|node)\b/g,"kw"],[/\$[a-zA-Z_][a-zA-Z0-9_]*/g,"var"],i]:e==="json"?[t,[/\b(true|false|null)\b/g,"kw2"],i]:e==="css"?[[/\/\*[\s\S]*?\*\//g,"cmt"],t,[/([a-zA-Z-]+)\s*:/g,"kw"],[/#[0-9a-fA-F]{3,6}\b/g,"num"],i]:e==="html"?[[/&lt;!--[\s\S]*?--&gt;/g,"cmt"],[/&lt;\/?([a-zA-Z][a-zA-Z0-9-]*)/g,"kw"],t]:[t,i,r]}function ht(e,t){let n=(e||"").toLowerCase().trim(),o={js:"js",javascript:"js",jsx:"jsx",ts:"ts",typescript:"ts",tsx:"tsx",py:"py",python:"py",sh:"sh",bash:"sh",shell:"sh",zsh:"sh",json:"json",css:"css",html:"html",sql:"sql",yaml:"yaml",yml:"yaml",md:"md",markdown:"md",cpp:"cpp",c:"c",java:"java",rs:"rs",go:"go",rb:"rb"};return o[n]?o[n]:/^\s*\{[\s\S]*\}\s*$/.test(t)&&/"[^"]+"\s*:/.test(t)?"json":/^<(!DOCTYPE|html|head|body|div|span|p )/i.test(t.trim())?"html":/(def |import |from .* import|print\(|elif |:\s*$)/m.test(t)?"py":/(const |let |var |function |=>|require\(|module\.exports)/m.test(t)?"js":/(#!\/bin\/(bash|sh)|echo |grep |awk |sed |curl |npm |git )/m.test(t)?"sh":/SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(t)?"sql":/^\s*[\w-]+\s*:/m.test(t)&&!/{/.test(t)?"yaml":/^(\/\/|\/\*|#include|using namespace|public class|fn |impl )/m.test(t)?"code":n||"code"}function xt(e){let t=/[├└│─┤┬┴┼]/;return e.trim().split(`
`).filter(o=>t.test(o)).length>=2}function yt(e){return e.replace(/\|--/g,"\u251C\u2500\u2500 ").replace(/\+--/g,"\u251C\u2500\u2500 ").replace(/`--/g,"\u2514\u2500\u2500 ").replace(/\|  /g,"\u2502   ")}function wt(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,180),t.classList.add("vn-show"))}function ye(){document.getElementById("vn-inject-banner")?.classList.remove("vn-show"),B=null}function Et(){let e=B||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=_t(e);ye(),B=null,t===!1?(l("red","no input found"),f("No writable input found on this page")):l("green",t==="clipboard"?"copied to clipboard":"injected \u2197")}function _t(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}function St(){document.getElementById("vn-history-drawer")?.classList.add("vn-open"),we()}function Y(){document.getElementById("vn-history-drawer")?.classList.remove("vn-open")}function kt(){b=[],A=Date.now();let e=document.getElementById("vn-convo");e&&(e.innerHTML=`
      <div class="vn-msg vn-msg-agent">
        <div class="vn-msg-label">NExY</div>
        <span>Ask me anything about this page...</span>
      </div>
    `);let t=document.getElementById("vn-session-label");t&&(t.textContent="NEW SESSION"),Y()}function It(e){if(!(!e||e.length===0))try{let t=JSON.parse(localStorage.getItem(z)||"[]"),n=t.findIndex(r=>r.id===A),o=e.find(r=>r.role==="user")?.content?.slice(0,60)||"Chat",i={id:A,ts:new Date().toLocaleTimeString(),preview:o,messages:e.slice()};n>=0?t[n]=i:t.unshift(i),localStorage.setItem(z,JSON.stringify(t.slice(0,20)))}catch{}}function we(){let e=document.getElementById("vn-history-list");if(e)try{let t=JSON.parse(localStorage.getItem(z)||"[]");if(t.length===0){e.innerHTML='<div class="vn-history-empty">No sessions yet</div>';return}e.innerHTML=t.map(n=>`
      <div class="vn-history-item" data-id="${n.id}">
        <div class="vn-history-preview">${Ee(n.preview)}</div>
        <div class="vn-history-meta">${n.messages.length} msgs \xB7 ${n.ts}</div>
      </div>
    `).join(""),e.querySelectorAll(".vn-history-item").forEach(n=>{n.onclick=()=>Tt(Number(n.dataset.id))})}catch{}}function Tt(e){try{let n=JSON.parse(localStorage.getItem(z)||"[]").find(r=>r.id===e);if(!n)return;b=n.messages.slice(),A=n.id;let o=document.getElementById("vn-convo");if(!o)return;o.innerHTML="",b.forEach(r=>{$(r.role==="user"?"user":"agent",r.content)});let i=document.getElementById("vn-session-label");i&&(i.textContent=n.preview.slice(0,20)+"..."),Y()}catch{}}function Ee(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}var _e=null;function Se(e){document.addEventListener("selectionchange",()=>{clearTimeout(_e),_e=setTimeout(()=>{let t=C();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=C();t&&e(t)},50)})}function C(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var ke="https://vinnsedesigner-vinns-ai-backend.hf.space",Lt=3e4,$t=1e4,Bt=2e3,Ie=2048;function Te(e){return!e||typeof e!="string"?!1:e.trimStart().startsWith("data:")}function At(e){let t=typeof e.text=="string"?e.text:"";return Te(t)?(console.warn("[VENOM sync] base64 detected in snippet text \u2014 stripped before sync",{number:e.number,type:e.type}),e.type==="image"&&typeof e.url=="string"?e.url.slice(0,Ie):""):t.slice(0,Bt)}function zt(e){let t={number:e.number,text:At(e),type:e.type||"research",url:typeof e.url=="string"?e.url.slice(0,Ie):typeof window<"u"?window.location.href:"",title:typeof e.title=="string"?e.title.slice(0,200):typeof document<"u"?document.title.slice(0,200):""};if(e.type==="image"&&(e.mime_type&&typeof e.mime_type=="string"&&(t.mime_type=e.mime_type),typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object")){let n={...e.metadata};(n.base64||Te(n.data||""))&&(delete n.base64,delete n.data),t.metadata=n}return e.type==="file"&&(typeof e.file_size=="number"&&(t.file_size=e.file_size),e.metadata&&typeof e.metadata=="object"&&(t.metadata={...e.metadata})),t}async function Le(e){let t=p(),n=u();if(!t)return e("error","Login to dashboard first"),!1;if(!n||n.length===0)return e("error","No snippets staged"),!1;let i=n.map(zt).filter(r=>!(!r.text&&r.type!=="image"||r.type==="image"&&!r.text&&!r.url));if(i.length===0)return e("error","No valid snippets to sync after sanitisation"),!1;e("syncing",`Syncing ${i.length} snippet${i.length!==1?"s":""}...`);try{let r=await fetch(`${ke}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:k(),snippets:i,pageContext:L()}),signal:AbortSignal.timeout(Lt)}),s=await r.json();if(!r.ok)return e("error",s.message||`Sync failed (${r.status})`),!1;T();let a=s.saved||0;return e("success",`\u2713 ${a} snippet${a!==1?"s":""} synced`),!0}catch(r){return r.name==="TimeoutError"||r.name==="AbortError"?e("error","Sync timed out \u2014 check connection"):e("error","Backend unreachable \u2014 snippets buffered locally"),!1}}async function $e(e){if(!e)return null;try{let t=await fetch(`${ke}/api/sync`,{headers:{Authorization:`Bearer ${e}`},signal:AbortSignal.timeout($t)});return t.ok&&(await t.json()).settings||null}catch{return null}}var Ct="https://vinnsedesigner-vinns-ai-backend.hf.space",v=null,y=[];var _=new Map;function d(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function j(e){return!e||typeof e!="number"?"":e<1024?`${e}B`:e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}function Ce(e){return{js:"\u{1F7E8}",ts:"\u{1F537}",jsx:"\u{1F7E6}",tsx:"\u{1F537}",py:"\u{1F40D}",json:"\u{1F4CB}",md:"\u{1F4DD}",txt:"\u{1F4C4}",css:"\u{1F3A8}",html:"\u{1F310}",sql:"\u{1F5C4}\uFE0F",yaml:"\u2699\uFE0F",yml:"\u2699\uFE0F",sh:"\u26A1",rs:"\u{1F980}",go:"\u{1F439}",rb:"\u{1F48E}",java:"\u2615"}[(e||"").toLowerCase()]||"\u{1F4C1}"}function Nt(e){return typeof e=="string"&&e.trimStart().startsWith("data:")}function X(e){let t=e.text||e.url||"";return!t||Nt(t)?null:t}function Ne(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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
  `,Mt(),jt(),h())}function jt(){document.getElementById("vn-sync-btn")?.addEventListener("click",async()=>{await Le((e,t)=>{l(e==="success"?"green":e==="error"?"red":"amber",t),e==="error"&&f(t),e==="success"&&h()})}),document.getElementById("vn-undo-btn")?.addEventListener("click",Pt),document.getElementById("vn-modal-close")?.addEventListener("click",ze),document.getElementById("vn-view-modal")?.addEventListener("click",e=>{e.target.id==="vn-view-modal"&&ze()})}function Mt(){v||(v=document.createElement("div"),v.className="vn-sel-overlay",v.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(v),v.querySelector("#vn-sel-repo").addEventListener("click",()=>Be("code")),v.querySelector("#vn-sel-research").addEventListener("click",()=>Be("research")),document.addEventListener("click",e=>{v.contains(e.target)||F()}))}function je(e){!v||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0).getBoundingClientRect();v.style.top=`${n.bottom+8}px`,v.style.left=`${Math.max(0,n.left)}px`,v.classList.add("vn-show")},300)}function F(){v?.classList.remove("vn-show")}function Be(e){let t=C();if(!t)return;let n=u(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20",10);if(n.length>=o){l("red",`Max ${o} snippets`),f(`Snippet limit (${o}) reached \u2014 sync or clear first`),F();return}V({text:t,type:e,url:location.href,title:document.title}),h(),F(),l("green",`#${n.length+1} staged`)}function Ae(e){let t=document.getElementById("vn-view-modal"),n=document.getElementById("vn-modal-title"),o=document.getElementById("vn-modal-body");if(!(!t||!o||!n)){if(n.textContent=`#${e.number} \xB7 ${e.type}`+(e.title?` \xB7 ${e.title.slice(0,30)}`:""),e.type==="image"){let i=X(e),r=_.get(e.number),s=j(e.file_size),a=e.mime_type||"";o.innerHTML=`
      <div class="vn-modal-image-wrap">
        ${i?`<img class="vn-modal-thumbnail"
                  src="${d(i)}"
                  alt="snippet #${e.number}"
                  loading="lazy" />`:'<div class="vn-modal-no-thumb">\u{1F5BC}\uFE0F No preview</div>'}
        <div class="vn-modal-image-meta">
          ${a?`<span class="vn-snippet-type">${d(a)}</span>`:""}
          ${s?`<span class="vn-snippet-type">${d(s)}</span>`:""}
        </div>
      </div>
      ${r?`<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis</div>
             <div class="vn-modal-analysis-body">${d(r)}</div>
           </div>`:`<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${e.number}">
             \u{1F50D} Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${e.number}"></div>`}
    `,r||o.querySelector(`#vn-analyze-modal-${e.number}`)?.addEventListener("click",()=>Me(e,o))}else if(e.type==="file"){let i=e.metadata?.extension||"",r=j(e.file_size),s=Ce(i);o.innerHTML=`
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${s}</span>
        ${i?`<span class="vn-snippet-type">.${d(i)}</span>`:""}
        ${r?`<span class="vn-snippet-type">${d(r)}</span>`:""}
      </div>
      <div class="vn-modal-file-url">${d(e.url||"")}</div>
      <pre class="vn-modal-file-content">${d((e.text||"").slice(0,3e3))}</pre>
    `}else o.innerHTML=`
      <pre class="vn-modal-text">${d((e.text||"").slice(0,3e3))}</pre>
    `;t.classList.add("vn-show")}}function ze(){document.getElementById("vn-view-modal")?.classList.remove("vn-show")}async function Me(e,t){let n=p();if(!n){f("Login to dashboard first");return}let o=`vn-analyze-modal-${e.number}`,i=`vn-analyze-result-${e.number}`,r=t.querySelector(`#${o}`),s=t.querySelector(`#${i}`);r&&(r.textContent="\u23F3 Analyzing...",r.disabled=!0),s&&(s.textContent=""),l("amber","analyzing image...");try{let a=X(e),c=a?{imageUrl:a,mimeType:e.mime_type||"image/jpeg",question:"Describe this image in detail."}:null;if(!c)throw new Error("No valid image URL for analysis");let x=await fetch(`${Ct}/api/vision`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(c),signal:AbortSignal.timeout(3e4)}),S=await x.json();if(!x.ok)throw new Error(S.message||`Vision API error (${x.status})`);let m=S.analysis||"No analysis returned";_.set(e.number,m),s&&(s.innerHTML=`
        <div class="vn-modal-analysis-hdr">\u{1F50D} Analysis \xB7 <span class="vn-model-tag">${d(S.model||"")}</span></div>
        <div class="vn-modal-analysis-body">${d(m)}</div>
      `),r&&(r.style.display="none"),l("green","analysis complete")}catch(a){let c=a.name==="TimeoutError"||a.name==="AbortError"?"Analysis timed out \u2014 try again":a.message||"Analysis failed";s&&(s.textContent=`\u26A0 ${c}`),r&&(r.textContent="\u{1F50D} Retry Analysis",r.disabled=!1),l("red","analysis failed"),f(c)}}function Ot(e){let n=u().find(i=>i.number===e);if(!n)return;G(e),h(),_.delete(e);let o={snippet:n,timer:null};y.push(o),Oe(`Snippet #${e} removed`),o.timer=setTimeout(()=>{y=y.filter(i=>i.snippet.number!==e),y.length===0&&Pe()},5e3)}function Pt(){let e=y.pop();if(!e)return;clearTimeout(e.timer);let t=u();t.push(e.snippet),t.sort((n,o)=>n.number-o.number),I(t),h(),y.length===0?Pe():Oe(`Snippet #${y[y.length-1].snippet.number} removed`)}function Oe(e){let t=document.getElementById("vn-undo-bar"),n=document.getElementById("vn-undo-text");t&&n&&(n.textContent=e,t.classList.add("vn-show"))}function Pe(){document.getElementById("vn-undo-bar")?.classList.remove("vn-show")}function h(){let e=u(),t=e.filter(s=>s.type==="code"),n=e.filter(s=>s.type==="research"),o=e.filter(s=>s.type==="image"),i=e.filter(s=>s.type==="file"),r=(s,a)=>{let c=document.getElementById(s);c&&(c.textContent=a)};r("vn-repo-count",t.length),r("vn-research-count",n.length),r("vn-image-count",o.length),r("vn-file-count",i.length),g("snip",`${e.length} snippets`,e.length>0?"active":""),N("vn-repo-list",t,Rt),N("vn-research-list",n,Dt),N("vn-image-list",o,qt),N("vn-file-list",i,Ut),Ht(e)}function N(e,t,n){let o=document.getElementById(e);if(o){if(t.length===0){o.innerHTML='<div class="vn-snip-empty">\u2014</div>';return}o.innerHTML=t.map(n).join("")}}function Ht(e){document.querySelectorAll(".vn-snip-view").forEach(t=>{t.addEventListener("click",()=>{let n=e.find(o=>o.number===Number(t.dataset.num));n&&Ae(n)})}),document.querySelectorAll(".vn-snip-del").forEach(t=>{t.addEventListener("click",()=>{Ot(Number(t.dataset.num))})}),document.querySelectorAll(".vn-snip-analyze").forEach(t=>{t.addEventListener("click",async()=>{let n=e.find(i=>i.number===Number(t.dataset.num));if(!n)return;Ae(n);let o=document.getElementById("vn-modal-body");o&&!_.has(n.number)&&await Me(n,o)})})}function Rt(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function Dt(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d((e.text||"").slice(0,45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function qt(e){let t=X(e),n=j(e.file_size);return`
    <div class="vn-snip-item vn-snip-item-image${_.has(e.number)?" vn-analyzed":""}">
      ${t?`<img class="vn-snip-thumb"
                src="${d(t)}"
                alt="img #${e.number}"
                loading="lazy" />`:'<span class="vn-snip-no-thumb">\u{1F5BC}\uFE0F</span>'}
      <div class="vn-snip-image-info">
        <span class="vn-snip-num">#${e.number}</span>
        ${n?`<span class="vn-snip-type">${d(n)}</span>`:""}
        ${_.has(e.number)?'<span class="vn-snip-type vn-analyzed-badge">\u2713 analyzed</span>':""}
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
  `}function Ut(e){let t=e.metadata?.extension||"",n=j(e.file_size),o=Ce(t),i=(e.text||e.url||"").slice(0,40);return`
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${o}</span>
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${d(i)}</span>
      <div class="vn-snip-badges">
        ${t?`<span class="vn-snip-type">.${d(t)}</span>`:""}
        ${n?`<span class="vn-snip-type">${d(n)}</span>`:""}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${e.number}" title="view">\u{1F441}</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${e.number}" title="delete">\u{1F5D1}</button>
    </div>
  `}function Re(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
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
  `,Yt()}function Yt(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-light"),i=document.getElementById("vn-snippet-limit"),r=document.getElementById("vn-clear-snippets");e?.addEventListener("input",()=>{let s=e.value;t.textContent=`${s}vh`;let a=E();a&&(a.style.height=`${s}vh`),localStorage.setItem("vn_panel_height",s)}),n?.addEventListener("click",()=>{He("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o?.addEventListener("click",()=>{He("light"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),i?.addEventListener("change",()=>{let s=Math.max(1,Math.min(100,parseInt(i.value)||20));localStorage.setItem("vn_snippet_limit",s),i.value=s}),r?.addEventListener("click",()=>{confirm("Clear all snippets?")&&(T(),h())})}function He(e){let t=E();t&&(t.classList.remove("vn-theme-oled","vn-theme-light"),e!=="oled"&&t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var M=!1,De,qe,K,J,O=!1,Ue,Ye;function Fe(){Ft(),Xt()}function Ft(){let e=q();if(!e)return;function t(i,r){M=!0,De=i,qe=r;let s=e.getBoundingClientRect();K=s.left,J=s.top,e.style.right="auto",e.style.bottom="auto",e.style.left=K+"px",e.style.top=J+"px",e.style.transition="none",e.classList.add("vn-dragging")}function n(i,r){if(!M)return;let s=i-De,a=r-qe,c=Math.max(0,Math.min(window.innerWidth-56,K+s)),x=Math.max(0,Math.min(window.innerHeight-56,J+a));e.style.left=c+"px",e.style.top=x+"px",localStorage.setItem("vn_fab_left",c),localStorage.setItem("vn_fab_top",x)}function o(){M=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",i=>{i.target!==e&&!i.target.classList.contains("vn-fab-dot")||(i.preventDefault(),i.stopPropagation(),t(i.clientX,i.clientY))}),document.addEventListener("mousemove",i=>n(i.clientX,i.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",i=>{if(i.target!==e&&!i.target.classList.contains("vn-fab-dot"))return;let r=i.touches[0];t(r.clientX,r.clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{if(!M)return;i.preventDefault();let r=i.touches[0];n(r.clientX,r.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function Xt(){let e=document.getElementById("vn-drag-handle"),t=E();if(!e||!t)return;function n(r){O=!0,Ue=r,Ye=t.offsetHeight}function o(r){if(!O)return;let s=Ue-r,a=Math.max(window.innerHeight*.25,Math.min(window.innerHeight*.85,Ye+s));t.style.height=a+"px",localStorage.setItem("vn_panel_height",Math.round(a/window.innerHeight*100))}function i(){O=!1}e.addEventListener("mousedown",r=>{r.preventDefault(),n(r.clientY)}),document.addEventListener("mousemove",r=>o(r.clientY)),document.addEventListener("mouseup",i),e.addEventListener("touchstart",r=>{n(r.touches[0].clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{O&&(r.preventDefault(),o(r.touches[0].clientY))},{passive:!1}),document.addEventListener("touchend",i)}function Xe(){let e=q();if(!e)return;let t=localStorage.getItem("vn_fab_left"),n=localStorage.getItem("vn_fab_top");t&&n&&(e.style.right="auto",e.style.bottom="auto",e.style.left=t+"px",e.style.top=n+"px")}function Ke(){let e=E();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"55");e.style.height=`${t}vh`}var Kt=15e3,W=null;function Je(){W=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(W),W=null;return}let e=p(),t=await $e(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),h())},Kt)}function We(){document.getElementById("__venom_fab__")||(de(),ve(),xe(),Ne(),Re(),Fe(),Xe(),Ke(),ue(),Se(e=>je(e)),be(),Je(),l("green","ready"))}function Ze(){let e=p();k(),We(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(window.__nexus_scraper_loaded__){document.getElementById("__venom_fab__")?.remove(),document.getElementById("__venom_panel__")?.remove(),document.getElementById("__venom_styles__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,Ze()})();})();
