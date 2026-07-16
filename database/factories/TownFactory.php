<?php

namespace Database\Factories;

use App\Models\Town;
use Illuminate\Database\Eloquent\Factories\Factory;

class TownFactory extends Factory
{
    protected $model = Town::class;

    public function definition(): array
    {
        return [
            'name' => fake()->city(),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
        ];
    }
}
