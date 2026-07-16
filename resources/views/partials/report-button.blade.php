@auth
    <button
        type="button"
        onclick="document.getElementById('report-form').classList.toggle('hidden')"
        class="text-xs text-gray-500 hover:text-danger transition-colors duration-150"
    >Report</button>
    <form id="report-form" method="POST" action="{{ route('reports.store') }}" class="hidden mt-3 space-y-2 border-t border-gray-200 pt-3">
        @csrf
        <input type="hidden" name="reportable_type" value="{{ $reportableType }}">
        <input type="hidden" name="reportable_id" value="{{ $reportableId }}">
        <textarea name="reason" rows="2" placeholder="Why are you reporting this?" class="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" required></textarea>
        <button type="submit" class="px-3 py-1.5 bg-danger text-white rounded-md text-xs font-medium hover:bg-danger/90 transition-colors duration-150">Submit Report</button>
    </form>
@endauth
