import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Applications({ applications }) {
    const { flash } = usePage().props;

    function updateStatus(id, status) {
        router.put(route('owner.applications.update', id), { status });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Applications Received</h2>}>
            <Head title="Applications" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {flash?.success && <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>}

                    {applications.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">No applications yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {applications.map(app => (
                                <div key={app.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{app.user.name}</h3>
                                            <p className="text-sm text-gray-500">Applied to: {app.job.title} &middot; {app.job.business?.name}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            app.status === 'accepted' ? 'bg-success/10 text-success' :
                                            app.status === 'rejected' ? 'bg-danger/10 text-danger' :
                                            app.status === 'reviewed' ? 'bg-accent-50 text-accent-700' :
                                            'bg-warning/10 text-warning'
                                        }`}>{app.status}</span>
                                    </div>
                                    {app.message && <p className="text-sm text-gray-700 mb-3">{app.message}</p>}
                                    <div className="flex gap-2">
                                        {['reviewed', 'accepted', 'rejected'].map(status => (
                                            <button key={status} onClick={() => updateStatus(app.id, status)}
                                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 ${
                                                    app.status === status
                                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                        : status === 'accepted' ? 'bg-success text-white hover:bg-success/90'
                                                        : status === 'rejected' ? 'bg-danger text-white hover:bg-danger/90'
                                                        : 'bg-accent-500 text-white hover:bg-accent-600'
                                                }`}>{status}</button>
                                        ))}
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
