'use strict';
// build.js — bundles scraper into plain IIFE served from HF Spaces backend
// Loader bookmarklet is just a tiny <script> injector — never needs re-saving

const esbuild = require('esbuild');
const fs      = require('fs');
const path    = require('path');

const BACKEND_URL = process.env.BACKEND_URL || 'https://vinnsedesigner-vinns-ai-backend.hf.space';
const BUILD_DIR   = path.join(__dirname, 'build');
const OUT_FILE    = path.join(BUILD_DIR, 'scraper.js');
const LOADER_FILE = path.join(BUILD_DIR, 'loader.txt');

if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR);

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle:      true,
  minify:      true,
  format:      'iife',
  outfile:     OUT_FILE,
  charset:     'ascii',
  define: {
    '__BACKEND_URL__': JSON.stringify(BACKEND_URL),
  },
}).then(() => {
  const code = fs.readFileSync(OUT_FILE, 'utf8');
  const kb   = (code.length / 1024).toFixed(1);

  // ── Loader bookmarklet (tiny, save once, never changes) ───────────────────
  // Injects <script src="HF_SPACE/scraper.js?v=timestamp"> into the page.
  // Date.now() cache-busts so every click loads the latest build from HF.
  // This string is ~180 chars — fits any browser, no truncation ever.
  const loader = `javascript:void(function(){var s=document.createElement('script');s.src='${BACKEND_URL}/scraper.js?v='+Date.now();s.onerror=function(){alert('Nexus: backend offline or waking up \u2014 try again in 10s')};document.head.appendChild(s);}())`;

  fs.writeFileSync(LOADER_FILE, loader, 'utf8');

  console.log('✅ scraper.js built    -> build/scraper.js (' + kb + ' KB)');
  console.log('✅ loader bookmarklet  -> build/loader.txt (' + loader.length + ' chars)');
  console.log('\nLoader to save in Chrome:');
  console.log(loader);

}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
