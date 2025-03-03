<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessoryComment extends Model
{
    use HasFactory;

    protected $fillable = ['accessory_id', 'user_id', 'content','rate'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function accessory(): BelongsTo
    {
        return $this->belongsTo(Accessory::class, 'accessory_id', 'id');
    }
}

