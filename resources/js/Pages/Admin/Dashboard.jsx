import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
            <div key={label} className="border rounded p-4 text-center">
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-4">
          <a href="/admin/businesses" className="text-blue-600">Manage businesses</a>
          <a href="/admin/categories" className="text-blue-600">Manage categories</a>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
