import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ business, towns, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: business.name,
        description: business.description || '',
        address: business.address || '',
        phone: business.phone || '',
        email: business.email || '',
        website: business.website || '',
        hours: business.hours || '',
        town_id: business.town_id,
        categories: business.categories.map(c => c.id),
    });

    function submit(e) {
        e.preventDefault();
        put(route('owner.businesses.update', business.id));
    }

    function toggleCategory(id) {
        setData('categories', data.categories.includes(id)
            ? data.categories.filter(c => c !== id)
            : [...data.categories, id]
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Business</h2>}>
            <Head title="Edit Business" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <Link href={route('owner.businesses.index')} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back</Link>
                    <h1 className="text-xl font-semibold text-gray-900 mt-4 mb-6">Edit Business</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            {errors.name && <p className="text-sm text-danger mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                            <select value={data.town_id} onChange={e => setData('town_id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                <option value="">Select town</option>
                                {towns.map(town => (
                                    <option key={town.id} value={town.id}>{town.name}</option>
                                ))}
                            </select>
                            {errors.town_id && <p className="text-sm text-danger mt-1">{errors.town_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input type="text" value={data.address} onChange={e => setData('address', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input type="url" value={data.website} onChange={e => setData('website', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                            <input type="text" value={data.hours} onChange={e => setData('hours', e.target.value)} placeholder="e.g. Mon-Fri 9AM-5PM" className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button key={category.id} type="button" onClick={() => toggleCategory(category.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-150 ${
                                            data.categories.includes(category.id)
                                                ? 'bg-accent-500 text-white border-accent-500'
                                                : 'bg-gray-0 text-gray-700 border-gray-200 hover:border-gray-300'
                                        }`}>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors duration-150">
                                Save Changes
                            </button>
                            <Link href={route('owner.businesses.index')} className="px-4 py-2 bg-gray-0 text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-150">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
