<?php

use App\Http\Controllers\Admin\VerificationController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\Owner\BusinessController as OwnerBusinessController;
use App\Http\Controllers\Owner\JobController as OwnerJobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/businesses/{slug}', [BusinessController::class, 'show'])->name('businesses.show');

Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{slug}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('owner')->name('owner.')->group(function () {
        Route::resource('businesses', OwnerBusinessController::class)->except(['show']);
        Route::resource('jobs', OwnerJobController::class)->except(['show']);
        Route::get('/applications', [JobApplicationController::class, 'applications'])->name('applications.index');
        Route::put('/applications/{application}', [JobApplicationController::class, 'updateStatus'])->name('applications.update');
    });

    Route::post('/jobs/{job}/apply', [JobApplicationController::class, 'store'])->name('jobs.apply');
    Route::get('/my-applications', [JobApplicationController::class, 'myApplications'])->name('my-applications');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/verifications', [VerificationController::class, 'index'])->name('verifications.index');
    Route::post('/verifications/{business}/approve', [VerificationController::class, 'approve'])->name('verifications.approve');
    Route::post('/verifications/{business}/reject', [VerificationController::class, 'reject'])->name('verifications.reject');
});

require __DIR__.'/auth.php';
