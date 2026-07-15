import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const comingSoon = ['Tourism', 'Community'];

export default function Home({ featured, jobs }) {
  return (
    <AuthenticatedLayout>
      <Head title="Unsay Kuan?" />
      <div className="max-w-5xl mx-auto p-6">
        <section className="text-center py-10">
          <h1 className="text-4xl font-bold">Unsay Kuan?</h1>
          <p className="text-gray-500 mt-2">Jobs, businesses, tourism & community — all in one place.</p>

          <form method="GET" action="/businesses" className="mt-6 flex max-w-md mx-auto gap-2">
            <input type="text" name="search" placeholder="Search businesses..."
                   className="flex-1 border rounded px-3 py-2" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Featured Businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((b) => (
              <a key={b.id} href={`/businesses/${b.id}`}
                 className="block border rounded p-4 hover:shadow">
                <h3 className="font-semibold">{b.name}</h3>
                <p className="text-sm text-gray-500">{b.category?.name}</p>
              </a>
            ))}
            {featured.length === 0 && (
              <p className="text-gray-500">No featured businesses yet.</p>
            )}
          </div>
          <a href="/businesses" className="text-blue-600 mt-4 inline-block">Browse all businesses</a>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Featured Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <a key={job.id} href={`/jobs/${job.id}`}
                 className="block border rounded p-4 hover:shadow">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">{job.type}</span>
                <p className="text-xs text-gray-400 mt-2">{job.category?.name}</p>
              </a>
            ))}
            {jobs.length === 0 && (
              <p className="text-gray-500">No jobs posted yet.</p>
            )}
          </div>
          <a href="/jobs" className="text-blue-600 mt-4 inline-block">Browse all jobs</a>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {comingSoon.map((label) => (
              <div key={label} className="border rounded p-6 text-center text-gray-400 opacity-70">
                <div className="text-lg font-semibold">{label}</div>
                <div className="text-sm">Coming soon</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
