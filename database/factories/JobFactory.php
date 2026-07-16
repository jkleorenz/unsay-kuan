<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Job;
use App\Models\Town;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'business_id' => Business::factory(),
            'town_id' => Town::factory(),
            'title' => fake()->jobTitle(),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement(['full-time', 'part-time', 'contract']),
            'salary_min' => fake()->numberBetween(5000, 15000),
            'salary_max' => fake()->numberBetween(15000, 30000),
            'is_active' => true,
        ];
    }
}
