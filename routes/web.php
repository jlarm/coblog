<?php

declare(strict_types=1);

use App\Http\Controllers\FrontEndController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontEndController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', static function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('create-post', [PostController::class, 'create'])->name('posts.create');
    Route::post('create-post', [PostController::class, 'store'])->name('posts.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
