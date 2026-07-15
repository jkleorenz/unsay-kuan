import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function Index({ posts, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Community" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Community</h1>

        <form method="GET" className="flex gap-2 mb-4">
          <select name="status" defaultValue={filters.status || ''} className="border border-gray-300 rounded-xl px-3 py-2">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">Filter</button>
        </form>

        <Card className="overflow-hidden p-0">
          <table className="w-full text-left border-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Title</th><th className="p-2">Status</th><th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.data.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.title}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2 space-x-2">
                    <a href={`/admin/community/${p.id}/edit`} className="text-gray-900 font-medium hover:underline">Edit</a>
                    {p.status !== 'approved' && (
                      <button className="bg-gray-900 text-white rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gray-800 transition" onClick={() => router.post(`/admin/community/${p.id}/approve`)}>Approve</button>
                    )}
                    <button className="bg-red-600 text-white rounded-full px-3 py-1.5 text-xs font-medium hover:bg-red-500 transition" onClick={() => { if (confirm('Delete this post?')) router.delete(`/admin/community/${p.id}`); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
