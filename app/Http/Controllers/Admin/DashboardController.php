<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\CommunityPost;
use App\Models\Report;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'pendingVerifications' => Business::where('status', 'pending')->count(),
                'openReports' => Report::where('status', 'pending')->count(),
                'pendingPosts' => CommunityPost::where('is_approved', false)->count(),
                'totalUsers' => User::count(),
            ],
        ]);
    }
}
