import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';

export default function TourismForm({ listing, towns, categories }) {
    const isEdit = !!listing;
    const { data, setData, post, put, processing, errors } = useForm({
        name: listing?.name || '',
        description: listing?.description || '',
        address: listing?.address || '',
        town_id: listing?.town_id || '',
        category_id: listing?.category_id || '',
    });

    function submit(e) {
        e.preventDefault();
        isEdit ? put(route('admin.tourism.update', listing.id)) : post(route('admin.tourism.store'));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">{isEdit ? 'Edit' : 'Add'} Tourism Listing</h2>}>
            <Head title={isEdit ? 'Edit Listing' : 'Add Listing'} />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <Link href={route('admin.tourism.index')} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back</Link>
                    <h1 className="text-xl font-semibold text-gray-900 mt-4 mb-6">{isEdit ? 'Edit' : 'Add'} Tourism Listing</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            {errors.name && <p className="text-sm text-danger mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                                <select value={data.town_id} onChange={e => setData('town_id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                    <option value="">Select town</option>
                                    {towns.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                                {errors.town_id && <p className="text-sm text-danger mt-1">{errors.town_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                    <option value="">Select category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.category_id && <p className="text-sm text-danger mt-1">{errors.category_id}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input type="text" value={data.address} onChange={e => setData('address', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors duration-150">{isEdit ? 'Update' : 'Create'} Listing</button>
                            <Link href={route('admin.tourism.index')} className="px-4 py-2 bg-gray-0 text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-150">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
