<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Tourism;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourismController extends Controller
{
    public function index(Request $request)
    {
        $query = Tourism::with('category');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Tourism/Index', [
            'items' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function edit(Tourism $tourism)
    {
        return Inertia::render('Admin/Tourism/Edit', [
            'item' => $tourism->load('photos'),
            'categories' => Category::where('type', 'tourism')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Tourism $tourism): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'contact_number' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string'],
            'entrance_fee' => ['nullable', 'string', 'max:50'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,approved,rejected'],
            'rejection_reason' => ['nullable', 'string'],
        ]);

        $tourism->update($data);

        return redirect()->route('admin.tourism.index')
            ->with('success', 'Tourism listing updated.');
    }

    public function approve(Tourism $tourism): RedirectResponse
    {
        $tourism->update(['status' => Tourism::STATUS_APPROVED, 'rejection_reason' => null]);
        return back()->with('success', 'Tourism listing approved.');
    }

    public function reject(Request $request, Tourism $tourism): RedirectResponse
    {
        $request->validate(['rejection_reason' => ['required', 'string']]);
        $tourism->update(['status' => Tourism::STATUS_REJECTED, 'rejection_reason' => $request->input('rejection_reason')]);
        return back()->with('success', 'Tourism listing rejected.');
    }

    public function toggleFeature(Tourism $tourism): RedirectResponse
    {
        $tourism->update(['featured' => !$tourism->featured]);
        return back();
    }

    public function destroy(Tourism $tourism): RedirectResponse
    {
        $tourism->delete();
        return back()->with('success', 'Tourism listing deleted.');
    }
}
