<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'item_id', 'quantity','type','state'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
