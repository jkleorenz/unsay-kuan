<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', config('app.name', 'Unsay Kuan?'))</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="font-sans antialiased bg-gray-0 text-gray-900">
    <nav class="bg-gray-0 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <a href="/" class="text-lg font-bold font-display text-gray-900">{{ config('app.name', 'Unsay Kuan?') }}</a>
            <div class="flex items-center gap-4 text-sm">
                <a href="{{ route('businesses.index') }}" class="text-gray-500 hover:text-accent-700 transition-colors duration-150">Businesses</a>
                @auth
                    <a href="{{ route('dashboard') }}" class="text-gray-500 hover:text-accent-700 transition-colors duration-150">Dashboard</a>
                @else
                    <a href="{{ route('login') }}" class="text-gray-500 hover:text-accent-700 transition-colors duration-150">Log in</a>
                    <a href="{{ route('register') }}" class="inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Sign up</a>
                @endauth
            </div>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-8">
        @yield('content')
    </main>
</body>
</html>
