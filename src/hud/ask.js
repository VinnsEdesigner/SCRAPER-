// ask.js — AGENT tab

import { askLiteAgent } from '../mini-agent.js';
import { getSnippets } from '../storage.js';
import { setStatus } from './status.js';

let convo = [];
let suggestedPrompt = null;

export function buildAgentTab() {
  const container = document.getElementById('vn-tab-agent');
  if (!container) return;
  
  container.innerHTML = `
    <div class="vn-agent-header">CONVERSATION</div>
    <div class="vn-convo" id="vn-convo">
      <div class="vn-msg vn-msg-agent">Ask me anything about this page...</div>
    </div>
    
    <div class="vn-inject-banner" id="vn-inject-banner">
      <div class="vn-inject-text" id="vn-inject-text"></div>
      <div class="vn-inject-row">
        <button class="vn-btn-sm" id="vn-inject-btn">inject ↗</button>
        <button class="vn-btn-sm vn-btn-ghost" id="vn-inject-dismiss">dismiss</button>
      </div>
    </div>
    
    <div class="vn-input-row">
      <textarea class="vn-input" id="vn-agent-input" placeholder="ask about this page..." rows="2"></textarea>
      <button class="vn-btn-send" id="vn-send-btn">♂️</button>
    </div>
    
    <button class="vn-btn vn-btn-full" id="vn-suggest-btn">suggest prompt</button>
  `;
  
  bindAgentEvents();
}

function bindAgentEvents() {
  const sendBtn = document.getElementById('vn-send-btn');
  const suggestBtn = document.getElementById('vn-suggest-btn');
  const input = document.getElementById('vn-agent-input');
  const injectBtn = document.getElementById('vn-inject-btn');
  const dismissBtn = document.getElementById('vn-inject-dismiss');
  
  if (sendBtn) sendBtn.onclick = sendMessage;
  if (suggestBtn) suggestBtn.onclick = generateSuggest;
  if (injectBtn) injectBtn.onclick = doInject;
  if (dismissBtn) dismissBtn.onclick = hideBanner;
  
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

async function sendMessage() {
  const input = document.getElementById('vn-agent-input');
  const msg = input?.value?.trim();
  if (!msg) return;
  
  addMessage('user', msg);
  input.value = '';
  
  setStatus('amber', 'thinking...');
  
  const { reply, model, escalated, error } = await askLiteAgent(msg, getSnippets());
  
  if (error) {
    addMessage('agent', `⚠ ${error}`);
    setStatus('red', 'error');
    return;
  }
  
  addMessage('agent', reply);
  setStatus('green', escalated ? 'done (escalated)' : 'done');
}

async function generateSuggest() {
  const prompt = `Based on this page, suggest a concise prompt I can send to my AI assistant. Reply with only the suggested prompt, nothing else.`;
  
  setStatus('amber', 'generating...');
  
  const { reply, error } = await askLiteAgent(prompt, getSnippets());
  
  if (error || !reply) {
    setStatus('red', 'suggestion failed');
    return;
  }
  
  suggestedPrompt = reply;
  showBanner(reply);
  setStatus('green', 'ready to inject');
}

function addMessage(type, text) {
  convo.push({ type, text });
  
  const convoEl = document.getElementById('vn-convo');
  if (!convoEl) return;
  
  const msgEl = document.createElement('div');
  msgEl.className = `vn-msg vn-msg-${type}`;
  msgEl.textContent = text;
  
  convoEl.appendChild(msgEl);
  convoEl.scrollTop = convoEl.scrollHeight;
}

function showBanner(text) {
  const banner = document.getElementById('vn-inject-banner');
  const textEl = document.getElementById('vn-inject-text');
  
  if (banner && textEl) {
    textEl.textContent = text.slice(0, 150);
    banner.classList.add('vn-show');
  }
}

function hideBanner() {
  const banner = document.getElementById('vn-inject-banner');
  if (banner) banner.classList.remove('vn-show');
  suggestedPrompt = null;
}

function doInject() {
  const text = suggestedPrompt || document.getElementById('vn-inject-text')?.textContent;
  if (!text) return;
  
  const result = injectIntoPage(text);
  hideBanner();
  suggestedPrompt = null;
  
  if (result === false) {
    setStatus('red', 'no input found');
  } else {
    setStatus('green', result === 'clipboard' ? 'copied' : 'injected ↗');
  }
}

function injectIntoPage(text) {
  if (!text || typeof text !== 'string') return false;
  
  const selectors = [
    'textarea:not([disabled]):not([readonly])',
    'div[contenteditable="true"]',
    'input[type="text"]:not([disabled])',
    '[role="textbox"]',
  ];
  
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    
    try {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.focus();
        el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      
      if (el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        return true;
      }
    } catch {
      continue;
    }
  }
  
  try {
    navigator.clipboard.writeText(text);
    return 'clipboard';
  } catch {
    return false;
  }
}
