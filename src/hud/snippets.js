// snippets.js — SNIPPETS tab

import { getSnippets, addSnippet, removeSnippet } from '../storage.js';
import { getSelected } from '../selection.js';
import { syncToBackend } from '../sync.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

let selectionOverlay = null;

export function buildSnippetsTab() {
  const container = document.getElementById('vn-tab-snippets');
  if (!container) return;

  container.innerHTML = `
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
      </div>
    </div>

    <div style="padding:8px 12px;border-top:1px solid var(--vn-border);background:var(--vn-bg2);flex-shrink:0;">
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">⇅ SYNC TO BACKEND</button>
    </div>
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

  selectionOverlay.querySelector('#vn-sel-repo').onclick    = () => stageSelection('code');
  selectionOverlay.querySelector('#vn-sel-research').onclick = () => stageSelection('research');

  document.addEventListener('click', (e) => {
    if (!selectionOverlay.contains(e.target)) hideOverlay();
  });
}

export function showSelectionOverlay(text) {
  if (!selectionOverlay || !text) return;

  setTimeout(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const rect = sel.getRangeAt(0).getBoundingClientRect();
    selectionOverlay.style.top  = `${rect.bottom + 8}px`;
    selectionOverlay.style.left = `${Math.max(0, rect.left)}px`;
    selectionOverlay.classList.add('vn-show');
  }, 300);
}

function hideOverlay() {
  selectionOverlay?.classList.remove('vn-show');
}

function stageSelection(type) {
  const text    = getSelected();
  if (!text) return;

  const snippets = getSnippets();
  const limit    = parseInt(localStorage.getItem('vn_snippet_limit') || '20');

  if (snippets.length >= limit) {
    setStatus('red', `Max ${limit} snippets`);
    showWarn(`Snippet limit (${limit}) reached — sync or clear first`);
    hideOverlay();
    return;
  }

  addSnippet({ text, type, url: location.href, title: document.title });
  renderSnippets();
  hideOverlay();
  setStatus('green', `#${snippets.length + 1} staged`);
}

function bindSnippetEvents() {
  document.getElementById('vn-sync-btn')?.addEventListener('click', async () => {
    await syncToBackend((type, msg) => {
      setStatus(type === 'success' ? 'green' : type === 'error' ? 'red' : 'amber', msg);
      if (type === 'error') showWarn(msg);
      if (type === 'success') renderSnippets();
    });
  });
}

export function renderSnippets() {
  const snippets  = getSnippets();
  const repo      = snippets.filter((s) => s.type === 'code');
  const research  = snippets.filter((s) => s.type === 'research');

  const repoList      = document.getElementById('vn-repo-list');
  const researchList  = document.getElementById('vn-research-list');
  const repoCount     = document.getElementById('vn-repo-count');
  const researchCount = document.getElementById('vn-research-count');

  if (repoCount)     repoCount.textContent     = repo.length;
  if (researchCount) researchCount.textContent = research.length;

  // Update badge in status bar
  setBadge('snippets', `${snippets.length} snippets`, snippets.length > 0 ? 'active' : '');

  const render = (list, items) => {
    if (!list) return;
    list.innerHTML = items.length === 0
      ? `<div style="font-size:10px;color:var(--vn-dim);padding:4px 0">—</div>`
      : items.map(renderSnippetItem).join('');

    list.querySelectorAll('.vn-btn-icon').forEach((btn) => {
      btn.onclick = () => {
        removeSnippet(Number(btn.dataset.num));
        renderSnippets();
      };
    });
  };

  render(repoList, repo);
  render(researchList, research);
}

function renderSnippetItem(s) {
  return `
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml(s.text.slice(0, 55))}</span>
      <span class="vn-snip-type">${s.type}</span>
      <button class="vn-btn-icon" data-num="${s.number}">🗑</button>
    </div>
  `;
}

function escapeHtml(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}
