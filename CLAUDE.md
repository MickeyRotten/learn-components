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
4. Calls `buildSidebar()`, then `loadPage()` (restores persisted Page Builder state from localStorage).
5. Fades out the loading screen.

Each component file runs in this injected scope:
```js
new Function('register','esc','escA','ytVideoId','ytPlaylistId','ytThumb','ytIdBadge', text)(
  register, esc, escA, ytVideoId, ytPlaylistId, ytThumb, ytIdBadge
);
```

All fetch calls append `?v=Date.now()` for cache-busting.

### Components (`components/*.js`)

Each file calls `register(def)` once. The definition is stored in a plain object `C` keyed by `def.id`.

## Global state variables

```js
const C = {};            // component registry: { [id]: def }
const states = {};       // single-component editor state: { [id]: object }
let cur = null;          // component ID loaded in Component mode
let mode = 'component';  // 'component' | 'page'
let pages = [{ name: 'Page 1', items: [] }]; // Page Builder pages array
let currentPageIdx = 0;  // active page index
let pickerOpen = false;  // whether component picker panel is open
let editingItemUid = null; // uid of page item currently being edited, or null
let OPEN = '';           // HTML wrapper prefix built from moodle-base.css
const CLOSE = '</body></html>';
let _blobUrl = null;     // current iframe blob URL (revoked on each update)
```

## Component API

### Static component (read-only, no controls)

```js
register({
  id: 'my-component',        // matches filename and manifest entry
  name: 'Display Name',      // shown in sidebar and topbar
  desc: 'Short description', // shown in topbar
  group: 'Layout',           // informational only (not used for sidebar grouping)
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

In Component mode, state is stored in memory in `states[id]` (per-session, lost on reload), lazy-initialized from `clone(def)` on first access. In Page Builder mode, each page item carries its own embedded `state` object. All pages are persisted to `localStorage` under the key `mc-pages-v2` as `{ pages, currentPageIdx }`.

The `clone` utility (`JSON.parse(JSON.stringify(o))`) is **not** available inside component files — it exists only in `index.html` scope.

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
- Draggable rows: `draggable="true"` and `data-drag-i="index"` on the row element; `data-drop-i="index"` also on the row

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

## Sidebar

The sidebar has two sections in its header:
- **Logo/branding** — "M" badge, "Component Library" title, "For XAMK Learn" subtitle
- **Mode tabs** (`#mode-tabs`) — "Component" and "Page" tab buttons that call `setMode('component')` or `setMode('page')`

The nav list (`#sb-nav`) shows all loaded components **alphabetically by name**. If the user has starred components (saved to `localStorage` as `mc-favorites`), those appear in a "Favorites" section at the top, followed by an "All" section.

**In Component mode**, clicking a nav item calls `load(id)`.
**In Page mode**, the sidebar shows the pages list via `buildPageSidebar()` — click to switch pages, double-click name to rename, ✕ to delete, "+ New Page" button at bottom. Components are added via the inline picker in the controls panel (not via sidebar).

Sidebar item styling: default `#ccc`, hover `#fff`, active/selected has teal (`#00A89D`) background with bold white text.

The `group` field in `register()` is stored on the definition but **not currently used** for sidebar grouping or ordering.

## Page Builder mode

The app has two modes toggled by the tab strip in the sidebar header.

### Data model

```js
pages = [
  { name: 'Page 1', items: [
    { uid: 'pi_1234_5678', compId: 'callout-important', state: { ... } },
    { uid: 'pi_1235_9012', compId: 'section-header',    state: null },  // null for static
  ]},
  { name: 'Page 2', items: [] },
]
currentPageIdx = 0;
```

- `uid` — unique per instance (`'pi_' + Date.now() + '_' + Math.random()`), allows multiple instances of the same component
- `compId` — key into `C[]`
- `state` — deep clone of `C[compId].def` at time of adding; `null` for static components
- Use `curPage()` to access `pages[currentPageIdx]` throughout the engine

**Persistence:** `localStorage` key `'mc-pages-v2'` (format: `{ pages, currentPageIdx }`), saved on every mutation via `savePage()`. On load, migrates from old `'mc-page'` key (single-page array) if present.

### Page Builder functions

| Function | Description |
|---|---|
| `setMode(m)` | Switches between `'component'` and `'page'` modes; updates tab active states |
| `showWelcome()` | Resets UI to initial welcome screen (used when switching to Component mode with nothing loaded) |
| `showPageMode()` | Enters/refreshes Page mode: updates topbar, calls `renderPageList()` + `renderPagePreview()` |
| `curPage()` | Returns `pages[currentPageIdx]` |
| `renderPageList()` | Renders the ordered page item list into `#controls-panel`; appends add slot or component picker depending on `pickerOpen` |
| `buildPickerHTML()` | Returns HTML for the inline component picker (pill buttons grouped by `GROUP_ORDER`); shown when `pickerOpen === true` |
| `renderPagePreview()` | Concatenates all items' `gen(state)` HTML separated by `<hr>`, puts it in `#code-editor` and calls `renderPreview()` |
| `addToPage(compId)` | Creates a new page item with cloned state, appends to `curPage().items`, saves, refreshes |
| `removePageItem(uid)` | Removes item by uid from `curPage().items`, saves, refreshes |
| `clearPage()` | Confirms then empties `curPage().items`, saves, refreshes |
| `addPage()` | Appends a new empty page, switches to it, rebuilds sidebar |
| `switchPage(idx)` | Sets `currentPageIdx`, saves, rebuilds sidebar and page view |
| `deletePage(idx)` | Removes page at idx (min 1 page enforced), adjusts index, saves |
| `renamePage(idx, name)` | Updates page name, saves, rebuilds sidebar |
| `buildPageSidebar()` | Replaces `#sb-nav` contents with page list items + "+ New Page" button |
| `startEditingItem(uid)` | Sets `editingItemUid`, shows that item's `ctrl()` with a "← Back" header in the controls panel |
| `stopEditingItem()` | Clears `editingItemUid` and `pickerOpen`, calls `showPageMode()` |
| `regenPageItem()` | Page-mode equivalent of `regen()`: rebuilds Back+ctrl HTML, updates preview for the active item |

### Controls panel sub-views in Page mode

The existing `#controls-panel` is reused for three sub-views:
- `editingItemUid === null && pickerOpen === false` → page list view with "+ Add component" slot at bottom
- `editingItemUid === null && pickerOpen === true` → component picker shown inline (pill buttons by group, Cancel link)
- `editingItemUid !== null` → item editor view (`startEditingItem()`) — "← Back" button + `comp.ctrl(item.state)`

Page list rows use `data-page-action="edit"` and `data-page-action="remove"` attributes (handled before `data-action` in the click listener). Drag-to-reorder uses the same `data-drag-i`/`data-drop-i` infrastructure as component rows.

### Dispatch in Page mode

The three controls event listeners (input, click, drop) resolve context at the top of each handler:

```js
let _comp, _st, _isPageItem = false;
if (mode === 'page' && editingItemUid) {
  const item = curPage().items.find(p => p.uid === editingItemUid);
  _comp = C[item.compId]; _st = item.state; _isPageItem = true;
} else {
  _comp = C[cur]; _st = getState(cur);
}
// Then call _comp.onInput/_comp.onClick/_comp.onDrop with _st
// If _isPageItem: call savePage() + regenPageItem() instead of regen()
```

### Copy and Reset in Page mode

- **Copy Page HTML** — topbar button label changes to "Copy Page HTML"; copies the full concatenated HTML from `#code-editor`; toast shows "✓ Page HTML copied"
- **Reset** — while editing a page item, resets that item's state to `clone(C[compId].def)` and calls `regenPageItem()`

## Preview iframe

The iframe renders `OPEN + htmlCode + CLOSE` as a `blob:` URL. `OPEN` is built at startup from `moodle-base.css` + a Google Fonts link for Open Sans and Montserrat. `CLOSE` is `</body></html>`. The previous blob URL is revoked before each new one is created.

In Page mode, the preview shows all page items' HTML concatenated. While editing a single page item, the preview shows only that item.

## Design constraints

All HTML generated by components (`gen()`, `code`, `preview()`) must use **inline styles only** — no class names, no `<style>` tags — because Moodle strips both.

Design tokens used consistently:

| Token | Value |
|---|---|
| Yellow accent | `#FDB92A` |
| Teal (active/selected) | `#00A89D` |
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
| assignment | Assignment Block | Teaching | Dynamic — fields: title, code, deadline, type, mandatory, ai, body, specs[], evaluation[] |
| callout-important | Callout | Callouts | Dynamic |
| card-single | Card | Cards | Dynamic |
| comparison-table | Comparison Table | Teaching | Dynamic |
| course-info | Course Info Block | Course Info | Dynamic — fields include groupId (student group ID, e.g. "GDKV26SP") |
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

Note: `hero` appears in `manifest.json` but has no corresponding `.js` file. It fails silently at load time (logged as `console.warn`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `main`:

1. Regenerates `manifest.json` from all `.js` files: `python3 -c "import os,json; ids=sorted(f[:-3] for f in os.listdir('components') if f.endswith('.js')); print(json.dumps(ids))" > components/manifest.json`
2. Uploads the entire repo as the Pages artifact.
3. Deploys via `actions/deploy-pages`.

Manifest is sorted alphabetically by CI, so new component files appear automatically in production without a manual manifest edit. Local dev requires the manual edit.
