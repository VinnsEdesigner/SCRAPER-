// index.js — bookmarklet entry point

import { init } from './core.js';

(function () {
  'use strict';

  alert('bookmarklet running'); // ← just this one line added

  if (window.__nexus_scraper_loaded__) {
    document.getElementById('__nexus_hud__')?.remove();
    window.__nexus_scraper_loaded__ = false;
    return;
  }

  window.__nexus_scraper_loaded__ = true;
  init();
})();
