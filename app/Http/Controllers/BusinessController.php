<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Category;
use App\Models\BusinessPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::approved()->with('category');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        $businesses = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Businesses/Index', [
            'businesses' => $businesses,
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show(Business $business)
    {
        if ($business->status !== 'approved') {
            abort(404);
        }

        return Inertia::render('Businesses/Show', [
            'business' => $business->load('category', 'photos'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Businesses/Submit', [
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'owner_name' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'photos.*' => ['nullable', 'image', 'max:2048'],
        ]);

        $business = Business::create(array_merge(
            collect($data)->except('photos')->toArray(),
            ['status' => 'pending']
        ));

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store("businesses/{$business->id}", 'public');
                BusinessPhoto::create(['business_id' => $business->id, 'path' => $path]);
            }
        }

        return redirect()->route('businesses.index')
            ->with('success', 'Your business was submitted and is pending review.');
    }
}
