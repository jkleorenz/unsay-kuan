<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
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
            ],
        ]);
    }
}
