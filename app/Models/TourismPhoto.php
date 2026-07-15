<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourismPhoto extends Model
{
    protected $fillable = ['tourism_id', 'path'];

    public function tourism(): BelongsTo
    {
        return $this->belongsTo(Tourism::class);
    }
}
