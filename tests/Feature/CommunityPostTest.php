<?php

namespace Tests\Feature;

use App\Models\CommunityPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommunityPostTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_post(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('community-posts.store'), [
                'title' => 'Test Post',
                'content' => 'Test content',
            ])
            ->assertSessionHas('success');

        $this->assertDatabaseHas('community_posts', ['title' => 'Test Post', 'is_approved' => false]);
    }

    public function test_unapproved_post_not_shown(): void
    {
        $user = User::factory()->create();
        $post = CommunityPost::factory()->create(['is_approved' => false]);

        $this->get("/community-posts/{$post->slug}")->assertNotFound();
    }

    public function test_admin_can_approve_post(): void
    {
        $admin = User::factory()->create()->assignRole('admin');
        $post = CommunityPost::factory()->create(['is_approved' => false]);

        $this->actingAs($admin)
            ->post(route('admin.community-posts.approve', $post))
            ->assertSessionHas('success');

        $this->assertTrue((bool) $post->fresh()->is_approved);
    }
}
