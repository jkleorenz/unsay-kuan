<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\CommunityPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityPost::with('category');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Community/Index', [
            'posts' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['status']),
        ]);
    }

    public function edit(CommunityPost $post)
    {
        return Inertia::render('Admin/Community/Edit', [
            'post' => $post,
            'categories' => Category::where('type', 'community')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, CommunityPost $post): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'content' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,approved,rejected'],
            'rejection_reason' => ['nullable', 'string'],
        ]);

        $post->update($data);

        return redirect()->route('admin.community.index')
            ->with('success', 'Community post updated.');
    }

    public function approve(CommunityPost $post): RedirectResponse
    {
        $post->update(['status' => CommunityPost::STATUS_APPROVED, 'rejection_reason' => null]);
        return back()->with('success', 'Community post approved.');
    }

    public function reject(Request $request, CommunityPost $post): RedirectResponse
    {
        $request->validate(['rejection_reason' => ['required', 'string']]);
        $post->update(['status' => CommunityPost::STATUS_REJECTED, 'rejection_reason' => $request->input('rejection_reason')]);
        return back()->with('success', 'Community post rejected.');
    }

    public function destroy(CommunityPost $post): RedirectResponse
    {
        $post->delete();
        return back()->with('success', 'Community post deleted.');
    }
}
