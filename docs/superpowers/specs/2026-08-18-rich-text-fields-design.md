# Rich text in component prose fields

**Date:** 2026-08-18
**Status:** Approved, not yet implemented

## Goal

Let prose fields in the controls panel hold **linebreaks** and **bold / italic / underline**, applied with Ctrl+B, Ctrl+I, and Ctrl+U.

Today `esc()` escapes everything a teacher types, so markup renders literally, and a newline typed into a textarea collapses to a space in HTML. Most prose fields are single-line `<input>`s, which cannot hold a newline at all.

## Scope

**In:** body/description fields and prose list items (specs, takeaways, evaluation criteria, pros/cons, steps, timeline descriptions, table cells).

**Out:** titles, headings, names, codes, dates, URLs, durations, captions, and pill labels. Bold or a linebreak inside an `<h3>` or a rounded pill breaks the layout.

**Out:** a toolbar with visible B/I/U buttons. Keyboard shortcuts only.

## Design

### 1. `fmt()` helper

New helper in `index.html`, injected into component scope alongside `esc`:

```js
const fmt = s => esc(s)                                    // escape FIRST — typed <script> stays inert
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')        // ** before * so bold wins
  .replace(/__(.+?)__/g,     '<u>$1</u>')
  .replace(/\*(.+?)\*/g,     '<em>$1</em>')
  .replace(/\n/g,            '<br>');
```

| Typed | Rendered |
|---|---|
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `__underline__` | `<u>underline</u>` |
| newline | `<br>` |

Escaping runs first, and `*` / `_` are characters `esc()` ignores, so they survive to the replace step. The safety guarantee is unchanged: no user input can produce an executable tag.

Ordering matters — `**` is consumed before `*`, so bold wins over italic and no single `*` remains inside a bold run.

The component loader's `new Function(...)` call gains `fmt` in both its parameter list and its argument list.

### 2. Prose fields become auto-growing textareas

Prose fields are marked `class="ci ci-prose"`. Single-line `<input>`s in that set become `<textarea>`s, because an `<input>` cannot hold a newline character — browsers strip it.

The engine sizes each `.ci-prose` field to its `scrollHeight`:

- on render, next to the existing `attachEmojiTriggers()` call
- on `input`, so it grows while typing and shrinks on delete

It starts exactly as tall as today's input and only grows when the text wraps or the user presses Enter.

Normal typing updates the preview *without* a full `regen()` (to preserve focus), so the element persists and grows naturally. Sizing is re-applied after `regen()` for the case where the panel HTML is rebuilt.

**Implementation trap:** converted fields move from `value="${escA(x)}"` to a textarea body `>${esc(x)}<`. `escA()` escapes only quotes, not `<`, so leaving it in a textarea body would be an injection hole. These must switch to `esc()`.

### 3. Ctrl+B / I / U

A `keydown` listener on `#controls-panel`. There is no keydown handler on that element today, so nothing conflicts.

On Ctrl/Cmd + B/I/U in a field carrying `data-f`:

1. `preventDefault()` — these are browser shortcuts (Ctrl+U is View Source, Ctrl+B is the bookmarks sidebar).
2. Wrap the selection in the matching markers, or unwrap if it is already wrapped (toggle).
3. With no selection, insert an empty marker pair and place the caret between them.
4. Insert via `document.execCommand('insertText')` so the native undo stack is preserved and **Ctrl+Z still works**.
5. Dispatch an `input` event so the existing regeneration path at `index.html` runs untouched.

Enter needs no handling — once a field is a textarea, it inserts a newline natively.

### 4. Prose field list

Everything below switches `esc()` to `fmt()` and gains `ci-prose`. Everything else keeps `esc()`.

| Component | Fields |
|---|---|
| assignment | `body`, `specs[]`, `evaluation[]` |
| course-info | `goals[]`, `objectives[]`, `evaluation[]`, teacher `response` |
| rules-etiquette | `paras[].text`, `gradeLead`, `gradeItems[]`, `etiquetteItems[]` |
| definition | `definition`, `example` |
| callout-important | `body` |
| card-single | `body` |
| game-example | `body` |
| quote-block | `quote` |
| spectrum | `text` |
| text-section | `body` |
| key-takeaways | `items[]` |
| pros-cons | `pros[]`, `cons[]` |
| step-list | `desc` |
| timeline | `desc` |
| grade-breakdown | `notes` |
| resource-list | `note` |
| comparison-table | cells |
| schedule | `topic`, `assignments`, `other` |

### 5. Output context

`fmt()` emits `<br>`, `<strong>`, `<em>`, `<u>`. In the current div-free markup, prose sits inside `<p>`, `<li>`, and `<td>`, all of which accept these. Moodle's editor preserves all four tags.

## Compatibility

State remains plain strings, so the `mc-pages-v2` localStorage format is unchanged and existing saved pages keep working. Text containing no markers renders byte-identically to today.

**Known limitation, accepted:** there is no escape hatch for a literal asterisk or double underscore. Content like `2 * 3 * 4` would italicise. A scan of all current component defaults found no paired `*` or `__`, so nothing in the shipped content is affected. If this bites later, add a `\*` escape.

## Testing

Extend the existing node harness (loads each component through the same `new Function(...)` path as `index.html`, runs `gen()`/`ctrl()`/`preview()`):

- `fmt()` unit cases: escaping preserved (`<script>` inert), each marker type, bold-wins-over-italic ordering, unmatched/stray markers left literal, newline to `<br>`, empty string
- all 23 components still produce div-free, tag-balanced output
- textarea bodies use `esc()`, never `escA()`
- shortcut behaviour verified in-browser: wrap, unwrap toggle, no-selection caret placement, Ctrl+Z undo

## Files touched

- `index.html` — `fmt()` helper, loader signature, `.ci-prose` CSS, auto-grow sizing, keydown handler
- `components/*.js` — 18 components: `esc` to `fmt` on prose fields, `ci-prose` class, prose `<input>` to `<textarea>`
- `CLAUDE.md` — document `fmt()` in the helper list and `.ci-prose` in the controls CSS table
