<?php

use App\Http\Controllers\AkunPembayaran;
use App\Http\Controllers\KategoriAkunController;
use App\Http\Controllers\PemilikController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StokOpnameController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\SuperAdminRole;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/edit/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/update/{user}', [UserController::class, 'update'])->name('users.update');
});
Route::middleware('auth')->group(function () {
    Route::get('/pos', [PosController::class, 'index'])->name('pos');
    Route::get('/pos/payment', [PosController::class, 'payment'])->name('pos.payment');
    Route::post('/pos/save_payment', [PosController::class, 'save_payment'])->name('pos.save_payment');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/products/update/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::get('/products/delete/{id}', [ProductController::class, 'delete'])->name('products.delete');
});
Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/stokopname', [StokOpnameController::class, 'index'])->name('stokopname');
    Route::get('/stokopname/viewOpname', [StokOpnameController::class, 'viewOpname'])->name('stokopname.viewOpname');
});
Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/pemilik', [PemilikController::class, 'index'])->name('pemilik');
    Route::get('/pemilik/create', [PemilikController::class, 'create'])->name('pemilik.create');
    Route::post('/pemilik/store', [PemilikController::class, 'store'])->name('pemilik.store');
});

Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/kategoriakun', [KategoriAkunController::class, 'index'])->name('kategoriakun');
    Route::get('/kategoriakun/create', [KategoriAkunController::class, 'create'])->name('kategoriakun.create');
    Route::post('/kategoriakun/store', [KategoriAkunController::class, 'store'])->name('kategoriakun.store');
    Route::get('/kategoriakun/edit/{id}', [KategoriAkunController::class, 'edit'])->name('kategoriakun.edit');
    Route::post('/kategoriakun/update/{id}', [KategoriAkunController::class, 'update'])->name('kategoriakun.update');
});
Route::middleware('auth', SuperAdminRole::class)->group(function () {
    Route::get('/akun', [AkunPembayaran::class, 'index'])->name('akun');
    Route::get('/akun/create', [AkunPembayaran::class, 'create'])->name('akun.create');
    Route::post('/akun/store', [AkunPembayaran::class, 'store'])->name('akun.store');
});

require __DIR__ . '/auth.php';
