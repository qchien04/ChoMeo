<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
class CageController extends Controller
{
    public function index(Request $request)
    {
        $query = Cage::query();
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

    $cages = $query->get();
    
    return Inertia::render('CageCategory/index', ['cageList' => $cages]);
    }
    public function showClient(Request $request,Cage $cage){
        return Inertia::render('DetailCage/index',['cage' => $cage,
                                                                        'comments' => $cage->comments()->with('user:id,name')->get()
                                                                    ]);
    }
    public function adminAllView(Request $request)
    {
        $query = Cage::query();

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
        $cages = $query->get();
        
        return Inertia::render('Admin/Cage/All/index', ['cages' => $cages]);
    }


    
    public function create() 
    {
        return Inertia::render('Admin/Cage/Create/index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'capacity' => 'required',
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


        Cage::create($data);
        return Inertia::render('Admin/Cage/Create/index')->with('success', 'Thêm mèo thành công!');
    }

    public function show(Cage $cage)
    {
        error_log($cage);
        return Inertia::render('Detail/index', ['cage' => $cage]);
    }

    public function edit(Cage $cage)
    {
        error_log($cage);
        return Inertia::render('Admin/Cage/Edit/index',['cage' => $cage]);
    
    }

    public function update(Request $request, Cage $cage)
    {
        error_log($cage);
        error_log("++++++++++++++++++++++++-----------------------+");
        $request->validate([
            'name' => 'required',
            'capacity' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'description' => 'required',
        ]);
        $data = $request->except(['_method']); 
        error_log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        // Kiểm tra nếu có file ảnh
        if ($request->hasFile('image')) {
            error_log("File ảnh đã được gửi lên");
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = asset('storage/' . $path);
        } else {
            error_log("Không nhận được file ảnh");
        }

        // Cập nhật phụ kiện
        $cage->update($data);
        return redirect()->route('cages.edit', $cage->id)
        ->with('success', 'Cập nhật lồng thành công!');
    }

    public function destroy(Cage $cage)
    {
        $cage->delete();
        return redirect()->route('cages.view')->with('success', 'Xóa chó thành công!');
    }
    public function active(Request $request)
    {
        // Lấy danh sách ID từ request
        $list = $request->input('list');

        error_log(json_encode($list));

        // Kiểm tra nếu danh sách ID không rỗng
        if (!empty($list) && is_array($list)) {
            // Cập nhật tất cả chó có ID trong danh sách
            Cage::whereIn('id', $list)->update(['is_active' => true]);
            Cage::whereNotIn('id', $list)->update(['is_active' => false]);

            return redirect()->route('cages.view')->with('success', 'Đã active các chó thành công!');
        }

        return redirect()->route('cages.view')->with('error', 'Danh sách chó không hợp lệ!');
    }
}
