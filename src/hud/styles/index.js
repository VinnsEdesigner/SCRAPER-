// styles/index.js — injects all VENOM HUD styles

import { varsCSS }     from './vars.js';
import { fabCSS }      from './fab.js';
import { panelCSS }    from './panel.js';
import { agentCSS }    from './agent.js';
import { codeCSS }     from './code.js';
import { snippetsCSS } from './snippets.js';
import { settingsCSS } from './settings.js';
import { buttonsCSS }  from './buttons.js';

export function injectStyles() {
  if (document.getElementById('__venom_styles__')) return;
  const style = document.createElement('style');
  style.id = '__venom_styles__';
  style.textContent = [
    varsCSS, fabCSS, panelCSS, agentCSS,
    codeCSS, snippetsCSS, settingsCSS, buttonsCSS,
  ].join('\n');
  document.head.appendChild(style);
}
