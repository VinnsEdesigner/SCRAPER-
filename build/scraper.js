(()=>{var I="nexus_scraper_snippets",O="nexus_scraper_session",be="nexus_auth_token";function u(){return localStorage.getItem(be)||null}function g(){let e=localStorage.getItem(O);return e||(e=crypto.randomUUID(),localStorage.setItem(O,e)),e}function d(){try{return JSON.parse(localStorage.getItem(I)||"[]")}catch{return[]}}function P(e){localStorage.setItem(I,JSON.stringify(e))}function H(e){let t=d(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),P(t),o}function k(e){let t=d().filter(n=>n.number!==e);P(t)}function f(){localStorage.removeItem(I)}function $(){if(document.getElementById("__venom_styles__"))return;let e=document.createElement("style");e.id="__venom_styles__",e.textContent=`
    /* \u2500\u2500 FAB (floating spider icon) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 PANEL (bottom sheet) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 DRAG HANDLE (top edge of panel) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 TABS (horizontal strip) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 TAB CONTENT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .vn-tab-content {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: none;
    }
    .vn-tab-content.vn-active { display: block; }

    /* \u2500\u2500 AGENT TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 SNIPPETS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 SETTINGS TAB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 BUTTONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

    /* \u2500\u2500 LOGO (never changes) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .vn-logo {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1px;
    }
    .vn-logo-spider { color: #ef4444; }

    /* \u2500\u2500 THEMES \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  `,document.head.appendChild(e)}var z="__venom_fab__",B="__venom_panel__",T=!1;function M(){$();let e=document.createElement("div");e.id=z,e.innerHTML=`
    \u{1F577}\uFE0F
    <span class="vn-fab-dot"></span>
  `;let t=document.createElement("div");return t.id=B,t.innerHTML=`
    <div class="vn-drag-handle" id="vn-drag-handle"></div>
    
    <div class="vn-tabs">
      <button class="vn-tab vn-active" data-tab="agent">NExY \u{1F9D1}\u200D\u{1F4BB} AGENT</button>
      <button class="vn-tab" data-tab="snippets">SNIPPETS</button>
      <button class="vn-tab" data-tab="settings">SETTINGS</button>
    </div>
    
    <div class="vn-tab-content vn-active" id="vn-tab-agent"></div>
    <div class="vn-tab-content" id="vn-tab-snippets"></div>
    <div class="vn-tab-content" id="vn-tab-settings"></div>
  `,e.onclick=he,document.body.appendChild(e),document.body.appendChild(t),{fab:e,panel:t}}function he(){T=!T;let e=document.getElementById(B);e&&e.classList.toggle("vn-open",T)}function L(){return document.getElementById(z)}function m(){return document.getElementById(B)}var R=["agent","snippets","settings"];function D(){let e=document.getElementById("__venom_panel__");if(!e)return;e.querySelectorAll(".vn-tab").forEach(n=>{n.onclick=()=>{let o=n.dataset.tab;F(o)}})}function F(e){if(!R.includes(e))return;let t=document.getElementById("__venom_panel__");if(!t)return;t.querySelectorAll(".vn-tab").forEach(o=>{o.classList.toggle("vn-active",o.dataset.tab===e)}),t.querySelectorAll(".vn-tab-content").forEach(o=>{o.classList.remove("vn-active")});let n=document.getElementById(`vn-tab-${e}`);n&&n.classList.add("vn-active"),localStorage.setItem("vn_last_tab",e)}function Y(){let e=localStorage.getItem("vn_last_tab");e&&R.includes(e)&&F(e)}function b(){return{url:location.href,title:document.title||"",content:xe()}}function xe(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let r=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(r)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var X="https://vinnsedesigner-vinns-ai-backend.hf.space";async function N(e,t=[]){let n=u();if(!n)return{error:"Not authenticated \u2014 open dashboard and login first"};let o=b(),r={message:e,pageContext:o,snippets:t.map(i=>({type:i.type,text:i.text}))};try{let i=await fetch(`${X}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)}),a=await i.json();return i.ok?a.escalate===!0?await _e(e,t,o,n):{reply:a.reply,model:a.model,escalated:!1}:{error:a.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function _e(e,t,n,o){try{let r=await fetch(`${X}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,snippets:t.map(a=>({type:a.type,text:a.text})),stream:!1})}),i=await r.json();return r.ok?{reply:i.response||i.reply||"",model:i.model_used||i.model||"agent",escalated:!0}:{error:i.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function c(e,t){let n=document.getElementById("__venom_fab__");if(!n)return;let o=n.querySelector(".vn-fab-dot");o&&(o.className="vn-fab-dot",e==="green"?o.classList.add("vn-green"):e==="amber"?o.classList.add("vn-amber"):e==="red"&&o.classList.add("vn-red"),n.setAttribute("data-status",t||""))}var ye=[],h=null;function K(){let e=document.getElementById("vn-tab-agent");e&&(e.innerHTML=`
    <div class="vn-agent-header">CONVERSATION</div>
    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">Ask me anything about this page...</div>
    </div>
    
    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject \u2197</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>
    
    <div class="vn-input-row">
      <textarea class="vn-input" id="vn-agent-input" placeholder="ask about this page..." rows="2"></textarea>
      <button class="vn-btn-send" id="vn-send-btn">\u2642\uFE0F</button>
    </div>
    
    <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
  `,Ee())}function Ee(){let e=document.getElementById("vn-send-btn"),t=document.getElementById("vn-suggest-btn"),n=document.getElementById("vn-agent-input"),o=document.getElementById("vn-inject-btn"),r=document.getElementById("vn-inject-dismiss");e&&(e.onclick=q),t&&(t.onclick=Se),o&&(o.onclick=Ie),r&&(r.onclick=G),n&&n.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),q())})}async function q(){let e=document.getElementById("vn-agent-input"),t=e?.value?.trim();if(!t)return;A("user",t),e.value="",c("amber","thinking...");let{reply:n,model:o,escalated:r,error:i}=await N(t,d());if(i){A("agent",`\u26A0 ${i}`),c("red","error");return}A("agent",n),c("green",r?"done (escalated)":"done")}async function Se(){let e="Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.";c("amber","generating...");let{reply:t,error:n}=await N(e,d());if(n||!t){c("red","suggestion failed");return}h=t,we(t),c("green","ready to inject")}function A(e,t){ye.push({type:e,text:t});let n=document.getElementById("vn-convo");if(!n)return;let o=document.createElement("div");o.className=`vn-msg vn-msg-${e}`,o.textContent=t,n.appendChild(o),n.scrollTop=n.scrollHeight}function we(e){let t=document.getElementById("vn-inject-banner"),n=document.getElementById("vn-inject-text");t&&n&&(n.textContent=e.slice(0,150),t.classList.add("vn-show"))}function G(){let e=document.getElementById("vn-inject-banner");e&&e.classList.remove("vn-show"),h=null}function Ie(){let e=h||document.getElementById("vn-inject-text")?.textContent;if(!e)return;let t=ke(e);G(),h=null,t===!1?c("red","no input found"):c("green",t==="clipboard"?"copied":"injected \u2197")}function ke(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}var U=null;function J(e){document.addEventListener("selectionchange",()=>{clearTimeout(U),U=setTimeout(()=>{let t=x();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=x();t&&e(t)},50)})}function x(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}var W="https://vinnsedesigner-vinns-ai-backend.hf.space";async function V(e){let t=u(),n=d();if(!t)return e("error","Login to dashboard first"),!1;if(n.length===0)return e("error","No snippets staged"),!1;e("syncing",`Syncing ${n.length} snippets...`);try{let o=await fetch(`${W}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:g(),snippets:n.map(i=>({number:i.number,text:i.text,type:i.type,url:i.url||location.href,title:i.title||document.title})),pageContext:b()})}),r=await o.json();return o.ok?(f(),e("success",`\u2713 ${r.saved} snippets synced`),!0):(e("error",r.message||"Sync failed"),!1)}catch{return e("error","Backend unreachable \u2014 buffered locally"),!1}}async function Q(e){if(!e)return null;try{let t=await fetch(`${W}/api/sync`,{headers:{Authorization:`Bearer ${e}`}});return t.ok?(await t.json()).settings:null}catch{return null}}var l=null;function te(){let e=document.getElementById("vn-tab-snippets");e&&(e.innerHTML=`
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
    
    <button class="vn-btn vn-btn-full" id="vn-sync-btn">SYNC</button>
  `,Te(),Be(),p())}function Te(){l||(l=document.createElement("div"),l.className="vn-sel-overlay",l.innerHTML=`
    <button class="vn-btn-sm" id="vn-sel-repo">\u{1F4C1} Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">\u{1F52C} Research</button>
  `,document.body.appendChild(l),l.querySelector("#vn-sel-repo").onclick=()=>Z("code"),l.querySelector("#vn-sel-research").onclick=()=>Z("research"),document.addEventListener("click",e=>{l.contains(e.target)||C()}))}function ne(e){!l||!e||setTimeout(()=>{let t=window.getSelection();if(!t||t.rangeCount===0)return;let o=t.getRangeAt(0).getBoundingClientRect();l.style.top=`${o.bottom+8}px`,l.style.left=`${o.left}px`,l.classList.add("vn-show")},300)}function C(){l&&l.classList.remove("vn-show")}function Z(e){let t=x();if(!t)return;let n=d(),o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");if(n.length>=o){c("red",`Max ${o} snippets`),C();return}H({text:t,type:e,url:location.href,title:document.title}),p(),C(),c("green",`#${n.length+1} staged`)}function Be(){let e=document.getElementById("vn-sync-btn");e&&(e.onclick=async()=>{await V((t,n)=>{c(t==="success"?"green":t==="error"?"red":"amber",n),t==="success"&&p()})})}function p(){let e=d(),t=e.filter(s=>s.type==="code"),n=e.filter(s=>s.type==="research"),o=document.getElementById("vn-repo-list"),r=document.getElementById("vn-research-list"),i=document.getElementById("vn-repo-count"),a=document.getElementById("vn-research-count");i&&(i.textContent=t.length),a&&(a.textContent=n.length),o&&(o.innerHTML=t.length===0?'<div class="vn-msg vn-msg-agent">No repo snippets</div>':t.map(s=>ee(s)).join(""),o.querySelectorAll(".vn-btn-icon").forEach(s=>{s.onclick=()=>{k(Number(s.dataset.num)),p()}})),r&&(r.innerHTML=n.length===0?'<div class="vn-msg vn-msg-agent">No research snippets</div>':n.map(s=>ee(s)).join(""),r.querySelectorAll(".vn-btn-icon").forEach(s=>{s.onclick=()=>{k(Number(s.dataset.num)),p()}}))}function ee(e){return`
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${e.number}</span>
      <span class="vn-snip-preview">${Le(e.text.slice(0,60))}</span>
      <span class="vn-snip-type">${e.type}</span>
      <button class="vn-btn-icon" data-num="${e.number}">\u{1F5D1}</button>
    </div>
  `}function Le(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ie(){let e=document.getElementById("vn-tab-settings");if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"50"),n=localStorage.getItem("vn_theme")||"oled",o=parseInt(localStorage.getItem("vn_snippet_limit")||"20");e.innerHTML=`
    <div class="vn-setting-row">
      <span class="vn-setting-label">Panel Height</span>
      <input type="range" class="vn-slider" id="vn-height-slider" min="30" max="80" value="${t}">
      <span id="vn-height-val">${t}vh</span>
    </div>
    
    <div class="vn-setting-row">
      <span class="vn-setting-label">Theme</span>
      <div class="vn-theme-row">
        <button class="vn-btn ${n==="oled"?"vn-selected":""}" id="vn-theme-oled">OLED</button>
        <button class="vn-btn ${n==="oceanic"?"vn-selected":""}" id="vn-theme-oceanic">Oceanic</button>
      </div>
    </div>
    
    <div class="vn-setting-row">
      <span class="vn-setting-label">Snippet Limit</span>
      <input type="number" class="vn-input" id="vn-snippet-limit" value="${o}" min="1" max="50" style="width:60px">
    </div>
    
    <div class="vn-setting-row">
      <button class="vn-btn" id="vn-clear-snippets">Clear All Snippets</button>
    </div>
  `,Ne()}function Ne(){let e=document.getElementById("vn-height-slider"),t=document.getElementById("vn-height-val"),n=document.getElementById("vn-theme-oled"),o=document.getElementById("vn-theme-oceanic"),r=document.getElementById("vn-snippet-limit"),i=document.getElementById("vn-clear-snippets");e&&t&&(e.oninput=()=>{let a=e.value;t.textContent=`${a}vh`,Ae(a),localStorage.setItem("vn_panel_height",a)}),n&&(n.onclick=()=>{oe("oled"),n.classList.add("vn-selected"),o?.classList.remove("vn-selected")}),o&&(o.onclick=()=>{oe("oceanic"),o.classList.add("vn-selected"),n?.classList.remove("vn-selected")}),r&&(r.onchange=()=>{let a=Math.max(1,Math.min(50,parseInt(r.value)||20));localStorage.setItem("vn_snippet_limit",a),r.value=a}),i&&(i.onclick=()=>{confirm("Clear all snippets?")&&(f(),p())})}function Ae(e){let t=m();t&&(t.style.height=`${e}vh`)}function oe(e){let t=m();t&&(t.classList.remove("vn-theme-oled","vn-theme-oceanic"),t.classList.add(`vn-theme-${e}`),localStorage.setItem("vn_theme",e))}var _=!1,re,ae,se,ce,y=!1,le,de;function pe(){Ce(),je()}function Ce(){let e=L();if(!e)return;function t(r,i){_=!0,re=r,ae=i;let a=e.getBoundingClientRect();se=window.innerWidth-a.right,ce=window.innerHeight-a.bottom,e.style.transition="none",e.classList.add("vn-dragging")}function n(r,i){if(!_)return;let a=r-re,s=i-ae,E=Math.max(0,se-a),S=Math.max(0,ce+s),v=window.innerWidth-60,w=window.innerHeight-60;e.style.right=Math.min(E,v)+"px",e.style.bottom=Math.min(S,w)+"px",localStorage.setItem("vn_fab_right",e.style.right),localStorage.setItem("vn_fab_bottom",e.style.bottom)}function o(){_=!1,e.classList.remove("vn-dragging")}e.addEventListener("mousedown",r=>{r.target!==e&&!r.target.classList.contains("vn-fab-dot")||(r.preventDefault(),r.stopPropagation(),t(r.clientX,r.clientY))}),document.addEventListener("mousemove",r=>n(r.clientX,r.clientY)),document.addEventListener("mouseup",o),e.addEventListener("touchstart",r=>{if(r.target!==e&&!r.target.classList.contains("vn-fab-dot"))return;let i=r.touches[0];t(i.clientX,i.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!_)return;r.preventDefault();let i=r.touches[0];n(i.clientX,i.clientY)},{passive:!1}),document.addEventListener("touchend",o)}function je(){let e=document.getElementById("vn-drag-handle"),t=m();if(!e||!t)return;function n(i){y=!0,le=i,de=t.offsetHeight}function o(i){if(!y)return;let a=le-i,s=de+a,E=window.innerHeight*.3,S=window.innerHeight*.8,v=Math.max(E,Math.min(S,s));t.style.height=`${v}px`;let w=Math.round(v/window.innerHeight*100);localStorage.setItem("vn_panel_height",w)}function r(){y=!1}e.addEventListener("mousedown",i=>{i.preventDefault(),n(i.clientY)}),document.addEventListener("mousemove",i=>o(i.clientY)),document.addEventListener("mouseup",r),e.addEventListener("touchstart",i=>{let a=i.touches[0];n(a.clientY)},{passive:!0}),document.addEventListener("touchmove",i=>{if(!y)return;i.preventDefault();let a=i.touches[0];o(a.clientY)},{passive:!1}),document.addEventListener("touchend",r)}function ue(){let e=L();if(!e)return;let t=localStorage.getItem("vn_fab_right"),n=localStorage.getItem("vn_fab_bottom");t&&(e.style.right=t),n&&(e.style.bottom=n)}function me(){let e=m();if(!e)return;let t=parseInt(localStorage.getItem("vn_panel_height")||"50");e.style.height=`${t}vh`}var Oe=15e3,j=null;function ve(){j=setInterval(async()=>{if(!document.getElementById("__venom_panel__")){clearInterval(j),j=null;return}let e=u(),t=await Q(e);t&&(t.snippet_limit&&localStorage.setItem("vn_snippet_limit",t.snippet_limit),p())},Oe)}function ge(){document.getElementById("__venom_fab__")||(M(),D(),K(),te(),ie(),pe(),ue(),me(),Y(),J(e=>ne(e)),ve(),c("green","ready"))}function fe(){let e=u();g(),ge(),e||console.log("[VENOM Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(alert("bookmarklet running"),window.__nexus_scraper_loaded__){document.getElementById("__nexus_hud__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,fe()})();})();
