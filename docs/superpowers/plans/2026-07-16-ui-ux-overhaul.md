# UI/UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align all frontend surfaces with the design system defined in `design.md`.

**Architecture:** Three-layer approach: (1) foundation fixes (config, shared components, layouts), (2) page overhauls (Welcome, Dashboard, Auth/Profile), (3) polish (empty states, search, loading states, nav gating). Public Blade templates already use design tokens — focus is on Inertia+React authenticated pages and shared components.

**Tech Stack:** Laravel 12 + Inertia + React, Tailwind CSS, spatie/laravel-permission

## Global Constraints

- Design tokens defined in `design.md` (accent-500, gray-0–900, Inter font, 4px base spacing)
- Design tokens already implemented in `tailwind.config.js` and `resources/css/app.css`
- No new backend routes or database changes
- No new npm packages
- Role names: `admin`, `business_owner`, `job_seeker`, `community_poster`

---

### Task 1: CSS/Tailwind config fixes

**Files:**
- Modify: `resources/views/app.blade.php:10-11`
- Modify: `resources/js/app.jsx:23`
- Modify: `resources/css/app.css:36-41`

- [ ] Remove Figtree font link from `app.blade.php`
- [ ] Change NProgress color to `#6366F1` in `app.jsx`
- [ ] Add `prefers-reduced-motion` media query in `app.css`

### Task 2: Shared components re-skin

**Files:**
- Modify: `resources/js/Components/PrimaryButton.jsx:11-13`
- Modify: `resources/js/Components/SecondaryButton.jsx:13`
- Modify: `resources/js/Components/DangerButton.jsx:11`
- Modify: `resources/js/Components/TextInput.jsx:24`
- Modify: `resources/js/Components/Checkbox.jsx:7`
- Modify: `resources/js/Components/InputError.jsx:5`
- Modify: `resources/js/Components/NavLink.jsx:15`
- Modify: `resources/js/Components/ResponsiveNavLink.jsx:14`
- Modify: `resources/js/Components/Modal.jsx:45`

- [ ] PrimaryButton: `bg-gray-800` → `bg-accent-500`, focus ring `indigo-500` → `accent-100`, strip uppercase
- [ ] SecondaryButton: `border-gray-300` → `border-gray-200`, focus ring → `accent-100`
- [ ] DangerButton: `bg-red-600` → `bg-danger`, focus ring → `red-200`
- [ ] TextInput: `border-gray-300` → `border-gray-200`, focus → `accent-500`/`accent-100`
- [ ] Checkbox: `text-indigo-600` → `text-accent-500`, focus ring → `accent-100`
- [ ] InputError: `text-red-600` → `text-danger`
- [ ] NavLink: active `border-indigo-400` → `border-accent-500`
- [ ] ResponsiveNavLink: active `indigo-*` → `accent-*`
- [ ] Modal: backdrop `bg-gray-500/75` → `bg-gray-900/40`

### Task 3: Layout fixes

**Files:**
- Modify: `AuthenticatedLayout.jsx:91`
- Modify: `GuestLayout.jsx:13`

- [ ] Header shadow → `border-b border-gray-200`
- [ ] GuestLayout: add `border border-gray-200`, shadow-md → shadow-sm

### Task 4: Welcome page rewrite

**File:**
- Modify: `Welcome.jsx`

- [ ] Replace Laravel splash with hero + 3 feature cards + footer

### Task 5: Dashboard overhaul

**Files:**
- Modify: `app/Http/Middleware/HandleInertiaRequests.php:20-24`
- Modify: `Dashboard.jsx`

- [ ] Add `userRole` to Inertia shared props
- [ ] Role-aware dashboard content per role

### Task 6: Auth/Profile polish

**Files:**
- Modify: `Profile/Edit.jsx:20-34`
- Modify: `Profile/Partials/DeleteUserForm.jsx:51`
- Modify: `Profile/Partials/UpdateProfileInformationForm.jsx:30,80`
- Modify: `Profile/Partials/UpdatePasswordForm.jsx:50`

- [ ] Update card containers to use design tokens
- [ ] Section headings: `font-medium` → `font-semibold`
- [ ] Fix lingering `indigo-500` focus ring reference

### Task 7: Nav role-gating

**File:**
- Modify: `AuthenticatedLayout.jsx:8-87`

- [ ] Gate nav items by user role: business_owner, job_seeker, community_poster

### Task 8: Polish (empty states, LoadingSpinner, search)

**Files:**
- Create: `LoadingSpinner.jsx`
- Modify: `Businesses/Index.jsx`, `Jobs/Index.jsx`, `Jobs/MyApplications.jsx`

- [ ] Create LoadingSpinner component
- [ ] Rich empty states with CTAs on owner pages
- [ ] Client-side search on owner businesses/jobs pages
