@extends('layouts.public')

@section('title', $business->name . ' - ' . config('app.name'))

@section('content')
    <div class="mb-6">
        <a href="{{ route('businesses.index') }}" class="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back to directory</a>
    </div>

    <div class="bg-gray-0 border border-gray-200 rounded-lg p-6">
        <div class="flex items-start justify-between mb-4">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900">{{ $business->name }}</h1>
                @if ($business->categories->isNotEmpty())
                    <div class="flex gap-2 mt-2">
                        @foreach ($business->categories as $category)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{{ $category->name }}</span>
                        @endforeach
                    </div>
                @endif
            </div>
            @if ($business->is_verified)
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l1.6 1.1 1.9-.4 1 1.7 1.8.7-.3 1.9 1.4 1.4-1.1 1.6.4 1.9-1.7 1-1.5 1.3.3 1.9-1.8.7-1 1.7-1.9-.4L12 22.5l-1.6-1.1-1.9.4-1-1.7-1.8-.7.3-1.9L5.6 16l1.1-1.6-.4-1.9 1.7-1 1.5-1.3-.3-1.9 1.8-.7 1-1.7 1.9.4L12 1.5zm-1 14.6l5-5-1.3-1.3-3.7 3.7-1.6-1.6L8 13.9l3 3.2z"/></svg>
                    Verified
                </span>
            @else
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">Pending verification</span>
            @endif
        </div>

        <p class="text-gray-700 mb-6">{{ $business->description }}</p>

        <div class="grid gap-4 sm:grid-cols-2 text-sm">
            @if ($business->address)
                <div>
                    <span class="text-gray-500">Address</span>
                    <p class="text-gray-900">{{ $business->address }}, {{ $business->town->name }}</p>
                </div>
            @endif
            @if ($business->phone)
                <div>
                    <span class="text-gray-500">Phone</span>
                    <p class="text-gray-900">{{ $business->phone }}</p>
                </div>
            @endif
            @if ($business->email)
                <div>
                    <span class="text-gray-500">Email</span>
                    <p class="text-gray-900">{{ $business->email }}</p>
                </div>
            @endif
            @if ($business->website)
                <div>
                    <span class="text-gray-500">Website</span>
                    <p class="text-gray-900">
                        <a href="{{ $business->website }}" target="_blank" rel="noopener noreferrer" class="text-accent-700 hover:text-accent-600 transition-colors duration-150">{{ $business->website }}</a>
                    </p>
                </div>
            @endif
            @if ($business->hours)
                <div>
                    <span class="text-gray-500">Hours</span>
                    <p class="text-gray-900">{{ $business->hours }}</p>
                </div>
            @endif
        </div>
    </div>

    <div class="mt-6">
        @include('partials.report-button', [
            'reportableType' => 'App\Models\Business',
            'reportableId' => $business->id,
        ])
    </div>
@endsection
