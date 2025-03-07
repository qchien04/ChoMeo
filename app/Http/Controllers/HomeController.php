<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Cage;
use App\Models\Dog;
use App\Models\Cat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function show(Request $request) {
        $dogs=Dog::where("is_active", true)->get();
        $cats=Cat::where("is_active", true)->get();
        $cages=Cage::where("is_active", true)->get();
        $accessories=Accessory::where("is_active", true)->get();

        return Inertia::render('Test1', ['dogs' => $dogs,
                                                'cages' => $cages,
                                                'cats' => $cats,
                                                'accessories' => $accessories]);
    }

    public function search(Request $request) {
        $key = $request->input('key'); // Lấy từ khóa tìm kiếm

        if (!$key) {
            return Inertia::render('Search/index', [
                'cats' => [], 'dogs' => [], 'cages' => [], 'accessories' => [], 'key' => $key
            ]);
        }

        $cats = Cat::where('name', 'like', "%{$key}%")
                ->orWhere('description', 'like', "%{$key}%")
                ->get();

        $dogs = Dog::where('name', 'like', "%{$key}%")
                ->orWhere('description', 'like', "%{$key}%")
                ->get();

        $cages = Cage::where('name', 'like', "%{$key}%")
                    ->orWhere('description', 'like', "%{$key}%")
                    ->get();

        $accessories = Accessory::where('name', 'like', "%{$key}%")
                                ->orWhere('description', 'like', "%{$key}%")
                                ->get();

        return Inertia::render('Search/index', [
            'cats' => $cats,
            'dogs' => $dogs,
            'cages' => $cages,
            'accessories' => $accessories,
            'key' => $key
        ]);
    }

}  
