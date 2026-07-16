@extends('layouts.public')

@section('title', $listing->name . ' - ' . config('app.name'))

@section('content')
    <div class="mb-6">
        <a href="{{ route('tourism.index') }}" class="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back to tourism</a>
    </div>

    <div class="bg-gray-0 border border-gray-200 rounded-lg p-6">
        <div class="mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">{{ $listing->name }}</h1>
            <p class="text-gray-500 mt-1">{{ $listing->town->name }} &middot; {{ $listing->category->name }}</p>
        </div>

        <p class="text-gray-700 mb-6">{{ $listing->description }}</p>

        @if ($listing->address)
            <div class="text-sm">
                <span class="text-gray-500">Address</span>
                <p class="text-gray-900">{{ $listing->address }}</p>
            </div>
        @endif
    </div>
@endsection
