<?php

namespace Tests\Feature;

use App\Models\Business;
use App\Models\Job;
use App\Models\Town;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_view_jobs(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $owner = User::factory()->create();
        $business = Business::factory()->create(['user_id' => $owner->id]);
        Job::factory()->create(['business_id' => $business->id, 'user_id' => $owner->id, 'is_active' => true]);

        $this->get('/jobs')->assertOk();
    }

    public function test_job_seeker_can_apply(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $owner = User::factory()->create();
        $business = Business::factory()->create(['user_id' => $owner->id]);
        $job = Job::factory()->create(['business_id' => $business->id, 'user_id' => $owner->id, 'is_active' => true]);
        $seeker = User::factory()->create()->assignRole('job_seeker');

        $this->actingAs($seeker)
            ->post(route('jobs.apply', $job), ['message' => 'I am interested'])
            ->assertSessionHas('success');

        $this->assertDatabaseHas('job_applications', ['job_id' => $job->id, 'user_id' => $seeker->id]);
    }

    public function test_duplicate_application_blocked(): void
    {
        Town::factory()->create(['slug' => 'test']);
        $owner = User::factory()->create();
        $business = Business::factory()->create(['user_id' => $owner->id]);
        $job = Job::factory()->create(['business_id' => $business->id, 'user_id' => $owner->id, 'is_active' => true]);
        $seeker = User::factory()->create()->assignRole('job_seeker');

        $this->actingAs($seeker)->post(route('jobs.apply', $job));
        $this->actingAs($seeker)->post(route('jobs.apply', $job))->assertSessionHas('error');
    }
}
