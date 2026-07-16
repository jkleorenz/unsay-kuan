# Unsay Kuan?

Stack: Laravel 12 + Inertia + React (Breeze starter), MySQL, Redis, spatie/laravel-permission.

- Architecture: `unsay-kuan-technical-architecture-revised.md`
- Design system: `design.md`
- Dev checklist: `development-checklist.md`

## Conventions
- Public pages: Blade (server-rendered, SEO-friendly)
- Auth'd dashboards/forms: Inertia + React (resources/js/)
- Roles: job_seeker, business_owner, community_poster, admin
- CSS: Tailwind with custom design tokens (see design.md)
- One accent color (#6366F1), soft radii, subtle shadows
