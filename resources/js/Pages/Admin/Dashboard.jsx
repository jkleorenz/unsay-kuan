import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

export default function Dashboard({ counts }) {
  const cards = [
    ['Pending', counts.pending],
    ['Approved', counts.approved],
    ['Total', counts.total],
    ['Categories', counts.categories],
  ];
  return (
    <AuthenticatedLayout>
      <Head title="Admin Dashboard" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cards.map(([label, value]) => (
            <Card key={label} className="p-4 text-center">
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Jobs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">{counts.jobsPending}</div>
            <div className="text-gray-500 text-sm">Jobs pending</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">{counts.jobsApproved}</div>
            <div className="text-gray-500 text-sm">Jobs approved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold">{counts.jobsTotal}</div>
            <div className="text-gray-500 text-sm">Jobs total</div>
          </Card>
        </div>

        <div className="mt-6 flex gap-4">
          <a href="/admin/businesses" className="text-gray-900 font-medium hover:underline">Manage businesses</a>
          <a href="/admin/jobs" className="text-gray-900 font-medium hover:underline">Manage jobs</a>
          <a href="/admin/categories" className="text-gray-900 font-medium hover:underline">Manage categories</a>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
