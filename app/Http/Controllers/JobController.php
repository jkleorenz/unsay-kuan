<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Job;

class JobController extends Controller
{
    public function index()
    {
        $query = Job::with(['business', 'town'])
            ->where('is_active', true);

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($type = request('type')) {
            $query->where('type', $type);
        }

        return view('jobs.index', [
            'jobs' => $query->latest()->paginate(12)->withQueryString(),
            'types' => ['full-time', 'part-time', 'contract', 'freelance'],
        ]);
    }

    public function show(string $slug)
    {
        $job = Job::with(['business', 'town'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return view('jobs.show', compact('job'));
    }
}
