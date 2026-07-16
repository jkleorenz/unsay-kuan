@extends('layouts.public')

@section('title', $job->title . ' - ' . config('app.name'))

@section('content')
    <div class="mb-6">
        <a href="{{ route('jobs.index') }}" class="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back to jobs</a>
    </div>

    <div class="bg-gray-0 border border-gray-200 rounded-lg p-6">
        <div class="mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">{{ $job->title }}</h1>
            <p class="text-gray-500 mt-1">{{ $job->business->name }} &middot; {{ $job->town->name }}</p>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{{ ucfirst($job->type) }}</span>
            @if ($job->salary_min)
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-700">₱{{ number_format($job->salary_min) }}{{ $job->salary_max ? ' - ₱' . number_format($job->salary_max) : '+ ' }}</span>
            @endif
        </div>

        <p class="text-gray-700 mb-6">{{ $job->description }}</p>

        @auth
            @if (auth()->user()->hasRole('job_seeker'))
                <form method="POST" action="{{ route('jobs.apply', $job->id) }}" class="border-t border-gray-200 pt-6">
                    @csrf
                    <label class="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                    <textarea name="message" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none mb-3" placeholder="Tell the employer why you're a good fit..."></textarea>
                    <button type="submit" class="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Apply Now</button>
                </form>
            @else
                <p class="text-sm text-gray-500 border-t border-gray-200 pt-6">Only job seekers can apply. <a href="{{ route('register') }}" class="text-accent-700 hover:text-accent-600">Register as a job seeker.</a></p>
            @endif
        @else
            <p class="text-sm text-gray-500 border-t border-gray-200 pt-6"><a href="{{ route('login') }}" class="text-accent-700 hover:text-accent-600">Log in</a> to apply for this job.</p>
        @endauth
    </div>
@endsection
