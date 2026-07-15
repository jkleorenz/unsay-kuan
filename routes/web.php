<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\JobController;
use App\Models\Business;
use App\Models\Job;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $featured = Business::approved()->where('featured', true)
        ->with('category')->latest()->take(6)->get();

    $jobs = Job::approved()->with('category')->latest()->limit(6)->get();

    return Inertia::render('Home', [
        'featured' => $featured,
        'jobs' => $jobs,
    ]);
});

Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/businesses/submit', [BusinessController::class, 'create'])->name('businesses.create');
Route::post('/businesses', [BusinessController::class, 'store'])->name('businesses.store');
Route::get('/businesses/{business}', [BusinessController::class, 'show'])->name('businesses.show');

Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/create', [JobController::class, 'create'])->name('jobs.create');
Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
