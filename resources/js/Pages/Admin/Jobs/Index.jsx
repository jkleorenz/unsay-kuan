import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function Index({ jobs, filters, counts }) {
  return (
    <AuthenticatedLayout>
      <Head title="Jobs" />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Jobs</h1>

        <div className="flex gap-4 mb-4 text-sm">
          <span className="text-yellow-700">Pending: {counts.pending}</span>
          <span className="text-green-700">Approved: {counts.approved}</span>
          <span className="text-gray-700">Total: {counts.total}</span>
        </div>

        <form method="GET" className="flex gap-2 mb-4">
          <select name="status" defaultValue={filters.status || ''} className="border rounded px-3 py-2">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <input name="q" defaultValue={filters.q || ''} placeholder="Search title or company"
                 className="border rounded px-3 py-2 flex-1" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Filter</button>
        </form>

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Company</th>
              <th className="p-2">Location</th>
              <th className="p-2">Type</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.data.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-2">{j.title}</td>
                <td className="p-2">{j.company}</td>
                <td className="p-2">{j.location}</td>
                <td className="p-2">{j.type}</td>
                <td className="p-2">{j.category ? j.category.name : '-'}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${statusColor[j.status] || ''}`}>{j.status}</span>
                </td>
                <td className="p-2 space-x-2">
                  <a href={`/admin/jobs/${j.id}/edit`} className="text-blue-600">Edit</a>
                  {j.status !== 'approved' && (
                    <button className="text-green-600" onClick={() => router.post(`/admin/jobs/${j.id}/approve`)}>Approve</button>
                  )}
                  {j.status !== 'rejected' && (
                    <button className="text-orange-600" onClick={() => router.post(`/admin/jobs/${j.id}/reject`)}>Reject</button>
                  )}
                  <button className="text-red-600" onClick={() => { if (confirm('Delete this job?')) router.delete(`/admin/jobs/${j.id}`); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
