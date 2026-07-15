# Homepage Redesign & System-Wide Font — Design Spec

**Date:** 2026-07-16
**Status:** Approved (design)

## Goal

Redesign the homepage into a minimalist, search-centric landing page (classic
search-engine aesthetic) and apply the **Courier New** monospace font
system-wide. The user will supply an SVG (`map.svg`) to use as a subtle
background on the homepage.

## Decisions (from brainstorming)

- **Navigation:** Pure hero, **no top nav** on the homepage. Other pages keep
  their existing `PublicLayout` nav.
- **Font:** Courier New applied system-wide via a base `html` rule. This
  intentionally overrides the image's "bold sans-serif" heading — the heading
  will be monospace. User accepted this tradeoff.
- **SVG background:** Static file `public/map.svg`, referenced directly as
  `/map.svg`. No upload UI. Rendered **subtle/faded** (low opacity + light
  overlay) so text stays readable. Missing file falls back to pale gray.
- **Scope:** Only `resources/css/app.css` and
  `resources/js/Pages/Home.jsx` change. No route/controller changes.

## Design Detail

### 1. System-wide font — `resources/css/app.css`

Replace the existing `@theme` font token usage with a base rule so every page
inherits Courier New:

```css
@layer base {
  html {
    font-family: 'Courier New', ui-monospace, SFMono-Regular, monospace;
  }
}
```

Keep the existing `@import 'tailwindcss';` and `@source` directives. The
`--font-sans` theme token may remain; the base rule guarantees the visible font.

### 2. Homepage hero — `resources/js/Pages/Home.jsx`

Rewrite as a self-contained, full-screen, centered hero (do **not** wrap in
`PublicLayout`, to keep the nav off this page):

- Root: `min-h-screen flex flex-col items-center justify-center bg-[#f7f7f8]
  px-6 relative overflow-hidden`
- Background SVG: an absolutely-positioned layer
  `absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20`
  with `style={{ backgroundImage: "url('/map.svg')" }}` followed by a light
  overlay `absolute inset-0 bg-white/60`. Content sits above with
  `relative z-10`.
- Content (centered, max width ~`max-w-xl`):
  - `<h1>` "Unsay Kuan?" — `text-4xl sm:text-5xl font-bold text-gray-900`
    (navy/soft-black), centered.
  - `<p>` subheading — `mt-3 text-sm text-gray-500`, e.g.
    "Jobs, businesses, tourism & community — all in one place."
  - Search form `method="GET" action="/businesses"` styled as a pill:
    `mt-8 flex items-center w-full max-w-md rounded-full bg-white shadow-md
    px-4 py-2`.
    - Left: magnifying-glass icon (`MagnifyingGlass` from
      `@phosphor-icons/react`), `text-gray-400`.
    - Middle: `<input type="text" name="search" placeholder="Search businesses...">`
      `flex-1 bg-transparent outline-none border-none px-3
      text-gray-700 placeholder-gray-400`.
    - Right: `<button>` "Search" `rounded-full bg-gray-900 text-white px-5
      py-2 hover:bg-gray-800`.

### 3. SVG background file — `public/map.svg`

The user drops their `map.svg` into `public/`. No code change beyond the
`url('/map.svg')` reference above. If absent, the `bg-[#f7f7f8]` base color
shows (hero still renders correctly).

## Files Touched

| File | Change |
|------|--------|
| `resources/css/app.css` | Add base `html` Courier New font rule |
| `resources/js/Pages/Home.jsx` | Rewrite as nav-less centered hero with faded SVG bg + pill search |
| `public/map.svg` | User-supplied (referenced, not created by code) |

## Out of Scope (YAGNI)

- No admin upload UI for the background.
- No changes to other pages' styling (they inherit the font automatically).
- Search behavior unchanged (still GET to `/businesses?search=`).

## Verification

- `npm run build` succeeds.
- Visiting `/` shows: centered title, subheading, pill search with icon +
  nested button, pale gray bg with faint `map.svg` behind.
- Courier New renders everywhere (heading + other pages).
- Dropping/replacing `public/map.svg` updates the background; removing it
  falls back to gray with no errors.
- `/businesses`, `/jobs` etc. still render with their nav and the new font.
