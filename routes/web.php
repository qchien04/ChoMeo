<?php

use App\Http\Controllers\CageCommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DogController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\CageController;
use App\Http\Controllers\AccessoryController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'show'])->name('home');







Route::post('/gio-hang/add', [CartController::class, 'store'])->middleware('auth')->name('carts.add');
Route::get('/gio-hang', [CartController::class, 'show'])->middleware('auth')->name('carts.get');
Route::delete('/gio-hang/delete/{cart}', [CartController::class, 'destroy'])->middleware('auth');
Route::post('/vnpay_payment', [PaymentController::class, 'vnpay_payment'])->middleware('auth');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('detail/cho/{dog}', [DogController::class, 'showClient'])->name('dogs.showClient');
Route::get('/cho', [DogController::class, 'index'])->name('dogs.viewclient');
Route::middleware('auth')->group(function () {
    Route::get('admin/cho/all', [DogController::class, 'adminAllView'])->name('dogs.view');
    Route::get('admin/cho/create', [DogController::class, 'create'])->name('dogs.create');
    Route::post('admin/cho', [DogController::class, 'store'])->name('dogs.store');
    Route::get('admin/cho/{dog}', [DogController::class, 'show'])->name('dogs.show');
    Route::get('admin/cho/{dog}/edit', [DogController::class, 'edit'])->name('dogs.edit');
    Route::post('admin/cho/{dog}', [DogController::class, 'update'])->name('dogs.update');
    Route::delete('admin/cho/{dog}', [DogController::class, 'destroy'])->name('dogs.destroy');
    Route::put('/admin/cho/active', [DogController::class, 'active'])->name('dogs.active');
});

Route::get('/detail/meo/{cat}', [CatController::class, 'showClient'])->name('cats.showClient');
Route::get('/meo', [CatController::class, 'index'])->name('cats.viewclient');
Route::middleware('auth')->group(function () {
    Route::get('admin/meo/all', [CatController::class, 'adminAllView'])->name('cats.view');
    Route::get('admin/meo/create', [CatController::class, 'create'])->name('cats.create');
    Route::post('admin/meo', [CatController::class, 'store'])->name('cats.store');
    Route::get('admin/meo/{cat}', [CatController::class, 'show'])->name('cats.show');
    Route::get('admin/meo/{cat}/edit', [CatController::class, 'edit'])->name('cats.edit');
    Route::post('admin/meo/{cat}', [CatController::class, 'update'])->name('cats.update');
    Route::delete('admin/meo/{cat}', [CatController::class, 'destroy'])->name('cats.destroy');
    Route::put('/admin/meo/active', [CatController::class, 'active'])->name('cats.active');
});

Route::post('/cage/{cage}/comment', [CageCommentController::class, 'store'])->name('cagecomments.store')->middleware('auth');
Route::get('detail/long/{cage}', [CageController::class, 'showClient'])->name('cages.showClient');
Route::get('/long', [CageController::class, 'index'])->name('cages.viewclient');
Route::middleware('auth')->group(function () {
    Route::get('admin/long/all', [CageController::class, 'adminAllView'])->name('cages.view');
    Route::get('admin/long/create', [CageController::class, 'create'])->name('cages.create');
    Route::post('admin/long', [CageController::class, 'store'])->name('cages.store');
    Route::get('admin/long/{cage}', [CageController::class, 'show'])->name('cages.show');
    Route::get('admin/long/{cage}/edit', [CageController::class, 'edit'])->name('cages.edit');
    Route::post('admin/long/{cage}', [CageController::class, 'update'])->name('cages.update');
    Route::delete('admin/long/{cage}', [CageController::class, 'destroy'])->name('cages.destroy');
    Route::put('/admin/long/active', [CageController::class, 'active'])->name('cages.active');
});


use App\Http\Controllers\AccessoryCommentController;
Route::post('/accessory/{accessory}/comment', [AccessoryCommentController::class, 'store'])->name('accessorycomments.store')->middleware('auth');

Route::get('detail/phu-kien/{accessory}', [AccessoryController::class, 'showClient'])->name('accessories.showClient');
Route::get('/phu-kien', [AccessoryController::class, 'index'])->name('accessories.viewclient');
Route::middleware('auth')->group(function () {
    Route::get('admin/phu-kien/all', [AccessoryController::class, 'adminAllView'])->name('accessories.view');
    Route::get('admin/phu-kien/create', [AccessoryController::class, 'create'])->name('accessories.create');
    Route::post('admin/phu-kien', [AccessoryController::class, 'store'])->name('accessories.store');
    Route::get('admin/phu-kien/{accessory}', [AccessoryController::class, 'show'])->name('accessories.show');
    Route::get('admin/phu-kien/{accessory}/edit', [AccessoryController::class, 'edit'])->name('accessories.edit');
    Route::post('admin/phu-kien/{accessory}', [AccessoryController::class, 'update'])->name('accessories.update');
    Route::delete('admin/phu-kien/{accessory}', [AccessoryController::class, 'destroy'])->name('accessories.destroy');
    Route::put('/admin/phu-kien/active', [AccessoryController::class, 'active'])->name('accessories.active');
});

require __DIR__.'/auth.php';
