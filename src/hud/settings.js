// settings.js — SETTINGS tab

import { getPanel } from './shell.js';
import { clearSnippets } from '../storage.js';
import { renderSnippets } from './snippets.js';

export function buildSettingsTab() {
  const container = document.getElementById('vn-tab-settings');
  if (!container) return;
  
  const height = parseInt(localStorage.getItem('vn_panel_height') || '50');
  const theme = localStorage.getItem('vn_theme') || 'oled';
  const snippetLimit = parseInt(localStorage.getItem('vn_snippet_limit') || '20');
  
  container.innerHTML = `
    <div class="vn-setting-row">
      <span class="vn-setting-label">Panel Height</span>
      <input type="range" class="vn-slider" id="vn-height-slider" min="30" max="80" value="${height}">
      <span id="vn-height-val">${height}vh</span>
    </div>
    
    <div class="vn-setting-row">
      <span class="vn-setting-label">Theme</span>
      <div class="vn-theme-row">
        <button class="vn-btn ${theme === 'oled' ? 'vn-selected' : ''}" id="vn-theme-oled">OLED</button>
        <button class="vn-btn ${theme === 'oceanic' ? 'vn-selected' : ''}" id="vn-theme-oceanic">Oceanic</button>
      </div>
    </div>
    
    <div class="vn-setting-row">
      <span class="vn-setting-label">Snippet Limit</span>
      <input type="number" class="vn-input" id="vn-snippet-limit" value="${snippetLimit}" min="1" max="50" style="width:60px">
    </div>
    
    <div class="vn-setting-row">
      <button class="vn-btn" id="vn-clear-snippets">Clear All Snippets</button>
    </div>
  `;
  
  bindSettingsEvents();
}

function bindSettingsEvents() {
  const heightSlider = document.getElementById('vn-height-slider');
  const heightVal = document.getElementById('vn-height-val');
  const themeOled = document.getElementById('vn-theme-oled');
  const themeOceanic = document.getElementById('vn-theme-oceanic');
  const snippetLimit = document.getElementById('vn-snippet-limit');
  const clearBtn = document.getElementById('vn-clear-snippets');
  
  if (heightSlider && heightVal) {
    heightSlider.oninput = () => {
      const val = heightSlider.value;
      heightVal.textContent = `${val}vh`;
      setPanelHeight(val);
      localStorage.setItem('vn_panel_height', val);
    };
  }
  
  if (themeOled) {
    themeOled.onclick = () => {
      setTheme('oled');
      themeOled.classList.add('vn-selected');
      themeOceanic?.classList.remove('vn-selected');
    };
  }
  
  if (themeOceanic) {
    themeOceanic.onclick = () => {
      setTheme('oceanic');
      themeOceanic.classList.add('vn-selected');
      themeOled?.classList.remove('vn-selected');
    };
  }
  
  if (snippetLimit) {
    snippetLimit.onchange = () => {
      const val = Math.max(1, Math.min(50, parseInt(snippetLimit.value) || 20));
      localStorage.setItem('vn_snippet_limit', val);
      snippetLimit.value = val;
    };
  }
  
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm('Clear all snippets?')) {
        clearSnippets();
        renderSnippets();
      }
    };
  }
}

function setPanelHeight(vh) {
  const panel = getPanel();
  if (panel) {
    panel.style.height = `${vh}vh`;
  }
}

function setTheme(theme) {
  const panel = getPanel();
  if (!panel) return;
  
  panel.classList.remove('vn-theme-oled', 'vn-theme-oceanic');
  panel.classList.add(`vn-theme-${theme}`);
  localStorage.setItem('vn_theme', theme);
}
