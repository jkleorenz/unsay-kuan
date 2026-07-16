<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use App\Models\Town;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function index()
    {
        return Inertia::render('Businesses/Index', [
            'businesses' => Business::with(['town', 'categories'])
                ->where('user_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Businesses/Create', [
            'towns' => Town::all(),
            'categories' => Category::where('type', 'business')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'hours' => 'nullable|string|max:255',
            'town_id' => 'required|exists:towns,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
        ]);

        $data['user_id'] = auth()->id();
        $data['slug'] = str($data['name'])->slug();
        $data['status'] = 'pending';

        $business = Business::create($data);

        if (!empty($data['categories'])) {
            $business->categories()->sync($data['categories']);
        }

        return redirect()->route('owner.businesses.index')
            ->with('success', 'Business submitted for verification.');
    }

    public function edit(Business $business)
    {
        $this->authorize('update', $business);

        return Inertia::render('Businesses/Edit', [
            'business' => $business->load(['town', 'categories']),
            'towns' => Town::all(),
            'categories' => Category::where('type', 'business')->get(),
        ]);
    }

    public function update(Request $request, Business $business)
    {
        $this->authorize('update', $business);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'hours' => 'nullable|string|max:255',
            'town_id' => 'required|exists:towns,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
        ]);

        $data['slug'] = str($data['name'])->slug();
        $business->update($data);

        if (isset($data['categories'])) {
            $business->categories()->sync($data['categories']);
        }

        return redirect()->route('owner.businesses.index')
            ->with('success', 'Business updated.');
    }

    public function destroy(Business $business)
    {
        $this->authorize('update', $business);
        $business->delete();

        return redirect()->route('owner.businesses.index')
            ->with('success', 'Business deleted.');
    }
}
