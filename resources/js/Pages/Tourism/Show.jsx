import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ item }) {
  return (
    <PublicLayout>
      <Head title={item.name} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-gray-500">{item.category?.name}</p>

        <dl className="mt-4 space-y-2">
          <div><dt className="font-semibold">Contact</dt><dd>{item.contact_number}</dd></div>
          <div><dt className="font-semibold">Location</dt><dd>{item.location}</dd></div>
          <div><dt className="font-semibold">Entrance fee</dt><dd>{item.entrance_fee}</dd></div>
          <div><dt className="font-semibold">Hours</dt><dd>{item.operating_hours}</dd></div>
          <div><dt className="font-semibold">Description</dt><dd>{item.description}</dd></div>
        </dl>

        {item.photos?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {item.photos.map((p) => (
              <img key={p.id} src={`/storage/${p.path}`} alt="" className="rounded" />
            ))}
          </div>
        )}

        <a href="/tourism" className="text-gray-600 hover:text-gray-900 mt-6 inline-block">Back to tourism</a>
      </div>
    </PublicLayout>
  );
}
