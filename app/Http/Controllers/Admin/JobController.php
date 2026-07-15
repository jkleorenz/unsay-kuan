<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Job;
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

        if ($q = $request->input('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")
                    ->orWhere('company', 'like', "%{$q}%");
            });
        }

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status', 'q']),
            'counts' => [
                'pending' => Job::where('status', Job::STATUS_PENDING)->count(),
                'approved' => Job::where('status', Job::STATUS_APPROVED)->count(),
                'total' => Job::count(),
            ],
        ]);
    }

    public function edit(Job $job)
    {
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $job->load('category'),
            'categories' => Category::where('type', 'job')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'description' => ['required', 'string'],
            'contact_email' => ['nullable', 'email'],
            'contact_phone' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,approved,rejected'],
        ]);

        $job->update($data);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'Job updated.');
    }

    public function approve(Job $job): RedirectResponse
    {
        $job->update(['status' => Job::STATUS_APPROVED]);
        return back()->with('success', 'Job approved.');
    }

    public function reject(Job $job): RedirectResponse
    {
        $job->update(['status' => Job::STATUS_REJECTED]);
        return back()->with('success', 'Job rejected.');
    }

    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();
        return back()->with('success', 'Job deleted.');
    }
}
