<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $businessCategories = [
            'Restaurant', 'Cafe', 'Hotel', 'Resort', 'Shop',
            'Grocery', 'Services', 'Health', 'Education', 'Transport',
        ];

        foreach ($businessCategories as $name) {
            Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'type' => 'business']
            );
        }

        $jobCategories = [
            'General Labor', 'Retail', 'Food & Beverage', 'Skilled Trades',
            'Domestic & Household', 'Office & Admin', 'Teaching & Training', 'Healthcare',
        ];

        foreach ($jobCategories as $name) {
            Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'type' => 'job']
            );
        }

        $tourismCategories = [
            'Attraction', 'Resort', 'Hotel', 'Restaurant',
            'Beach', 'Museum', 'Park', 'Services',
        ];

        foreach ($tourismCategories as $name) {
            Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'type' => 'tourism']
            );
        }

        $communityCategories = [
            'Announcement', 'Help Request', 'Volunteer', 'Event',
        ];

        foreach ($communityCategories as $name) {
            Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'type' => 'community']
            );
        }
    }
}
