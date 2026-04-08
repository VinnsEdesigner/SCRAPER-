// index.js — HUD entry point

import { buildShell, destroyShell } from './shell.js';
import { initTabs, restoreLastTab } from './tabs.js';
import { buildAgentTab } from './ask.js';
import { buildSnippetsTab, showSelectionOverlay } from './snippets.js';
import { buildSettingsTab } from './settings.js';
import { initDrag, restoreFabPosition, restorePanelHeight } from './drag.js';
import { startPoll, stopPoll } from './persist.js';
import { initSelection } from '../selection.js';
import { setStatus, refreshAuthBadge } from './status.js';

export function initHud() {
  if (document.getElementById('__venom_fab__')) return;

  buildShell();
  initTabs();

  buildAgentTab();
  buildSnippetsTab();
  buildSettingsTab();

  initDrag();
  restoreFabPosition();
  restorePanelHeight();
  restoreLastTab();

  initSelection((text) => showSelectionOverlay(text));

  refreshAuthBadge();
  startPoll();
  setStatus('green', 'ready');
}

export function destroyHud() {
  stopPoll();
  destroyShell();
}
