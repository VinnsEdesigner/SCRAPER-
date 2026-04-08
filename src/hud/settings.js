// settings.js — SETTINGS tab

import { getPanel } from './shell.js';
import { clearSnippets } from '../storage.js';
import { renderSnippets } from './snippets.js';

export function buildSettingsTab() {
  const container = document.getElementById('vn-tab-settings');
  if (!container) return;

  const height       = parseInt(localStorage.getItem('vn_panel_height') || '55');
  const theme        = localStorage.getItem('vn_theme') || 'oled';
  const snippetLimit = parseInt(localStorage.getItem('vn_snippet_limit') || '20');

  container.innerHTML = `
    <div class="vn-settings-inner">
      <div class="vn-setting-row">
        <div>
          <div class="vn-setting-label">Panel Height</div>
          <div class="vn-setting-sub" id="vn-height-val">${height}vh</div>
        </div>
        <input type="range" class="vn-slider" id="vn-height-slider" min="25" max="85" value="${height}">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Theme</div>
        <div class="vn-theme-row">
          <button class="vn-btn ${theme === 'oled'  ? 'vn-selected' : ''}" id="vn-theme-oled">OLED</button>
          <button class="vn-btn ${theme === 'light' ? 'vn-selected' : ''}" id="vn-theme-light">Light</button>
        </div>
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Snippet Limit</div>
        <input type="number" class="vn-input" id="vn-snippet-limit"
          value="${snippetLimit}" min="1" max="100"
          style="width:60px;padding:6px 8px;">
      </div>

      <div class="vn-setting-row">
        <div class="vn-setting-label">Clear Snippets</div>
        <button class="vn-btn" id="vn-clear-snippets" style="color:var(--vn-red);border-color:var(--vn-red)">
          Clear All
        </button>
      </div>
    </div>
  `;

  bindSettingsEvents();
}

function bindSettingsEvents() {
  const slider   = document.getElementById('vn-height-slider');
  const heightVal = document.getElementById('vn-height-val');
  const themeOled  = document.getElementById('vn-theme-oled');
  const themeLight = document.getElementById('vn-theme-light');
  const limitInput = document.getElementById('vn-snippet-limit');
  const clearBtn   = document.getElementById('vn-clear-snippets');

  slider?.addEventListener('input', () => {
    const v = slider.value;
    heightVal.textContent = `${v}vh`;
    const panel = getPanel();
    if (panel) panel.style.height = `${v}vh`;
    localStorage.setItem('vn_panel_height', v);
  });

  themeOled?.addEventListener('click', () => {
    applyTheme('oled');
    themeOled.classList.add('vn-selected');
    themeLight?.classList.remove('vn-selected');
  });

  themeLight?.addEventListener('click', () => {
    applyTheme('light');
    themeLight.classList.add('vn-selected');
    themeOled?.classList.remove('vn-selected');
  });

  limitInput?.addEventListener('change', () => {
    const v = Math.max(1, Math.min(100, parseInt(limitInput.value) || 20));
    localStorage.setItem('vn_snippet_limit', v);
    limitInput.value = v;
  });

  clearBtn?.addEventListener('click', () => {
    if (confirm('Clear all snippets?')) {
      clearSnippets();
      renderSnippets();
    }
  });
}

function applyTheme(theme) {
  const panel = getPanel();
  if (!panel) return;
  panel.classList.remove('vn-theme-oled', 'vn-theme-light');
  if (theme !== 'oled') panel.classList.add(`vn-theme-${theme}`);
  localStorage.setItem('vn_theme', theme);
}
