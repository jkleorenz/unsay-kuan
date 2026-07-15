<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\CommunityPost;
use App\Models\Job;
use App\Models\Tourism;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $q = trim((string) $request->input('q', ''));

        $businesses = $jobs = $tourism = $community = collect();

        if ($q !== '') {
            $like = "%{$q}%";
            $businesses = Business::approved()->with('category')
                ->where(fn ($qb) => $qb->where('name', 'like', $like)->orWhere('address', 'like', $like))
                ->latest()->limit(10)->get();
            $jobs = Job::approved()->with('category')
                ->where(fn ($qb) => $qb->where('title', 'like', $like)
                    ->orWhere('company', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('location', 'like', $like))
                ->latest()->limit(10)->get();
            $tourism = Tourism::approved()->with('category')
                ->where(fn ($qb) => $qb->where('name', 'like', $like)->orWhere('location', 'like', $like))
                ->latest()->limit(10)->get();
            $community = CommunityPost::approved()->with('category')
                ->where(fn ($qb) => $qb->where('title', 'like', $like)
                    ->orWhere('content', 'like', $like)
                    ->orWhere('location', 'like', $like))
                ->latest()->limit(10)->get();
        }

        return Inertia::render('Search/Index', [
            'q' => $q,
            'businesses' => $businesses,
            'jobs' => $jobs,
            'tourism' => $tourism,
            'community' => $community,
        ]);
    }
}
