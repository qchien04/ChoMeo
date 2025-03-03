<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dog extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'name', 'breed', 'gender', 'age', 'weight',
        'color', 'price', 'description', 'image',
        'vaccinated', 'sterilized','is_active',
    ];
    protected $casts = [
        'vaccinated' => 'boolean',
        'sterilized' => 'boolean',
    ];
}
