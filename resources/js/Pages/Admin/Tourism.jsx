import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Tourism({ listings }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tourism Listings</h2>}>
            <Head title="Tourism" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-semibold text-gray-900">Tourism Listings</h1>
                        <Link href={route('admin.tourism.create')} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Add Listing</Link>
                    </div>

                    {flash?.success && <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>}

                    <div className="grid gap-4">
                        {listings.map(listing => (
                            <div key={listing.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <h2 className="font-medium text-gray-900">{listing.name}</h2>
                                    <p className="text-sm text-gray-500">{listing.category?.name} &middot; {listing.town?.name}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link href={route('admin.tourism.edit', listing.id)} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">Edit</Link>
                                </div>
                            </div>
                        ))}
                        {listings.length === 0 && <p className="text-center text-gray-500 py-12">No listings yet.</p>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
