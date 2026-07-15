# Unify System UI to Home/Login Look

**Date:** 2026-07-16
**Status:** Approved (design)

## Goal

Apply the visual language of `Home.jsx` and the `GuestLayout`/Login screen
consistently across the entire app, so every surface feels like one product.

The "look" is three reusable things:

1. **Ambient canvas** — `#f7f7f8` background, a faded `map.svg` overlay, and a
   translucent white wash. (Already present in `GuestLayout` and `Home.jsx`.)
2. **Dark pill buttons** — `bg-gray-900 rounded-full` (vs the current Breeze
   `bg-blue-600` `PrimaryButton`). Confirmed: **pill (`rounded-full`)**.
3. **Soft cards** — white, `rounded-2xl`, soft shadow, `backdrop-blur`.

Scope: **everything** — public pages, Dashboard, Admin, Profile, Submit/Create
forms. Auth pages already match and are left visually as-is.

## Approach

Approach A — centralize the look in the layouts + `PrimaryButton`, add one small
shared `Card` component, then touch each page's inner content for consistent
spacing and card usage. No design-system tokens, no extra abstractions.

## Implementation

### 1. Foundations (shared)

- **`resources/js/Components/PrimaryButton.jsx`**
  Change to gray-900 pill:
  `bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/40 disabled:opacity-70`
  Keep the existing `processing`/disabled handling. This single change propagates
  the button style to every form (auth, submit, admin, profile).

- **`resources/js/Components/Card.jsx`** (new)
  ```jsx
  export default function Card({ className = '', children }) {
      return (
          <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-gray-100 ${className}`}>
              {children}
          </div>
      );
  }
  ```

- **Ambient canvas** — two inline divs (map overlay + white wash). Defined once
  and reused in both layouts:
  ```jsx
  <div className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10" style={{ backgroundImage: "url('/map.svg')" }} />
  <div className="absolute inset-0 bg-white/60" />
  ```
  (Lifted from `GuestLayout` / `Home.jsx`; identical markup.)

### 2. Layouts

- **`resources/js/Layouts/PublicLayout.jsx`**
  - Root: `relative flex min-h-screen flex-col overflow-hidden bg-[#f7f7f8]` + the
    two ambient-canvas divs (wrapped so they sit behind content; content gets
    `relative z-10`).
  - Nav: restyle to Home's clean bar — translucent white
    (`bg-white/80 backdrop-blur`), gray-600 links with hover to gray-900, and a
    gray-900 pill "Log in" / CTA on the right. Keep the Businesses / Jobs /
    Tourism / Community links.

- **`resources/js/Layouts/AuthenticatedLayout.jsx`**
  - Same ambient canvas + `relative z-10` content wrapper.
  - Nav: same clean treatment; active `NavLink` uses gray-900 pill; dropdown
    trigger inherits the neutral palette (drop the blue/indigo focus rings →
    gray-900). Covers Dashboard + all Admin pages.

- **`resources/js/Layouts/GuestLayout.jsx`** — already matches; no change
  (verify it stays consistent after `PrimaryButton` change).

### 3. Pages

Wrap inner content in `Card` where a panel/section exists; use pill buttons
(inherit via `PrimaryButton`) and rounded inputs. Convert existing
`border rounded` blocks to `Card`. Specific pages:

- **Public:** `Businesses/Index`, `Jobs/Index`, `Jobs/Create`, `Tourism/Index`,
  `Community/Index`, `Search/Index`, and all `Show`/`Submit` pages.
- **Authenticated:** `Dashboard.jsx`, `Profile/Edit.jsx` + its three partials
  (`UpdateProfileInformationForm`, `UpdatePasswordForm`, `DeleteUserForm`).
- **Admin:** `Admin/Dashboard`, and all `Admin/*/Index` + `Admin/*/Edit` pages.

Per-page change is mechanical: replace `border rounded p-4` card blocks with
`<Card className="p-4">…</Card>`; replace inline `bg-blue-600 … rounded`
buttons that bypass `PrimaryButton` with `PrimaryButton` or the gray-900 pill
class; round `TextInput`/`select` usage where it lives in page markup.

### 4. Inputs

- **`resources/js/Components/TextInput.jsx`** — add `rounded-xl` (and keep
  existing border/focus). This rounds text inputs app-wide so forms match.
- For raw `<select>`/`<input>` in page markup (e.g. `Businesses/Index` filter
  form), switch `border rounded` → `border rounded-xl px-3 py-2` + apply the
  gray-900 pill to the filter `Search` button.

### 5. Verification

- `composer test` — run the existing PHPUnit feature suite to confirm no
  behavior regressions (UI-only change, but controllers/views are touched).
- `npm run dev` — manual visual pass: Home, Login, a public listing, a Show
  page, an admin page, Profile. Confirm ambient canvas, pill buttons, and soft
  cards render consistently.
- No new automated tests (purely presentational refactor).

## Out of scope

- No new routes, models, controllers, or business logic.
- No dark mode theme work (current look is light-only; keeps it simple).
- No copy/label changes beyond what styling requires.

## Risks / notes

- The ambient `map.svg` overlay is purely decorative and `pointer-events` safe
  (it's a background div). Keep it behind content with `z-10` wrappers.
- `PrimaryButton` is used in many places; the single change is the lowest-risk
  way to propagate the pill style. Spot-check admin action buttons after.
