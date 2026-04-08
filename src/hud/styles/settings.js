// styles/settings.js — settings tab layout

export const settingsCSS = `
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
`;
