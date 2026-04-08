// styles/snippets.js — snippets tab, undo bar, view modal

export const snippetsCSS = `
.vn-snippets-inner {
  flex: 1; overflow-y: auto; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 10px;
}
.vn-snip-footer {
  padding: 8px 12px;
  border-top: 1px solid var(--vn-border);
  background: var(--vn-bg2); flex-shrink: 0;
}
.vn-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.vn-section {
  background: var(--vn-bg2); border: 1px solid var(--vn-border);
  border-radius: 6px; padding: 9px;
}
.vn-sec-hdr {
  font-size: 10px; color: var(--vn-dim); letter-spacing: 0.8px;
  margin-bottom: 7px; text-transform: uppercase; font-weight: 600;
  display: flex; justify-content: space-between; align-items: center;
}
.vn-badge {
  color: var(--vn-muted); background: var(--vn-bg3);
  border: 1px solid var(--vn-border); border-radius: 3px;
  padding: 1px 5px; font-size: 9px;
}
.vn-snip-list { display: flex; flex-direction: column; gap: 2px; }
.vn-snip-empty { font-size: 11px; color: var(--vn-dim); padding: 4px 0; }
.vn-snip-item {
  display: flex; align-items: center; gap: 5px;
  padding: 5px 0; border-bottom: 1px solid var(--vn-border); font-size: 12px;
}
.vn-snip-item:last-child { border: none; }
.vn-snip-num   { color: var(--vn-dim); font-size: 10px; min-width: 18px; }
.vn-snip-preview {
  flex: 1; color: var(--vn-muted); font-size: 11px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.vn-snip-type {
  font-size: 9px; color: var(--vn-dim); padding: 1px 4px;
  background: var(--vn-bg3); border: 1px solid var(--vn-border); border-radius: 3px;
}

.vn-undo-bar {
  display: none; align-items: center; justify-content: space-between;
  padding: 8px 10px; background: var(--vn-bg3);
  border: 1px solid var(--vn-border2); border-radius: 5px;
  font-size: 12px; color: var(--vn-muted);
}
.vn-undo-bar.vn-show { display: flex; }

.vn-modal-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 20; display: none;
  align-items: center; justify-content: center; padding: 16px;
}
.vn-modal-overlay.vn-show { display: flex; }
.vn-modal {
  background: var(--vn-bg2); border: 1px solid var(--vn-border2);
  border-radius: 8px; width: 100%; max-height: 80%;
  display: flex; flex-direction: column; overflow: hidden;
}
.vn-modal-hdr {
  padding: 10px 14px; border-bottom: 1px solid var(--vn-border);
  font-size: 11px; color: var(--vn-muted);
  display: flex; justify-content: space-between; align-items: center;
  flex-shrink: 0;
}
.vn-modal-body {
  flex: 1; overflow-y: auto; padding: 14px;
  font-size: 13px; font-family: var(--vn-mono);
  color: var(--vn-text); white-space: pre-wrap;
  word-break: break-word; line-height: 1.6;
}
`;
