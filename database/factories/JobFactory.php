<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition(): array
    {
        return [
            'category_id' => Category::where('type', 'job')->inRandomOrder()->first()?->id
                ?? Category::factory()->create(['type' => 'job'])->id,
            'title' => fake()->jobTitle(),
            'company' => fake()->company(),
            'location' => fake()->city(),
            'type' => fake()->randomElement(['Full-time', 'Part-time', 'Contract']),
            'description' => fake()->paragraph(),
            'contact_email' => fake()->safeEmail(),
            'contact_phone' => fake()->phoneNumber(),
            'status' => 'pending',
        ];
    }
}
