<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'reportable_type' => 'required|string',
            'reportable_id' => 'required|integer',
            'reason' => 'required|string|max:1000',
        ]);

        Report::create([
            'user_id' => auth()->id(),
            'reportable_type' => $data['reportable_type'],
            'reportable_id' => $data['reportable_id'],
            'reason' => $data['reason'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Report submitted. We\'ll review it shortly.');
    }
}
