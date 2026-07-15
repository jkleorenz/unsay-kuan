import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ businesses, filters }) {
  return (
    <AuthenticatedLayout>
      <Head title="Businesses" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Businesses</h1>

        <form method="GET" className="flex gap-2 mb-4">
          <select name="status" defaultValue={filters.status || ''} className="border rounded px-3 py-2">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
        </form>

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th><th className="p-2">Status</th>
              <th className="p-2">Featured</th><th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.data.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">{b.featured ? 'Yes' : 'No'}</td>
                <td className="p-2 space-x-2">
                  <a href={`/admin/businesses/${b.id}/edit`} className="text-blue-600">Edit</a>
                  {b.status !== 'approved' && (
                    <button className="text-green-600" onClick={() => router.post(`/admin/businesses/${b.id}/approve`)}>Approve</button>
                  )}
                  <button className="text-purple-600" onClick={() => router.post(`/admin/businesses/${b.id}/feature`)}>Feature</button>
                  <button className="text-red-600" onClick={() => { if (confirm('Delete this business?')) router.delete(`/admin/businesses/${b.id}`); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
