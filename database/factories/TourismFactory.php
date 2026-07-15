<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Tourism;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourismFactory extends Factory
{
    protected $model = Tourism::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'category_id' => Category::factory(),
            'description' => fake()->sentence(),
            'contact_number' => fake()->phoneNumber(),
            'location' => fake()->address(),
            'entrance_fee' => 'Free',
            'operating_hours' => '9am-5pm',
            'status' => Tourism::STATUS_APPROVED,
            'rejection_reason' => null,
            'featured' => false,
        ];
    }
}
