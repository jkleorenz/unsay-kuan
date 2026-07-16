<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $fillable = ['type', 'path', 'mime_type', 'size'];

    public function mediable()
    {
        return $this->morphTo();
    }
}
