<?php

namespace Database\Seeders;

use App\Models\Business;
use App\Models\User;
use App\Models\Town;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BusinessSeeder extends Seeder
{
    public function run(): void
    {
        $town = Town::first();
        $categories = Category::all();
        $owner = User::factory()->create(['name' => 'Business Owner', 'email' => 'owner@unsaykuan.test']);
        $owner->assignRole('business_owner');

        $businesses = [
            ['name' => 'Mahaplag Bakery', 'description' => 'Fresh pandesal and pastries every morning.', 'address' => 'Poblacion, Mahaplag', 'phone' => '09171234567'],
            ['name' => 'Mahaplag General Store', 'description' => 'Your one-stop shop for daily essentials.', 'address' => 'Brgy. 1, Mahaplag', 'phone' => '09171234568'],
            ['name' => 'Green Valley Farm Supply', 'description' => 'Fertilizers, seeds, and farming equipment.', 'address' => 'Brgy. Hilaitan, Mahaplag', 'phone' => '09171234569'],
            ['name' => 'Mahaplag Dental Clinic', 'description' => 'Affordable dental care for the community.', 'address' => 'Poblacion, Mahaplag', 'phone' => '09171234570'],
            ['name' => 'Island Bites Eatery', 'description' => 'Home-cooked meals and local delicacies.', 'address' => 'Brgy. Campogan, Mahaplag', 'phone' => '09171234571'],
            ['name' => 'Mahaplag Hardware', 'description' => 'Construction materials and tools.', 'address' => 'Poblacion, Mahaplag', 'phone' => '09171234572'],
            ['name' => 'Sunrise Internet Cafe', 'description' => 'Fast internet, printing, and scanning services.', 'address' => 'Poblacion, Mahaplag', 'phone' => '09171234573'],
            ['name' => 'Mahaplag Rice Mill', 'description' => 'Rice milling and grain processing.', 'address' => 'Brgy. San Isidro, Mahaplag', 'phone' => '09171234574'],
            ['name' => 'Barangay Health Center', 'description' => 'Community health services and check-ups.', 'address' => 'Brgy. 2, Mahaplag', 'phone' => '09171234575'],
            ['name' => 'Mahaplag Transport Terminal', 'description' => 'Van and bus services to Tacloban and Ormoc.', 'address' => 'Poblacion, Mahaplag', 'phone' => '09171234576'],
        ];

        foreach ($businesses as $i => $data) {
            $business = Business::create([
                'user_id' => $owner->id,
                'town_id' => $town->id,
                'name' => $data['name'],
                'slug' => str($data['name'])->slug(),
                'description' => $data['description'],
                'address' => $data['address'],
                'phone' => $data['phone'],
                'is_verified' => $i < 5,
                'status' => $i < 5 ? 'approved' : 'pending',
            ]);

            $business->categories()->attach($categories->random(rand(1, 2))->pluck('id'));
        }
    }
}
