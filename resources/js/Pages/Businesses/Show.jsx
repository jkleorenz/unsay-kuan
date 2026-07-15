import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ business }) {
  return (
    <AuthenticatedLayout>
      <Head title={business.name} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">{business.name}</h1>
        <p className="text-gray-500">{business.category?.name}</p>

        <dl className="mt-4 space-y-2">
          <div><dt className="font-semibold">Owner</dt><dd>{business.owner_name}</dd></div>
          <div><dt className="font-semibold">Contact</dt><dd>{business.contact_number}</dd></div>
          <div><dt className="font-semibold">Address</dt><dd>{business.address}</dd></div>
          <div><dt className="font-semibold">Hours</dt><dd>{business.operating_hours}</dd></div>
          <div><dt className="font-semibold">Description</dt><dd>{business.description}</dd></div>
        </dl>

        {business.photos?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {business.photos.map((p) => (
              <img key={p.id} src={`/storage/${p.path}`} alt="" className="rounded" />
            ))}
          </div>
        )}

        <a href="/businesses" className="text-blue-600 mt-6 inline-block">Back to directory</a>
      </div>
    </AuthenticatedLayout>
  );
}
