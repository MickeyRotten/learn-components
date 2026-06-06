# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

"Mickey's Moodle Component Library" — a static single-page app for previewing, editing, and copying ready-made HTML components into Moodle (LMS). No framework, no npm, no build step.

## Running locally

```
python -m http.server 8080
```

Then open `http://localhost:8080`. You can also open `index.html` directly in a browser, but fetching the manifest and component files requires a server (not `file://`).

## Repository layout

```
index.html              Shell: all CSS, UI, and runtime engine
moodle-base.css         Stripped XAMK Moodle styles used as iframe preview base
components/
  manifest.json         Ordered list of component IDs to load at startup
  *.js                  One file per component — each calls register()
.github/workflows/
  deploy.yml            GitHub Actions → GitHub Pages on push to main
```

## Architecture

The app has two layers:

### Shell (`index.html`)

Contains all CSS, the sidebar/topbar/preview/editor UI, and the runtime JavaScript engine. Nothing is bundled or compiled — it is one self-contained HTML file.

**Engine flow at startup:**
1. Fetches `moodle-base.css` and builds the `OPEN` HTML wrapper (DOCTYPE + Google Fonts link + Moodle styles + `<body>`).
2. Fetches `components/manifest.json` for the list of IDs.
3. Fetches each `components/<id>.js` and executes it via `new Function(...)` with helpers injected.
4. Calls `buildSidebar()` and fades out the loading screen.

Each component file runs in this injected scope:
```js
new Function('register','esc','escA','ytVideoId','ytPlaylistId','ytThumb','ytIdBadge', text)(
  register, esc, escA, ytVideoId, ytPlaylistId, ytThumb, ytIdBadge
);
```

All fetch calls append `?v=Date.now()` for cache-busting.

### Components (`components/*.js`)

Each file calls `register(def)` once. The definition is stored in a plain object `C` keyed by `def.id`.

## Component API

### Static component (read-only, no controls)

```js
register({
  id: 'my-component',        // matches filename and manifest entry
  name: 'Display Name',      // shown in sidebar and topbar
  desc: 'Short description', // shown in topbar
  group: 'Layout',           // informational only (see sidebar note below)
  icon: '🖼',                // shown in sidebar
  code: `<div>...inline-styled HTML...</div>`
});
```

### Dynamic component (editable controls panel)

```js
register({
  id: 'my-component',
  name: 'Display Name',
  desc: 'Short description',
  group: 'Cards',
  icon: '🃏',

  def: {
    // Default state object — cloned for each component instance
    title: 'Default Title',
    items: []
  },

  gen(st) {
    // Returns the final HTML string from state.
    // This goes into the editor textarea.
    return `<div style="...">${esc(st.title)}</div>`;
  },

  ctrl(st) {
    // Returns the controls panel HTML string.
    // Uses CSS classes from index.html (see Controls CSS section below).
    return `
      <div class="ctrl-header"><span class="ctrl-label">Title</span></div>
      <div class="ctrl-row">
        <input class="ci ci-grow" data-f="title" data-i="0" value="${esc(st.title)}">
      </div>`;
  },

  onInput(st, f, i, el) {
    // Called when any input/select/textarea in the controls panel changes.
    // f = data-f attribute (field name), i = data-i attribute (row index, as string)
    // el = the DOM element
    // Mutate st directly.
    st[f] = el.value;
    // Return true to trigger a full regen() (rebuilds ctrl HTML + gen HTML).
    // Return nothing/falsy to only regenerate the output HTML (preserves focus).
  },

  onClick(st, act, i) {
    // Called when a button with data-action is clicked.
    // act = data-action value, i = data-i (row index, as string)
    // Always triggers a full regen() after this returns.
    if (act === 'add') st.items.push({ text: '' });
    if (act === 'remove') st.items.splice(Number(i), 1);
  },

  onDrop(st, from, to) {
    // Optional. Called when a draggable row is dropped.
    // from/to are integer indices.
    // Always triggers a full regen() after this returns.
    st.items.splice(to, 0, st.items.splice(from, 1)[0]);
  },

  preview(st) {
    // Optional. If provided, this HTML is shown in the iframe preview
    // while gen(st) output goes to the editor textarea.
    // Use when the preview needs extra wrapper markup not wanted in the copy.
    return `<div style="padding:20px">${esc(st.title)}</div>`;
  }
});
```

### State management

State is stored in memory only (per-session, lost on reload). Each component gets a lazy-initialized clone of its `def` object via `clone(def)` (JSON round-trip deep copy). State is keyed by component ID in `const states = {}`.

The `clone` utility is **not** available inside component files — it exists only in `index.html` scope.

## Controls panel CSS classes

These classes are defined in `index.html` and used inside `ctrl()` return values:

| Class | Purpose |
|---|---|
| `.ctrl-header` | Sticky section header with label and optional action buttons |
| `.ctrl-label` | Uppercase 9px label inside a header |
| `.ctrl-actions` | Right-side flex container inside a header (for add/action buttons) |
| `.ctrl-rows` | Padded container wrapping a list of rows |
| `.ctrl-col-hdr` | Column header row above a list of rows |
| `.ctrl-row` | Flex row for one set of inputs (4px padding, 6px gap) |
| `.ctrl-num` | Row number, 16px, monospace, right-aligned |
| `.ctrl-btn-add` | Green + button (`#1A2A1A` bg, `#90EE90` text) |
| `.ctrl-btn-action` | Blue action button (`#1A1A2E` bg, `#8888FF` text) |
| `.ctrl-btn-x` | Red × delete button (gray → red on hover) |
| `.ctrl-total` | Summary pill (e.g. total weight in grade-breakdown) |
| `.ctrl-drag` | Drag handle (⠿), `cursor: grab` |
| `.drag-over` | Dashed yellow outline applied to drop target |
| `.ci` | Base class for all control inputs (input, select, textarea) |
| `.ci-sm` | 52px wide |
| `.ci-year` | 64px wide (for year fields) |
| `.ci-grow` | `flex: 1; min-width: 0` (fills remaining space) |
| `.ci-med` | `flex: 2` |
| `.ci-wide` | `flex: 3` |

### Required data attributes

- Input/select/textarea: `data-f="fieldName"` and `data-i="rowIndex"` (both required; use `"0"` for non-list fields)
- Buttons: `data-action="actionName"` and `data-i="rowIndex"`
- Draggable rows: `draggable="true"` on the row element

### Emoji picker

Any input with `data-f="emoji"` automatically gets an emoji picker button attached by the engine. No extra markup needed.

## Helper functions (available in component scope)

```js
esc(s)                   // HTML-escape: & < > "
escA(s)                  // Attribute-escape: " '
ytVideoId(input)         // Extract 11-char video ID from URL or embed code
ytPlaylistId(input)      // Extract playlist ID from URL or embed code
ytThumb(vid)             // YouTube thumbnail URL, or placeholder if no ID
ytIdBadge(id, label)     // Renders green monospace badge with extracted ID
```

`ytVideoId` handles: `youtube.com/watch?v=`, `youtube.com/embed/`, `youtube.com/shorts/`, `youtu.be/`, and full `<iframe src="...">` embed code strings.

## Sidebar behavior

The sidebar lists all loaded components **alphabetically by name**. If the user has starred any components (saved to `localStorage` as `mc-favorites`), those appear in a "Favorites" section at the top, followed by an "All" section with the full list.

The `group` field in `register()` is stored on the definition but is **not currently used for sidebar grouping or ordering**. It is available for future use or filtering.

## Preview iframe

The iframe renders `OPEN + htmlCode + CLOSE` as a `blob:` URL. `OPEN` is built at startup from `moodle-base.css` + a Google Fonts link for Open Sans and Montserrat. `CLOSE` is `</body></html>`.

This means component output is rendered inside a real Moodle-like stylesheet. The output HTML itself must use inline styles only (see Design constraints below).

## Design constraints

All HTML generated by components (`gen()`, `code`, `preview()`) must use **inline styles only** — no class names, no `<style>` tags — because Moodle strips both.

Design tokens used consistently across components:

| Token | Value |
|---|---|
| Yellow accent | `#FDB92A` |
| Dark background | `#000000` / `#111111` |
| Subtle dark | `#1A1A1A` / `#1E1E1E` |
| Body font | `'Montserrat', Arial, sans-serif` |
| Mono font | `'JetBrains Mono', 'Courier New', monospace` |
| Success green | `#90EE90` / `#1A2A1A` |
| Link blue | `#0f6cbf` |

## Adding a component

1. Create `components/<id>.js` calling `register({...})`.
2. Add the `id` string to `components/manifest.json` for local dev (CI regenerates this automatically on deploy from all `.js` files in `components/`).

The manifest is a plain JSON array of ID strings. Order in the manifest is the load order, but the sidebar always sorts alphabetically by name regardless.

## Existing components (22 files)

| ID | Name | Group | Type |
|---|---|---|---|
| assessment-guidelines | Assessment Guidelines | Teaching | Dynamic |
| assignment | Assignment Block | Teaching | Dynamic |
| callout-important | Callout | Callouts | Dynamic |
| card-single | Card | Cards | Dynamic |
| comparison-table | Comparison Table | Teaching | Dynamic |
| course-info | Course Info Block | Course Info | Dynamic |
| definition | Definition | Teaching | Dynamic |
| game-example | Game Example | Teaching | Dynamic |
| grade-breakdown | Grade Breakdown | Course Info | Dynamic |
| key-takeaways | Key Takeaways | Lists | Dynamic |
| pros-cons | Pros & Cons | Lists | Dynamic |
| quote-block | Quote Block | Callouts | Dynamic |
| resource-list | Resource List | Lists | Dynamic |
| schedule | Schedule | Course Info | Dynamic |
| section-header | Header | Layout | Dynamic |
| spectrum | Spectrum | Teaching | Dynamic |
| step-list | Step List | Lists | Dynamic |
| text-section | Text Section | Layout | Dynamic |
| timeline | Timeline | Timeline | Dynamic |
| yt-playlist-grid | YouTube Playlist Grid | Media | Dynamic |
| yt-playlist-iframe | YouTube Playlist Iframe | Media | Dynamic |
| youtube-single | YouTube | Media | Dynamic |

Note: `hero` appears in `manifest.json` but has no corresponding `.js` file. It will fail silently at load time (logged as `console.warn`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`:

1. Regenerates `manifest.json` from all `.js` files: `python3 -c "import os,json; ids=sorted(f[:-3] for f in os.listdir('components') if f.endswith('.js')); print(json.dumps(ids))" > components/manifest.json`
2. Uploads the entire repo as the Pages artifact.
3. Deploys via `actions/deploy-pages`.

Manifest is sorted alphabetically by CI, so new component files appear automatically in production without a manual manifest edit. Local dev requires the manual edit.
