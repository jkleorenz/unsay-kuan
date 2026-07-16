<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Restaurants & Food', 'slug' => 'restaurants-food', 'type' => 'business'],
            ['name' => 'Retail & Shops', 'slug' => 'retail-shops', 'type' => 'business'],
            ['name' => 'Services', 'slug' => 'services', 'type' => 'business'],
            ['name' => 'Healthcare', 'slug' => 'healthcare', 'type' => 'business'],
            ['name' => 'Agriculture', 'slug' => 'agriculture', 'type' => 'business'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        $tourism = [
            ['name' => 'Natural Attractions', 'slug' => 'natural-attractions', 'type' => 'tourism'],
            ['name' => 'Historical Sites', 'slug' => 'historical-sites', 'type' => 'tourism'],
            ['name' => 'Adventure & Outdoor', 'slug' => 'adventure-outdoor', 'type' => 'tourism'],
        ];

        foreach ($tourism as $cat) {
            Category::create($cat);
        }
    }
}
