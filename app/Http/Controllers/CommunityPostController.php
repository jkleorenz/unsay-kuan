<?php

namespace App\Http\Controllers;

use App\Models\CommunityPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityPostController extends Controller
{
    public function index()
    {
        $posts = CommunityPost::with('user')
            ->where('is_approved', true)
            ->latest()
            ->paginate(12);

        return view('community-posts.index', compact('posts'));
    }

    public function show(string $slug)
    {
        $post = CommunityPost::with('user')
            ->where('slug', $slug)
            ->where('is_approved', true)
            ->firstOrFail();

        return view('community-posts.show', compact('post'));
    }

    public function create()
    {
        return Inertia::render('CommunityPosts/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $data['user_id'] = auth()->id();
        $data['slug'] = str($data['title'])->slug() . '-' . uniqid();
        $data['is_approved'] = false;
        // ponytail: HTML purifier is installed (mews/purifier) but not wired yet; add when rich-text is enabled

        CommunityPost::create($data);

        return redirect()->route('community-posts.index')
            ->with('success', 'Post submitted for moderation.');
    }
}
