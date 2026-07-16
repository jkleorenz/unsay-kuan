@extends('layouts.public')

@section('title', 'Business Directory - ' . config('app.name'))

@section('content')
    <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">Business Directory</h1>
        <p class="text-gray-500">Discover businesses in Mahaplag, Leyte.</p>
    </div>

    <form method="GET" action="{{ route('businesses.index') }}" class="mb-8 flex flex-wrap gap-3">
        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search businesses..."
            class="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none"
        >
        <select name="category" class="px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
            <option value="">All categories</option>
            @foreach ($categories as $category)
                <option value="{{ $category->slug }}" @selected(request('category') === $category->slug)>{{ $category->name }}</option>
            @endforeach
        </select>
        <label class="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input type="checkbox" name="verified" value="1" @checked(request('verified')) class="rounded border-gray-300 text-accent-500 focus:ring-accent-500">
            Verified only
        </label>
        <button type="submit" class="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Search</button>
    </form>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @forelse ($businesses as $business)
            <a href="{{ route('businesses.show', $business->slug) }}" class="block bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-gray-300 transition-all duration-150">
                <div class="flex items-start justify-between mb-2">
                    <h2 class="text-lg font-semibold text-gray-900">{{ $business->name }}</h2>
                    @if ($business->is_verified)
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l1.6 1.1 1.9-.4 1 1.7 1.8.7-.3 1.9 1.4 1.4-1.1 1.6.4 1.9-1.7 1-1.5 1.3.3 1.9-1.8.7-1 1.7-1.9-.4L12 22.5l-1.6-1.1-1.9.4-1-1.7-1.8-.7.3-1.9L5.6 16l1.1-1.6-.4-1.9 1.7-1 1.5-1.3-.3-1.9 1.8-.7 1-1.7 1.9.4L12 1.5zm-1 14.6l5-5-1.3-1.3-3.7 3.7-1.6-1.6L8 13.9l3 3.2z"/></svg>
                            Verified
                        </span>
                    @endif
                </div>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ $business->description }}</p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                    <span>{{ $business->town->name }}</span>
                    @if ($business->categories->isNotEmpty())
                        <span>&middot;</span>
                        <span>{{ $business->categories->pluck('name')->implode(', ') }}</span>
                    @endif
                </div>
            </a>
        @empty
            <p class="col-span-full text-center text-gray-500 py-12">No businesses found.</p>
        @endforelse
    </div>

    <div class="mt-8">
        {{ $businesses->links() }}
    </div>
@endsection
