@extends('layouts.public')

@section('title', 'Tourism - ' . config('app.name'))

@section('content')
    <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">Tourism</h1>
        <p class="text-gray-500">Explore attractions and destinations in Mahaplag, Leyte.</p>
    </div>

    <form method="GET" action="{{ route('tourism.index') }}" class="mb-8 flex flex-wrap gap-3">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Search destinations..." class="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
        <button type="submit" class="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Search</button>
    </form>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @forelse ($listings as $listing)
            <a href="{{ route('tourism.show', $listing->slug) }}" class="block bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-gray-300 transition-all duration-150">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ $listing->name }}</h2>
                <p class="text-sm text-gray-500 mb-3">{{ $listing->town->name }} &middot; {{ $listing->category->name }}</p>
                <p class="text-sm text-gray-700 line-clamp-2">{{ $listing->description }}</p>
            </a>
        @empty
            <p class="col-span-full text-center text-gray-500 py-12">No listings found.</p>
        @endforelse
    </div>

    <div class="mt-8">{{ $listings->links() }}</div>
@endsection
