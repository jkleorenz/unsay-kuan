import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';

export default function Index({ jobs, featured = [], categories, jobTypes, filters }) {
  return (
    <PublicLayout>
      <Head title="Jobs" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

        <section className="mt-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((job) => (
              <Card key={job.id} className="hover:shadow">
                <a href={`/jobs/${job.id}`} className="block p-4">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">{job.type}</span>
                  <p className="text-xs text-gray-400 mt-2">{job.category?.name}</p>
                </a>
              </Card>
            ))}
            {featured.length === 0 && (
              <p className="text-gray-500">No jobs posted yet.</p>
            )}
          </div>
        </section>

        <form method="GET" className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            name="q"
            defaultValue={filters.q || ''}
            placeholder="Search title, company or location"
            className="border border-gray-300 rounded-xl px-3 py-2 flex-1"
          />
          <select name="category" defaultValue={filters.category || ''} className="border border-gray-300 rounded-xl px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select name="type" defaultValue={filters.type || ''} className="border border-gray-300 rounded-xl px-3 py-2">
            <option value="">All types</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">Search</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.data.map((j) => (
            <Card key={j.id} className="hover:shadow">
              <a href={`/jobs/${j.id}`} className="block p-4">
                <h2 className="font-semibold">{j.title}</h2>
                <p className="text-sm text-gray-500">{j.company}</p>
                <p className="text-sm mt-1">{j.location}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {j.type && <span className="bg-gray-100 rounded px-2 py-1">{j.type}</span>}
                  {j.category?.name && <span className="bg-gray-100 rounded px-2 py-1">{j.category.name}</span>}
                </div>
              </a>
            </Card>
          ))}
        </div>

        {jobs.data.length === 0 && (
          <p className="text-gray-500 mt-6">No jobs found.</p>
        )}
      </div>
    </PublicLayout>
  );
}
