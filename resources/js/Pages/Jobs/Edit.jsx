import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ job, businesses, towns }) {
    const { data, setData, put, processing, errors } = useForm({
        title: job.title,
        description: job.description || '',
        type: job.type,
        salary_min: job.salary_min || '',
        salary_max: job.salary_max || '',
        business_id: job.business_id,
        town_id: job.town_id,
    });

    function submit(e) {
        e.preventDefault();
        put(route('owner.jobs.update', job.id));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Job</h2>}>
            <Head title="Edit Job" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <Link href={route('owner.jobs.index')} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">&larr; Back</Link>
                    <h1 className="text-xl font-semibold text-gray-900 mt-4 mb-6">Edit Job</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            {errors.title && <p className="text-sm text-danger mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
                                <select value={data.business_id} onChange={e => setData('business_id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                    {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Town</label>
                                <select value={data.town_id} onChange={e => setData('town_id', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                    {towns.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select value={data.type} onChange={e => setData('type', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none">
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>

                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Min (₱)</label>
                                <input type="number" value={data.salary_min} onChange={e => setData('salary_min', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Max (₱)</label>
                                <input type="number" value={data.salary_max} onChange={e => setData('salary_max', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors duration-150">Update Job</button>
                            <Link href={route('owner.jobs.index')} className="px-4 py-2 bg-gray-0 text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-150">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
