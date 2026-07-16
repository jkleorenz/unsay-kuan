import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

function BusinessCard({ business, onApprove, onReject }) {
    return (
        <div className="bg-gray-0 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="font-medium text-gray-900">{business.name}</h3>
                    <p className="text-sm text-gray-500">{business.user?.name} &middot; {business.town?.name}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">Pending</span>
            </div>
            {business.description && <p className="text-sm text-gray-700 mb-3 line-clamp-2">{business.description}</p>}
            <div className="flex gap-2">
                <button onClick={() => onApprove(business.id)} className="px-3 py-1.5 bg-success text-white rounded-md text-xs font-medium hover:bg-success/90 transition-colors duration-150">Approve</button>
                <button onClick={() => onReject(business.id)} className="px-3 py-1.5 bg-danger text-white rounded-md text-xs font-medium hover:bg-danger/90 transition-colors duration-150">Reject</button>
            </div>
        </div>
    );
}

export default function Verifications({ pending, approved }) {
    const { flash } = usePage().props;
    const { post } = useForm();

    function approve(id) {
        post(route('admin.verifications.approve', id));
    }

    function reject(id) {
        if (confirm('Reject this business listing?')) {
            post(route('admin.verifications.reject', id));
        }
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Verifications</h2>}>
            <Head title="Verifications" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <h1 className="text-xl font-semibold text-gray-900 mb-6">Business Verifications</h1>

                    {flash?.success && (
                        <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>
                    )}

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending ({pending.length})</h2>
                    {pending.length === 0 ? (
                        <p className="text-gray-500 text-sm mb-8">No pending verifications.</p>
                    ) : (
                        <div className="grid gap-4 mb-8">
                            {pending.map(b => <BusinessCard key={b.id} business={b} onApprove={approve} onReject={reject} />)}
                        </div>
                    )}

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Recently Approved</h2>
                    {approved.length === 0 ? (
                        <p className="text-gray-500 text-sm">None yet.</p>
                    ) : (
                        <div className="grid gap-3">
                            {approved.map(b => (
                                <div key={b.id} className="bg-gray-0 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{b.name}</p>
                                        <p className="text-xs text-gray-500">{b.user?.name}</p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">Approved</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
