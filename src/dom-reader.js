// dom-reader.js — full page DOM content extraction

const MAX_CONTENT = 5000; // chars

export function readPage() {
  return {
    url:     location.href,
    title:   document.title || '',
    content: extractText(),
  };
}

function extractText() {
  // Try to pierce shadow DOM where possible
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const tag = node.parentElement?.tagName?.toLowerCase();
        if (['script','style','noscript','svg'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const parts = [];
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent.trim();
    if (text.length > 0) parts.push(text);
  }

  return parts.join(' ').replace(/\s+/g, ' ').slice(0, MAX_CONTENT);
}
