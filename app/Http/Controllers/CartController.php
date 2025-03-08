<?php

namespace App\Http\Controllers;

use App\Models\Cart;

use App\Models\Accessory;
use App\Models\Cage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function show(Request $request) {
        $user_id = auth()->id();
        $cartItems = Cart::where("user_id", $user_id)->get();

        $data = [];

        foreach ($cartItems as $item) {
            if ($item->type == 'accessory') {
                $accessory = Accessory::find($item->item_id);
                $quantity=$item->quantity;
                $state=$item->state;
                $id=$item->id;
                $data[] = ["id"=>$id,"type" => "accessory", "item" => $accessory,"quantity"=>$quantity,"state"=>$state];
            }
            if ($item->type == 'cage') {
                $cage = Cage::find($item->item_id);
                $quantity=$item->quantity;
                $state=$item->state;
                $id=$item->id;
                $data[] = ["id"=>$id,"type" => "cage", "item" => $cage,"quantity"=>$quantity,"state"=>$state];
            }
        }

        return Inertia::render('Cart/index', ['data' => $data]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'item_id' => 'required',
            'quantity' => 'required',
            'type' => 'required',
        ]);
        $item_id = $request->input('item_id');
        $type = $request->input('type');
        $quantity = $request->input('quantity');
        $user_id=auth()->id();

        $old_data=Cart::where('item_id',$item_id)
                            ->where('user_id',$user_id)
                            ->where('type',$type)
                            ->where('state',false)
                            ->first();

        if ($old_data) {
            error_log(message: ' co trong db -----------------------------------------------------');
            $old_data->quantity+=$quantity;
            $old_data->save();
            return back()->with('success', 'Giỏ hàng đã được cập nhật!');
        }
        error_log('ko co trong db -----------------------------------------------------');
        Cart::create([
            'item_id' =>$item_id,
            'user_id'      => $user_id,
            'quantity'      => $quantity,
            'type'         => $type,
            'state'         => false,
        ]);

        return back()->with('success', 'Giỏ hàng đã được cập nhật!');
    }

    public function destroy($id)
    {
        $cart = Cart::where('id', $id)->where('user_id', auth()->id())->first();
        
        if ($cart) {
            $cart->delete();
            return back()->with('success', 'Xóa thành công!');
        }

        return back()->with('error', 'Không tìm thấy sản phẩm trong giỏ hàng!');
    }
}
