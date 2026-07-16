@extends('layouts.public')

@section('title', 'Community Posts - ' . config('app.name'))

@section('content')
    <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">Community Posts</h1>
        <p class="text-gray-500">Stories, updates, and discussions from Mahaplag.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @forelse ($posts as $post)
            <a href="{{ route('community-posts.show', $post->slug) }}" class="block bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-gray-300 transition-all duration-150">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ $post->title }}</h2>
                <p class="text-sm text-gray-500 mb-3">{{ $post->user->name }} &middot; {{ $post->created_at->format('M d, Y') }}</p>
                <p class="text-sm text-gray-700 line-clamp-3">{{ Str::limit(strip_tags($post->content), 200) }}</p>
            </a>
        @empty
            <p class="col-span-full text-center text-gray-500 py-12">No posts yet.</p>
        @endforelse
    </div>

    <div class="mt-8">{{ $posts->links() }}</div>
@endsection
