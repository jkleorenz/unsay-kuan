<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\CommunityPost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommunitySubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_submission_creates_pending_post(): void
    {
        $category = Category::where('type', 'community')->first();

        $response = $this->post('/community', [
            'title' => 'Clean-up drive this Saturday',
            'category_id' => $category->id,
            'content' => 'Join us for a beach clean-up.',
            'location' => 'South Bay',
        ]);

        $response->assertRedirect('/community');
        $this->assertDatabaseHas('community_posts', [
            'title' => 'Clean-up drive this Saturday',
            'status' => 'pending',
        ]);
    }

    public function test_pending_post_not_visible_publicly(): void
    {
        $post = CommunityPost::factory()->create(['status' => CommunityPost::STATUS_PENDING]);

        $this->get("/community/{$post->id}")->assertNotFound();
    }

    public function test_approved_post_visible_publicly(): void
    {
        $post = CommunityPost::factory()->create(['status' => CommunityPost::STATUS_APPROVED]);

        $this->get("/community/{$post->id}")->assertOk();
    }
}
