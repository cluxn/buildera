<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technology extends Model
{
    protected $fillable = ['name', 'logo', 'category', 'display_order'];

    protected $casts = [
        'display_order' => 'integer',
    ];
}
