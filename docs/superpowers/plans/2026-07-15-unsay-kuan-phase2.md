# Unsay Kuan? Phase 2 (Jobs) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public Jobs module to Unsay Kuan? (browse/filter/submit jobs, admin verification) that mirrors the Phase 1 Business module, plus rename the homepage branding from "TownLink Hub" to "Unsay Kuan?".

**Architecture:** Laravel owns routing/validation/moderation; Inertia serves React pages. Jobs reuse the shared `categories` table and the exact `pending → approved/rejected` + `featured` pattern from businesses. No employer accounts (admin-only auth). Public submission creates `status='pending'`; admin approves/features/edits/deletes.

**Tech Stack:** Laravel 12, PHP 8.2+, MySQL/MariaDB, Inertia.js, React 18, Tailwind CSS v4, Laravel Breeze (react). No new packages.

## Global Constraints

- Product name is **"Unsay Kuan?"** — all user-facing copy uses this, NOT "TownLink Hub".
- Database: **MySQL** (already configured in `.env`; `DB_CONNECTION=mysql`).
- Auth: **admin-only** — only administrators log in. Public job submission requires NO login. No employer/user accounts.
- Photos: not part of jobs in Phase 2 (no image upload for jobs this phase).
- All form input validated server-side.
- Admin routes behind `auth` middleware, prefixed `/admin`, route names prefixed `admin.`.
- Reuse the existing `categories` table (admin-managed in Phase 1).
- Mobile-first responsive Tailwind layouts. Public pages show only `status='approved'`.
- Job `experience_level` is one of: `entry` | `mid` | `senior`.

---

## File Structure

**Migrations / Models**
- `database/migrations/2026_07_15_010001_create_jobs_table.php` (create)
- `app/Models/Job.php` (create)

**Controllers**
- `app/Http/Controllers/JobController.php` (create, public)
- `app/Http/Controllers/Admin/JobController.php` (create)
- Modify: `app/Http/Controllers/Admin/DashboardController.php` (add job counts)

**Routes**
- Modify: `routes/web.php` (add jobs routes; pass featured jobs to Home; rename branding string)
- Modify: `routes/admin.php` (add admin jobs group)

**React pages**
- `resources/js/Pages/Jobs/Index.jsx` (create)
- `resources/js/Pages/Jobs/Show.jsx` (create)
- `resources/js/Pages/Jobs/Submit.jsx` (create)
- Modify: `resources/js/Pages/Home.jsx` (featured jobs section + Jobs link + rename "TownLink Hub" → "Unsay Kuan?")
- Modify: `resources/js/Pages/Admin/Dashboard.jsx` (two new count cards)

**Tests**
- `database/factories/JobFactory.php` (create)
- `tests/Feature/JobSubmissionTest.php` (create)

---

### Task 0: Rename homepage branding to "Unsay Kuan?"

**Files:**
- Modify: `resources/js/Pages/Home.jsx`

**Interfaces:**
- Produces: correct product name on the homepage (no functional change).

- [ ] **Step 1: Edit Home.jsx branding**

In `resources/js/Pages/Home.jsx`, change the `<Head title>` and the `<h1>` from "TownLink Hub" to "Unsay Kuan?":
```jsx
<Head title="Unsay Kuan?" />
...
<h1 className="text-4xl font-bold">Unsay Kuan?</h1>
```
(Leave the subtitle "Jobs, businesses, tourism & community — all in one place." as-is.)

- [ ] **Step 2: Build assets**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add resources/js/Pages/Home.jsx
git commit -m "chore: rename homepage branding to Unsay Kuan?"
```

---

### Task 1: Job migration + model

**Files:**
- Create: `database/migrations/2026_07_15_010001_create_jobs_table.php`
- Create: `app/Models/Job.php`

**Interfaces:**
- Produces: `Job` model + `jobs` table + `scopeApproved()`, `category()` relation, `featured` boolean cast. Consumed by all later tasks.

- [ ] **Step 1: Write the migration**

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company_name');
            $table->string('location');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('experience_level')->default('entry'); // entry|mid|senior
            $table->string('salary_range')->nullable();
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->string('application_method');
            $table->string('status')->default('pending'); // pending|approved|rejected
            $table->text('rejection_reason')->nullable();
            $table->boolean('featured')->default(false);
            $table->date('posted_at')->default(now()->toDateString());
            $table->timestamps();

            $table->index('status');
            $table->index('category_id');
            $table->index('experience_level');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
```

- [ ] **Step 2: Write the model**

`app/Models/Job.php`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'company_name', 'location', 'category_id', 'experience_level',
        'salary_range', 'description', 'requirements', 'application_method',
        'status', 'rejection_reason', 'featured', 'posted_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'posted_at' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
```

- [ ] **Step 3: Verify migration applies**

```bash
php artisan migrate
php artisan tinker --execute="echo Schema::hasTable('jobs') ? 'OK' : 'MISSING';"
```
Expected: prints `OK`.

- [ ] **Step 4: Commit**

```bash
git add database/migrations/2026_07_15_010001_create_jobs_table.php app/Models/Job.php
git commit -m "feat: add jobs table and Job model"
```

---

### Task 2: Public jobs browse, search, filter, and submission

**Files:**
- Create: `app/Http/Controllers/JobController.php`
- Modify: `routes/web.php`
- Create: `resources/js/Pages/Jobs/Index.jsx`
- Create: `resources/js/Pages/Jobs/Show.jsx`
- Create: `resources/js/Pages/Jobs/Submit.jsx`

**Interfaces:**
- Consumes: `Job::approved()`, `Category::all()`, `Job` model.
- Produces: `JobController` with `index()`, `show()`, `create()`, `store()` returning Inertia responses; public submission always creates `status='pending'`.

- [ ] **Step 1: Write the public controller**

`app/Http/Controllers/JobController.php`:
```php
<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::approved()->with('category');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%");
            });
        }

        if ($location = $request->input('location')) {
            $query->where('location', 'like', "%{$location}%");
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        if ($experience = $request->input('experience')) {
            $query->where('experience_level', $experience);
        }

        $jobs = $query->latest('posted_at')->paginate(12)->withQueryString();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => $request->only(['search', 'location', 'category', 'experience']),
        ]);
    }

    public function show(Job $job)
    {
        if ($job->status !== 'approved') {
            abort(404);
        }

        return Inertia::render('Jobs/Show', [
            'job' => $job->load('category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Submit', [
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'experience_level' => ['required', 'in:entry,mid,senior'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'application_method' => ['required', 'string', 'max:255'],
        ]);

        Job::create(array_merge($data, ['status' => 'pending']));

        return redirect()->route('jobs.index')
            ->with('success', 'Your job was submitted and is pending review.');
    }
}
```

- [ ] **Step 2: Add public routes**

In `routes/web.php`, after the business routes, add (preserve the root route and the `require __DIR__.'/admin.php';` line):
```php
use App\Http\Controllers\JobController;

Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/submit', [JobController::class, 'create'])->name('jobs.create');
Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
```

- [ ] **Step 3: Write Jobs/Index.jsx**

`resources/js/Pages/Jobs/Index.jsx`:
```jsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const experiences = [
  { value: 'entry', label: 'Entry' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
];

export default function Index({ jobs, categories, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Jobs" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          <input type="text" name="search" defaultValue={filters.search || ''}
                 placeholder="Search title or company" className="border rounded px-3 py-2" />
          <input type="text" name="location" defaultValue={filters.location || ''}
                 placeholder="Location" className="border rounded px-3 py-2" />
          <select name="category" defaultValue={filters.category || ''} className="border rounded px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <select name="experience" defaultValue={filters.experience || ''} className="border rounded px-3 py-2">
            <option value="">Any experience</option>
            {experiences.map((e) => (<option key={e.value} value={e.value}>{e.label}</option>))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded sm:col-span-2 lg:col-span-4">Search</button>
        </form>

        <div className="space-y-4">
          {jobs.data.map((j) => (
            <a key={j.id} href={`/jobs/${j.id}`}
               className="block border rounded p-4 hover:shadow">
              <h2 className="font-semibold">{j.title}</h2>
              <p className="text-sm text-gray-500">{j.company_name} · {j.location}</p>
              <p className="text-sm mt-1">{j.category?.name} · {j.experience_level}</p>
            </a>
          ))}
        </div>

        {jobs.data.length === 0 && (<p className="text-gray-500 mt-6">No jobs found.</p>)}
      </div>
    </AuthenticatedLayout>
  );
}
```

- [ ] **Step 4: Write Jobs/Show.jsx**

`resources/js/Pages/Jobs/Show.jsx`:
```jsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ job }) {
  return (
    <AuthenticatedLayout>
      <Head title={job.title} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-500">{job.company_name} · {job.location}</p>

        <dl className="mt-4 space-y-2">
          <div><dt className="font-semibold">Category</dt><dd>{job.category?.name}</dd></div>
          <div><dt className="font-semibold">Experience</dt><dd>{job.experience_level}</dd></div>
          <div><dt className="font-semibold">Salary</dt><dd>{job.salary_range || 'Not specified'}</dd></div>
          <div><dt className="font-semibold">Description</dt><dd>{job.description}</dd></div>
          <div><dt className="font-semibold">Requirements</dt><dd>{job.requirements}</dd></div>
          <div><dt className="font-semibold">How to apply</dt><dd>{job.application_method}</dd></div>
        </dl>

        <a href="/jobs" className="text-blue-600 mt-6 inline-block">Back to jobs</a>
      </div>
    </AuthenticatedLayout>
  );
}
```

- [ ] **Step 5: Write Jobs/Submit.jsx**

`resources/js/Pages/Jobs/Submit.jsx`:
```jsx
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const experiences = [
  { value: 'entry', label: 'Entry' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
];

export default function Submit({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '', company_name: '', location: '', category_id: '',
    experience_level: 'entry', salary_range: '', description: '',
    requirements: '', application_method: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/jobs');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Submit a Job" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Submit a Job</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Job title"
                 value={data.title} onChange={e => setData('title', e.target.value)} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

          <input className="w-full border rounded px-3 py-2" placeholder="Company name"
                 value={data.company_name} onChange={e => setData('company_name', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Location"
                 value={data.location} onChange={e => setData('location', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="Salary range (optional)"
                 value={data.salary_range} onChange={e => setData('salary_range', e.target.value)} />

          <select className="w-full border rounded px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>

          <select className="w-full border rounded px-3 py-2" value={data.experience_level}
                  onChange={e => setData('experience_level', e.target.value)}>
            {experiences.map((e) => (<option key={e.value} value={e.value}>{e.label}</option>))}
          </select>

          <textarea className="w-full border rounded px-3 py-2" placeholder="Description (optional)"
                    value={data.description} onChange={e => setData('description', e.target.value)} />
          <textarea className="w-full border rounded px-3 py-2" placeholder="Requirements (optional)"
                    value={data.requirements} onChange={e => setData('requirements', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" placeholder="How to apply (email / link / walk-in)"
                 value={data.application_method} onChange={e => setData('application_method', e.target.value)} />

          <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
```

- [ ] **Step 6: Build assets**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add routes/web.php app/Http/Controllers/JobController.php resources/js/Pages/Jobs
git commit -m "feat: public jobs browse, search, filter, and submission"
```

---

### Task 3: Admin jobs module + dashboard counts

**Files:**
- Create: `app/Http/Controllers/Admin/JobController.php`
- Modify: `routes/admin.php`
- Create: `resources/js/Pages/Admin/Jobs/Index.jsx`
- Modify: `app/Http/Controllers/Admin/DashboardController.php`
- Modify: `resources/js/Pages/Admin/Dashboard.jsx`

**Interfaces:**
- Consumes: `Job`, `Category`, `auth` middleware.
- Produces: admin `/admin/jobs` routes (index/approve/reject/feature/edit/destroy), dashboard job counts.

- [ ] **Step 1: Write Admin JobController**

`app/Http/Controllers/Admin/JobController.php`:
```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::with('category');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $query->latest('posted_at')->paginate(15)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function edit(Job $job)
    {
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $job,
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company_name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'experience_level' => ['required', 'in:entry,mid,senior'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'application_method' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:pending,approved,rejected'],
            'rejection_reason' => ['nullable', 'string'],
        ]);

        $job->update($data);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Job updated.');
    }

    public function approve(Job $job): RedirectResponse
    {
        $job->update(['status' => 'approved', 'rejection_reason' => null]);
        return back()->with('success', 'Job approved.');
    }

    public function reject(Request $request, Job $job): RedirectResponse
    {
        $request->validate(['rejection_reason' => ['required', 'string']]);
        $job->update(['status' => 'rejected', 'rejection_reason' => $request->input('rejection_reason')]);
        return back()->with('success', 'Job rejected.');
    }

    public function toggleFeature(Job $job): RedirectResponse
    {
        $job->update(['featured' => !$job->featured]);
        return back();
    }

    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();
        return back()->with('success', 'Job deleted.');
    }
}
```

- [ ] **Step 2: Add admin routes**

In `routes/admin.php`, inside the existing `admin.` group, add:
```php
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
Route::post('/jobs/{job}/approve', [JobController::class, 'approve'])->name('jobs.approve');
Route::post('/jobs/{job}/reject', [JobController::class, 'reject'])->name('jobs.reject');
Route::post('/jobs/{job}/feature', [JobController::class, 'toggleFeature'])->name('jobs.feature');
Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');
```
(Make sure `use App\Http\Controllers\Admin\JobController;` is added at the top of `routes/admin.php`.)

- [ ] **Step 3: Write Admin/Jobs/Index.jsx**

`resources/js/Pages/Admin/Jobs/Index.jsx`:
```jsx
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ jobs, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Jobs" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Jobs</h1>

        <form method="GET" className="flex gap-2 mb-4">
          <select name="status" defaultValue={filters.status || ''} className="border rounded px-3 py-2">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
        </form>

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th><th className="p-2">Company</th>
              <th className="p-2">Status</th><th className="p-2">Featured</th><th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.data.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-2">{j.title}</td>
                <td className="p-2">{j.company_name}</td>
                <td className="p-2">{j.status}</td>
                <td className="p-2">{j.featured ? 'Yes' : 'No'}</td>
                <td className="p-2 space-x-2">
                  <a href={`/admin/jobs/${j.id}/edit`} className="text-blue-600">Edit</a>
                  {j.status !== 'approved' && (
                    <form method="POST" action={`/admin/jobs/${j.id}/approve`} className="inline">
                      <button className="text-green-600">Approve</button>
                    </form>
                  )}
                  <form method="POST" action={`/admin/jobs/${j.id}/feature`} className="inline">
                    <button className="text-purple-600">Feature</button>
                  </form>
                  <form method="POST" action={`/admin/jobs/${j.id}`} className="inline"
                        onSubmit={e => { if(!confirm('Delete?')) e.preventDefault(); }}>
                    <input type="hidden" name="_method" value="DELETE" />
                    <button className="text-red-600">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
```

- [ ] **Step 4: Update DashboardController counts**

In `app/Http/Controllers/Admin/DashboardController.php`, extend the `counts` array:
```php
'counts' => [
    'pending' => Business::where('status', 'pending')->count(),
    'approved' => Business::where('status', 'approved')->count(),
    'total' => Business::count(),
    'categories' => Category::count(),
    'pending_jobs' => Job::where('status', 'pending')->count(),
    'approved_jobs' => Job::where('status', 'approved')->count(),
],
```
(Add `use App\Models\Job;` at the top.)

- [ ] **Step 5: Update Dashboard.jsx cards**

In `resources/js/Pages/Admin/Dashboard.jsx`, extend the `cards` array:
```jsx
const cards = [
  ['Pending', counts.pending],
  ['Approved', counts.approved],
  ['Total', counts.total],
  ['Categories', counts.categories],
  ['Pending Jobs', counts.pending_jobs],
  ['Approved Jobs', counts.approved_jobs],
];
```

- [ ] **Step 6: Build assets**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add routes/admin.php app/Http/Controllers/Admin/JobController.php app/Http/Controllers/Admin/DashboardController.php resources/js/Pages/Admin/Jobs resources/js/Pages/Admin/Dashboard.jsx
git commit -m "feat: admin jobs module and dashboard job counts"
```

---

### Task 4: Homepage featured jobs + Jobs link

**Files:**
- Modify: `routes/web.php` (root closure passes featured jobs; add `use App\Models\Job;`)
- Modify: `resources/js/Pages/Home.jsx`

**Interfaces:**
- Consumes: `Job::approved()->where('featured', true)`.
- Produces: `featuredJobs` prop on the Home page.

- [ ] **Step 1: Pass featured jobs from the root route**

In `routes/web.php`, update the root closure:
```php
use App\Models\Business;
use App\Models\Job;

Route::get('/', function () {
    $featured = Business::approved()->where('featured', true)
        ->with('category')->latest()->take(6)->get();

    $featuredJobs = Job::approved()->where('featured', true)
        ->with('category')->latest('posted_at')->take(6)->get();

    return Inertia::render('Home', [
        'featured' => $featured,
        'featuredJobs' => $featuredJobs,
    ]);
});
```

- [ ] **Step 2: Update Home.jsx**

In `resources/js/Pages/Home.jsx`, change the component signature to accept `featuredJobs`, turn the "Jobs" coming-soon card into a link, and add a Featured Jobs section. Replace the "Coming Soon" section with:
```jsx
export default function Home({ featured, featuredJobs }) {
  // ...existing hero with the search form (already points to /businesses)...

  // Featured Businesses section stays as-is, then add:
  <section className="mt-10">
    <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredJobs.map((j) => (
        <a key={j.id} href={`/jobs/${j.id}`}
           className="block border rounded p-4 hover:shadow">
          <h3 className="font-semibold">{j.title}</h3>
          <p className="text-sm text-gray-500">{j.company_name} · {j.location}</p>
        </a>
      ))}
      {featuredJobs.length === 0 && (
        <p className="text-gray-500">No featured jobs yet.</p>
      )}
    </div>
    <a href="/jobs" className="text-blue-600 mt-4 inline-block">Browse all jobs</a>
  </section>

  <section className="mt-10">
    <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {['Tourism', 'Community'].map((label) => (
        <div key={label} className="border rounded p-6 text-center text-gray-400 opacity-70">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-sm">Coming soon</div>
        </div>
      ))}
    </div>
  </section>
```
(The "Jobs" item is removed from the coming-soon list and replaced by the Featured Jobs section + a real `/jobs` link; Tourism and Community remain as coming-soon.)

- [ ] **Step 3: Build assets**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add routes/web.php resources/js/Pages/Home.jsx
git commit -m "feat: homepage featured jobs section and Jobs link"
```

---

### Task 5: Feature tests for jobs

**Files:**
- Create: `database/factories/JobFactory.php`
- Create: `tests/Feature/JobSubmissionTest.php`

**Interfaces:**
- Consumes: `Job` model, `Category` seed, `User` (admin) seed.
- Produces: passing tests for submission → pending, public visibility, admin approve.

- [ ] **Step 1: Write JobFactory**

`database/factories/JobFactory.php`:
```php
<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'company_name' => fake()->company(),
            'location' => fake()->city(),
            'category_id' => Category::factory(),
            'experience_level' => fake()->randomElement(['entry', 'mid', 'senior']),
            'salary_range' => 'PHP ' . fake()->numberBetween(10, 50) . 'k',
            'description' => fake()->sentence(),
            'requirements' => fake()->sentence(),
            'application_method' => fake()->email(),
            'status' => 'approved',
            'rejection_reason' => null,
            'featured' => false,
            'posted_at' => now(),
        ];
    }
}
```

- [ ] **Step 2: Write JobSubmissionTest**

`tests/Feature/JobSubmissionTest.php`:
```php
<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_submission_creates_pending_job(): void
    {
        $category = Category::first();

        $response = $this->post('/jobs', [
            'title' => 'Senior Developer',
            'company_name' => 'Acme Co',
            'location' => 'Cebu City',
            'category_id' => $category->id,
            'experience_level' => 'senior',
            'application_method' => 'apply@acme.test',
        ]);

        $response->assertRedirect('/jobs');
        $this->assertDatabaseHas('jobs', [
            'title' => 'Senior Developer',
            'status' => 'pending',
        ]);
    }

    public function test_pending_job_not_visible_publicly(): void
    {
        $job = Job::factory()->create(['status' => 'pending']);

        $this->get("/jobs/{$job->id}")->assertNotFound();
    }

    public function test_approved_job_visible_publicly(): void
    {
        $job = Job::factory()->create(['status' => 'approved']);

        $this->get("/jobs/{$job->id}")->assertOk();
    }

    public function test_admin_can_approve_a_job(): void
    {
        $this->seed();
        $admin = User::first();
        $job = Job::factory()->create(['status' => 'pending']);

        $this->actingAs($admin)
            ->post("/admin/jobs/{$job->id}/approve")
            ->assertRedirect();

        $this->assertDatabaseHas('jobs', [
            'id' => $job->id,
            'status' => 'approved',
        ]);
    }
}
```

- [ ] **Step 3: Run the tests**

```bash
php artisan test
```
Expected: all tests PASS (the existing Phase 1 business tests should still pass too).

- [ ] **Step 4: Commit**

```bash
git add database/factories/JobFactory.php tests/Feature/JobSubmissionTest.php
git commit -m "test: add Phase 2 job submission and admin moderation tests"
```

---

## Self-Review (completed by planner)

- **Spec coverage:** Rename branding (Task 0), jobs table/model (Task 1), public browse/search/filter/submit + pages (Task 2), admin jobs module + dashboard counts (Task 3), homepage featured jobs + Jobs link (Task 4), feature tests (Task 5). All Phase 2 spec items covered. Tourism/Community correctly remain "coming soon". No employer accounts (admin-only). Reuses `categories`.
- **Placeholder scan:** No TBD/TODO. Every step has concrete code or exact commands.
- **Type consistency:** `Job::approved()` scope, `featured` bool, `status` enum (`pending|approved|rejected`), `experience_level` enum (`entry|mid|senior`) used consistently across migration, model, controllers, validation, and tests. Route names (`jobs.index`, `admin.jobs.*`) match definitions.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-15-unsay-kuan-phase2.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
