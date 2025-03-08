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
        $key = $request->input('key');
    
        if (!$key) {
            return Inertia::render('Search/index', [
                'results' => [],
                'key' => $key
            ]);
        }
    
        $cats = Cat::where('name', 'like', "%{$key}%")
            ->orWhere('description', 'like', "%{$key}%")
            ->get()
            ->map(function ($item) use ($key) {
                return $this->calculateRelevance($item, $key, 'cat');
            });
    
        $dogs = Dog::where('name', 'like', "%{$key}%")
            ->orWhere('description', 'like', "%{$key}%")
            ->get()
            ->map(function ($item) use ($key) {
                return $this->calculateRelevance($item, $key, 'dog');
            });
    
        $cages = Cage::where('name', 'like', "%{$key}%")
            ->orWhere('description', 'like', "%{$key}%")
            ->get()
            ->map(function ($item) use ($key) {
                return $this->calculateRelevance($item, $key, 'cage');
            });
    
        $accessories = Accessory::where('name', 'like', "%{$key}%")
            ->orWhere('description', 'like', "%{$key}%")
            ->get()
            ->map(function ($item) use ($key) {
                return $this->calculateRelevance($item, $key, 'accessory');
            });
    
        // Gộp tất cả vào một mảng
        $results = collect($cats)
            ->merge($dogs)
            ->merge($cages)
            ->merge($accessories);
    
        // Sắp xếp theo độ liên quan (cao xuống thấp)
        $sortedResults = $results->sortByDesc('relevance')->values();
    
        return Inertia::render('Search/index', [
            'results' => $sortedResults,
            'searchKey' => $key // Đổi tên tránh xung đột với React
        ]);
    }
    
    /**
     * Tính toán độ liên quan của từng item.
     */
    private function calculateRelevance($item, $key, $type) {
        $relevance = 0;
    
        // Tăng độ liên quan nếu từ khóa xuất hiện trong tên
        if (stripos($item->name, $key) !== false) {
            $relevance += 10;
        }
    
        // Tăng độ liên quan nếu từ khóa xuất hiện trong mô tả
        if (stripos($item->description, $key) !== false) {
            $relevance += 5;
        }
    
        return [
            'data' => $item, // Trả về toàn bộ dữ liệu của item
            'type' => $type, // Loại sản phẩm (cat, dog, cage, accessory)
            'relevance' => $relevance
        ];
    }
    
    

}  
