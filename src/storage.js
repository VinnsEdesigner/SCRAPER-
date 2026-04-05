'use strict';
// storage.js — localStorage buffer before sync

const STORAGE_KEY = 'nexus_scraper_snippets';
const SESSION_KEY = 'nexus_scraper_session';
const TOKEN_KEY   = 'nexus_auth_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function resetSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(STORAGE_KEY);
}

export function getSnippets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export function addSnippet(snippet) {
  const snippets = getSnippets();
  const number   = snippets.length + 1;
  const entry    = { ...snippet, number, created_at: Date.now() };
  snippets.push(entry);
  saveSnippets(snippets);
  return entry;
}

export function removeSnippet(number) {
  const snippets = getSnippets().filter((s) => s.number !== number);
  saveSnippets(snippets);
}

export function clearSnippets() {
  localStorage.removeItem(STORAGE_KEY);
}
