// styles/agent.js — agent tab, history drawer, chat bubbles, inject banner, bottom input

export const agentCSS = `
.vn-agent-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 12px;
  border-bottom: 1px solid var(--vn-border);
  flex-shrink: 0;
}
.vn-agent-label { font-size: 11px; color: var(--vn-muted); letter-spacing: 0.5px; }
.vn-hamburger {
  background: none;
  border: 1px solid var(--vn-border);
  color: var(--vn-muted);
  border-radius: 4px; padding: 4px 10px;
  cursor: pointer; font-size: 13px; font-family: var(--vn-mono);
}

.vn-history-drawer {
  position: absolute; top: 0; left: 0;
  width: 78%; height: 100%;
  background: var(--vn-bg2);
  border-right: 1px solid var(--vn-border2);
  z-index: 10;
  display: none; flex-direction: column; overflow: hidden;
}
.vn-history-drawer.vn-open { display: flex; }
.vn-history-hdr {
  padding: 12px 14px;
  border-bottom: 1px solid var(--vn-border);
  font-size: 12px; font-weight: 600;
  color: var(--vn-muted); letter-spacing: 1px;
  display: flex; justify-ctent: space-between; align-items: center;
}
.vn-history-new {
  margin: 10px; padding: 9px;
  background: none;
  border: 1px solid var(--vn-border2); border-radius: 5px;
  color: var(--vn-text); font-size: 12px; font-family: var(--vn-mono);
  cursor: pointer; text-align: center;
}
.vn-history-new:active { opacity: 0.7; }
.vn-history-list { flex: 1; overflow-y: auto; }
.vn-history-item { padding: 10px 14px; border-bottom: 1px solid var(--vn-border); cursor: pointer; }
.vn-history-item:active { background: var(--vn-bg3); }
.vn-history-preview {
  font-size: 12px; color: var(--vn-text); margin-bottom: 3px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.vn-history-meta  { font-size: 10px; color: var(--vn-dim); }
.vn-history-empty { padding: 14px; font-size: 12px; color: var(--vn-dim); }

.vn-convo {
  flex: 1; overflow-y: auto; padding: 12px;
  display: flex; flex-direction: column; gap: 10px; min-height: 0;
}
.vn-msg {
  max-width: 90%; padding: 9px 12px; border-radius: 10px;
  font-size: 13px; line-height: 1.6; font-family: var(--vn-mono);
  word-break: break-word;
}
.vn-msg-user {
  align-self: flex-end;
  background: var(--vn-bg3);
  border: 1.5px solid var(--vn-red);
  color: var(--vn-text);
  border-bottom-right-radius: 3px;
}
.vn-msg-agent {
  align-self: flex-start;
  background: var(--vn-bg2);
  border: 1.5px solid var(--vn-border2);
  color: var(--vn-muted);
  border-bottom-left-radius: 3px;
}
.vn-msg-label {
  font-size: 10px; color: var(--vn-dim);
  margin-bottom: 5px; letter-spacing: 0.5px; font-weight: 600;
}
.vn-msg-user .vn-msg-label { color: var(--vn-red); text-align: right; }

.vn-inject-banner {
  margin: 0 10px 6px;
  background: rgba(124,58,237,0.08);
  border: 1px solid #7c3aed; border-radius: 6px;
  padding: 9px 11px; display: none; flex-shrink: 0;
}
.vn-inject-banner.vn-show { display: block; }
.vn-inject-text {
  font-size: 12px; color: var(--vn-text);
  margin-bottom: 8px; line-height: 1.5; font-family: var(--vn-mono);
}
.vn-inject-row { display: flex; gap: 6px; }

.vn-bottom-area {
  padding: 9px 12px;
  border-top: 1px solid var(--vn-border);
  background: var(--vn-bg2); flex-shrink: 0;
  display: flex; flex-direction: column; gap: 7px;
}
.vn-input-row { display: flex; gap: 7px; align-items: flex-end; }
.vn-input {
  flex: 1; background: var(--vn-bg);
  border: 1px solid var(--vn-border2); border-radius: 6px;
  color: var(--vn-text); padding: 9px 11px;
  font-size: 13px; font-family: var(--vn-mono);
  resize: none; outline: none; line-height: 1.5;
}
.vn-input::placeholder { color: var(--vn-dim); }
.vn-input:focus { box-shadow: 0 0 0 1px rgba(239,68,68,0.3); }

.vn-sel-overlay {
  position: fixed; background: var(--vn-bg2);
  border: 1px solid var(--vn-border2); border-radius: 6px;
  padding: 5px 7px; display: none; gap: 6px;
  z-index: 2147483647; box-shadow: 0 4px 16px rgba(0,0,0,0.7);
}
.vn-sel-overlay.vn-show { display: flex; }
`;
