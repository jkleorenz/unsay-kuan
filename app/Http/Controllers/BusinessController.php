<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Category;

class BusinessController extends Controller
{
    public function index()
    {
        $query = Business::with(['town', 'categories'])
            ->where('status', 'approved');

        if ($search = request('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($category = request('category')) {
            $query->whereHas('categories', fn ($q) => $q->where('slug', $category));
        }

        if (request('verified')) {
            $query->where('is_verified', true);
        }

        return view('businesses.index', [
            'businesses' => $query->latest()->paginate(12)->withQueryString(),
            'categories' => Category::where('type', 'business')->get(),
        ]);
    }

    public function show(string $slug)
    {
        $business = Business::with(['town', 'categories'])
            ->where('slug', $slug)
            ->where('status', 'approved')
            ->firstOrFail();

        return view('businesses.show', compact('business'));
    }
}
