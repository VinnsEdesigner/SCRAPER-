// mini-agent.js — lite agent with conversation history (memory)

import { getToken } from './storage.js';
import { readPage } from './dom-reader.js';

const BACKEND = __BACKEND_URL__;

/**
 * Ask the lite agent WITH conversation history for memory.
 * @param {string} message - current user message
 * @param {Array}  snippets - staged snippets
 * @param {Array}  history  - [{role:'user'|'assistant', content:string}]
 */
export async function askLiteAgent(message, snippets = [], history = []) {
  const token = getToken();
  if (!token) return { error: 'Not authenticated — open dashboard and login first' };

  const pageContext = readPage();

  // Send last 10 turns max to avoid token overload on lite agent
  const trimmedHistory = history.slice(-10);

  const body = {
    message,
    pageContext,
    history: trimmedHistory,
    snippets: snippets.map((s) => ({ type: s.type, text: s.text })),
  };

  try {
    const res  = await fetch(`${BACKEND}/api/lite-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) return { error: data.message || 'Agent error' };

    if (data.escalate === true) {
      return await escalateToFullAgent(message, snippets, pageContext, token, trimmedHistory);
    }

    return { reply: data.reply, model: data.model, escalated: false };

  } catch {
    return { error: 'Backend unreachable — check connection' };
  }
}

async function escalateToFullAgent(message, snippets, pageContext, token, history) {
  try {
    const res = await fetch(`${BACKEND}/api/agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        pageContext,
        history,
        snippets: snippets.map((s) => ({ type: s.type, text: s.text })),
        stream: false,
      }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.message || 'Full agent error' };

    return {
      reply:     data.response || data.reply || '',
      model:     data.model_used || data.model || 'agent',
      escalated: true,
    };
  } catch {
    return { error: 'Full agent unreachable' };
  }
}

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
        el.focus(); el.value = text;
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
    } catch { continue; }
  }
  try { navigator.clipboard.writeText(text); return 'clipboard'; } catch { return false; }
}
