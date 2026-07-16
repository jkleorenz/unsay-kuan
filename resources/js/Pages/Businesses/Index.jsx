import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ businesses }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Businesses</h2>}>
            <Head title="My Businesses" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-semibold text-gray-900">My Businesses</h1>
                        <Link href={route('owner.businesses.create')} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">
                            Add Business
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>
                    )}

                    {businesses.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">No businesses yet.</p>
                    ) : (
                        <div className="grid gap-4">
                            {businesses.map((business) => (
                                <div key={business.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-gray-900">{business.name}</h2>
                                        <p className="text-sm text-gray-500">{business.town?.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            business.status === 'approved' ? 'bg-success/10 text-success' :
                                            business.status === 'rejected' ? 'bg-danger/10 text-danger' :
                                            'bg-warning/10 text-warning'
                                        }`}>
                                            {business.status}
                                        </span>
                                        <Link href={route('owner.businesses.edit', business.id)} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">Edit</Link>
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
