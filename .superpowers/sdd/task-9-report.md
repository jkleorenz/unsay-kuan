# Task 9 — Storage Link & End-to-End HTTP Smoke Check

**Status:** DONE_WITH_CONCERNS

## storage:link result
`php artisan storage:link` succeeded. `public/storage` now exists and is
symlinked to `storage/app/public`. `Test-Path public/storage` returned `True`.

## Build
`npm run build` succeeded (vite build completed in ~4.7s, assets emitted to
`public/build`).

## Cache
`php artisan config:clear` and `php artisan route:clear` both succeeded.

## HTTP smoke check (php artisan serve --port=8011)
| Route      | Status | Notes |
|------------|--------|-------|
| `/`        | 200    | Serves Inertia app shell (`data-page`, Home component). **Concern:** raw HTML body does NOT contain the literal string "TownLink Hub" because the homepage is client-rendered by Inertia/React (`Home.jsx` <Head> title + <h1> are set in the browser, not in the server HTML). |
| `/businesses` | 200 | Serves correctly. |
| `/login`   | 200    | Serves correctly. |

All three routes return **200**. The only deviation from the literal smoke-check
expectation is the "TownLink Hub" string, which is expected for an Inertia SPA
and is not an actual failure.

## Committed
Yes. `public/storage` is gitignored (no change). However, `git status`
showed pre-existing real, uncommitted work unrelated to the symlink:
- M  `.superpowers/sdd/progress.md`
- ?? `.superpowers/sdd/task-3-report.md` … `task-8-report.md`
- ?? `.superpowers/sdd/task-9-report.md` (this report)

Per task instructions, these real changes were committed.

Commit hash: (see below)
