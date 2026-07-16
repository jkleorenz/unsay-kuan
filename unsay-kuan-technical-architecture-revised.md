# Unsay Kuan?
## Technical Architecture — Revised
*Version 2 · Revised after architecture review · July 16, 2026*

> **Revision note:** This version incorporates fixes identified in an architecture review of v1: a rendering-strategy decision for public pages, a real permissions model, missing data model entities, and an expanded security and operations checklist. Changed or new material is marked below.

---

### 1. Architecture Overview

Unsay Kuan? will use a modular web application architecture built around a Laravel backend and a modern React-based frontend. The system will support public browsing, account-based actions, content moderation, and admin verification, across four primary content areas: business directory, job listings, tourism, and community posts.

Laravel + Inertia + React remains a practical fit: Laravel handles routing, validation, authentication, and database operations, while React provides the interactive interface for search, filtering, and dashboards. The revision below narrows exactly where React/Inertia is used versus where a simpler server-rendered approach is more appropriate.

### 2. Recommended Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend (interactive) | React with Inertia.js | Dashboards, forms, filtering, admin screens |
| Frontend (public pages) | Blade + minimal JS, or Inertia SSR | Needed for SEO/speed — see Section 3 |
| Backend | Laravel 13 | PHP 8.3+ |
| Database | MySQL | InnoDB, utf8mb4 |
| Cache & queues | Redis | Sessions, cache, Horizon-managed queues |
| File storage | Amazon S3 / Cloudflare R2 | Never local disk in production |
| Maps & location | OpenStreetMap (default), Google Maps (later) | Start low-cost, add geocoding if needed |
| Web auth | Laravel session auth (Breeze/Fortify) | For the Inertia web app |
| API auth | Laravel Sanctum | Only if/when a mobile app or public API ships |
| Permissions | spatie/laravel-permission | Replaces a bare roles column — see Section 7 |
| Search | MySQL full-text (v1) → Meilisearch (triggered) | See Section 10 for the migration trigger |

### 3. Rendering Strategy for Public Pages *(new section)*

The v1 draft did not address how public, unauthenticated pages (business listings, job posts, tourism pages) get indexed by search engines or rendered on first load. A pure Inertia + React SPA renders client-side, which weakens SEO and delays time-to-first-paint on a directory site where discoverability is the whole point.

Two viable paths:

- Split rendering by concern: use plain Blade templates for public, read-only pages so they're fast and fully indexable out of the box, and reserve Inertia + React for logged-in, interactive surfaces (dashboards, posting forms, admin moderation).
- Or, keep one stack everywhere and add Inertia SSR (a Node server rendering the initial React payload) so public pages are still indexable and fast, at the cost of an extra Node process to operate.

**Recommendation:** start with the split approach. It's simpler to operate, avoids running a Node SSR process in production, and each public listing page can carry its own meta tags and Open Graph data for social sharing without extra tooling.

### 4. Why This Stack Fits

Laravel remains a strong choice for content-heavy applications: authentication, validation, admin workflows, and database operations are well supported out of the box. Inertia + React continues to fit dashboard-style, logged-in portals where the frontend needs to stay interactive without a fully separate API-first architecture. OpenStreetMap remains a practical, low-cost mapping option for showing business locations and tourism spots.

### 5. Frontend Layer

- A mobile-first home page (Blade, server-rendered)
- Search and filter pages (Blade shell with React-powered filter widgets, or Inertia if SSR is adopted)
- Job listing pages (Blade, server-rendered)
- Business directory pages (Blade, server-rendered)
- Tourism pages (Blade, server-rendered)
- Community post pages (Blade, server-rendered)
- Admin dashboard screens (Inertia + React)
- Account dashboards for job seekers, business owners, and community posters (Inertia + React)

### 6. Backend Layer

Laravel will handle:

- User authentication and account types (job seeker, business owner, community poster, admin/moderator)
- Role and permission management via a dedicated package rather than a single role column
- CRUD operations for jobs, businesses, tourism posts, and community posts
- Admin verification and moderation, with a general admin action audit log
- Validation and business rules
- File uploads and data processing, including image re-encoding on upload

### 7. Authentication and Authorization *(expanded)*

The v1 draft listed "Laravel auth system, optionally Sanctum" without distinguishing their roles. Clarified division:

- Session-based auth (Laravel Breeze or Fortify) handles login for the web app itself — this is the primary auth path.
- Sanctum is reserved for issuing API tokens if a mobile app or external API consumer is added later. Not needed for the web app alone.

Roles and permissions: a single `roles` table with string comparisons doesn't scale past two or three roles. Adopt `spatie/laravel-permission` (or equivalent) from the start, and model at least four actor types: job seeker, business owner, community poster, and admin/moderator.

### 8. Database Layer

| Table | Status | Purpose |
|---|---|---|
| users | carried over | All account types |
| roles / permissions | revised | Backed by a permissions package |
| towns | **new** | First-class entity — required before Mahaplag becomes town #1 of many |
| businesses | carried over | Core directory listings |
| business_category (pivot) | **new** | Businesses can span more than one category |
| categories | carried over | Shared across businesses, jobs, tourism |
| jobs | carried over | Job postings |
| job_applications | **new** | Previously missing — jobs had no way to record an application |
| tourism_listings | carried over | |
| community_posts | carried over | |
| locations | carried over | Geo data per listing |
| verification_logs | carried over | Business verification history |
| admin_action_logs | **new** | General audit trail for all admin/moderator actions |
| favorites | **new** | Saved listings per user |
| reports | **new** | User-submitted flags feeding the moderation queue |
| media_files | carried over | |

The addition of `towns` as a first-class table is the most structurally important change: v1 mentioned future towns as a scaling goal but didn't reflect it anywhere in the schema.

### 9. Caching and Performance

Redis should be used for cached search results, session storage, and queue jobs, **supervised in production by Laravel Horizon** *(note added — v1 didn't mention queue supervision, a common source of silent job failures)*.

### 10. Search and Filtering

The first version can use MySQL full-text search on indexed columns — adequate at launch, but not fuzzy or truly relevance-ranked.

**Migration trigger (added):** migrate to Meilisearch or Elasticsearch when listings exceed roughly 5,000 records, or when search relevance becomes a recurring support issue, whichever comes first.

### 11. File and Media Storage

Business photos, logos, tourism images, and documents should be stored in cloud object storage, not local disk. All uploads must pass server-side mime-type validation, size limits, and image re-encoding on upload to strip EXIF metadata and neutralize embedded payloads.

### 12. Mapping and Location Services

OpenStreetMap for map pins and "near me" discovery at launch; Google Maps later if advanced routing or geocoding is needed.

### 13. Deployment Model

- Laravel app on a VPS or managed host, with a **staging environment** mirroring production before any deploy
- A **CI pipeline** running the test suite before deploys are allowed
- Database hosted separately, with **automated, tested backups**
- Object storage for media, included in the backup plan
- CDN for static assets

### 14. Security Considerations *(expanded)*

Carried over: hashed passwords, restricted admin access, moderated user content, enforced input validation, spam-protected contact info.

**Added:**

- Rate limiting on login attempts, job applications, and community post creation
- File upload validation: server-side mime-type sniffing, size caps, image re-encoding
- Rich-text sanitization for community posts (Blade's auto-escaping alone isn't sufficient)
- A report/flag mechanism feeding a moderation queue, plus automated flagging for repeat offenders
- An admin action audit log covering all moderator/admin actions, not just verification
- Secrets management and credential rotation plan
- A documented backup and disaster recovery plan

### 15. Testing and Monitoring *(new section)*

- Test suite (Pest or PHPUnit) covering auth, listing CRUD, and moderation actions
- Laravel Horizon for queue worker supervision
- Error monitoring (e.g. Sentry)
- Uptime monitoring on the public site and API endpoints

### 16. Scalability Considerations

- More towns — now structurally supported via the `towns` table (Section 8)
- More categories and industries
- More users and listings
- Future mobile app integration — plugs into the Sanctum auth path (Section 7)
- Future messaging and booking modules

### 17. Suggested Sequencing *(new section)*

1. Decide the rendering approach for public pages (Section 3)
2. Install the permissions package, define the four actor types (Section 7)
3. Add `towns` as a first-class table before writing any other migrations (Section 8)
4. Build out the remaining data model additions
5. Treat Section 14's security checklist as a discrete pre-launch gate
