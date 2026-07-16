import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Reports({ reports }) {
    const { flash } = usePage().props;

    function dismiss(id) {
        router.post(route('admin.reports.dismiss', id));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Reports</h2>}>
            <Head title="Reports" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {flash?.success && <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>}

                    {reports.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">No reports.</p>
                    ) : (
                        <div className="grid gap-4">
                            {reports.map(report => (
                                <div key={report.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{report.reporter} reported a {report.type}</p>
                                        <p className="text-sm text-gray-500 mt-1">{report.reason}</p>
                                        <p className="text-xs text-gray-500 mt-1">{report.created_at}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            report.status === 'resolved' ? 'bg-success/10 text-success' :
                                            report.status === 'dismissed' ? 'bg-gray-100 text-gray-500' :
                                            'bg-warning/10 text-warning'
                                        }`}>{report.status}</span>
                                        {report.status === 'pending' && (
                                            <button onClick={() => dismiss(report.id)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors duration-150">Dismiss</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
