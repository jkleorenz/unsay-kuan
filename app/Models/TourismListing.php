<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourismListing extends Model
{
    protected $fillable = [
        'user_id', 'town_id', 'category_id', 'name', 'slug',
        'description', 'address', 'is_verified', 'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function town()
    {
        return $this->belongsTo(Town::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
