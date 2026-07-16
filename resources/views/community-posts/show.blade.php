@extends('layouts.public')

@section('title', $post->title . ' - ' . config('app.name'))

@section('content')
    <div class="mb-6">
        <a href="{{ route('community-posts.index') }}" class="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back to posts</a>
    </div>

    <article class="bg-gray-0 border border-gray-200 rounded-lg p-6">
        <h1 class="text-2xl font-semibold text-gray-900 mb-2">{{ $post->title }}</h1>
        <p class="text-sm text-gray-500 mb-6">{{ $post->user->name }} &middot; {{ $post->created_at->format('M d, Y') }}</p>
        <div class="text-gray-700 leading-relaxed">{{ $post->content }}</div>
    </article>
@endsection
