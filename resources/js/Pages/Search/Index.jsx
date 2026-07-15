import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';

export default function Index({ q, businesses, jobs, tourism, community }) {
  const total = businesses.length + jobs.length + tourism.length + community.length;

  return (
    <PublicLayout>
      <Head title={`Search: ${q}`} />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Search results {q && <span className="text-gray-500">for "{q}"</span>}
        </h1>

        {q === '' && <p className="text-gray-500">Type something to search across businesses, jobs, tourism and community.</p>}

        {q !== '' && total === 0 && <p className="text-gray-500">No results found.</p>}

        {businesses.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-2">Businesses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {businesses.map((b) => (
                <Card key={b.id} className="hover:shadow">
                  <a href={`/businesses/${b.id}`} className="block p-4">
                    <h3 className="font-semibold">{b.name}</h3>
                    <p className="text-sm text-gray-500">{b.category?.name}</p>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {jobs.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-2">Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow">
                  <a href={`/jobs/${job.id}`} className="block p-4">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {tourism.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-2">Tourism</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {tourism.map((t) => (
                <Card key={t.id} className="hover:shadow">
                  <a href={`/tourism/${t.id}`} className="block p-4">
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.category?.name}</p>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}

        {community.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold mb-2">Community</h2>
            <div className="space-y-4">
               {community.map((p) => (
                <Card key={p.id} className="hover:shadow">
                  <a href={`/community/${p.id}`} className="block p-4">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-500">{p.category?.name}</p>
                  </a>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </PublicLayout>
  );
}
