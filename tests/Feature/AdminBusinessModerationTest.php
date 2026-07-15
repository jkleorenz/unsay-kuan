<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminBusinessModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_approve_a_business(): void
    {
        $this->seed();
        $admin = User::first();
        $business = Business::factory()->create(['status' => 'pending']);

        $this->actingAs($admin)
            ->post("/admin/businesses/{$business->id}/approve")
            ->assertRedirect();

        $this->assertDatabaseHas('businesses', [
            'id' => $business->id,
            'status' => 'approved',
        ]);
    }

    public function test_guest_cannot_access_admin(): void
    {
        $business = Business::factory()->create();

        $this->get("/admin/businesses/{$business->id}/edit")->assertRedirect('/login');
    }
}
