<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            TownSeeder::class,
            CategorySeeder::class,
            BusinessSeeder::class,
            JobSeeder::class,
        ]);
    }
}
