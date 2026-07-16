@extends('layouts.public')

@section('title', 'Job Listings - ' . config('app.name'))

@section('content')
    <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900 mb-2">Job Listings</h1>
        <p class="text-gray-500">Find work opportunities in Mahaplag, Leyte.</p>
    </div>

    <form method="GET" action="{{ route('jobs.index') }}" class="mb-8 flex flex-wrap gap-3">
        <input
            type="text"
            name="search"
            value="{{ request('search') }}"
            placeholder="Search jobs..."
            class="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none"
        >
        <select name="type" class="px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
            <option value="">All types</option>
            @foreach ($types as $type)
                <option value="{{ $type }}" @selected(request('type') === $type)>{{ ucfirst($type) }}</option>
            @endforeach
        </select>
        <button type="submit" class="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Search</button>
    </form>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        @forelse ($jobs as $job)
            <a href="{{ route('jobs.show', $job->slug) }}" class="block bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:border-gray-300 transition-all duration-150">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ $job->title }}</h2>
                <p class="text-sm text-gray-500 mb-3">{{ $job->business->name }} &middot; {{ $job->town->name }}</p>
                <p class="text-sm text-gray-700 mb-3 line-clamp-2">{{ $job->description }}</p>
                <div class="flex items-center gap-2 text-xs">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{{ ucfirst($job->type) }}</span>
                    @if ($job->salary_min)
                        <span class="text-gray-500">₱{{ number_format($job->salary_min) }}{{ $job->salary_max ? ' - ₱' . number_format($job->salary_max) : '+ ' }}</span>
                    @endif
                </div>
            </a>
        @empty
            <p class="col-span-full text-center text-gray-500 py-12">No jobs found.</p>
        @endforelse
    </div>

    <div class="mt-8">{{ $jobs->links() }}</div>
@endsection
