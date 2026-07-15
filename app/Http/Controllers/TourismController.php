<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tourism;
use App\Models\TourismPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TourismController extends Controller
{
    public function index(Request $request)
    {
        $query = Tourism::approved()->with('category');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        $items = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Tourism/Index', [
            'items' => $items,
            'categories' => Category::where('type', 'tourism')->orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show(Tourism $tourism)
    {
        if ($tourism->status !== Tourism::STATUS_APPROVED) {
            abort(404);
        }

        return Inertia::render('Tourism/Show', [
            'item' => $tourism->load('category', 'photos'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tourism/Submit', [
            'categories' => Category::where('type', 'tourism')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'contact_number' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string'],
            'entrance_fee' => ['nullable', 'string', 'max:50'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'photos.*' => ['nullable', 'image', 'max:2048'],
        ]);

        $tourism = Tourism::create(array_merge(
            collect($data)->except('photos')->toArray(),
            ['status' => Tourism::STATUS_PENDING]
        ));

        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store("tourism/{$tourism->id}", 'public');
                TourismPhoto::create(['tourism_id' => $tourism->id, 'path' => $path]);
            }
        }

        return redirect()->route('tourism.index')
            ->with('success', 'Your tourism listing was submitted and is pending review.');
    }
}
