<?php

namespace Database\Seeders;

use App\Models\Town;
use Illuminate\Database\Seeder;

class TownSeeder extends Seeder
{
    public function run(): void
    {
        Town::create(['name' => 'Mahaplag', 'slug' => 'mahaplag', 'description' => 'The first town on Unsay Kuan?']);
    }
}
