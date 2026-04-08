'use strict';
// index.js — esbuild entry point for VENOM scraper bookmarklet

import { init } from './core.js';

(function () {
  'use strict';

  // Toggle off if already loaded
  if (window.__nexus_scraper_loaded__) {
    document.getElementById('__venom_fab__')?.remove();
    document.getElementById('__venom_panel__')?.remove();
    document.getElementById('__venom_styles__')?.remove();
    window.__nexus_scraper_loaded__ = false;
    return;
  }

  window.__nexus_scraper_loaded__ = true;
  init();
}());
