<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $query = Business::with('category');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Businesses/Index', [
            'businesses' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function edit(Business $business)
    {
        return Inertia::render('Admin/Businesses/Edit', [
            'business' => $business->load('photos'),
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Business $business): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'owner_name' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,approved,rejected'],
            'rejection_reason' => ['nullable', 'string'],
        ]);

        $business->update($data);

        return redirect()->route('admin.businesses.index')
            ->with('success', 'Business updated.');
    }

    public function approve(Business $business): RedirectResponse
    {
        $business->update(['status' => 'approved', 'rejection_reason' => null]);
        return back()->with('success', 'Business approved.');
    }

    public function reject(Request $request, Business $business): RedirectResponse
    {
        $request->validate(['rejection_reason' => ['required', 'string']]);
        $business->update(['status' => 'rejected', 'rejection_reason' => $request->input('rejection_reason')]);
        return back()->with('success', 'Business rejected.');
    }

    public function toggleFeature(Business $business): RedirectResponse
    {
        $business->update(['featured' => !$business->featured]);
        return back();
    }

    public function destroy(Business $business): RedirectResponse
    {
        $business->delete();
        return back()->with('success', 'Business deleted.');
    }
}
