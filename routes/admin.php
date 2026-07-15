<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\TourismController;
use App\Http\Controllers\Admin\CommunityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
    Route::get('/businesses/{business}/edit', [BusinessController::class, 'edit'])->name('businesses.edit');
    Route::put('/businesses/{business}', [BusinessController::class, 'update'])->name('businesses.update');
    Route::post('/businesses/{business}/approve', [BusinessController::class, 'approve'])->name('businesses.approve');
    Route::post('/businesses/{business}/reject', [BusinessController::class, 'reject'])->name('businesses.reject');
    Route::post('/businesses/{business}/feature', [BusinessController::class, 'toggleFeature'])->name('businesses.feature');
    Route::delete('/businesses/{business}', [BusinessController::class, 'destroy'])->name('businesses.destroy');

    Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/{job}/edit', [JobController::class, 'edit'])->name('jobs.edit');
    Route::put('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');
    Route::post('/jobs/{job}/approve', [JobController::class, 'approve'])->name('jobs.approve');
    Route::post('/jobs/{job}/reject', [JobController::class, 'reject'])->name('jobs.reject');
    Route::delete('/jobs/{job}', [JobController::class, 'destroy'])->name('jobs.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/tourism', [TourismController::class, 'index'])->name('tourism.index');
    Route::get('/tourism/{tourism}/edit', [TourismController::class, 'edit'])->name('tourism.edit');
    Route::put('/tourism/{tourism}', [TourismController::class, 'update'])->name('tourism.update');
    Route::post('/tourism/{tourism}/approve', [TourismController::class, 'approve'])->name('tourism.approve');
    Route::post('/tourism/{tourism}/reject', [TourismController::class, 'reject'])->name('tourism.reject');
    Route::post('/tourism/{tourism}/feature', [TourismController::class, 'toggleFeature'])->name('tourism.feature');
    Route::delete('/tourism/{tourism}', [TourismController::class, 'destroy'])->name('tourism.destroy');

    Route::get('/community', [CommunityController::class, 'index'])->name('community.index');
    Route::get('/community/{post}/edit', [CommunityController::class, 'edit'])->name('community.edit');
    Route::put('/community/{post}', [CommunityController::class, 'update'])->name('community.update');
    Route::post('/community/{post}/approve', [CommunityController::class, 'approve'])->name('community.approve');
    Route::post('/community/{post}/reject', [CommunityController::class, 'reject'])->name('community.reject');
    Route::delete('/community/{post}', [CommunityController::class, 'destroy'])->name('community.destroy');
});
