# Unsay Kuan? — Development Checklist

Track progress phase by phase. Check items off as you go — don't skip ahead to a later phase until the current one is checked off, especially Phase 0–3 (skipping these is where retrofits come from later).

---

## Phase 0 — Before writing code

- [ ] `git init` before any project files exist
- [ ] `.gitignore` set up (`.env`, `vendor/`, `node_modules/`, `storage/*.key`)
- [ ] `CLAUDE.md` (or equivalent) written — stack summary + links to `technical-architecture-revised.md` and `design.md`
- [ ] Local environment decided and working: PHP 8.3+, Composer, Node, MySQL, Redis (or Laravel Sail/Docker)
- [ ] Confirm `composer`, `npm`, `mysql`, `redis-cli` all run without errors before scaffolding

## Phase 1 — Scaffold

- [ ] `laravel new unsay-kuan` with Breeze + Inertia/React starter
- [ ] App boots locally, commit as baseline
- [ ] `spatie/laravel-permission` installed
- [ ] Four roles seeded: job seeker, business owner, community poster, admin/moderator
- [ ] Roles/permissions migration reviewed by hand before running

## Phase 2 — Data model

- [ ] `towns` table (Mahaplag as first row)
- [ ] `categories` table
- [ ] `businesses` table
- [ ] `business_category` pivot table
- [ ] `jobs` table
- [ ] `job_applications` table
- [ ] `tourism_listings` table
- [ ] `community_posts` table
- [ ] `locations` table
- [ ] `media_files` table
- [ ] `verification_logs` table
- [ ] `admin_action_logs` table
- [ ] `reports` table
- [ ] `favorites` table
- [ ] Factories + seeders written for each table
- [ ] Seeded with realistic fake data (~50 businesses across categories minimum)
- [ ] Each migration reviewed manually before running (foreign keys, indexes, cascade rules)

## Phase 3 — Auth and permissions

- [ ] Registration/login working for job seeker, business owner, community poster
- [ ] Admin accounts seeded (not self-registered)
- [ ] Role-gated middleware written
- [ ] Manually tested: job seeker account cannot reach any admin route
- [ ] Manually tested: business owner cannot edit another owner's listing
- [ ] Commit as checkpoint

## Phase 4 — Business directory (first full vertical slice)

- [ ] `design.md` tokens implemented as real CSS variables / Tailwind config
- [ ] Public business listing page (Blade, server-rendered, indexable)
- [ ] Public business detail page
- [ ] Search implemented (MySQL full-text, not Meilisearch yet)
- [ ] Category filter working
- [ ] "Verified only" / "open now" filters working
- [ ] Owner-facing create/edit form (Inertia + React, behind auth)
- [ ] Image upload on business listing — validated (see Phase 7 security items, do basic validation now)
- [ ] Admin verification screen — approve/reject a pending business
- [ ] `verification_logs` entry written on every verification action
- [ ] Manually walked through the entire flow once: create → pending → admin verifies → appears publicly

## Phase 5 — Jobs

- [ ] Job listing page (public, following business pattern)
- [ ] Job detail page
- [ ] Job application flow (`job_applications`)
- [ ] Business owner dashboard shows applications received
- [ ] Applicant can see their application status

## Phase 6 — Tourism

- [ ] Tourism listing page (public, following business pattern)
- [ ] Tourism detail page
- [ ] Admin can create/edit tourism listings (or verified business owners, per your rules)

## Phase 7 — Community posts

- [ ] Community post creation form (behind auth)
- [ ] Public community post feed/detail page
- [ ] Rich-text sanitization applied to post content
- [ ] "Report" button wired to `reports` table
- [ ] Reported posts appear in admin moderation queue

## Phase 8 — Admin dashboard

- [ ] Central dashboard: pending verifications count, open reports count
- [ ] Moderation queue: view reported content, dismiss or take down
- [ ] User management screen (view/suspend accounts)
- [ ] Every admin action writes to `admin_action_logs`

## Phase 9 — Security pass

- [ ] Rate limiting on login attempts
- [ ] Rate limiting on job applications
- [ ] Rate limiting on community post creation
- [ ] File uploads: server-side mime-type check (not just extension)
- [ ] File uploads: size cap enforced
- [ ] File uploads: images re-encoded on upload (strips EXIF/malicious payloads)
- [ ] Rich-text fields sanitized against XSS
- [ ] Re-tested: all admin routes unreachable by non-admin roles, with real features now in place
- [ ] `.env` not committed to git, confirmed
- [ ] Production secrets are different from development secrets

## Phase 10 — Testing and monitoring

- [ ] Pest/PHPUnit tests: auth flows
- [ ] Pest/PHPUnit tests: one CRUD cycle per content type
- [ ] Pest/PHPUnit tests: permission boundaries (role X cannot do Y)
- [ ] Pest/PHPUnit tests: moderation flow (report → queue → action)
- [ ] Laravel Horizon installed and monitoring queues
- [ ] Error monitoring (Sentry or similar) configured
- [ ] Uptime monitoring configured on the public site

## Phase 11 — Deploy

- [ ] Staging environment set up, mirrors production
- [ ] Full click-through test on staging before first production deploy
- [ ] CI pipeline runs test suite before allowing deploy
- [ ] Automated database backups configured
- [ ] Automated object storage (media) backups configured
- [ ] Backup restore actually tested once (not just configured)
- [ ] CDN configured for static assets
- [ ] Production deploy
- [ ] Post-deploy smoke test: register, create a listing, verify it, search for it

## Ongoing habits (every session)

- [ ] Commit after every working feature, not at end of day
- [ ] Re-share `technical-architecture-revised.md` / `design.md` with the AI at the start of long sessions
- [ ] Review every migration and permission check by hand — don't rubber-stamp these two categories
- [ ] Ask AI to explain unfamiliar generated code back to you before merging it
