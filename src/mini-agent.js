// mini-agent.js — lite agent chat + prompt injection

import { getToken } from './storage.js';
import { readPage } from './dom-reader.js';

const BACKEND = '__BACKEND_URL__';

/**
 * Ask the lite agent. Auto-escalates to full agent if backend signals it.
 * Returns { reply, model, escalated } or { error }
 */
export async function askLiteAgent(message, snippets = []) {
  const token = getToken();
  if (!token) return { error: 'Not authenticated — open dashboard and login first' };

  const pageContext = readPage();
  const body = {
    message,
    pageContext,
    snippets: snippets.map((s) => ({ type: s.type, text: s.text })),
  };

  try {
    // Step 1 — try lite agent first (fast, low tokens)
    const res  = await fetch(`${BACKEND}/api/lite-agent`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      // Rate limited or server error — don't escalate, just surface error
      return { error: data.message || 'Agent error' };
    }

    // Step 2 — check escalation signal from backend
    if (data.escalate === true) {
      return await escalateToFullAgent(message, snippets, pageContext, token);
    }

    return {
      reply:     data.reply,
      model:     data.model,
      escalated: false,
    };

  } catch {
    return { error: 'Backend unreachable — check connection' };
  }
}

/**
 * Re-send to full /api/agent when lite agent signals escalation.
 * Happens when: GitHub ops, file writes, web search, complex multi-step.
 */
async function escalateToFullAgent(message, snippets, pageContext, token) {
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
        snippets: snippets.map((s) => ({ type: s.type, text: s.text })),
        stream:   false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Full agent error' };
    }

    return {
      reply:     data.response || data.reply || '',
      model:     data.model_used || data.model || 'agent',
      escalated: true,
    };

  } catch {
    return { error: 'Full agent unreachable' };
  }
}

/**
 * Inject text into the active input on the page.
 * Returns true (injected), 'clipboard' (fallback), or false (failed).
 */
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
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }

      if (el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll',   false, null);
        document.execCommand('insertText',  false, text);
        return true;
      }
    } catch {
      continue; // try next selector
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
