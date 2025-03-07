<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cat;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
class CatController extends Controller
{
    public function index(Request $request)
    {
        $query = Cat::query();
        if ($request->has('min-price')) {
            $query->where('price', '>=', $request->input('min-price'));
        }
        if ($request->has('max-price')) {
            $query->where('price', '<=', $request->input('max-price'));
        }

        if ($request->has('breed')) {
            $query->where('breed', $request->input('breed'));
        }

        if ($request->has('gender')) {
            $query->where('gender', $request->input('gender'));
        }

        if ($request->has('color')) {
            $query->where('color', $request->input('color'));
        }

        if ($request->has('sort')) {
            switch ($request->input('sort')) {
                case 'price-asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name-asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name-desc':
                    $query->orderBy('name', 'desc');
                    break;
            }
        }

    $cats = $query->get();
    
    return Inertia::render('CatCategory/index', ['catList' => $cats]);
    }

    public function adminAllView(Request $request)
    {
        $query = Cat::query();

        if ($request->has('sort')) {
            switch ($request->input('sort')) {
                case 'price-asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name-asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name-desc':
                    $query->orderBy('name', 'desc');
                    break;
            }
        }
        $cats = $query->get();
        
        return Inertia::render('Admin/Cat/All/index', ['cats' => $cats]);
    }

    public function showClient(Request $request, Cat $cat) {
        $suggestedCats = Cat::where('id', '!=', $cat->id)
                            ->inRandomOrder()
                            ->take(3)
                            ->get();
    
        return Inertia::render('DetailCat/index', [
            'cat' => $cat,
            'suggested' => $suggestedCats,
        ]);
    }
    
    public function create() 
    {
        return Inertia::render('Admin/Cat/Create/index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'breed' => 'required',
            'gender' => 'required|in:male,female',
            'age' => 'required|integer',
            'weight' => 'required|numeric',
            'price' => 'required|numeric',
        ]);
        $path = '';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
        }
        
        $data = $request->all();
        $data['vaccinated'] = $request->boolean('vaccinated') ? 1 : 0;
        $data['sterilized'] = $request->boolean('sterilized') ? 1 : 0;
        $data['image'] = "http://localhost:8000/storage/".$path;

        Cat::create($data);
        return Inertia::render('Admin/Cat/Create/index')->with('success', 'Thêm mèo thành công!');
    }

    public function show(Cat $cat)
    {
        error_log($cat);
        return Inertia::render('Detail/index', ['cat' => $cat]);
    }

    public function edit(Cat $cat)
    {
        error_log($cat);
        return Inertia::render('Admin/Cat/Edit/index',['cat' => $cat]);
    
    }

    public function update(Request $request, Cat $cat)
    {
        error_log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        $request->validate([
            'name' => 'required',
            'breed' => 'required',
            'gender' => 'required|in:male,female',
            'age' => 'required|integer',
            'weight' => 'required|numeric',
            'price' => 'required|numeric',
        ]);
        $data = $request->except(['_method']); // Loại bỏ _method ra khỏi dữ liệu update

        // Kiểm tra nếu có file ảnh
        if ($request->hasFile('image')) {
            error_log("File ảnh đã được gửi lên");
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = asset('storage/' . $path);
        } else {
            error_log("Không nhận được file ảnh");
        }
        $data['vaccinated'] = $request->boolean('vaccinated') ? 1 : 0;
        $data['sterilized'] = $request->boolean('sterilized') ? 1 : 0;
        $cat->update($data);
        return redirect()->route('cats.edit', $cat->id)
        ->with('success', 'Cập nhật mèo thành công!');
    }

    public function destroy(Cat $cat)
    {
        $cat->delete();
        return redirect()->route('cats.view')->with('success', 'Xóa chó thành công!');
    }
    public function active(Request $request)
    {
        // Lấy danh sách ID từ request
        $list = $request->input('list');

        error_log(json_encode($list));

        // Kiểm tra nếu danh sách ID không rỗng
        if (!empty($list) && is_array($list)) {
            // Cập nhật tất cả chó có ID trong danh sách
            Cat::whereIn('id', $list)->update(['is_active' => true]);
            Cat::whereNotIn('id', $list)->update(['is_active' => false]);
            return redirect()->route('cats.view')->with('success', 'Đã active các chó thành công!');
        }

        return redirect()->route('cats.view')->with('error', 'Danh sách chó không hợp lệ!');
    }
}
