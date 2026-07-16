<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function store(Request $request, Job $job)
    {
        if (!auth()->user()->hasRole('job_seeker')) {
            return back()->with('error', 'Only job seekers can apply.');
        }

        $existing = JobApplication::where('job_id', $job->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existing) {
            return back()->with('error', 'You already applied to this job.');
        }

        $data = $request->validate(['message' => 'nullable|string|max:1000']);

        JobApplication::create([
            'job_id' => $job->id,
            'user_id' => auth()->id(),
            'status' => 'pending',
            'message' => $data['message'] ?? null,
        ]);

        return back()->with('success', 'Application submitted.');
    }

    public function applications()
    {
        return Inertia::render('Jobs/Applications', [
            'applications' => JobApplication::with(['job.business', 'user'])
                ->whereHas('job', fn ($q) => $q->where('user_id', auth()->id()))
                ->latest()
                ->get(),
        ]);
    }

    public function myApplications()
    {
        return Inertia::render('Jobs/MyApplications', [
            'applications' => JobApplication::with(['job.business', 'job.town'])
                ->where('user_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    }

    public function updateStatus(Request $request, JobApplication $application)
    {
        if ($application->job->user_id !== auth()->id()) abort(403);

        $data = $request->validate(['status' => 'required|in:reviewed,accepted,rejected']);
        $application->update(['status' => $data['status']]);

        return back()->with('success', 'Application status updated.');
    }
}
