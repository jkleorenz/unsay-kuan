# AGENTS.md — Unsay Kuan (Local Community Hub)

AI-readable guide to this codebase. Read this before making changes.

## What this is

**Unsay Kuan** is a community web hub for a local town (Cebuano: "what's that").
It lets residents browse and submit listings across four content types, with
admin moderation before anything goes public:

- **Businesses** — local shops/services (`Business`, `BusinessPhoto`, `Category`)
- **Jobs** — job listings (`Job` via `job_listings` table)
- **Tourism** — tourist spots/attractions (`Tourism`, `TourismPhoto`)
- **Community** — community posts (`CommunityPost`)

Listings are submitted by anyone, then **moderated** (approved/rejected) by an
admin before they appear publicly.

## Stack

- **Backend:** Laravel 12 (PHP 8.2+), SQLite (`database/database.sqlite`)
- **Frontend:** Inertia v2 + React 18, built with Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Auth:** Laravel Breeze (Inertia/React starter)
- **Routing:** `tightenco/ziggy` (named routes available in JS)
- **Icons:** `@phosphor-icons/react`

## Directory map

```
app/
  Http/
    Controllers/
      BusinessController, JobController, TourismController,
      CommunityController, SearchController   # public listing flows
      Admin/                                   # admin moderation CRUD
    Middleware/
      Admin.php                                # 'admin' guard middleware
      HandleInertiaRequests.php                # shares `auth.user` prop
    Requests/                                  # form request validation
  Models/                                       # Business, Job, Tourism, CommunityPost, Category, User...
routes/
  web.php     # public + auth routes
  admin.php   # /admin/* (auth + admin middleware)
  auth.php    # Breeze auth routes
resources/js/
  Pages/        # Inertia pages, mirror route names (Businesses/Index.jsx, etc.)
  Components/   # shared UI (PrimaryButton, TextInput, Modal, Dropdown...)
  Layouts/      # PublicLayout, AuthenticatedLayout, GuestLayout
database/
  migrations/   # note: custom migrations use 2026_07_15_* timestamps
  seeders/      # DatabaseSeeder, AdminSeeder, CategorySeeder
  factories/
tests/Feature/  # one test file per submission/moderation flow
docs/superpowers/ # specs + plans (design docs, not code)
```

## Key conventions (follow these)

- **Moderation flow:** every listing model has a `status` column
  (`pending` | `approved` | `rejected`). Public controllers only show
  `->approved()` records (see `Business::scopeApproved`). New submissions are
  created with `status => 'pending'`. Admin controllers approve/reject.
- **Featured:** `Business`/`Tourism` have a `featured` boolean toggled by admin.
- **Shared Inertia props:** `HandleInertiaRequests::share()` exposes
  `auth.user` to every page. Add new global props there.
- **JS path alias:** `@/` → `resources/js/*` (see `jsconfig.json`). Use it for imports.
- **Routes:** named with `->name(...)`; use Ziggy's `route()` in JS.
- **Validation:** do it in controllers via `$request->validate([...])` or
  `app/Http/Requests` form requests; reuse the existing pattern in
  `BusinessController` when adding a new listing type.
- **File uploads:** stored via `Storage::disk('public')`; photos use a
  `*Photo` child model (e.g. `BusinessPhoto`).
- **Admin access:** gated by the `admin` middleware + `users.role` column
  (seeded by `AdminSeeder`).

## Common commands

```bash
composer setup          # install deps, .env, key, migrate, npm install + build
composer dev            # php artisan serve + queue:listen + pail + vite (watch)
composer test           # run PHPUnit feature/unit tests
php artisan migrate      # apply DB migrations (SQLite)
php artisan db:seed      # seed admin + categories
npm run dev             # vite dev server only
npm run build           # production frontend build
```

## When adding a new feature

1. Migration(s) in `database/migrations/`, model in `app/Models/`, factory + seeder if needed.
2. Routes in `routes/web.php` (public) and/or `routes/admin.php` (admin).
3. Controllers in `app/Http/Controllers/` (and `Admin/` for moderation).
4. Inertia page in `resources/js/Pages/` matching the route's page name.
5. Reuse `Layouts/`, `Components/`, and the moderation pattern above.

## Tests

`tests/Feature/` has one file per flow (e.g. `BusinessSubmissionTest`,
`AdminBusinessModerationTest`). Run `composer test`. Add a test when you
change a submission or moderation path.
