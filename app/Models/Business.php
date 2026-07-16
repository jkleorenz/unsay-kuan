<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'user_id', 'town_id', 'name', 'slug', 'description',
        'address', 'phone', 'email', 'website', 'hours',
        'is_verified', 'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function town()
    {
        return $this->belongsTo(Town::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
