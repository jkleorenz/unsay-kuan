<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BusinessController;
use App\Models\Business;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $featured = Business::approved()->where('featured', true)
        ->with('category')->latest()->take(6)->get();

    return Inertia::render('Home', [
        'featured' => $featured,
    ]);
});

Route::get('/businesses', [BusinessController::class, 'index'])->name('businesses.index');
Route::get('/businesses/submit', [BusinessController::class, 'create'])->name('businesses.create');
Route::post('/businesses', [BusinessController::class, 'store'])->name('businesses.store');
Route::get('/businesses/{business}', [BusinessController::class, 'show'])->name('businesses.show');

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
