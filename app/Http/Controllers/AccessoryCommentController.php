<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccessoryComment;
use App\Models\Accessory;

class AccessoryCommentController extends Controller
{
    public function store(Request $request, $accessoryId)
    {
        $request->validate([
            'content' => 'required|string',
            'rate'    => 'required|integer|min:1|max:5', 
        ]);

        $oldcomment = AccessoryComment::where('accessory_id', $accessoryId)
                                      ->where('user_id', auth()->id())
                                      ->first();

        if ($oldcomment) {
            $oldcomment->update([
                'content' => $request->content,
                'rate'    => $request->rate,
            ]);
        } else {
            AccessoryComment::create([
                'accessory_id' => $accessoryId,
                'user_id'      => auth()->id(),
                'content'      => $request->content,
                'rate'         => $request->rate,
            ]);
        }
        $accessory = Accessory::find($accessoryId);
        if ($accessory) {
            $averageRate = $accessory->comments()->avg('rate') ?: 0;
            $countRate   = $accessory->comments()->count();
            $accessory->update([
                'evaluate'             => $averageRate,
                'number_of_evaluate'   => $countRate,
            ]);
        }

        return back()->with('success', 'Bình luận đã được cập nhật!');
    }
}
