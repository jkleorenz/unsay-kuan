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
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">Verified</span>
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
