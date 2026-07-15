# Task 1 Report — Database config switch to MySQL

## Status
DONE_WITH_CONCERNS

## What was changed
- `.env` (untracked, as expected):
  - `DB_CONNECTION` changed from `sqlite` to `mysql`
  - `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_DATABASE=unsay_kuan`, `DB_USERNAME=root`, `DB_PASSWORD=` (empty)
  - Appended `ADMIN_EMAIL=admin@townlink.local` and `ADMIN_PASSWORD=password123`
- `.env.example` (tracked): mirrored the same DB block (replaced the commented-out sqlite defaults with active mysql values) and appended the same ADMIN_* entries. `DB_PASSWORD` left empty, `ADMIN_PASSWORD=password123` as instructed.
- Committed only `.env.example` (`.env` remains untracked by design).

## Connection-verify result
BLOCKED. XAMPP `mysqld` (PID 22432) is running and listening on 127.0.0.1:3306, but every client connection is refused at the handshake with:
`ERROR 2013 (HY000): Lost connection to MySQL server at 'handshake: reading initial communication packet', system error: 0`
Both `mysql.exe -h 127.0.0.1 -u root` and a Laravel `DB::connection()->getPdo()` call (via `php artisan tinker`) failed/hung identically. As a result, step 1 (`CREATE DATABASE unsay_kuan`) and step 4 (PDO verification) could NOT be completed. Per instructions, XAMPP services were not started/restarted manually.

## Commit hash
30020ec (branch `feature/phase1`) — "chore: switch database config to MySQL"

## Concern / next step
A working MySQL connection is required before Task 1 can be fully verified. The MySQL server needs to be brought to a healthy, accepting state (e.g., restart the XAMPP MySQL service) and the database created; then re-run:
`php artisan config:clear` and verify `DB::connection()->getPdo()` returns a PDO object. The config files are already correct and committed.
