<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\TourismListing;
use App\Models\Town;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourismController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tourism', [
            'listings' => TourismListing::with(['town', 'category', 'user'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TourismForm', [
            'towns' => Town::all(),
            'categories' => Category::where('type', 'tourism')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'town_id' => 'required|exists:towns,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data['user_id'] = auth()->id();
        $data['slug'] = str($data['name'])->slug();
        $data['is_verified'] = true;
        $data['status'] = 'approved';

        TourismListing::create($data);

        return redirect()->route('admin.tourism.index')
            ->with('success', 'Tourism listing created.');
    }

    public function edit(TourismListing $tourismListing)
    {
        return Inertia::render('Admin/TourismForm', [
            'listing' => $tourismListing->load(['town', 'category']),
            'towns' => Town::all(),
            'categories' => Category::where('type', 'tourism')->get(),
        ]);
    }

    public function update(Request $request, TourismListing $tourismListing)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'town_id' => 'required|exists:towns,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data['slug'] = str($data['name'])->slug();
        $tourismListing->update($data);

        return redirect()->route('admin.tourism.index')
            ->with('success', 'Tourism listing updated.');
    }

    public function destroy(TourismListing $tourismListing)
    {
        $tourismListing->delete();
        return redirect()->route('admin.tourism.index')
            ->with('success', 'Tourism listing deleted.');
    }
}
