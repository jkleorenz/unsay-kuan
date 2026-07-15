# Task 4 Report — Businesses & Business Photos

## Status
**DONE** — All four files created, migration applied successfully, tables verified, committed.

## Files Created
- `database/migrations/2026_07_15_000002_create_businesses_table.php`
- `database/migrations/2026_07_15_000003_create_business_photos_table.php`
- `app/Models/Business.php`
- `app/Models/BusinessPhoto.php`

## Migrate Result
```
INFO  Running migrations.
2026_07_15_000002_create_businesses_table ............................................................ 102.85ms DONE
2026_07_15_000003_create_business_photos_table ........................................................ 65.53ms DONE
```
Verification (tinker): `OK` — both `businesses` and `business_photos` tables exist.

## Commit
- Hash: `ef52965e10466ca234bbc520753b86879850ddf3`
- Message: `feat: add businesses and business_photos tables + models`

## Notes
- `Business` model has `status` enum (pending|approved|rejected), `featured` boolean cast, `category()` / `photos()` relations, and `scopeApproved()` for public filtering.
- `BusinessPhoto` belongs to `Business`; both tables use `cascadeOnDelete` for foreign keys.
- `categories` table was already migrated; these migrations build on it via the `category_id` FK.
