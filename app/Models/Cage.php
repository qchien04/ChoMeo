<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cage extends Model
{
    use HasFactory;
    
    protected $table = 'cages';

    protected $fillable = [
        'name',
        'capacity',
        'quantity',
        'breed',
        'price',
        'description',
        'parameter',
        'evaluate',
        'number_of_evaluate',
        'image',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'evaluate' => 'float',
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(CageComment::class, 'cage_id', 'id');
    }
}
