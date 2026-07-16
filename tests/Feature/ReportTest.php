<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_report_content(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post(route('reports.store'), [
                'reportable_type' => 'App\Models\Business',
                'reportable_id' => 1,
                'reason' => 'Inappropriate content',
            ])
            ->assertSessionHas('success');
    }

    public function test_admin_can_dismiss_report(): void
    {
        $user = User::factory()->create();
        $report = Report::create([
            'user_id' => $user->id,
            'reportable_type' => 'App\Models\Business',
            'reportable_id' => 1,
            'reason' => 'Spam',
            'status' => 'pending',
        ]);

        $admin = User::factory()->create()->assignRole('admin');

        $this->actingAs($admin)
            ->post(route('admin.reports.dismiss', $report))
            ->assertSessionHas('success');

        $this->assertEquals('dismissed', $report->fresh()->status);
    }
}
