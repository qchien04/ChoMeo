<?php

namespace App\Http\Controllers;

use App\Models\Cage;
use App\Models\CageComment;
use Illuminate\Http\Request;

class CageCommentController extends Controller
{
    public function store(Request $request, $cageId)
    {
        $request->validate([
            'content' => 'required|string',
            'rate'    => 'required|integer|min:1|max:5', 
        ]);

        $comment = CageComment::updateOrCreate(
            [
                'cage_id' => $cageId,
                'user_id' => auth()->id(),
            ],
            [
                'content' => $request->content,
                'rate'    => $request->rate,
            ]
        );

        // Cập nhật điểm trung bình và số lượng đánh giá
        $cage = Cage::find($cageId);
        if ($cage) {
            $averageRate = $cage->comments()->avg('rate') ?: 0;
            $countRate   = $cage->comments()->count();
            $cage->update([
                'evaluate'             => $averageRate,
                'number_of_evaluate'   => $countRate,
            ]);
        }

        return redirect()->back()->with([
            'success' => 'Bình luận thành công!',
        ]);
    }

}  
