import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Card from '@/Components/Card';

export default function Index({ posts, categories, filters }) {
  return (
    <PublicLayout>
      <Head title="Community" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Community</h1>

        <form method="GET" className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ''}
            placeholder="Search title, content or location"
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

        <div className="space-y-4">
          {posts.data.map((p) => (
            <Card key={p.id} className="hover:shadow">
              <a href={`/community/${p.id}`} className="block p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{p.title}</h2>
                  <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">{p.category?.name}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{p.location}</p>
                <p className="text-sm mt-2 line-clamp-2">{p.content}</p>
              </a>
            </Card>
          ))}
        </div>

        {posts.data.length === 0 && (
          <p className="text-gray-500 mt-6">No community posts found.</p>
        )}

        <a href="/community/submit" className="mt-6 inline-block font-medium text-gray-900 hover:text-gray-700">
          Post to the community
        </a>
      </div>
    </PublicLayout>
  );
}
