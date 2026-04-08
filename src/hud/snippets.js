// snippets.js — SNIPPETS tab

import { getSnippets, addSnippet, removeSnippet } from '../storage.js';
import { getSelected } from '../selection.js';
import { syncToBackend } from '../sync.js';
import { setStatus } from './status.js';

let selectionOverlay = null;

export function buildSnippetsTab() {
  const container = document.getElementById('vn-tab-snippets');
  if (!container) return;
  
  container.innerHTML = `
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
  `;
  
  createSelectionOverlay();
  bindSnippetEvents();
  renderSnippets();
}

function createSelectionOverlay() {
  if (selectionOverlay) return;
  
  selectionOverlay = document.createElement('div');
  selectionOverlay.className = 'vn-sel-overlay';
  selectionOverlay.innerHTML = `
    <button class="vn-btn-sm" id="vn-sel-repo">📁 Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">🔬 Research</button>
  `;
  
  document.body.appendChild(selectionOverlay);
  
  selectionOverlay.querySelector('#vn-sel-repo').onclick = () => stageSelection('code');
  selectionOverlay.querySelector('#vn-sel-research').onclick = () => stageSelection('research');
  
  document.addEventListener('click', (e) => {
    if (!selectionOverlay.contains(e.target)) {
      hideOverlay();
    }
  });
}

export function showSelectionOverlay(text) {
  if (!selectionOverlay || !text) return;
  
  setTimeout(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    selectionOverlay.style.top = `${rect.bottom + 8}px`;
    selectionOverlay.style.left = `${rect.left}px`;
    selectionOverlay.classList.add('vn-show');
  }, 300);
}

function hideOverlay() {
  if (selectionOverlay) {
    selectionOverlay.classList.remove('vn-show');
  }
}

function stageSelection(type) {
  const text = getSelected();
  if (!text) return;
  
  const snippets = getSnippets();
  const limit = parseInt(localStorage.getItem('vn_snippet_limit') || '20');
  
  if (snippets.length >= limit) {
    setStatus('red', `Max ${limit} snippets`);
    hideOverlay();
    return;
  }
  
  addSnippet({ text, type, url: location.href, title: document.title });
  renderSnippets();
  hideOverlay();
  setStatus('green', `#${snippets.length + 1} staged`);
}

function bindSnippetEvents() {
  const syncBtn = document.getElementById('vn-sync-btn');
  if (syncBtn) {
    syncBtn.onclick = async () => {
      await syncToBackend((type, msg) => {
        setStatus(type === 'success' ? 'green' : type === 'error' ? 'red' : 'amber', msg);
        if (type === 'success') renderSnippets();
      });
    };
  }
}

export function renderSnippets() {
  const snippets = getSnippets();
  const repo = snippets.filter((s) => s.type === 'code');
  const research = snippets.filter((s) => s.type === 'research');
  
  const repoList = document.getElementById('vn-repo-list');
  const researchList = document.getElementById('vn-research-list');
  const repoCount = document.getElementById('vn-repo-count');
  const researchCount = document.getElementById('vn-research-count');
  
  if (repoCount) repoCount.textContent = repo.length;
  if (researchCount) researchCount.textContent = research.length;
  
  if (repoList) {
    repoList.innerHTML = repo.length === 0 
      ? '<div class="vn-msg vn-msg-agent">No repo snippets</div>'
      : repo.map((s) => renderSnippetItem(s)).join('');
    
    repoList.querySelectorAll('.vn-btn-icon').forEach((btn) => {
      btn.onclick = () => {
        removeSnippet(Number(btn.dataset.num));
        renderSnippets();
      };
    });
  }
  
  if (researchList) {
    researchList.innerHTML = research.length === 0
      ? '<div class="vn-msg vn-msg-agent">No research snippets</div>'
      : research.map((s) => renderSnippetItem(s)).join('');
    
    researchList.querySelectorAll('.vn-btn-icon').forEach((btn) => {
      btn.onclick = () => {
        removeSnippet(Number(btn.dataset.num));
        renderSnippets();
      };
    });
  }
}

function renderSnippetItem(s) {
  return `
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml(s.text.slice(0, 60))}</span>
      <span class="vn-snip-type">${s.type}</span>
      <button class="vn-btn-icon" data-num="${s.number}">🗑</button>
    </div>
  `;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
