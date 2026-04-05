// build.js — bundles + minifies bookmarklet
const esbuild = require('esbuild');
const fs      = require('fs');

const BACKEND_URL = process.env.BACKEND_URL || 'https://vinnsedesigner-vinns-ai-backend.hf.space';

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle:      true,
  minify:      true,
  format:      'iife',
  outfile:     'build/bookmarklet.min.js',
  define: {
    '__BACKEND_URL__': JSON.stringify(BACKEND_URL),
  },
}).then(() => {
  // Wrap in javascript: prefix for bookmarklet
  const code = fs.readFileSync('build/bookmarklet.min.js', 'utf8');
  const bookmarklet = `javascript:${encodeURIComponent(code)}`;
  fs.writeFileSync('build/bookmarklet.min.js', bookmarklet);
  console.log('✅ Bookmarklet built → build/bookmarklet.min.js');
}).catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
