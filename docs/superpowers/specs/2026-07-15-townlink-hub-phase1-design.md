# TownLink Hub — Phase 1 Design: Business Directory + Homepage + Admin

**Date:** 2026-07-15
**Status:** Approved (design)
**Stack:** Laravel 12 + Inertia.js + React + Tailwind v4 + MySQL (via XAMPP)
**Build approach:** A — Laravel Breeze (Inertia+React) for admin auth + hand-built Business module

## 1. Goal

Build the foundational Phase 1 of TownLink Hub: a public business directory,
a homepage that surfaces featured businesses and search, and an admin area for
verification and moderation. This phase establishes the shared foundation
(auth, categories, admin panel shell, photo storage) that later phases
(Jobs, Tourism, Community) will build on.

This phase covers only the Business module. Jobs, Tourism, and Community are
explicitly out of scope for Phase 1 and appear on the homepage as disabled
"coming soon" cards.

## 2. Key Decisions (resolved during brainstorming)

- **Auth model:** Admin-only accounts. Only administrators log in. The public
  can submit business listings via a form with no login. Business owners do NOT
  get accounts in Phase 1 (this matches the SRD's "User accounts" being listed
  under Future Enhancements).
- **Database:** MySQL / MariaDB (via XAMPP). `.env` `DB_CONNECTION` switches
  from sqlite to mysql.
- **Admin auth:** Use `laravel/breeze` with the Inertia + React stack. Public
  registration is disabled; one admin is seeded.
- **Photos:** Stored locally in `storage/app/public/businesses`, served via
  `php artisan storage:link`. Cloud object storage (S3/R2) is deferred per the
  architecture doc.
- **RBAC:** No Spatie/role-permission tables in Phase 1. The `users` table
  holds admins only. Full multi-role auth is a later-phase concern.
- **Homepage:** Featured approved businesses + global search bar (businesses
  only in Phase 1) + disabled "coming soon" cards for Jobs/Tourism/Community.

## 3. Data Model (MySQL)

### `users` (Breeze default)
Standard Breeze `users` table (`id, name, email, password, remember_token,
timestamps`). Holds admins only. One admin seeded via a database seeder.

### `categories`
| column      | type                | notes                              |
|-------------|---------------------|------------------------------------|
| id          | bigint unsigned PK  |                                    |
| name        | string              | e.g. "Restaurant", "Shop"          |
| slug        | string, unique      | URL/localized key                  |
| created_at  | timestamp           |                                    |
| updated_at  | timestamp           |                                    |

Business categories only in Phase 1.

### `businesses`
| column           | type                | notes                                         |
|------------------|---------------------|-----------------------------------------------|
| id               | bigint unsigned PK  |                                               |
| name             | string              | business name                                 |
| owner_name       | string              | owner / contact person                        |
| contact_number   | string              | phone                                         |
| address          | text                | full address                                  |
| category_id      | FK -> categories    | indexed                                       |
| description      | text, nullable      |                                               |
| operating_hours  | string, nullable    | free-text hours                               |
| status           | enum                | `pending` \| `approved` \| `rejected`         |
| rejection_reason | text, nullable      | shown to admin only                           |
| featured         | boolean, default 0  | toggled by admin for homepage                 |
| created_at       | timestamp           |                                               |
| updated_at       | timestamp           |                                               |

Indexes: `status`, `category_id`, and a composite/`LIKE` index strategy for
search on `name` + `address`.

### `business_photos`
| column      | type                | notes                              |
|-------------|---------------------|------------------------------------|
| id          | bigint unsigned PK  |                                    |
| business_id | FK -> businesses    | cascading delete                   |
| path        | string              | relative path under storage disk   |
| created_at  | timestamp           |                                    |
| updated_at  | timestamp           |                                    |

Allows multiple photos per business.

### Explicitly NOT in Phase 1
`verification_logs`, employer/job tables, tourism tables, community tables,
full RBAC tables. These belong to later phases.

## 4. Admin Authentication (Breeze Inertia + React)

- Install `laravel/breeze` with the `react` (Inertia) option.
- Use the Breeze login + authenticated layout.
- Remove/disable the public `/register` route (redirect or 404).
- A `DatabaseSeeder` (or dedicated `AdminSeeder`) creates one admin user from
  env values (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) or hardcoded dev defaults.
- Admin routes are grouped under `auth` middleware and prefixed `/admin`.

## 5. Public Business Module

Routes (Inertia responses):
- `GET /businesses` — list approved businesses; supports `?category=` filter
  and `?search=` (matches `name`/`address` via `LIKE`, case-insensitive).
- `GET /businesses/{business}` — detail page (name, category, address,
  contact, operating hours, description, photos). Only approved businesses are
  publicly visible; pending/rejected return 404.
- `GET /businesses/submit` — public submission form (no auth).
- `POST /businesses` — stores a new business with `status='pending'`.

Controller: `App\Http\Controllers\BusinessController` (public). Validation
rules enforced server-side (name, owner_name, contact_number, address,
category_id required; photos optional image ≤2MB each, max 3).

## 6. Admin Module

Routes under `/admin` (auth middleware):
- `GET /admin` — dashboard: counts of pending, approved, total businesses, and
  category count.
- `GET /admin/businesses` — list with status filter; approve / reject
  (with reason) / toggle featured / edit / delete actions.
- `GET|POST|GET|PUT|DELETE /admin/categories` — full CRUD for categories.

Controllers:
- `App\Http\Controllers\Admin\BusinessController`
- `App\Http\Controllers\Admin\CategoryController`
- `App\Http\Controllers\Admin\DashboardController`

Admin verifies submissions: pending -> approved (visible publicly) or rejected
(with reason kept internal). Approved businesses can be marked `featured` for
the homepage.

## 7. Homepage (`/`)

Inertia `Home` page:
- Hero section with the platform name/tagline and a **global search bar**
  (single input that submits to `/businesses?search=`).
- **Featured businesses** grid (approved + `featured`, limited to a sensible
  count, e.g. 6).
- **"Coming soon"** disabled cards for Jobs, Tourism, and Community — present
  for layout continuity, not yet functional.

Search in Phase 1 scopes only to businesses. Later phases extend the search
across modules.

## 8. File / Photo Storage

- Disk: `public` disk (`storage/app/public`).
- Business photos uploaded to `storage/app/public/businesses/{id}/`.
- `php artisan storage:link` exposes them at `/storage/...`.
- Validation: `image`, `max:2048` (2MB), up to 3 per business.
- Cloud object storage (S3/R2) deferred; swapping the disk later is the upgrade
  path.

## 9. Architecture / Structure

- Standard Laravel conventions + Inertia React.
- Models: `User` (Breeze), `Category`, `Business`, `BusinessPhoto`.
- Migrations for `categories`, `businesses`, `business_photos`.
- Controllers: public `BusinessController`; admin `DashboardController`,
  `BusinessController`, `CategoryController`.
- Routes: `routes/web.php` (public) + `routes/admin.php` (admin group) or a
  single file with grouped prefixes.
- Inertia React pages:
  - `resources/js/Pages/Home.jsx`
  - `resources/js/Pages/Businesses/Index.jsx`
  - `resources/js/Pages/Businesses/Show.jsx`
  - `resources/js/Pages/Businesses/Submit.jsx`
  - `resources/js/Pages/Admin/Dashboard.jsx`
  - `resources/js/Pages/Admin/Businesses/Index.jsx`
  - `resources/js/Pages/Admin/Businesses/Edit.jsx`
  - `resources/js/Pages/Admin/Categories/Index.jsx`
- Breeze provides `resources/js/Pages/Auth/Login.jsx` and the authenticated
  admin layout.

## 10. Non-Functional Notes

- Mobile-first, responsive Tailwind layouts (per SRD usability/accessibility).
- Server-side validation on all forms (security requirement).
- Admin actions restricted behind `auth` middleware (no public write to
  verified data).
- No admin action logging table in Phase 1; noted as a follow-up for the
  security "actions must be logged" requirement (Phase 4 / later).

## 11. Out of Scope (Phase 1)

- Jobs, Employers, Tourism, Community modules.
- Public user accounts / business-owner logins.
- Payments, chat, reviews, maps integration (OpenStreetMap deferred).
- Search service (Meilisearch/Elasticsearch) — DB `LIKE` is sufficient for v1.
- Redis caching, queues — not needed at this scale yet.

## 12. Success Criteria (Phase 1)

- Visitors can browse, search, and filter approved businesses and view details.
- Anyone can submit a business; it appears as `pending` and is invisible
  publicly until an admin approves.
- An admin can log in, review/approve/reject submissions (with reason), mark
  businesses featured, and manage categories.
- The homepage shows featured businesses and a working business search.
