<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_job(): void
    {
        $this->seed();
        $category = \App\Models\Category::where('type', 'job')->first();

        $response = $this->post(route('jobs.store'), [
            'title' => 'Senior Developer',
            'company' => 'Acme Corp',
            'location' => 'Cebu City',
            'type' => 'Full-time',
            'category_id' => $category->id,
            'description' => 'Build great things',
            'contact_email' => 'jobs@acme.test',
            'contact_phone' => '09171234567',
        ]);

        $response->assertRedirect(route('jobs.index'));
        $this->assertDatabaseHas('job_listings', [
            'title' => 'Senior Developer',
            'status' => 'pending',
        ]);
    }

    public function test_submitted_job_not_publicly_visible_until_approved(): void
    {
        $this->seed();
        $job = Job::factory()->create(['status' => Job::STATUS_PENDING]);

        $this->get(route('jobs.index'))->assertDontSee($job->title);
        $this->get(route('jobs.show', $job))->assertNotFound();

        $job->update(['status' => Job::STATUS_APPROVED]);

        $this->get(route('jobs.show', $job))->assertOk()->assertSee($job->title);
    }

    public function test_admin_can_approve_job(): void
    {
        $this->seed();
        $admin = User::first();
        $job = Job::factory()->create(['status' => Job::STATUS_PENDING]);

        $this->actingAs($admin)
            ->post(route('admin.jobs.approve', $job))
            ->assertRedirect();

        $this->assertDatabaseHas('job_listings', [
            'id' => $job->id,
            'status' => Job::STATUS_APPROVED,
        ]);
    }

    public function test_admin_can_reject_job(): void
    {
        $this->seed();
        $admin = User::first();
        $job = Job::factory()->create(['status' => Job::STATUS_PENDING]);

        $this->actingAs($admin)
            ->post(route('admin.jobs.reject', $job))
            ->assertRedirect();

        $this->assertDatabaseHas('job_listings', [
            'id' => $job->id,
            'status' => Job::STATUS_REJECTED,
        ]);
    }

    public function test_jobs_index_returns_200(): void
    {
        $this->seed();

        $this->get(route('jobs.index'))->assertOk();
    }
}
