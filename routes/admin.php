<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BusinessController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
    Route::get('/businesses/{business}/edit', [BusinessController::class, 'edit'])->name('businesses.edit');
    Route::put('/businesses/{business}', [BusinessController::class, 'update'])->name('businesses.update');
    Route::post('/businesses/{business}/approve', [BusinessController::class, 'approve'])->name('businesses.approve');
    Route::post('/businesses/{business}/reject', [BusinessController::class, 'reject'])->name('businesses.reject');
    Route::post('/businesses/{business}/feature', [BusinessController::class, 'toggleFeature'])->name('businesses.feature');
    Route::delete('/businesses/{business}', [BusinessController::class, 'destroy'])->name('businesses.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});
