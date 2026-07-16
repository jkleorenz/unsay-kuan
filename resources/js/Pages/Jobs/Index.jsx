import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ jobs }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState('');

    const filtered = jobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Jobs</h2>}>
            <Head title="My Jobs" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-semibold text-gray-900">My Jobs</h1>
                        <Link href={route('owner.jobs.create')} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Post Job</Link>
                    </div>
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="mb-4 w-full rounded-md border-gray-200 shadow-sm focus:border-accent-500 focus:ring-accent-100"
                    />

                    {flash?.success && <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>}

                    {filtered.length === 0 ? (
                        <div className="text-center py-12 bg-gray-0 border border-gray-200 rounded-lg">
                            <p className="text-gray-900 font-medium">No job listings yet.</p>
                            <p className="text-sm text-gray-500 mt-1">Post your first job listing to find candidates.</p>
                            <Link href={route('owner.jobs.create')} className="mt-4 inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Post a Job</Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filtered.map(job => (
                                <div key={job.id} className="bg-gray-0 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-medium text-gray-900">{job.title}</h2>
                                        <p className="text-sm text-gray-500">{job.business?.name} &middot; {job.town?.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{job.type}</span>
                                        <Link href={route('owner.applications.index')} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">Applications</Link>
                                        <Link href={route('owner.jobs.edit', job.id)} className="text-sm text-accent-700 hover:text-accent-600 transition-colors duration-150">Edit</Link>
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
