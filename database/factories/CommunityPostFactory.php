<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\CommunityPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityPostFactory extends Factory
{
    protected $model = CommunityPost::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'category_id' => Category::factory(),
            'content' => fake()->paragraph(),
            'location' => fake()->city(),
            'status' => CommunityPost::STATUS_APPROVED,
            'rejection_reason' => null,
        ];
    }
}
