<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActionLog;
use App\Models\Business;
use App\Models\VerificationLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Verifications', [
            'pending' => Business::with(['user', 'town', 'categories'])
                ->where('status', 'pending')
                ->latest()
                ->get(),
            'approved' => Business::with(['user', 'town', 'categories'])
                ->where('status', 'approved')
                ->latest()
                ->take(20)
                ->get(),
        ]);
    }

    public function approve(Business $business)
    {
        $business->update(['status' => 'approved', 'is_verified' => true]);

        VerificationLog::create([
            'verifiable_type' => Business::class,
            'verifiable_id' => $business->id,
            'verified_by' => auth()->id(),
            'action' => 'approved',
        ]);

        AdminActionLog::create([
            'user_id' => auth()->id(),
            'action' => 'business.approved',
            'target_type' => Business::class,
            'target_id' => $business->id,
            'description' => "Approved business: {$business->name}",
        ]);

        return back()->with('success', 'Business approved.');
    }

    public function reject(Request $request, Business $business)
    {
        $data = $request->validate(['notes' => 'nullable|string']);

        $business->update(['status' => 'rejected', 'is_verified' => false]);

        VerificationLog::create([
            'verifiable_type' => Business::class,
            'verifiable_id' => $business->id,
            'verified_by' => auth()->id(),
            'action' => 'rejected',
            'notes' => $data['notes'] ?? null,
        ]);

        AdminActionLog::create([
            'user_id' => auth()->id(),
            'action' => 'business.rejected',
            'target_type' => Business::class,
            'target_id' => $business->id,
            'description' => "Rejected business: {$business->name}",
        ]);

        return back()->with('success', 'Business rejected.');
    }
}
