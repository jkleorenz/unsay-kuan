# Unsay Kuan? — Phase 2 Design: Jobs + Employer Info

**Date:** 2026-07-15
**Status:** Approved (design)
**Stack:** Laravel 12 + Inertia.js + React + Tailwind v4 + MySQL (same as Phase 1)
**Build approach:** Mirror the Phase 1 Business module (admin-only auth, public submission → `pending`, admin verification)

> **Naming note:** The product is **"Unsay Kuan?"** (Cebuano for "What's there?"). The earlier
> SRD document called the platform "TownLink Hub", but that was only the document title. All user
> -facing copy and docs for this project use **"Unsay Kuan?"**. Phase 1 accidentally hardcoded the
> string "TownLink Hub" on the homepage; this phase renames it (see Task 0).

## 1. Goal

Add the Jobs module to Unsay Kuan?: a public job board where anyone can browse/filter/submit jobs,
and an admin can verify and moderate them. "Employer profiles" are represented by a `company_name`
field on each job — there are NO employer accounts in this phase (admin-only auth, consistent with
Phase 1). This reuses all Phase 1 patterns: controllers, Inertia React pages, the `/admin` group,
validation, and the `pending → approved/rejected` moderation flow.

## 2. Key Decisions (resolved during brainstorming)

- **Employer model:** Admin-only + public submission. Jobs are submitted via a public form (company
  name + details, no login) or created by admin, then approved/moderated like businesses. No employer
  login/account table in this phase.
- **Homepage integration:** The "Jobs" coming-soon card becomes a real link to `/jobs`, and a
  "Featured Jobs" section is added (approved + featured). Homepage global search stays business-only;
  jobs have their own filters on `/jobs`.
- **Categorization:** Reuse the existing shared `categories` table (already admin-managed in Phase 1).
- **No new packages, no new auth.** Fully builds on Phase 1 foundation.

## 3. Data Model (MySQL)

### `jobs` (new table)
| column            | type                | notes                                              |
|-------------------|---------------------|----------------------------------------------------|
| id                | bigint unsigned PK  |                                                    |
| title             | string              | job title                                          |
| company_name      | string              | employer / company name (the "employer profile")   |
| location          | string              | free-text location                                 |
| category_id       | FK -> categories    | indexed                                            |
| experience_level  | enum                | `entry` \| `mid` \| `senior`                        |
| salary_range      | string, nullable    | e.g. "PHP 15k–20k"                                 |
| description       | text, nullable      |                                                    |
| requirements      | text, nullable      |                                                    |
| application_method| string              | how to apply (email, link, walk-in)                |
| status            | enum                | `pending` \| `approved` \| `rejected`              |
| rejection_reason  | text, nullable      | admin-only                                         |
| featured          | boolean, default 0  | for homepage section                               |
| posted_at         | date, default now   |                                                    |
| created_at        | timestamp           |                                                    |
| updated_at        | timestamp           |                                                    |

Indexes: `status`, `category_id`, `experience_level`.

### Reused
- `categories` (Phase 1) — job categorization.
- `users` (admin only), `businesses`, `business_photos` — untouched.

## 4. Public Jobs Module

Routes (Inertia responses), mirroring `BusinessController`:
- `GET /jobs` — list approved jobs; filters: `?category=`, `?location=` (search), `?experience=`,
  plus free-text `?search=` on `title`/`company_name`. Paginated.
- `GET /jobs/{job}` — detail. 404 if `status != 'approved'`.
- `GET /jobs/submit` — public submission form (no auth).
- `POST /jobs` — stores a new job with `status='pending'`. Validation: title, company_name, location,
  category_id, experience_level, application_method required; salary_range/description/requirements
  optional.

Controller: `App\Http\Controllers\JobController` (public).

## 5. Admin Jobs Module

Routes under `/admin` (auth middleware, `admin.` prefix):
- `GET /admin/jobs` — list with status filter; approve / reject (with reason) / toggle featured /
  edit / delete.
- `App\Http\Controllers\Admin\JobController` — `index`, `edit`, `update`, `approve`, `reject`,
  `toggleFeature`, `destroy`. Mirrors `Admin\BusinessController`.
- `Admin\DashboardController` — add `pending_jobs` / `approved_jobs` counts to the existing `counts`
  array (backwards compatible; the Dashboard page just shows two more cards).

## 6. Homepage (`/`)

In `routes/web.php` root closure, also load featured jobs:
```php
$featuredJobs = Job::approved()->where('featured', true)
    ->with('category')->latest('posted_at')->take(6)->get();
return Inertia::render('Home', ['featured' => $featured, 'featuredJobs' => $featuredJobs]);
```
In `Home.jsx`:
- The "Jobs" coming-soon card becomes a link to `/jobs`.
- Add a "Featured Jobs" section (approved + featured), each linking to `/jobs/{id}`.
- Rename "TownLink Hub" → "Unsay Kuan?" in the `<h1>` and `<Head title>`.

## 7. File Structure (additions)

**Migrations / Models**
- `database/migrations/2026_07_15_010001_create_jobs_table.php`
- `app/Models/Job.php` (with `category()`, `scopeApproved()`, `featured` cast)

**Controllers**
- `app/Http/Controllers/JobController.php` (public)
- `app/Http/Controllers/Admin/JobController.php`
- Modify: `app/Http/Controllers/Admin/DashboardController.php` (add job counts)

**Routes**
- Modify: `routes/web.php` (jobs routes + homepage data; rename branding)
- Modify: `routes/admin.php` (admin jobs group)

**React pages**
- `resources/js/Pages/Jobs/Index.jsx`
- `resources/js/Pages/Jobs/Show.jsx`
- `resources/js/Pages/Jobs/Submit.jsx`
- Modify: `resources/js/Pages/Home.jsx` (featured jobs + Jobs link + rename)
- Modify: `resources/js/Pages/Admin/Dashboard.jsx` (job count cards)

**Tests**
- `tests/Feature/JobSubmissionTest.php` (pending creation, public visibility, admin approve)

## 8. Non-Functional Notes

- Mobile-first Tailwind layouts (consistent with Phase 1).
- Server-side validation on submission and admin forms.
- Admin actions behind `auth` middleware.
- Pending jobs invisible publicly (404 on detail; excluded from listings).

## 9. Out of Scope (Phase 2)

- Employer/user accounts, login, or dashboards.
- Job applications/in-app apply flow (only `application_method` info is shown).
- Tourism and Community modules (later phases).
- Salary as structured numeric range, maps, or automated matching.

## 10. Success Criteria (Phase 2)

- Visitors can browse, search, and filter approved jobs by category, location, and experience.
- Anyone can submit a job; it appears as `pending` and is invisible publicly until admin approval.
- An admin can review/approve/reject (with reason), feature, edit, and delete jobs.
- The homepage shows featured jobs and links to the jobs page; branding reads "Unsay Kuan?".
