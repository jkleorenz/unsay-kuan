import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ jobs, categories, jobTypes, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Jobs" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <form method="GET" className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            name="q"
            defaultValue={filters.q || ''}
            placeholder="Search title, company or location"
            className="border rounded px-3 py-2 flex-1"
          />
          <select name="category" defaultValue={filters.category || ''} className="border rounded px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="type" defaultValue={filters.type || ''} className="border rounded px-3 py-2">
            <option value="">All types</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.data.map((j) => (
            <a key={j.id} href={`/jobs/${j.id}`}
               className="block border rounded p-4 hover:shadow">
              <h2 className="font-semibold">{j.title}</h2>
              <p className="text-sm text-gray-500">{j.company}</p>
              <p className="text-sm mt-1">{j.location}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {j.type && <span className="bg-gray-100 rounded px-2 py-1">{j.type}</span>}
                {j.category?.name && <span className="bg-gray-100 rounded px-2 py-1">{j.category.name}</span>}
              </div>
            </a>
          ))}
        </div>

        {jobs.data.length === 0 && (
          <p className="text-gray-500 mt-6">No jobs found.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
