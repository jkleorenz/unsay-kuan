<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActionLog;
use App\Models\CommunityPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityPostController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/CommunityPosts', [
            'pending' => CommunityPost::with('user')->where('is_approved', false)->latest()->get(),
            'approved' => CommunityPost::with('user')->where('is_approved', true)->latest()->take(20)->get(),
        ]);
    }

    public function approve(CommunityPost $communityPost)
    {
        $communityPost->update(['is_approved' => true]);

        AdminActionLog::create([
            'user_id' => auth()->id(),
            'action' => 'post.approved',
            'target_type' => CommunityPost::class,
            'target_id' => $communityPost->id,
            'description' => "Approved post: {$communityPost->title}",
        ]);

        return back()->with('success', 'Post approved.');
    }

    public function destroy(CommunityPost $communityPost)
    {
        AdminActionLog::create([
            'user_id' => auth()->id(),
            'action' => 'post.deleted',
            'target_type' => CommunityPost::class,
            'target_id' => $communityPost->id,
            'description' => "Deleted post: {$communityPost->title}",
        ]);

        $communityPost->delete();

        return back()->with('success', 'Post deleted.');
    }
}
