<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityPost extends Model
{
    protected $fillable = ['user_id', 'title', 'slug', 'content', 'is_approved'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
