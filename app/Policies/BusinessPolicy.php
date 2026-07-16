<?php

namespace App\Policies;

use App\Models\Business;
use App\Models\User;

class BusinessPolicy
{
    public function update(User $user, Business $business): bool
    {
        return $user->id === $business->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, Business $business): bool
    {
        return $user->id === $business->user_id || $user->hasRole('admin');
    }
}
