# Unsay Kuan? — Development Roadmap
*Building this as a solo dev with AI ("vibe coding") assistance*

This assumes you're using Claude Code, Cursor, or similar — an AI that can read/write files in your actual project, not just chat. The core idea throughout: **you drive architecture and review, AI drives typing.** The two reference docs you already have (`unsay-kuan-technical-architecture-revised.md` and `design.md`) are your steering documents — feed them to the AI at the start of every session so it doesn't drift.

---

## Phase 0 — Before writing any code

1. **Set up version control first.** `git init` before the first file exists. Commit after every working feature, not at the end of the day. This is your undo button when an AI-generated change breaks something — without it, you'll be tempted to just keep prompting "fix it" on top of broken code instead of reverting.
2. **Create a `CLAUDE.md` (or equivalent) in your project root** — a short file describing the stack, conventions, and pointing to your architecture and design docs. Most AI coding tools auto-read this file at the start of a session, so you stop repeating context every time.
3. **Decide your local dev environment now**, not mid-project: PHP 8.3+, Composer, Node, MySQL, Redis — either installed locally or via Laravel Sail (Docker). Sail is the easier "vibe coding" path since AI-generated setup instructions are more predictable in a containerized environment.

---

## Phase 1 — Scaffold the skeleton

1. `laravel new unsay-kuan` → choose Breeze with the Inertia + React starter kit when prompted (this gives you session auth wired up already, matching Section 7 of the architecture doc).
2. Get it running locally and commit before touching anything else. This is your known-good baseline.
3. Install `spatie/laravel-permission` immediately, before writing any other migration. Retrofitting roles onto existing tables is exactly the kind of rework the architecture review flagged — avoid it by doing this first.
4. **AI prompt pattern for this phase:** paste in Section 7 of the architecture doc and ask the AI to scaffold the roles/permissions seeder for your four actor types (job seeker, business owner, community poster, admin). Review the generated migration yourself before running it — this is cheap to check now and expensive to unwind later.

---

## Phase 2 — Data model first, features second

Build migrations in this order (matches the dependency chain, and matches Section 8 of the architecture doc):

1. `towns` — even with just Mahaplag as the only row, this table existing from day one is what saves you a painful retrofit later.
2. `categories`
3. `businesses` + `business_category` pivot
4. `jobs` + `job_applications`
5. `tourism_listings`
6. `community_posts`
7. `locations`, `media_files`
8. `verification_logs`, `admin_action_logs`, `reports`, `favorites`

**Vibe coding tip:** don't ask the AI to generate all migrations in one giant prompt. Do one table at a time, review the generated schema, run it, seed a few fake rows, and only then move to the next. A single large generation is harder to review carefully — you'll skim it, and that's when a wrong foreign key or missing index slips through.

After migrations: write factories and seeders for realistic fake data early. Having 50 fake businesses across a few categories makes every UI screen you build afterward far easier to evaluate — an empty table hides layout bugs.

---

## Phase 3 — Auth and permissions end-to-end

1. Wire up registration/login flows for each actor type (job seeker, business owner, community poster sign up the same way; admin accounts are seeded, not self-registered).
2. Build role-gated middleware and test it manually with a test account for each role before building any actual feature UI. Confirm a job seeker literally cannot hit an admin route.
3. Commit here. This is a natural checkpoint — auth bugs are much easier to find in isolation than buried under six features.

---

## Phase 4 — Build one full vertical slice first

Resist the urge to build all four content types in parallel. Pick **business directory** (since you already have the prototype and architecture for it) and build it completely — list, detail page, search/filter, create/edit form, admin verification — before starting jobs, tourism, or community posts.

Why: this first slice is where you'll work out your actual patterns — how Blade public pages talk to the database, how Inertia/React handles the owner dashboard, how the design.md tokens get implemented as actual CSS/Tailwind config. Once that pattern exists, jobs/tourism/community posts become "repeat the business pattern with different fields," which is exactly the kind of repetitive work AI tools are best at — and where your review burden drops, because you already trust the pattern.

**Order within the slice:**
1. Public listing page + detail page (Blade, per Section 3/5 of the architecture doc) — read-only, no auth needed, easiest to verify visually.
2. Search and filter (start with MySQL full-text per Section 10 — don't reach for Meilisearch yet).
3. Owner-facing create/edit form (Inertia + React, behind auth).
4. Admin verification screen (Inertia + React, behind admin role).

Implement `design.md` as real CSS variables / Tailwind config at the start of this phase, not after. Retrofitting a design system onto already-built screens means re-touching every component twice.

---

## Phase 5 — Repeat the pattern for the remaining content types

Jobs → tourism → community posts, in that order (jobs has the extra `job_applications` relationship, tourism is closest to businesses structurally, community posts has moderation/reporting which you'll want fresh in mind before layering it into the admin dashboard next).

**AI prompt pattern:** literally reference the business directory files you already have — "follow the same pattern as `BusinessController` and `resources/js/Pages/Businesses`, but for jobs, with these field differences: ..." This keeps the codebase consistent and gives the AI a concrete template instead of inventing a new pattern each time.

---

## Phase 6 — Admin dashboard and moderation

1. Central admin view: pending verifications, flagged/reported content, user management.
2. Wire up `admin_action_logs` so every moderation action is recorded — build this alongside the actions themselves, not as a separate pass at the end (it's easy to forget half the action types if you go back later).
3. Build the `reports` flow: a "report" button on listings/posts → feeds the admin queue → admin can dismiss or take down.

---

## Phase 7 — Security pass (treat as a checklist, not a vibe)

This is the one phase where you should slow down and review line-by-line rather than trust-and-move-on, per Section 14 of the architecture doc:

- [ ] Rate limiting on login, job applications, community post creation
- [ ] File upload validation: mime-type sniffing (not extension check), size caps, image re-encoding on upload
- [ ] Rich-text sanitization on any community post fields that allow formatting
- [ ] Confirm the report/flag mechanism actually reaches the admin queue
- [ ] Confirm admin routes are unreachable by non-admin roles (re-test from Phase 3, now with real features behind them)
- [ ] `.env` secrets not committed; production secrets rotated from whatever you used in development

AI is genuinely useful here for a second-pass review: paste a controller and ask "what security issues do you see in this file specifically" rather than "is my app secure" — narrow questions get sharper answers than broad ones.

---

## Phase 8 — Testing and monitoring

1. Write Pest tests for: auth flows, one CRUD cycle per content type, the permission boundaries from Phase 3, and the moderation flow.
2. Set up Laravel Horizon for queue visibility.
3. Add error monitoring (Sentry or similar) before you have real users, not after your first bug report.

---

## Phase 9 — Deploy

1. Staging environment first — deploy here, click through everything, before touching production.
2. Set up a CI pipeline that runs your Pest suite before allowing a deploy.
3. Configure automated backups for MySQL and object storage, and actually test a restore once. An untested backup is a hope, not a plan.

---

## General vibe-coding habits worth keeping throughout

- **Small prompts, small diffs.** Ask for one file or one feature at a time. Large generated diffs are where bugs hide from review.
- **Read every migration and every permission check yourself.** These two categories of code are disproportionately expensive to get wrong later — everything else is easier to fix after the fact.
- **Re-paste your reference docs often.** Architecture and design docs drift out of the AI's active context in long sessions. When you notice the AI suggesting something that contradicts a doc, that's a signal to re-share it, not a sign the doc is wrong.
- **Commit before big AI-driven refactors**, so "make this component match the new pattern" has a clean rollback point if it goes sideways.
- **Ask the AI to explain unfamiliar code back to you**, especially anything touching auth, payments, or file uploads. If you can't explain what a block of code does, you can't safely review it — and you're the one who has to maintain it after this project is "done."
