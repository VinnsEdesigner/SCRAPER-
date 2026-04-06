(()=>{var E="nexus_scraper_snippets",T="nexus_scraper_session",G="nexus_auth_token";function u(){return localStorage.getItem(G)||null}function f(){let e=localStorage.getItem(T);return e||(e=`session-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,localStorage.setItem(T,e)),e}function l(){try{return JSON.parse(localStorage.getItem(E)||"[]")}catch{return[]}}function C(e){localStorage.setItem(E,JSON.stringify(e))}function j(e){let t=l(),n=t.length+1,o={...e,number:n,created_at:Date.now()};return t.push(o),C(t),o}function N(e){let t=l().filter(n=>n.number!==e);C(t)}function A(){localStorage.removeItem(E)}var z=null;function L(e){document.addEventListener("selectionchange",()=>{clearTimeout(z),z=setTimeout(()=>{let t=b();t&&e(t)},300)}),document.addEventListener("touchend",()=>{setTimeout(()=>{let t=b();t&&e(t)},50)})}function b(){let e=window.getSelection();if(!e||e.rangeCount===0)return"";let t=e.toString().trim();return t.length>0?t.slice(0,2e3):""}function h(){return{url:location.href,title:document.title||"",content:Q()}}function Q(){let e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(o){let s=o.parentElement?.tagName?.toLowerCase();return["script","style","noscript","svg"].includes(s)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),t=[],n;for(;n=e.nextNode();){let o=n.textContent.trim();o.length>0&&t.push(o)}return t.join(" ").replace(/\s+/g," ").slice(0,5e3)}var $="__BACKEND_URL__";async function P(e){let t=u(),n=l();if(!t)return e("error","Login to dashboard first"),!1;if(n.length===0)return e("error","No snippets staged"),!1;e("syncing",`Syncing ${n.length} snippets...`);try{let o=await fetch(`${$}/api/scraper-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({sessionId:f(),snippets:n.map(i=>({number:i.number,text:i.text,type:i.type,url:i.url||location.href,title:i.title||document.title})),pageContext:h()})}),s=await o.json();return o.ok?(A(),e("success",`\u2713 ${s.saved} snippets synced`),!0):(e("error",s.message||"Sync failed"),!1)}catch{return e("error","Backend unreachable \u2014 buffered locally"),!1}}async function q(e){if(!e)return null;try{let t=await fetch(`${$}/api/sync`,{headers:{Authorization:`Bearer ${e}`}});return t.ok?(await t.json()).settings:null}catch{return null}}var D="https://vinnsedesigner-vinns-ai-backend.hf.space";async function S(e,t=[]){let n=u();if(!n)return{error:"Not authenticated \u2014 open dashboard and login first"};let o=h(),s={message:e,pageContext:o,snippets:t.map(i=>({type:i.type,text:i.text}))};try{let i=await fetch(`${D}/api/lite-agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(s)}),a=await i.json();return i.ok?a.escalate===!0?await V(e,t,o,n):{reply:a.reply,model:a.model,escalated:!1}:{error:a.message||"Agent error"}}catch{return{error:"Backend unreachable \u2014 check connection"}}}async function V(e,t,n,o){try{let s=await fetch(`${D}/api/agent`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({message:e,pageContext:n,snippets:t.map(a=>({type:a.type,text:a.text})),stream:!1})}),i=await s.json();return s.ok?{reply:i.response||i.reply||"",model:i.model_used||i.model||"agent",escalated:!0}:{error:i.message||"Full agent error"}}catch{return{error:"Full agent unreachable"}}}function M(e){if(!e||typeof e!="string")return!1;let t=["textarea:not([disabled]):not([readonly])",'div[contenteditable="true"]','input[type="text"]:not([disabled])','[role="textbox"]'];for(let n of t){let o=document.querySelector(n);if(o)try{if(o.tagName==="TEXTAREA"||o.tagName==="INPUT")return o.focus(),o.value=e,o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),!0;if(o.contentEditable==="true")return o.focus(),document.execCommand("selectAll",!1,null),document.execCommand("insertText",!1,e),!0}catch{continue}}try{return navigator.clipboard.writeText(e),"clipboard"}catch{return!1}}var v="__nexus_hud__",Z=15e3,x=null,y=!1,p={prompt_injection:!0,snippet_limit:20},w=null;function R(){if(document.getElementById(v))return;pe();let e=ee();document.body.appendChild(e),L(t=>re(t)),de(),m(),ne(e)}function ee(){let e=document.createElement("div");return e.id=v,e.innerHTML=`
    <div class="nx-header" id="nx-hdr">
      <span class="nx-title">&#x1F577; scraper <span class="nx-dot" id="nx-dot">&#x25CF;</span></span>
      <span class="nx-staged" id="nx-staged">0 staged</span>
      <button class="nx-btn-icon" id="nx-collapse">&#x2212;</button>
      <button class="nx-btn-icon" id="nx-close">&#xD7;</button>
    </div>

    <div class="nx-body" id="nx-body">

      <div class="nx-sel-bar" id="nx-sel-bar" style="display:none">
        <span class="nx-sel-preview" id="nx-sel-preview"></span>
        <button class="nx-btn-sm" id="nx-add-code">+ code</button>
        <button class="nx-btn-sm" id="nx-add-research">+ research</button>
        <button class="nx-btn-sm nx-btn-ghost" id="nx-sel-dismiss">&#x2715;</button>
      </div>

      <div class="nx-inject-banner" id="nx-inject-banner" style="display:none">
        <span class="nx-inject-text" id="nx-inject-text"></span>
        <div class="nx-inject-row">
          <button class="nx-btn-sm" id="nx-inject-btn">inject &#x2197;</button>
          <button class="nx-btn-sm nx-btn-ghost" id="nx-inject-dismiss">dismiss</button>
        </div>
      </div>

      <div class="nx-section">
        <textarea class="nx-input" id="nx-agent-input" placeholder="ask about this page..." rows="2"></textarea>
        <div class="nx-row">
          <button class="nx-btn" id="nx-ask-btn">ask</button>
          <button class="nx-btn nx-btn-outline" id="nx-suggest-btn">suggest prompt</button>
        </div>
        <div class="nx-reply" id="nx-reply" style="display:none"></div>
      </div>

      <div class="nx-section">
        <div class="nx-sec-hdr">STAGED SNIPPETS <span id="nx-count">0/20</span></div>
        <div class="nx-snippets" id="nx-snippets-list"></div>
      </div>

      <button class="nx-btn nx-btn-full" id="nx-sync-btn">&#x21C5; sync to dashboard</button>

      <div class="nx-footer">
        <span class="nx-status" id="nx-status">&#x25CF; not synced</span>
        <span class="nx-model"  id="nx-model">llama-3.3-70b</span>
      </div>
    </div>
  `,te(e),e}function te(e){e.querySelector("#nx-collapse").onclick=ce,e.querySelector("#nx-close").onclick=le,e.querySelector("#nx-add-code").onclick=()=>O("code"),e.querySelector("#nx-add-research").onclick=()=>O("research"),e.querySelector("#nx-sel-dismiss").onclick=H,e.querySelector("#nx-inject-dismiss").onclick=k,e.querySelector("#nx-inject-btn").onclick=ie,e.querySelector("#nx-ask-btn").onclick=F,e.querySelector("#nx-suggest-btn").onclick=oe,e.querySelector("#nx-sync-btn").onclick=se,e.querySelector("#nx-agent-input").addEventListener("keydown",t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),F())})}function ne(e){let t=e.querySelector("#nx-hdr"),n=!1,o,s,i,a;function _(r,d){n=!0,o=r,s=d;let g=e.getBoundingClientRect();i=window.innerWidth-g.right,a=window.innerHeight-g.bottom,e.style.transition="none"}function I(r,d){if(!n)return;let g=r-o,K=d-s,Y=Math.max(0,i-g),J=Math.max(0,a+K),U=window.innerWidth-60,W=window.innerHeight-60;e.style.right=Math.min(Y,U)+"px",e.style.bottom=Math.min(J,W)+"px"}function B(){n=!1}t.addEventListener("mousedown",r=>{r.preventDefault(),_(r.clientX,r.clientY)}),document.addEventListener("mousemove",r=>I(r.clientX,r.clientY)),document.addEventListener("mouseup",B),t.addEventListener("touchstart",r=>{let d=r.touches[0];_(d.clientX,d.clientY)},{passive:!0}),document.addEventListener("touchmove",r=>{if(!n)return;r.preventDefault();let d=r.touches[0];I(d.clientX,d.clientY)},{passive:!1}),document.addEventListener("touchend",B)}function O(e){let t=b();if(!t)return;if(l().length>=p.snippet_limit){c("error",`Max ${p.snippet_limit} snippets reached`);return}j({text:t,type:e,url:location.href,title:document.title}),m(),H(),c("ok",`#${l().length} staged`)}async function F(){let t=document.getElementById("nx-agent-input")?.value?.trim();if(!t)return;let n=document.getElementById("nx-reply");n.style.display="none",n.textContent="",c("syncing","asking..."),n.style.display="block",n.textContent="...";let{reply:o,model:s,escalated:i,error:a}=await S(t,l());if(a){n.textContent=`\u26A0 ${a}`,c("error",a);return}n.textContent=o,c("ok",i?"done (full agent)":"done");let _=document.getElementById("nx-model");_&&(_.textContent=s||"groq")}async function oe(){if(!p.prompt_injection){c("error","Prompt injection disabled in settings");return}let e=`Based on this page, suggest a concise prompt I can send to my AI assistant to ${document.title?'understand "'+document.title.slice(0,40)+'"':"get help with this page"}. Reply with only the suggested prompt, nothing else.`;c("syncing","generating...");let{reply:t,error:n}=await S(e,l());if(n||!t){c("error",n||"Suggestion failed");return}w=t,ae(t),c("ok","suggestion ready \u2014 tap inject")}async function se(){await P((e,t)=>{c(e==="success"?"ok":e,t),e==="success"&&m()})}function ie(){if(!p.prompt_injection){c("error","Prompt injection disabled in settings"),k();return}let e=w||document.getElementById("nx-inject-text")?.textContent;if(!e)return;let t=M(e);k(),w=null,t===!1?c("error","No input found on page"):c("ok",t==="clipboard"?"copied to clipboard":"injected \u2197")}function m(){let e=l(),t=document.getElementById("nx-snippets-list"),n=document.getElementById("nx-count"),o=document.getElementById("nx-staged");t&&(n.textContent=`${e.length}/${p.snippet_limit}`,o.textContent=`${e.length} staged`,t.innerHTML=e.map(s=>`
    <div class="nx-snip-item">
      <span class="nx-snip-num">#${s.number}</span>
      <span class="nx-snip-preview">${ue(s.text.slice(0,60))}...</span>
      <span class="nx-snip-type">${s.type}</span>
      <button class="nx-btn-icon nx-del" data-num="${s.number}">&#x1F5D1;</button>
    </div>
  `).join(""),t.querySelectorAll(".nx-del").forEach(s=>{s.onclick=()=>{N(Number(s.dataset.num)),m()}}))}function re(e){let t=document.getElementById("nx-sel-bar"),n=document.getElementById("nx-sel-preview");!t||!n||(n.textContent=e.slice(0,50)+(e.length>50?"...":""),t.style.display="flex")}function H(){let e=document.getElementById("nx-sel-bar");e&&(e.style.display="none")}function ae(e){let t=document.getElementById("nx-inject-banner"),n=document.getElementById("nx-inject-text");!t||!n||(n.textContent=e.slice(0,150),t.style.display="block")}function k(){let e=document.getElementById("nx-inject-banner");e&&(e.style.display="none"),w=null}function c(e,t){let n=document.getElementById("nx-status"),o=document.getElementById("nx-dot");n&&(n.textContent="\u25CF "+t,n.className="nx-status",e==="ok"&&(n.style.color="#22d3ee"),e==="error"&&(n.style.color="#ef4444"),e==="syncing"&&(n.style.color="#f59e0b"),e==="success"&&(n.style.color="#22d3ee"),o&&(o.style.color=n.style.color))}function ce(){y=!y;let e=document.getElementById("nx-body"),t=document.getElementById("nx-collapse");e&&(e.style.display=y?"none":"block"),t&&(t.textContent=y?"+":"\u2212")}function le(){x&&(clearInterval(x),x=null);let e=document.getElementById(v);e&&e.remove(),window.__nexus_scraper_loaded__=!1}function de(){x=setInterval(async()=>{if(!document.getElementById(v)){clearInterval(x),x=null;return}let e=u(),t=await q(e);t&&(p={...p,...t}),m()},Z)}function ue(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function pe(){if(document.getElementById("__nexus_styles__"))return;let e=document.createElement("style");e.id="__nexus_styles__",e.textContent=`
    #__nexus_hud__ {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      max-height: 82vh;
      background: #0a0a0a;
      border: 1px solid #2e2e2e;
      border-radius: 12px;
      font-family: 'Geist Mono', 'Courier New', monospace;
      font-size: 12px;
      color: #e6edf3;
      z-index: 2147483647;
      box-shadow: 0 8px 32px rgba(0,0,0,0.9);
      overflow: hidden;
      user-select: none;
    }
    #__nexus_hud__ .nx-header {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: #111;
      border-bottom: 1px solid #1e1e1e;
      cursor: move;
      touch-action: none;
    }
    #__nexus_hud__ .nx-title  { font-weight: bold; flex: 1; font-size: 12px; }
    #__nexus_hud__ .nx-dot    { font-size: 8px; color: #7d8590; }
    #__nexus_hud__ .nx-staged { color: #7d8590; font-size: 10px; }
    #__nexus_hud__ .nx-btn-icon {
      background: none;
      border: none;
      color: #484f58;
      cursor: pointer;
      padding: 0 4px;
      font-size: 14px;
      line-height: 1;
    }
    #__nexus_hud__ .nx-body {
      padding: 10px;
      overflow-y: auto;
      max-height: calc(82vh - 40px);
    }
    #__nexus_hud__ .nx-section { margin-bottom: 10px; }
    #__nexus_hud__ .nx-sec-hdr {
      font-size: 9px;
      color: #484f58;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    #__nexus_hud__ .nx-input {
      width: 100%;
      background: #111;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      color: #e6edf3;
      padding: 6px 8px;
      font-size: 11px;
      font-family: inherit;
      resize: none;
      box-sizing: border-box;
      outline: none;
    }
    #__nexus_hud__ .nx-input:focus { border-color: #444; }
    #__nexus_hud__ .nx-row { display: flex; gap: 6px; margin-top: 6px; }
    #__nexus_hud__ .nx-btn {
      background: #1e1e1e;
      border: 1px solid #2e2e2e;
      color: #e6edf3;
      border-radius: 6px;
      padding: 4px 10px;
      cursor: pointer;
      font-size: 11px;
      font-family: inherit;
    }
    #__nexus_hud__ .nx-btn:active { opacity: 0.7; }
    #__nexus_hud__ .nx-btn-outline { background: none; }
    #__nexus_hud__ .nx-btn-full   { width: 100%; margin-top: 8px; text-align: center; }
    #__nexus_hud__ .nx-btn-sm {
      background: #111;
      border: 1px solid #2e2e2e;
      color: #b1bac4;
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 10px;
      font-family: inherit;
    }
    #__nexus_hud__ .nx-btn-ghost { border-color: transparent; color: #484f58; }
    #__nexus_hud__ .nx-sel-bar {
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
      background: #111;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      padding: 5px 8px;
      margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-sel-preview {
      flex: 1;
      color: #484f58;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    #__nexus_hud__ .nx-inject-banner {
      background: #0d1117;
      border: 1px solid #7c3aed;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
    }
    #__nexus_hud__ .nx-inject-text {
      font-size: 10px;
      color: #b1bac4;
      display: block;
      margin-bottom: 6px;
      line-height: 1.4;
      word-break: break-word;
    }
    #__nexus_hud__ .nx-inject-row { display: flex; gap: 6px; }
    #__nexus_hud__ .nx-reply {
      margin-top: 6px;
      padding: 6px 8px;
      background: #111;
      border-radius: 6px;
      font-size: 10px;
      color: #b1bac4;
      max-height: 100px;
      overflow-y: auto;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap;
    }
    #__nexus_hud__ .nx-snippets { max-height: 120px; overflow-y: auto; }
    #__nexus_hud__ .nx-snip-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 0;
      border-bottom: 1px solid #111;
    }
    #__nexus_hud__ .nx-snip-item:last-child { border: none; }
    #__nexus_hud__ .nx-snip-num     { color: #484f58; font-size: 9px; min-width: 22px; }
    #__nexus_hud__ .nx-snip-preview {
      flex: 1;
      color: #7d8590;
      font-size: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    #__nexus_hud__ .nx-snip-type   { font-size: 8px; color: #333; padding: 1px 4px; }
    #__nexus_hud__ .nx-del         { font-size: 11px; color: #333; }
    #__nexus_hud__ .nx-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #111;
    }
    #__nexus_hud__ .nx-status { font-size: 9px; color: #7d8590; }
    #__nexus_hud__ .nx-model  { font-size: 9px; color: #333; }
  `,document.head.appendChild(e)}function X(){let e=u();f(),R(),e||console.log("[Nexus Scraper] No auth token \u2014 open dashboard and login first")}(function(){"use strict";if(alert("bookmarklet running"),window.__nexus_scraper_loaded__){document.getElementById("__nexus_hud__")?.remove(),window.__nexus_scraper_loaded__=!1;return}window.__nexus_scraper_loaded__=!0,X()})();})();
