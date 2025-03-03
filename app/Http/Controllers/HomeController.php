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
}  
