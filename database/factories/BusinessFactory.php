<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class BusinessFactory extends Factory
{
    protected $model = Business::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'owner_name' => fake()->name(),
            'contact_number' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'category_id' => Category::factory(),
            'description' => fake()->sentence(),
            'operating_hours' => '9am-5pm',
            'status' => 'approved',
            'rejection_reason' => null,
            'featured' => false,
        ];
    }
}
