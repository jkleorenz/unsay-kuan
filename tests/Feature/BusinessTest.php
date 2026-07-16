<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\Category;
use App\Models\Town;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BusinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_view_businesses(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $business = Business::factory()->create(['status' => 'approved']);

        $this->get('/businesses')->assertOk();
        $this->get("/businesses/{$business->slug}")->assertOk();
    }

    public function test_owner_can_create_business(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $owner = User::factory()->create()->assignRole('business_owner');

        $this->actingAs($owner)
            ->post(route('owner.businesses.store'), [
                'name' => 'Test Business',
                'town_id' => 1,
            ])
            ->assertRedirect(route('owner.businesses.index'));

        $this->assertDatabaseHas('businesses', ['name' => 'Test Business']);
    }

    public function test_owner_cannot_edit_another_owners_business(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $owner1 = User::factory()->create()->assignRole('business_owner');
        $owner2 = User::factory()->create()->assignRole('business_owner');
        $business = Business::factory()->create(['user_id' => $owner1->id]);

        $this->actingAs($owner2)
            ->get(route('owner.businesses.edit', $business))
            ->assertForbidden();
    }

    public function test_pending_business_not_shown_publicly(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $business = Business::factory()->create(['status' => 'pending']);

        $this->get("/businesses/{$business->slug}")->assertNotFound();
    }
}
