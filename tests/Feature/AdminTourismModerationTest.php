<?php

namespace Tests\Feature;

use App\Models\Tourism;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTourismModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_approve_a_listing(): void
    {
        $this->seed();
        $admin = User::where('role', 'admin')->firstOrFail();
        $listing = Tourism::factory()->create(['status' => Tourism::STATUS_PENDING]);

        $this->actingAs($admin)
            ->post("/admin/tourism/{$listing->id}/approve")
            ->assertRedirect();

        $this->assertDatabaseHas('tourism_listings', [
            'id' => $listing->id,
            'status' => Tourism::STATUS_APPROVED,
        ]);
    }

    public function test_guest_cannot_access_admin(): void
    {
        $listing = Tourism::factory()->create();

        $this->get("/admin/tourism/{$listing->id}/edit")->assertRedirect('/login');
    }

    public function test_non_admin_cannot_access_admin(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $listing = Tourism::factory()->create();

        $this->actingAs($user)
            ->get("/admin/tourism/{$listing->id}/edit")
            ->assertForbidden();
    }
}
