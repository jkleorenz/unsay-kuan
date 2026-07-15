import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ businesses, categories, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Businesses" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Business Directory</h1>

        <form method="GET" className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ''}
            placeholder="Search name or location"
            className="border rounded px-3 py-2 flex-1"
          />
          <select name="category" defaultValue={filters.category || ''} className="border rounded px-3 py-2">
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.data.map((b) => (
            <a key={b.id} href={`/businesses/${b.id}`}
               className="block border rounded p-4 hover:shadow">
              <h2 className="font-semibold">{b.name}</h2>
              <p className="text-sm text-gray-500">{b.category?.name}</p>
              <p className="text-sm mt-1">{b.address}</p>
            </a>
          ))}
        </div>

        {businesses.data.length === 0 && (
          <p className="text-gray-500 mt-6">No businesses found.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
