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

        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        if ($type = $request->input('type')) {
            $query->where('type', $type);
        }

        $jobs = $query->latest()->paginate(12)->withQueryString();

        $featured = Job::approved()->with('category')->latest()->take(6)->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'featured' => $featured,
            'categories' => Category::where('type', 'job')->orderBy('name')->get(['id', 'name', 'slug']),
            'jobTypes' => ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
            'filters' => $request->only(['q', 'category', 'type']),
        ]);
    }

    public function show(Job $job)
    {
        if ($job->status !== Job::STATUS_APPROVED) {
            abort(404);
        }

        return Inertia::render('Jobs/Show', [
            'job' => $job->load('category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Create', [
            'categories' => Category::where('type', 'job')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
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
        ]);

        Job::create(array_merge($data, ['status' => Job::STATUS_PENDING]));

        return redirect()->route('jobs.index')
            ->with('success', 'Your job listing was submitted and is pending review.');
    }
}
