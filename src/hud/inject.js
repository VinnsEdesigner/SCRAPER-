// inject.js — prompt injection wrapper (not used directly, merged into ask.js)

export function injectIntoPage(text) {
  if (!text || typeof text !== 'string') return false;
  
  const selectors = [
    'textarea:not([disabled]):not([readonly])',
    'div[contenteditable="true"]',
    'input[type="text"]:not([disabled])',
    '[role="textbox"]',
  ];
  
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    
    try {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.focus();
        el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      
      if (el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        return true;
      }
    } catch {
      continue;
    }
  }
  
  try {
    navigator.clipboard.writeText(text);
    return 'clipboard';
  } catch {
    return false;
  }
}
