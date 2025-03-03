<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CageComment extends Model
{
    protected $fillable = ['cage_id', 'user_id', 'content','rate'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function accessory(): BelongsTo
    {
        return $this->belongsTo(Cage::class, 'cage_id', 'id');
    }
}
