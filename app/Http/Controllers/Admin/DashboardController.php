<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Job;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'pending' => Business::where('status', 'pending')->count(),
                'approved' => Business::where('status', 'approved')->count(),
                'total' => Business::count(),
                'categories' => Category::count(),
                'jobsPending' => Job::where('status', Job::STATUS_PENDING)->count(),
                'jobsApproved' => Job::where('status', Job::STATUS_APPROVED)->count(),
                'jobsTotal' => Job::count(),
            ],
        ]);
    }
}
