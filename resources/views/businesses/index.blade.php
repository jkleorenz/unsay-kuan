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
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">Verified</span>
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
