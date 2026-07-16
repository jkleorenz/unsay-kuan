<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_job_seeker_cannot_access_admin(): void
    {
        $user = User::factory()->create()->assignRole('job_seeker');

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_business_owner_cannot_access_admin(): void
    {
        $user = User::factory()->create()->assignRole('business_owner');

        $this->actingAs($user)
            ->get(route('admin.verifications.index'))
            ->assertForbidden();
    }

    public function test_admin_can_access_admin(): void
    {
        $user = User::factory()->create()->assignRole('admin');

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_guest_cannot_access_owner(): void
    {
        $this->get(route('owner.businesses.index'))->assertRedirect(route('login'));
    }
}
