import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MyApplications({ applications }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Applications</h2>}>
            <Head title="My Applications" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {applications.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">You haven't applied to any jobs yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {applications.map(app => (
                                <div key={app.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{app.job.title}</h3>
                                            <p className="text-sm text-gray-500">{app.job.business?.name} &middot; {app.job.town?.name}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            app.status === 'accepted' ? 'bg-success/10 text-success' :
                                            app.status === 'rejected' ? 'bg-danger/10 text-danger' :
                                            app.status === 'reviewed' ? 'bg-accent-50 text-accent-700' :
                                            'bg-warning/10 text-warning'
                                        }`}>{app.status}</span>
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
