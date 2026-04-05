// mini-agent.js — lite agent chat + prompt injection

import { getToken } from './storage.js';
import { readPage } from './dom-reader.js';

const BACKEND = '__BACKEND_URL__';

export async function askLiteAgent(message, snippets = [], onChunk) {
  const token = getToken();
  if (!token) return { error: 'Not authenticated' };

  try {
    const res = await fetch(`${BACKEND}/api/lite-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        pageContext: readPage(),
        snippets:   snippets.map((s) => ({ type: s.type, text: s.text })),
      }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.message || 'Agent error' };

    return { reply: data.reply, model: data.model };
  } catch (err) {
    return { error: 'Backend unreachable' };
  }
}

export function injectIntoPage(text) {
  // Try standard input first
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

  // Shadow DOM fallback — copy to clipboard
  try {
    navigator.clipboard.writeText(text);
    return 'clipboard';
  } catch {
    return false;
  }
}
