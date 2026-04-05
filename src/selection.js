// selection.js — text selection capture (selectionchange + touchend)

const MAX_LEN = 2000;
let   debounce = null;

export function initSelection(onSelect) {
  // selectionchange fires on Android Chrome reliably (mouseup does not)
  document.addEventListener('selectionchange', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const text = getSelected();
      if (text) onSelect(text);
    }, 300);
  });

  // touchend fallback
  document.addEventListener('touchend', () => {
    setTimeout(() => {
      const text = getSelected();
      if (text) onSelect(text);
    }, 50);
  });
}

export function getSelected() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return '';
  const text = sel.toString().trim();
  return text.length > 0 ? text.slice(0, MAX_LEN) : '';
}

export function clearSelection() {
  window.getSelection()?.removeAllRanges();
}
