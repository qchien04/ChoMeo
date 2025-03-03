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

        $oldcomment = CageComment::where('cage_id', $cageId)
                                      ->where('user_id', auth()->id())
                                      ->first();

        if ($oldcomment) {
            $oldcomment->update([
                'content' => $request->content,
                'rate'    => $request->rate,
            ]);
        } else {
            CageComment::create([
                'cage_id' => $cageId,
                'user_id'      => auth()->id(),
                'content'      => $request->content,
                'rate'         => $request->rate,
            ]);
        }

        $cage = Cage::find($cageId);
        if ($cage) {
            $averageRate = $cage->comments()->avg('rate') ?: 0;
            $countRate   = $cage->comments()->count();
            $cage->update([
                'evaluate'             => $averageRate,
                'number_of_evaluate'   => $countRate,
            ]);
        }
    } 
}  
