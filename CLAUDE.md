# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static single-page app — "Mickey's Moodle Component Library" — for previewing, editing, and copying ready-made HTML components into Moodle (LMS). No framework, no npm, no build step.

## Running locally

Open `index.html` directly in a browser, or serve with any static file server:

```
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Architecture

The app is split into two layers:

**Shell (`index.html`)** — contains all CSS, the sidebar/topbar/preview/editor UI, and the runtime engine. The engine exposes:
- `register(def)` — called by every component file to add itself to the registry
- Helper functions passed into component scope: `esc`, `escA`, `ytVideoId`, `ytPlaylistId`, `ytThumb`, `ytIdBadge`

Components are loaded at startup by fetching each file listed in `components/manifest.json`, then executing it via `new Function(...)` with those helpers injected.

**Components (`components/*.js`)** — each file calls `register({...})` with a definition object. Two variants:

**Static** (read-only, no controls):
```js
register({
  id: 'my-component',
  name: 'Display Name',
  desc: 'Short description',
  group: 'Layout',
  icon: '🖼',
  code: `<div>...inline-styled HTML...</div>`
});
```

**Dynamic** (with an editable controls panel):
```js
register({
  id: 'my-component',
  // ...id/name/desc/group/icon...
  def: { /* default state object */ },
  gen(st)    { return `...HTML built from state...`; },
  ctrl(st)   { return `...controls panel HTML...`; },
  onInput(st, f, i, el) { /* mutate st on input change */ },
  onClick(st, act, i)   { /* mutate st on button click */ },
  preview(st) { /* optional: alternate HTML shown in iframe (gen() goes to editor) */ }
});
```

`ctrl()` uses CSS classes defined in `index.html`: `ctrl-header`, `ctrl-row`, `ctrl-btn`, `ci`, `ci-sm`, `ci-grow`, etc. Input elements must have `data-f` (field name) and `data-i` (row index) attributes; buttons must have `data-action`.

## Adding a component

1. Create `components/<id>.js` following one of the two variants above.
2. Add the `id` string to `components/manifest.json` (the CI step regenerates this automatically on deploy, but local dev requires a manual edit).

## Component groups

Sidebar group order is fixed in `index.html` at `GROUP_ORDER`:
`Layout`, `Callouts`, `Cards`, `Lists`, `Teaching`, `Course Info`, `Timeline`, `Media`

## Design constraints

All component output HTML must use **inline styles only** — no external CSS, no class names — because Moodle strips `<style>` tags and class-based rules.

Design tokens used throughout:
- Yellow accent: `#FDB92A`
- Dark background: `#000000` / `#111111`
- Body font: `'Montserrat', Arial, sans-serif` (loaded from Google Fonts in preview wrapper)
- Mono font: `'JetBrains Mono', 'Courier New', monospace`

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`. The CI step **regenerates `manifest.json`** from all `.js` files in `components/` — so any `.js` file added there will appear automatically in production without a manual manifest edit.
