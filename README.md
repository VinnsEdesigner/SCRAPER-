# Nexus Scraper

Bookmarklet injected into any browser tab. Captures text selections, stages snippets, syncs to Nexus backend.

## Install

1. Copy contents of `build/bookmarklet.min.js`
2. Create new bookmark in Chrome
3. Paste as the URL
4. Click bookmark on any page to activate

## Usage

- Highlight text → tap `+ code` or `+ research` to stage
- Tap `ask` to query the lite agent about the page
- Tap `suggest prompt` → inject suggestion into page input
- Tap `⇅ sync to dashboard` to push snippets to Nexus

## Build

```bash
npm install
BACKEND_URL=https://your-hf-space.hf.space npm run build
```
