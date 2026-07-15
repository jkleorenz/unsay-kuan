<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\CommunityPost;
use App\Models\Job;
use App\Models\Tourism;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_search_finds_across_modules(): void
    {
        Business::factory()->create(['name' => 'Unique Cafe', 'status' => 'approved']);
        Job::factory()->create(['title' => 'Unique Helper', 'status' => 'approved']);
        Tourism::factory()->create(['name' => 'Unique Falls', 'status' => 'approved']);
        CommunityPost::factory()->create(['title' => 'Unique Event', 'status' => 'approved']);

        $response = $this->get('/search?q=Unique');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Search/Index')
            ->has('businesses', 1)
            ->has('jobs', 1)
            ->has('tourism', 1)
            ->has('community', 1));
    }

    public function test_search_ignores_unapproved(): void
    {
        Business::factory()->create(['name' => 'Hidden Shop', 'status' => 'pending']);

        $this->get('/search?q=Hidden')
            ->assertInertia(fn ($page) => $page->has('businesses', 0));
    }
}
