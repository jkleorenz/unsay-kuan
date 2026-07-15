<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CommunityPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityPost::approved()->with('category');

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        $posts = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Community/Index', [
            'posts' => $posts,
            'categories' => Category::where('type', 'community')->orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show(CommunityPost $post)
    {
        if ($post->status !== CommunityPost::STATUS_APPROVED) {
            abort(404);
        }

        return Inertia::render('Community/Show', [
            'post' => $post->load('category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Community/Submit', [
            'categories' => Category::where('type', 'community')->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'content' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
        ]);

        CommunityPost::create(array_merge($data, ['status' => CommunityPost::STATUS_PENDING]));

        return redirect()->route('community.index')
            ->with('success', 'Your community post was submitted and is pending review.');
    }
}
