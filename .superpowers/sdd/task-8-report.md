# Task 8 Report — Homepage

## Status
✅ Complete

## Changes
- `routes/web.php`: Root `/` route now loads `Business::approved()->where('featured', true)->with('category')->latest()->take(6)->get()` and passes `featured` to the `Home` Inertia page. Added `use App\Models\Business;` import. Preserved `require __DIR__.'/admin.php';` and all other routes.
- `resources/js/Pages/Home.jsx`: Created homepage with hero, global search bar (`GET /businesses?search=`), featured businesses grid (links to `/businesses/{id}`), and disabled "coming soon" cards for Jobs/Tourism/Community.

## Build Result
`npm run build` succeeded (built in 3.34s). `Home-DP23Y_l_.js` emitted to `public/build/assets/`.

## Verification
- `php artisan route:list` → `GET|HEAD /` maps to `routes/web.php:10` (Closure → Home).
- Seed: marked first approved business `featured=true` ("featured set").

## Commit
- Hash: `03894810f0136e61f7e6f5dead7121a04681f72c`
- Message: `feat: homepage with featured businesses, search, coming-soon cards`
- Branch: `feature/phase1`
