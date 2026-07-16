<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Town;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BusinessFactory extends Factory
{
    protected $model = Business::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'town_id' => Town::factory(),
            'name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->sentence(),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'is_verified' => false,
            'status' => 'approved',
        ];
    }
}
