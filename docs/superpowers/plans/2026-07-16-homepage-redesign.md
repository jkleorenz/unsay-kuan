# Homepage Redesign & System-Wide Font Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/` into a minimalist, nav-less, centered search hero with a subtle `map.svg` background, and apply the Courier New font across the whole site.

**Architecture:** Pure frontend change. The font is set once via a base CSS rule in `app.css`; the homepage is rewritten in `Home.jsx` as a self-contained full-screen hero (no `PublicLayout` nav). The SVG background is referenced statically from `public/map.svg` — the user supplies the file; no upload UI.

**Tech Stack:** Laravel 12 + Inertia v2 + React 18, Tailwind CSS v4 (`@tailwindcss/vite`), `@phosphor-icons/react`.

## Global Constraints

- Font: Courier New applied system-wide via a base `html` rule (overrides the image's "sans-serif" heading — accepted tradeoff).
- Homepage: pure hero, **no nav**, full-screen centered.
- SVG: static `public/map.svg` referenced as `/map.svg`, rendered subtle/faded (low opacity + light overlay); missing file falls back to pale gray `#f7f7f8`.
- Scope: only `resources/css/app.css` and `resources/js/Pages/Home.jsx` change. No route/controller changes. Search still GETs to `/businesses?search=`.
- Verification is via `npm run build` (Inertia renders client-side, so automated HTML assertions are not applicable) plus a manual/visual check.

---

### Task 1: System-wide Courier New font

**Files:**
- Modify: `resources/css/app.css`

**Interfaces:**
- Consumes: none
- Produces: every page renders in Courier New (no API; visual effect only)

- [ ] **Step 1: Add the base font rule**

Open `resources/css/app.css`. After the `@theme { ... }` block (currently
ending at line 11), append a base layer so the font applies site-wide:

```css
@layer base {
  html {
    font-family: 'Courier New', ui-monospace, SFMono-Regular, monospace;
  }
}
```

Final file should look like:

```css
@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';
@source '../**/*.blade.php';
@source '../**/*.js';
@source '../**/*.jsx';

@theme {
    --font-sans: 'Instrument Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

@layer base {
  html {
    font-family: 'Courier New', ui-monospace, SFMono-Regular, monospace;
  }
}
```

- [ ] **Step 2: Verify the build picks up the change**

Run: `npm run build`
Expected: build succeeds (`✓ built in ...s`) with no errors. The Courier New
rule is included in the emitted CSS (search the built `public/build/assets/*.css`
for `Courier New` to confirm).

- [ ] **Step 3: Commit**

```bash
git add resources/css/app.css
git commit -m "style: apply Courier New font system-wide"
```

---

### Task 2: Minimalist centered hero on the homepage

**Files:**
- Modify: `resources/js/Pages/Home.jsx`

**Interfaces:**
- Consumes: `@phosphor-icons/react` `MagnifyingGlass` icon (already a project dependency)
- Produces: a full-screen centered hero; search still submits GET to `/businesses` with `name="search"`

- [ ] **Step 1: Rewrite `Home.jsx`**

Replace the entire contents of `resources/js/Pages/Home.jsx` with:

```jsx
import { Head } from '@inertiajs/react';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f8] flex flex-col items-center justify-center px-6">
      {/* Faded SVG background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/map.svg')" }}
      />
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Unsay Kuan?</h1>
        <p className="mt-3 text-sm text-gray-500">
          Jobs, businesses, tourism &amp; community — all in one place.
        </p>

        <form
          method="GET"
          action="/businesses"
          className="mt-8 flex w-full items-center rounded-full bg-white px-4 py-2 shadow-md"
        >
          <MagnifyingGlass className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search businesses..."
            className="flex-1 border-none bg-transparent px-3 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds with no errors (this catches any JSX/import mistake,
e.g. the `MagnifyingGlass` import).

- [ ] **Step 3: Manual/visual check**

Serve the app (`composer dev` or `php artisan serve` + `npm run dev`) and open `/`:
- Title "Unsay Kuan?" is centered, large, bold, in Courier New.
- Subheading is smaller and gray.
- Search pill: white, rounded, with a magnifier icon on the left, borderless
  input, dark "Search" button nested on the right.
- Background is pale gray; if `public/map.svg` exists it appears faintly
  behind the content.
- Removing `public/map.svg` shows only the gray background (no errors).

- [ ] **Step 4: Confirm other pages still work**

Open `/businesses` and `/jobs`: they keep their `PublicLayout` nav and now also
render in Courier New. No layout breakage.

- [ ] **Step 5: Commit**

```bash
git add resources/js/Pages/Home.jsx
git commit -m "feat: redesign homepage as minimalist centered search hero"
```

---

### Task 3: Supply the background SVG (user action, no code)

**Files:**
- Create (by user): `public/map.svg`

**Interfaces:**
- Consumes: `Home.jsx` references `/map.svg`
- Produces: visible faded background on `/`

- [ ] **Step 1: Place the file**

Drop your `map.svg` into `public/map.svg` (project root → `public/`). No code
change needed; the homepage already references it. To test a different
background, replace the file and hard-refresh.

- [ ] **Step 2: Verify**

Reload `/` and confirm the SVG shows faintly behind the hero. If it looks too
strong or too weak, the opacity is controlled by the `opacity-20` class on the
background layer in `Home.jsx` (Task 2) — adjust there.
