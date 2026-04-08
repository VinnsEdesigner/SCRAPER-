// snippets.js — SNIPPETS tab with view modal + undo delete

import { getSnippets, addSnippet, removeSnippet, saveSnippets } from '../storage.js';
import { getSelected } from '../selection.js';
import { syncToBackend } from '../sync.js';
import { setStatus } from './status.js';
import { showWarn, setBadge } from './shell.js';

let selectionOverlay = null;
let undoStack = [];   // { snippet, timer }
let viewModal = null;

export function buildSnippetsTab() {
  const container = document.getElementById('vn-tab-snippets');
  if (!container) return;

  container.innerHTML = `
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
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">⇅ SYNC TO BACKEND</button>
    </div>

    <!-- View modal -->
    <div class="vn-modal-overlay" id="vn-view-modal">
      <div class="vn-modal">
        <div class="vn-modal-hdr">
          <span id="vn-modal-title">SNIPPET</span>
          <button class="vn-btn-icon" id="vn-modal-close">✕</button>
        </div>
        <div class="vn-modal-body" id="vn-modal-body"></div>
      </div>
    </div>
  `;

  createSelectionOverlay();
  createViewModal();
  bindSnippetEvents();
  renderSnippets();
}

function createViewModal() {
  document.getElementById('vn-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('vn-view-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'vn-view-modal') closeModal();
  });
}

function openModal(snippet) {
  const modal = document.getElementById('vn-view-modal');
  const title = document.getElementById('vn-modal-title');
  const body  = document.getElementById('vn-modal-body');
  if (!modal || !body) return;
  title.textContent = `#${snippet.number} · ${snippet.type} · ${snippet.title || 'snippet'}`;
  body.textContent  = snippet.text;
  modal.classList.add('vn-show');
}

function closeModal() {
  document.getElementById('vn-view-modal')?.classList.remove('vn-show');
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

function hideOverlay() { selectionOverlay?.classList.remove('vn-show'); }

function stageSelection(type) {
  const text     = getSelected();
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

  document.getElementById('vn-undo-btn')?.addEventListener('click', undoDelete);
}

/** Delete with undo */
function deleteSnippet(number) {
  const snippets = getSnippets();
  const target   = snippets.find((s) => s.number === number);
  if (!target) return;

  removeSnippet(number);
  renderSnippets();

  // Push to undo stack
  const entry = { snippet: target, timer: null };
  undoStack.push(entry);

  // Show undo bar
  showUndoBar(`Snippet #${number} removed`);

  // Auto-clear after 5s
  entry.timer = setTimeout(() => {
    undoStack = undoStack.filter((e) => e.snippet.number !== number);
    if (undoStack.length === 0) hideUndoBar();
  }, 5000);
}

function undoDelete() {
  const entry = undoStack.pop();
  if (!entry) return;
  clearTimeout(entry.timer);

  // Restore snippet back into storage
  const snippets = getSnippets();
  snippets.push(entry.snippet);
  snippets.sort((a, b) => a.number - b.number);
  saveSnippets(snippets);

  renderSnippets();
  if (undoStack.length === 0) hideUndoBar();
  else showUndoBar(`Snippet #${undoStack[undoStack.length-1].snippet.number} removed`);
}

function showUndoBar(msg) {
  const bar  = document.getElementById('vn-undo-bar');
  const text = document.getElementById('vn-undo-text');
  if (bar && text) { text.textContent = msg; bar.classList.add('vn-show'); }
}
function hideUndoBar() {
  document.getElementById('vn-undo-bar')?.classList.remove('vn-show');
}

export function renderSnippets() {
  const snippets     = getSnippets();
  const repo         = snippets.filter((s) => s.type === 'code');
  const research     = snippets.filter((s) => s.type === 'research');
  const repoList     = document.getElementById('vn-repo-list');
  const researchList = document.getElementById('vn-research-list');

  document.getElementById('vn-repo-count')     && (document.getElementById('vn-repo-count').textContent = repo.length);
  document.getElementById('vn-research-count') && (document.getElementById('vn-research-count').textContent = research.length);

  setBadge('snippets', `${snippets.length} snippets`, snippets.length > 0 ? 'active' : '');

  const render = (list, items) => {
    if (!list) return;
    list.innerHTML = items.length === 0
      ? `<div class="vn-snip-empty">—</div>`
      : items.map(renderSnippetItem).join('');

    list.querySelectorAll('.vn-snip-view').forEach((btn) => {
      btn.onclick = () => {
        const s = snippets.find((x) => x.number === Number(btn.dataset.num));
        if (s) openModal(s);
      };
    });

    list.querySelectorAll('.vn-snip-del').forEach((btn) => {
      btn.onclick = () => deleteSnippet(Number(btn.dataset.num));
    });
  };

  render(repoList, repo);
  render(researchList, research);
}

function renderSnippetItem(s) {
  return `
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml(s.text.slice(0, 45))}</span>
      <span class="vn-snip-type">${s.type}</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${s.number}" title="view">👁</button>
      <button class="vn-snip-del vn-btn-icon"  data-num="${s.number}" title="delete">🗑</button>
    </div>
  `;
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
