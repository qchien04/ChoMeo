<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Cart;
use App\Models\User;
use Carbon\Carbon;
use DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function edit(Request $request): Response
{
    $user = $request->user();

    if ($user->role === 'admin') {
        $totalSold = Cart::where('state', true)->sum('quantity');

        $lastMonthSold = Cart::where('state', true)
            ->where('payment_date', '>=', Carbon::now()->subMonth())
            ->sum('quantity');

        $totalCustomers = User::where('role', 'user')->count();

        // Doanh số theo từng tháng (tính doanh thu)
        $monthlyRevenue = DB::table('carts')
            ->leftJoin('cages', function ($join) {
                $join->on('carts.item_id', '=', 'cages.id')
                     ->where('carts.type', '=', 'cage');
            })
            ->leftJoin('accessories', function ($join) {
                $join->on('carts.item_id', '=', 'accessories.id')
                     ->where('carts.type', '=', 'accessory');
            })
            ->select(
                DB::raw("DATE_FORMAT(payment_date, '%Y-%m') as month"),
                DB::raw("SUM(carts.quantity * IF(carts.type = 'cage', cages.price, IF(carts.type = 'accessory', accessories.price, 0))) as revenue")
            )
            ->whereNotNull('payment_date')
            ->where('state', true)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Doanh số bán theo tháng (sản phẩm)
        $monthlySales = Cart::select(
            DB::raw("DATE_FORMAT(payment_date, '%Y-%m') as month"),
            DB::raw('SUM(quantity) as sales')
        )
        ->whereNotNull('payment_date')
        ->where('state', true)
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        $totalDogs = DB::table('dogs')->count();
        $totalCats = DB::table('cats')->count();
        $totalCages = DB::table('cages')->count();
        $totalAccessories = DB::table('accessories')->count();

        return Inertia::render('Admin/index', [
            'totalDogs' => $totalDogs,
            'totalCats' => $totalCats,
            'totalCages' => $totalCages,
            'totalAccessories' => $totalAccessories,
            'totalSold' => $totalSold,
            'lastMonthSold' => $lastMonthSold,
            'totalCustomers' => $totalCustomers,
            'monthlySales' => $monthlySales,
            'monthlyRevenue' => $monthlyRevenue,
        ]);
    }

    return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        'status' => session('status'),
    ]);
}

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
