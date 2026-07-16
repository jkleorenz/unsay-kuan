<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\Job;
use App\Models\User;
use App\Models\Town;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $town = Town::first();
        $owner = User::where('email', 'owner@unsaykuan.test')->first();
        $businesses = Business::all();

        $seekers = User::factory(3)->create();
        foreach ($seekers as $seeker) {
            $seeker->assignRole('job_seeker');
        }

        $jobs = [
            ['title' => 'Store Assistant', 'type' => 'full-time', 'salary_min' => 8000, 'salary_max' => 10000],
            ['title' => 'Farm Worker', 'type' => 'part-time', 'salary_min' => 5000, 'salary_max' => 7000],
            ['title' => 'Cashier', 'type' => 'full-time', 'salary_min' => 7000, 'salary_max' => 9000],
            ['title' => 'Delivery Rider', 'type' => 'contract', 'salary_min' => 6000, 'salary_max' => 12000],
            ['title' => 'Barista', 'type' => 'full-time', 'salary_min' => 7500, 'salary_max' => 9500],
        ];

        foreach ($jobs as $i => $data) {
            Job::create([
                'user_id' => $owner->id,
                'business_id' => $businesses[$i]->id,
                'town_id' => $town->id,
                'title' => $data['title'],
                'slug' => str($data['title'])->slug() . '-' . ($i + 1),
                'description' => "We are looking for a {$data['title']} to join our team in Mahaplag.",
                'type' => $data['type'],
                'salary_min' => $data['salary_min'],
                'salary_max' => $data['salary_max'],
                'is_active' => true,
            ]);
        }
    }
}
