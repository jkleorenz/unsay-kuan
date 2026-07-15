<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $fillable = [
        'name', 'owner_name', 'contact_number', 'address',
        'category_id', 'description', 'operating_hours',
        'status', 'rejection_reason', 'featured',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(BusinessPhoto::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }
}
