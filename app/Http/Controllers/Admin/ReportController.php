<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActionLog;
use App\Models\Report;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reports', [
            'reports' => Report::with(['user', 'reportable'])
                ->latest()
                ->get()
                ->map(function ($report) {
                    $label = match (class_basename($report->reportable_type)) {
                        'Business' => 'Business',
                        'Job' => 'Job',
                        'CommunityPost' => 'Post',
                        'TourismListing' => 'Tourism',
                        default => 'Listing',
                    };
                    return [
                        'id' => $report->id,
                        'reporter' => $report->user->name,
                        'type' => $label,
                        'reason' => $report->reason,
                        'status' => $report->status,
                        'created_at' => $report->created_at->diffForHumans(),
                    ];
                }),
        ]);
    }

    public function dismiss(Report $report)
    {
        $report->update(['status' => 'dismissed']);

        AdminActionLog::create([
            'user_id' => auth()->id(),
            'action' => 'report.dismissed',
            'target_type' => Report::class,
            'target_id' => $report->id,
            'description' => "Dismissed report #{$report->id}",
        ]);

        return back()->with('success', 'Report dismissed.');
    }
}
