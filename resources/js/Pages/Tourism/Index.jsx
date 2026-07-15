import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';

export default function Index({ items, categories, filters }) {
  return (
    <PublicLayout>
      <Head title="Tourism" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Tourism</h1>

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
          {items.data.map((t) => (
            <Card key={t.id} className="hover:shadow">
              <a href={`/tourism/${t.id}`} className="block p-4">
                <h2 className="font-semibold">{t.name}</h2>
                <p className="text-sm text-gray-500">{t.category?.name}</p>
                <p className="text-sm mt-1">{t.location}</p>
              </a>
            </Card>
          ))}
        </div>

        {items.data.length === 0 && (
          <p className="text-gray-500 mt-6">No tourism listings found.</p>
        )}

        <a href="/tourism/submit" className="mt-6 inline-block font-medium text-gray-900 hover:text-gray-700">
          Suggest a tourism spot
        </a>
      </div>
    </PublicLayout>
  );
}
