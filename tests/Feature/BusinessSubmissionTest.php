<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BusinessSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_submission_creates_pending_business(): void
    {
        $category = Category::first();

        $response = $this->post('/businesses', [
            'name' => 'Lucy\'s Cafe',
            'owner_name' => 'Lucy',
            'contact_number' => '09171234567',
            'address' => 'Main St',
            'category_id' => $category->id,
            'description' => 'Cozy cafe',
            'operating_hours' => '8am-8pm',
        ]);

        $response->assertRedirect('/businesses');
        $this->assertDatabaseHas('businesses', [
            'name' => 'Lucy\'s Cafe',
            'status' => 'pending',
        ]);
    }

    public function test_pending_business_not_visible_publicly(): void
    {
        $business = Business::factory()->create(['status' => 'pending']);

        $this->get("/businesses/{$business->id}")->assertNotFound();
    }

    public function test_approved_business_visible_publicly(): void
    {
        $business = Business::factory()->create(['status' => 'approved']);

        $this->get("/businesses/{$business->id}")->assertOk();
    }
}
