<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Tourism;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TourismSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_submission_creates_pending_listing(): void
    {
        $category = Category::where('type', 'tourism')->first();

        $response = $this->post('/tourism', [
            'name' => 'Crystal Falls',
            'category_id' => $category->id,
            'location' => 'North Valley',
            'entrance_fee' => 'PHP 20',
            'operating_hours' => '8am-6pm',
        ]);

        $response->assertRedirect('/tourism');
        $this->assertDatabaseHas('tourism_listings', [
            'name' => 'Crystal Falls',
            'status' => 'pending',
        ]);
    }

    public function test_pending_listing_not_visible_publicly(): void
    {
        $listing = Tourism::factory()->create(['status' => Tourism::STATUS_PENDING]);

        $this->get("/tourism/{$listing->id}")->assertNotFound();
    }

    public function test_approved_listing_visible_publicly(): void
    {
        $listing = Tourism::factory()->create(['status' => Tourism::STATUS_APPROVED]);

        $this->get("/tourism/{$listing->id}")->assertOk();
    }
}
