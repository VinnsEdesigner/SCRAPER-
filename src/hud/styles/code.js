// styles/code.js — IDE code block, syntax tokens, ASCII tree block

export const codeCSS = `
.vn-code-block {
  margin-top: 8px; background: #0d0d0d;
  border: 1px solid var(--vn-border2); border-radius: 6px;
  overflow: hidden; max-width: 100%;
}
.vn-code-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 5px 10px;
  background: var(--vn-bg3);
  border-bottom: 1px solid var(--vn-border);
}
.vn-code-lang {
  font-size: 10px; color: var(--vn-red);
  font-family: var(--vn-mono); font-weight: 700; letter-spacing: 0.5px;
}
.vn-code-copy {
  background: none; border: none;
  color: var(--vn-dim); font-size: 11px;
  cursor: pointer; font-family: var(--vn-mono); padding: 2px 6px;
}
.vn-code-copy:active { color: var(--vn-text); }
.vn-code-body {
  padding: 10px 12px;
  font-size: 12px; font-family: var(--vn-mono);
  color: #e6edf3; overflow-x: auto;
  white-space: pre; line-height: 1.6; tab-size: 2;
}

/* Syntax token colors */
.sh-kw  { color: var(--sh-kw);  font-weight: 600; }
.sh-kw2 { color: var(--sh-kw2); }
.sh-str { color: var(--sh-str); }
.sh-cmt { color: var(--sh-cmt); font-style: italic; }
.sh-num { color: var(--sh-num); }
.sh-fn  { color: var(--sh-fn);  }
.sh-cls { color: var(--sh-cls); }
.sh-var { color: var(--sh-var); }

.vn-ascii-block {
  margin-top: 8px; background: #0d0d0d;
  border: 1px solid var(--vn-border);
  border-left: 2px solid var(--vn-dim); border-radius: 4px;
  padding: 10px 12px;
  font-size: 12px; font-family: var(--vn-mono);
  color: var(--vn-muted); white-space: pre;
  overflow-x: auto; line-height: 1.7;
}
`;
