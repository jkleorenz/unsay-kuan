<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $table = 'job_listings';

    protected $fillable = [
        'user_id', 'business_id', 'town_id', 'title', 'slug', 'description',
        'type', 'salary_min', 'salary_max', 'is_active',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function town()
    {
        return $this->belongsTo(Town::class);
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
