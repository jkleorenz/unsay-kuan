<?php

namespace Tests\Feature;

use App\Models\CommunityPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCommunityModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_approve_a_post(): void
    {
        $this->seed();
        $admin = User::where('role', 'admin')->firstOrFail();
        $post = CommunityPost::factory()->create(['status' => CommunityPost::STATUS_PENDING]);

        $this->actingAs($admin)
            ->post("/admin/community/{$post->id}/approve")
            ->assertRedirect();

        $this->assertDatabaseHas('community_posts', [
            'id' => $post->id,
            'status' => CommunityPost::STATUS_APPROVED,
        ]);
    }

    public function test_guest_cannot_access_admin(): void
    {
        $post = CommunityPost::factory()->create();

        $this->get("/admin/community/{$post->id}/edit")->assertRedirect('/login');
    }

    public function test_non_admin_cannot_access_admin(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $post = CommunityPost::factory()->create();

        $this->actingAs($user)
            ->get("/admin/community/{$post->id}/edit")
            ->assertForbidden();
    }
}
