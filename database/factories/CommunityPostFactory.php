<?php

namespace Database\Factories;

use App\Models\CommunityPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityPostFactory extends Factory
{
    protected $model = CommunityPost::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'slug' => fake()->unique()->slug(),
            'content' => fake()->paragraphs(3, true),
            'is_approved' => true,
        ];
    }
}
