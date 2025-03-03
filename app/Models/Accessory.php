<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accessory extends Model
{
    use HasFactory;

    protected $fillable = ['name','image','breed','is_active', 'description', 'price', 'quantity','evaluate','number_of_evaluate'];

    public function comments(): HasMany
    {
        return $this->hasMany(AccessoryComment::class, 'accessory_id', 'id');
    }
    public function averageRate(): Attribute
    {
        return Attribute::get(fn () => $this->comments()->avg('rate'));
    }
}
