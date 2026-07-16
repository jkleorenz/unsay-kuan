<?php

namespace App\Http\Controllers;

use App\Models\TourismListing;

class TourismController extends Controller
{
    public function index()
    {
        $query = TourismListing::with(['town', 'category'])
            ->where('status', 'approved');

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return view('tourism.index', [
            'listings' => $query->latest()->paginate(12)->withQueryString(),
        ]);
    }

    public function show(string $slug)
    {
        $listing = TourismListing::with(['town', 'category'])
            ->where('slug', $slug)
            ->where('status', 'approved')
            ->firstOrFail();

        return view('tourism.show', compact('listing'));
    }
}
