# UI/UX Overhaul — Comprehensive Frontend Pass

Date: 2026-07-16
Status: Draft

## Scope

Bring all frontend surfaces (Blade public pages, Inertia+React authenticated pages, shared components, Auth/Profile flows) into consistent alignment with the design system defined in `design.md`. The work is organized in three layers.

---

## Layer 1: Foundations

### Config & CSS Fixes

| File | Change | Reason |
|---|---|---|
| `tailwind.config.js` | Add `300: '#D4D4D8'` to the gray color map | Design.md defines `--gray-300` but it's missing from Tailwind config; `bg-gray-300` falls back to Tailwind default (#D1D5DB) instead |
| `resources/views/app.blade.php` | Remove `<link href="https://fonts.bunny.net/css?family=figtree:...">` | Figtree is the Breeze default font; the project uses Inter (loaded via `app.css`). Dual font download is wasteful and the wrong font is used as fallback |
| `resources/js/app.jsx` | Change NProgress color from `'#4B5563'` to `'#6366F1'` | Progress bar should use the accent color, not a neutral gray |
| `resources/css/app.css` | Add `@media (prefers-reduced-motion: reduce)` block | Design.md §10 requires respecting user motion preferences |

### Shared Components Re-skin (11 files)

All `resources/js/Components/` — replace Breeze default colors with design tokens:

| Component | Change |
|---|---|
| **PrimaryButton** | `bg-gray-800 hover:bg-gray-700` → `bg-accent-500 hover:bg-accent-600`; focus ring `ring-indigo-500` → `ring-accent-100` |
| **SecondaryButton** | Focus ring `focus:ring-indigo-500` → `focus:ring-accent-100` |
| **DangerButton** | `bg-red-600 hover:bg-red-500` → `bg-danger hover:#B91C1C`; focus ring → `focus:ring-red-200` |
| **TextInput** | `border-gray-300` → `border-gray-200`; focus `border-indigo-500 ring-indigo-500` → `border-accent-500 ring-[3px] ring-accent-100` |
| **Checkbox** | `text-indigo-600 focus:ring-indigo-500` → `text-accent-500 focus:ring-accent-100` |
| **InputError** | `text-red-600` → `text-danger` |
| **InputLabel** | No change (already `text-gray-700`) |
| **NavLink** | Active: `border-indigo-400 text-indigo-700` → `border-accent-500 text-accent-700` |
| **ResponsiveNavLink** | Active: `border-indigo-400 bg-indigo-50 text-indigo-700` → `border-accent-500 bg-accent-50 text-accent-700` |
| **Modal** | Backdrop `bg-gray-500/75` → `bg-gray-900/40` (matches design.md: `rgba(24,24,27,0.4)`) |
| **Dropdown** | Minor color alignment — ensure text/links use `gray-700`/`accent-700` instead of `gray-800`/`indigo-600` |

### Layout Tweaks

- **AuthenticatedLayout.jsx:** Header section `bg-white shadow` → `bg-white border-b border-gray-200`.
- **GuestLayout.jsx:** Add `border border-gray-200` to card container; change `shadow-md` to `shadow-sm`.

---

## Layer 2: Pages

### Auth Pages (Login, Register, ForgotPassword, ResetPassword, VerifyEmail, ConfirmPassword)

- No structural changes — Layer 1 component fixes propagate into these pages automatically.
- Layout pass: adjust card padding, section spacing.
- Buttons: strip Breeze's uppercase tracking → normal case weight 500.

### Profile Pages (Edit.jsx + 3 Partials)

- Component fix covers most visual changes.
- Section heading styles: align with design.md §3 (18-20px, weight 600).
- Delete account: use outlined danger button instead of solid red fill.

### Welcome / Splash Page (Welcome.jsx)

Replace Laravel marketing splash with a branded landing page:
- Hero section with app name, tagline, CTAs
- Three feature cards: Job Board, Business Directory, Community Posts
- Minimal footer

### Dashboard Overhaul (Dashboard.jsx)

Replace skeleton with role-aware content using the card pattern:

| Role | Dashboard content |
|---|---|
| **job_seeker** | Recent job listings, application status summary, "Browse Jobs" CTA |
| **business_owner** | Business listing stats, recent applications, "Add Business" CTA |
| **community_poster** | Recent posts with moderation status, "Write Post" CTA |
| **admin** | Already has rich admin dashboard — keep it, ensure visual consistency |

### Nav Role-Gating (AuthenticatedLayout.jsx)

| Role | Visible nav items |
|---|---|
| **business_owner** | Dashboard, My Businesses, My Jobs, Applications, Write Post |
| **job_seeker** | Dashboard, Applications |
| **community_poster** | Dashboard, Write Post |
| **admin** | Dashboard + all admin links |

---

## Layer 3: Polish

### Empty States

Replace bare `<p>` tags with centered card + heading + body + CTA.

| Page | Empty state |
|---|---|
| Businesses/Index | "No businesses yet. Add your first business" |
| Jobs/Index | "No job listings yet. Post a job" |
| Jobs/MyApplications | "You haven't applied. Browse Jobs" |
| CommunityPosts/Create | "No posts yet. Write the first one." |

### Loading States

- LoadingSpinner component: CSS-only, accent-500 color, 20-24px.
- Show during form submission: disable button, replace text with spinner.
- Style Inertia's NProgress bar (already in app.jsx — just change color).

### Search on Owner Pages

- `Businesses/Index.jsx`: search by name.
- `Jobs/Index.jsx`: search by title.

### `prefers-reduced-motion`

Covered in Layer 1 CSS. No JS-based animations exist.

---

## Non-Goals

- No new routes or backend logic.
- No database schema changes.
- No new Inertia pages for public routes (Blade stays).
- No illustration or icon set changes.
- No dark mode.
