<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Job;
use App\Models\Town;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        return Inertia::render('Jobs/Index', [
            'jobs' => Job::with(['business', 'town'])
                ->where('user_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Create', [
            'businesses' => Business::where('user_id', auth()->id())->get(),
            'towns' => Town::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'business_id' => 'required|exists:businesses,id',
            'town_id' => 'required|exists:towns,id',
        ]);

        $data['user_id'] = auth()->id();
        $data['slug'] = str($data['title'])->slug() . '-' . uniqid();
        $data['is_active'] = true;

        Job::create($data);

        return redirect()->route('owner.jobs.index')
            ->with('success', 'Job posted.');
    }

    public function edit(Job $job)
    {
        if ($job->user_id !== auth()->id()) abort(403);

        return Inertia::render('Jobs/Edit', [
            'job' => $job->load(['business', 'town']),
            'businesses' => Business::where('user_id', auth()->id())->get(),
            'towns' => Town::all(),
        ]);
    }

    public function update(Request $request, Job $job)
    {
        if ($job->user_id !== auth()->id()) abort(403);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:full-time,part-time,contract,freelance',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'business_id' => 'required|exists:businesses,id',
            'town_id' => 'required|exists:towns,id',
        ]);

        $data['slug'] = str($data['title'])->slug() . '-' . $job->id;
        $job->update($data);

        return redirect()->route('owner.jobs.index')
            ->with('success', 'Job updated.');
    }

    public function destroy(Job $job)
    {
        if ($job->user_id !== auth()->id()) abort(403);
        $job->delete();

        return redirect()->route('owner.jobs.index')
            ->with('success', 'Job deleted.');
    }
}
