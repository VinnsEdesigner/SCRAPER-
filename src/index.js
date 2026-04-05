// index.js — bookmarklet entry point
// This file is minified by build.yml into bookmarklet.min.js

import { init } from './core.js';

// Self-executing — runs immediately when bookmarklet is clicked
(function () {
  'use strict';

  // Prevent double-injection
  if (window.__nexus_scraper_loaded__) {
    document.getElementById('__nexus_hud__')?.remove();
    window.__nexus_scraper_loaded__ = false;
    return;
  }

  window.__nexus_scraper_loaded__ = true;
  init();
})();
