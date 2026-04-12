/**
 * @file snippets.js
 * @location /scraper/src/hud/snippets.js
 *
 * @purpose
 * Renders the SNIPPETS tab in the VENOM HUD.
 * Handles four snippet types: code, research, image, file.
 * Image snippets show thumbnail preview + [🔍 Analyze] button.
 * File snippets show file icon + size badge.
 * All types support view modal, delete with 5s undo, sync to backend.
 *
 * @exports
 *   buildSnippetsTab()       → void  (called by hud/index.js)
 *   showSelectionOverlay(text) → void (called by selection.js)
 *   renderSnippets()         → void  (called after any snippet mutation)
 *
 * @imports
 *   ../storage    → getToken, getSnippets, addSnippet,
 *                   removeSnippet, saveSnippets
 *   ../selection  → getSelected
 *   ../sync       → syncToBackend
 *   ./status      → setStatus
 *   ./shell       → showWarn, setBadge
 */

import { getToken, getSnippets, addSnippet,
         removeSnippet, saveSnippets }  from '../storage.js';
import { getSelected }                  from '../selection.js';
import { syncToBackend }                from '../sync.js';
import { setStatus }                    from './status.js';
import { showWarn, setBadge }           from './shell.js';

const BACKEND = __BACKEND_URL__;   // replaced at build time

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

let selectionOverlay = null;
let undoStack        = [];    // [{ snippet, timer }]
let viewModal        = null;

// In-memory analysis cache — snippetNumber → analysis string
// Cleared implicitly when page reloads / HUD reinits
const analysisCache  = new Map();

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Escape HTML special characters.
 *
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Format byte count to human-readable string.
 *
 * @param {number} bytes
 * @returns {string}
 */
function formatBytes(bytes) {
  if (!bytes || typeof bytes !== 'number') return '';
  if (bytes < 1024)                        return `${bytes}B`;
  if (bytes < 1024 * 1024)                return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

/**
 * Get file icon emoji from extension.
 *
 * @param {string} ext
 * @returns {string}
 */
function fileIcon(ext) {
  const icons = {
    js: '🟨', ts: '🔷', jsx: '🟦', tsx: '🔷',
    py: '🐍', json: '📋', md: '📝', txt: '📄',
    css: '🎨', html: '🌐', sql: '🗄️',
    yaml: '⚙️', yml: '⚙️', sh: '⚡',
    rs: '🦀', go: '🐹', rb: '💎', java: '☕',
  };
  return icons[(ext || '').toLowerCase()] || '📁';
}

/**
 * Check if a string is base64 image data.
 * Image thumbnails must never render base64 from backend
 * (LAW 22 — base64 stays in localStorage only).
 *
 * @param {string} str
 * @returns {boolean}
 */
function isBase64(str) {
  return typeof str === 'string' && str.trimStart().startsWith('data:');
}

/**
 * Get safe image URL for thumbnail display.
 * Returns null if URL is base64 (should not happen but safety check).
 *
 * @param {Object} snippet
 * @returns {string|null}
 */
function getThumbnailUrl(snippet) {
  const url = snippet.text || snippet.url || '';
  if (!url || isBase64(url)) return null;
  return url;
}

// ─────────────────────────────────────────────────────────────────────────────
// BUILD TAB
// ─────────────────────────────────────────────────────────────────────────────

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
      <button class="vn-btn vn-btn-full" id="vn-sync-btn">⇅ SYNC TO BACKEND</button>
    </div>

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
  bindSnippetEvents();
  renderSnippets();
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT BINDING
// ─────────────────────────────────────────────────────────────────────────────

function bindSnippetEvents() {
  document.getElementById('vn-sync-btn')?.addEventListener('click', async () => {
    await syncToBackend((type, msg) => {
      setStatus(
        type === 'success' ? 'green' : type === 'error' ? 'red' : 'amber',
        msg
      );
      if (type === 'error')   showWarn(msg);
      if (type === 'success') renderSnippets();
    });
  });

  document.getElementById('vn-undo-btn')?.addEventListener('click', undoDelete);
  document.getElementById('vn-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('vn-view-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'vn-view-modal') closeModal();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECTION OVERLAY (code + research only)
// ─────────────────────────────────────────────────────────────────────────────

function createSelectionOverlay() {
  if (selectionOverlay) return;

  selectionOverlay = document.createElement('div');
  selectionOverlay.className = 'vn-sel-overlay';
  selectionOverlay.innerHTML = `
    <button class="vn-btn-sm" id="vn-sel-repo">📁 Repo</button>
    <button class="vn-btn-sm" id="vn-sel-research">🔬 Research</button>
  `;
  document.body.appendChild(selectionOverlay);

  selectionOverlay.querySelector('#vn-sel-repo')
    .addEventListener('click', () => stageSelection('code'));
  selectionOverlay.querySelector('#vn-sel-research')
    .addEventListener('click', () => stageSelection('research'));

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
  const text     = getSelected();
  if (!text) return;

  const snippets = getSnippets();
  const limit    = parseInt(localStorage.getItem('vn_snippet_limit') || '20', 10);

  if (snippets.length >= limit) {
    setStatus('red', `Max ${limit} snippets`);
    showWarn(`Snippet limit (${limit}) reached — sync or clear first`);
    hideOverlay();
    return;
  }

  addSnippet({
    text,
    type,
    url:   location.href,
    title: document.title,
  });

  renderSnippets();
  hideOverlay();
  setStatus('green', `#${snippets.length + 1} staged`);
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Open the view modal for a snippet.
 * Renders differently based on type.
 *
 * @param {Object} snippet
 */
function openModal(snippet) {
  const modal = document.getElementById('vn-view-modal');
  const title = document.getElementById('vn-modal-title');
  const body  = document.getElementById('vn-modal-body');
  if (!modal || !body || !title) return;

  title.textContent = `#${snippet.number} · ${snippet.type}` +
    (snippet.title ? ` · ${snippet.title.slice(0, 30)}` : '');

  // Build modal body based on type
  if (snippet.type === 'image') {
    const thumbUrl  = getThumbnailUrl(snippet);
    const cached    = analysisCache.get(snippet.number);
    const sizeStr   = formatBytes(snippet.file_size);
    const mimeStr   = snippet.mime_type || '';

    body.innerHTML = `
      <div class="vn-modal-image-wrap">
        ${thumbUrl
          ? `<img class="vn-modal-thumbnail"
                  src="${escapeHtml(thumbUrl)}"
                  alt="snippet #${snippet.number}"
                  loading="lazy" />`
          : `<div class="vn-modal-no-thumb">🖼️ No preview</div>`
        }
        <div class="vn-modal-image-meta">
          ${mimeStr ? `<span class="vn-snippet-type">${escapeHtml(mimeStr)}</span>` : ''}
          ${sizeStr ? `<span class="vn-snippet-type">${escapeHtml(sizeStr)}</span>` : ''}
        </div>
      </div>
      ${cached
        ? `<div class="vn-modal-analysis">
             <div class="vn-modal-analysis-hdr">🔍 Analysis</div>
             <div class="vn-modal-analysis-body">${escapeHtml(cached)}</div>
           </div>`
        : `<button class="vn-btn vn-btn-full vn-analyze-modal-btn"
                   id="vn-analyze-modal-${snippet.number}">
             🔍 Analyze Image
           </button>
           <div class="vn-analyze-result" id="vn-analyze-result-${snippet.number}"></div>`
      }
    `;

    // Bind analyze button if not yet analyzed
    if (!cached) {
      const btn = body.querySelector(`#vn-analyze-modal-${snippet.number}`);
      btn?.addEventListener('click', () => analyzeSnippet(snippet, body));
    }

  } else if (snippet.type === 'file') {
    const ext     = snippet.metadata?.extension || '';
    const sizeStr = formatBytes(snippet.file_size);
    const icon    = fileIcon(ext);

    body.innerHTML = `
      <div class="vn-modal-file-meta">
        <span class="vn-file-icon">${icon}</span>
        ${ext    ? `<span class="vn-snippet-type">.${escapeHtml(ext)}</span>` : ''}
        ${sizeStr ? `<span class="vn-snippet-type">${escapeHtml(sizeStr)}</span>` : ''}
      </div>
      <div class="vn-modal-file-url">${escapeHtml(snippet.url || '')}</div>
      <pre class="vn-modal-file-content">${escapeHtml(
        (snippet.text || '').slice(0, 3000)
      )}</pre>
    `;

  } else {
    // code + research
    body.innerHTML = `
      <pre class="vn-modal-text">${escapeHtml(
        (snippet.text || '').slice(0, 3000)
      )}</pre>
    `;
  }

  modal.classList.add('vn-show');
}

function closeModal() {
  document.getElementById('vn-view-modal')?.classList.remove('vn-show');
}

// ─────────────────────────────────────────────────────────────────────────────
// VISION — ANALYZE IMAGE SNIPPET
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Call POST /api/vision to analyze an image snippet.
 * Shows loading state on button, renders result inline.
 * Caches result in analysisCache for modal re-renders.
 *
 * @param {Object}      snippet  - the image snippet
 * @param {HTMLElement} container - modal body element
 */
async function analyzeSnippet(snippet, container) {
  const token = getToken();
  if (!token) {
    showWarn('Login to dashboard first');
    return;
  }

  const btnId    = `vn-analyze-modal-${snippet.number}`;
  const resultId = `vn-analyze-result-${snippet.number}`;
  const btn      = container.querySelector(`#${btnId}`);
  const resultEl = container.querySelector(`#${resultId}`);

  if (btn) {
    btn.textContent = '⏳ Analyzing...';
    btn.disabled    = true;
  }

  if (resultEl) {
    resultEl.textContent = '';
  }

  setStatus('amber', 'analyzing image...');

  try {
    const thumbUrl = getThumbnailUrl(snippet);

    const body = thumbUrl
      ? {
          imageUrl:  thumbUrl,
          mimeType:  snippet.mime_type || 'image/jpeg',
          question:  'Describe this image in detail.',
        }
      : null;

    if (!body) {
      throw new Error('No valid image URL for analysis');
    }

    const res = await fetch(`${BACKEND}/api/vision`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body:   JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Vision API error (${res.status})`);
    }

    const analysis = data.analysis || 'No analysis returned';

    // Cache for future modal opens
    analysisCache.set(snippet.number, analysis);

    // Update result element
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="vn-modal-analysis-hdr">🔍 Analysis · <span class="vn-model-tag">${escapeHtml(data.model || '')}</span></div>
        <div class="vn-modal-analysis-body">${escapeHtml(analysis)}</div>
      `;
    }

    // Hide analyze button
    if (btn) btn.style.display = 'none';

    setStatus('green', 'analysis complete');

  } catch (err) {
    const msg = err.name === 'TimeoutError' || err.name === 'AbortError'
      ? 'Analysis timed out — try again'
      : err.message || 'Analysis failed';

    if (resultEl) {
      resultEl.textContent = `⚠ ${msg}`;
    }

    if (btn) {
      btn.textContent = '🔍 Retry Analysis';
      btn.disabled    = false;
    }

    setStatus('red', 'analysis failed');
    showWarn(msg);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE + UNDO
// ─────────────────────────────────────────────────────────────────────────────

function deleteSnippet(number) {
  const snippets = getSnippets();
  const target   = snippets.find((s) => s.number === number);
  if (!target) return;

  removeSnippet(number);
  renderSnippets();

  // Clear analysis cache for deleted snippet
  analysisCache.delete(number);

  const entry = { snippet: target, timer: null };
  undoStack.push(entry);

  showUndoBar(`Snippet #${number} removed`);

  entry.timer = setTimeout(() => {
    undoStack = undoStack.filter((e) => e.snippet.number !== number);
    if (undoStack.length === 0) hideUndoBar();
  }, 5000);
}

function undoDelete() {
  const entry = undoStack.pop();
  if (!entry) return;

  clearTimeout(entry.timer);

  const snippets = getSnippets();
  snippets.push(entry.snippet);
  snippets.sort((a, b) => a.number - b.number);
  saveSnippets(snippets);

  renderSnippets();

  if (undoStack.length === 0) {
    hideUndoBar();
  } else {
    showUndoBar(`Snippet #${undoStack[undoStack.length - 1].snippet.number} removed`);
  }
}

function showUndoBar(msg) {
  const bar  = document.getElementById('vn-undo-bar');
  const text = document.getElementById('vn-undo-text');
  if (bar && text) {
    text.textContent = msg;
    bar.classList.add('vn-show');
  }
}

function hideUndoBar() {
  document.getElementById('vn-undo-bar')?.classList.remove('vn-show');
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render all snippet sections.
 * Called after any mutation: add, delete, undo, sync.
 */
export function renderSnippets() {
  const snippets  = getSnippets();
  const repo      = snippets.filter((s) => s.type === 'code');
  const research  = snippets.filter((s) => s.type === 'research');
  const images    = snippets.filter((s) => s.type === 'image');
  const files     = snippets.filter((s) => s.type === 'file');

  // Update section counters
  const setCount = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = count;
  };

  setCount('vn-repo-count',     repo.length);
  setCount('vn-research-count', research.length);
  setCount('vn-image-count',    images.length);
  setCount('vn-file-count',     files.length);

  // Update HUD badge (total)
  setBadge('snippets', `${snippets.length} snippets`,
    snippets.length > 0 ? 'active' : '');

  // Render each section
  renderSection('vn-repo-list',     repo,     renderCodeItem);
  renderSection('vn-research-list', research, renderResearchItem);
  renderSection('vn-image-list',    images,   renderImageItem);
  renderSection('vn-file-list',     files,    renderFileItem);

  // Bind action buttons after render
  bindSnippetActions(snippets);
}

/**
 * Render a list of snippets into a section container.
 *
 * @param {string}   listId
 * @param {Object[]} items
 * @param {Function} renderFn
 */
function renderSection(listId, items, renderFn) {
  const list = document.getElementById(listId);
  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = `<div class="vn-snip-empty">—</div>`;
    return;
  }

  list.innerHTML = items.map(renderFn).join('');
}

/**
 * Bind click handlers for view + delete buttons after render.
 * Uses event delegation — binds once per renderSnippets call.
 *
 * @param {Object[]} snippets
 */
function bindSnippetActions(snippets) {
  // View buttons
  document.querySelectorAll('.vn-snip-view').forEach((btn) => {
    btn.addEventListener('click', () => {
      const s = snippets.find((x) => x.number === Number(btn.dataset.num));
      if (s) openModal(s);
    });
  });

  // Delete buttons
  document.querySelectorAll('.vn-snip-del').forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteSnippet(Number(btn.dataset.num));
    });
  });

  // Inline analyze buttons (on image cards — not modal)
  document.querySelectorAll('.vn-snip-analyze').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const s = snippets.find((x) => x.number === Number(btn.dataset.num));
      if (!s) return;

      // Open modal and trigger analysis in modal context
      openModal(s);
      const body = document.getElementById('vn-modal-body');
      if (body && !analysisCache.has(s.number)) {
        await analyzeSnippet(s, body);
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ITEM RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render a code snippet item.
 *
 * @param {Object} s
 * @returns {string} HTML string
 */
function renderCodeItem(s) {
  return `
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml((s.text || '').slice(0, 45))}</span>
      <span class="vn-snip-type">code</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${s.number}" title="view">👁</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${s.number}" title="delete">🗑</button>
    </div>
  `;
}

/**
 * Render a research snippet item.
 *
 * @param {Object} s
 * @returns {string} HTML string
 */
function renderResearchItem(s) {
  return `
    <div class="vn-snip-item">
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml((s.text || '').slice(0, 45))}</span>
      <span class="vn-snip-type">research</span>
      <button class="vn-snip-view vn-btn-icon" data-num="${s.number}" title="view">👁</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${s.number}" title="delete">🗑</button>
    </div>
  `;
}

/**
 * Render an image snippet item.
 * Shows thumbnail (if URL available) + [🔍] analyze button.
 *
 * @param {Object} s
 * @returns {string} HTML string
 */
function renderImageItem(s) {
  const thumbUrl  = getThumbnailUrl(s);
  const sizeStr   = formatBytes(s.file_size);
  const analyzed  = analysisCache.has(s.number) ? ' vn-analyzed' : '';

  return `
    <div class="vn-snip-item vn-snip-item-image${analyzed}">
      ${thumbUrl
        ? `<img class="vn-snip-thumb"
                src="${escapeHtml(thumbUrl)}"
                alt="img #${s.number}"
                loading="lazy" />`
        : `<span class="vn-snip-no-thumb">🖼️</span>`
      }
      <div class="vn-snip-image-info">
        <span class="vn-snip-num">#${s.number}</span>
        ${sizeStr ? `<span class="vn-snip-type">${escapeHtml(sizeStr)}</span>` : ''}
        ${analysisCache.has(s.number)
          ? `<span class="vn-snip-type vn-analyzed-badge">✓ analyzed</span>`
          : ''
        }
      </div>
      <div class="vn-snip-actions">
        <button class="vn-snip-analyze vn-btn-icon" data-num="${s.number}"
                title="analyze">🔍</button>
        <button class="vn-snip-view    vn-btn-icon" data-num="${s.number}"
                title="view">👁</button>
        <button class="vn-snip-del     vn-btn-icon" data-num="${s.number}"
                title="delete">🗑</button>
      </div>
    </div>
  `;
}

/**
 * Render a file snippet item.
 * Shows file icon + extension + size badge.
 *
 * @param {Object} s
 * @returns {string} HTML string
 */
function renderFileItem(s) {
  const ext     = s.metadata?.extension || '';
  const sizeStr = formatBytes(s.file_size);
  const icon    = fileIcon(ext);
  const preview = (s.text || s.url || '').slice(0, 40);

  return `
    <div class="vn-snip-item">
      <span class="vn-file-icon-sm">${icon}</span>
      <span class="vn-snip-num">#${s.number}</span>
      <span class="vn-snip-preview">${escapeHtml(preview)}</span>
      <div class="vn-snip-badges">
        ${ext    ? `<span class="vn-snip-type">.${escapeHtml(ext)}</span>`     : ''}
        ${sizeStr ? `<span class="vn-snip-type">${escapeHtml(sizeStr)}</span>` : ''}
      </div>
      <button class="vn-snip-view vn-btn-icon" data-num="${s.number}" title="view">👁</button>
      <button class="vn-snip-del  vn-btn-icon" data-num="${s.number}" title="delete">🗑</button>
    </div>
  `;
}
