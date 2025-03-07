<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accessory;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
class AccessoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Accessory::query();
        if ($request->has('min-price')) {
            $query->where('price', '>=', $request->input('min-price'));
        }
        if ($request->has('max-price')) {
            $query->where('price', '<=', $request->input('max-price'));
        }

        if ($request->has('breed')) {
            $query->where('breed', $request->input('breed'));
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

    $accessories = $query->get();
    
    return Inertia::render('AccessoryCategory/index', ['accessoryList' => $accessories]);
    }

    public function adminAllView(Request $request)
    {
        $query = Accessory::query();

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
        $accessories = $query->get();
        
        return Inertia::render('Admin/Accessory/All/index', ['accessories' => $accessories]);
    }


    
    public function create() 
    {
        return Inertia::render('Admin/Accessory/Create/index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);

        $path = '';
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
        }

        $data = $request->all();
        $data['image'] = "http://localhost:8000/storage/".$path;

        Accessory::create($data);

        return Inertia::render('Admin/Accessory/Create/index')
                    ->with('success', 'Thêm mèo thành công! ' . $path);
    }

    public function update(Request $request, Accessory $accessory)
    {
        $request->validate([
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'description' => 'required',
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

        // Cập nhật phụ kiện
        $accessory->update($data);

        return redirect()->route('accessories.edit', $accessory->id)
            ->with('success', 'Cập nhật phụ kiện thành công!');
    }

    public function show(Accessory $accessory)
    {
        error_log($accessory);
        return Inertia::render('Detail/index', ['accessory' => $accessory]);
    }
    public function edit(Accessory $accessory)
    {
        error_log($accessory);

        return Inertia::render('Admin/Accessory/Edit/index',['accessory' => $accessory]);
    
    }

    
    public function showClient(Request $request,Accessory $accessory){
        $suggestedAcessories = Accessory::where('id', '!=', $accessory->id)
                            ->inRandomOrder()
                            ->take(3)
                            ->get();
        return Inertia::render('DetailAccessory/index',['accessory' => $accessory,
                                                                            'comments' => $accessory->comments()->with('user:id,name')->get(),
                                                                            'suggested' => $suggestedAcessories,
                                                                        ]);
    }

    public function destroy(Accessory $accessory)
    {
        $accessory->delete();
        return redirect()->route('accessories.view')->with('success', 'Xóa chó thành công!');
    }
    public function active(Request $request)
    {
        // Lấy danh sách ID từ request
        $list = $request->input('list');

        error_log(json_encode($list));

        // Kiểm tra nếu danh sách ID không rỗng
        if (!empty($list) && is_array($list)) {
            // Cập nhật tất cả chó có ID trong danh sách
            Accessory::whereIn('id', $list)->update(['is_active' => true]);
            Accessory::whereNotIn('id', $list)->update(['is_active' => false]);

            return redirect()->route('accessories.view')->with('success', 'Đã active các chó thành công!');
        }

        return redirect()->route('accessories.view')->with('error', 'Danh sách chó không hợp lệ!');
    }
}
