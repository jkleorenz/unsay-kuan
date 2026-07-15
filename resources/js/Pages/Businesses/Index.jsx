import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';

export default function Index({ businesses, featured = [], categories, filters }) {
  return (
    <PublicLayout>
      <Head title="Businesses" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Business Directory</h1>

        <section className="mt-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((b) => (
              <Card key={b.id} className="p-4 transition hover:shadow-md">
                <a href={`/businesses/${b.id}`} className="block">
                  <h3 className="font-semibold">{b.name}</h3>
                  <p className="text-sm text-gray-500">{b.category?.name}</p>
                </a>
              </Card>
            ))}
            {featured.length === 0 && (
              <p className="text-gray-500">No featured businesses yet.</p>
            )}
          </div>
        </section>

        <form method="GET" className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ''}
            placeholder="Search name or location"
            className="border border-gray-300 rounded-xl px-3 py-2 flex-1"
          />
          <select name="category" defaultValue={filters.category || ''} className="border border-gray-300 rounded-xl px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">Search</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.data.map((b) => (
            <Card key={b.id} className="p-4 transition hover:shadow-md">
              <a href={`/businesses/${b.id}`} className="block">
                <h2 className="font-semibold">{b.name}</h2>
                <p className="text-sm text-gray-500">{b.category?.name}</p>
                <p className="text-sm mt-1">{b.address}</p>
              </a>
            </Card>
          ))}
        </div>

        {businesses.data.length === 0 && (
          <p className="text-gray-500 mt-6">No businesses found.</p>
        )}
      </div>
    </PublicLayout>
  );
}
