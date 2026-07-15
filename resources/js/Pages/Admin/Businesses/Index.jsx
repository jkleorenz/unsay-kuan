import { Head } from '@inertiajs/react';
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
                    <form method="POST" action={`/admin/businesses/${b.id}/approve`} className="inline">
                      <button className="text-green-600">Approve</button>
                    </form>
                  )}
                  <form method="POST" action={`/admin/businesses/${b.id}/feature`} className="inline">
                    <button className="text-purple-600">Feature</button>
                  </form>
                  <form method="POST" action={`/admin/businesses/${b.id}`} className="inline"
                        onSubmit={e => { if(!confirm('Delete?')) e.preventDefault(); }}>
                    <input type="hidden" name="_method" value="DELETE" />
                    <button className="text-red-600">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
