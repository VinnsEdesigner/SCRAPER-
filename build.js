'use strict';
// build.js — bundles scraper into plain IIFE served from HF Spaces backend
// Loader bookmarklet is just a tiny <script> injector — never needs re-saving

const esbuild = require('esbuild');
const fs      = require('fs');
const path    = require('path');

const BACKEND_URL = process.env.BACKEND_URL || 'https://vinnsedesigner-vinns-ai-backend.hf.space';
const SCRIPT_URL  = 'https://vinnsedesigner.github.io/SCRAPER-/build/scraper.js';
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
    __BACKEND_URL__: JSON.stringify(BACKEND_URL),
  },
}).then(() => {
  const code = fs.readFileSync(OUT_FILE, 'utf8');
  const kb   = (code.length / 1024).toFixed(1);

  const loader = `javascript:void(function(){var s=document.createElement('script');s.src='${SCRIPT_URL}?v='+Date.now();s.onerror=function(){alert('Nexus: failed to load — check GH Pages')};document.head.appendChild(s);}())`;

  fs.writeFileSync(LOADER_FILE, loader, 'utf8');

  console.log('✅ scraper.js built    -> build/scraper.js (' + kb + ' KB)');
  console.log('✅ loader bookmarklet  -> build/loader.txt (' + loader.length + ' chars)');
  console.log('\nLoader to save in Chrome:');
  console.log(loader);

}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
