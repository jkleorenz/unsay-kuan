<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['job_seeker', 'business_owner', 'community_poster', 'admin'];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
        }

        if (!User::where('email', 'admin@unsaykuan.test')->exists()) {
            $admin = User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@unsaykuan.test',
            ]);
            $admin->assignRole('admin');
        }
    }
}
