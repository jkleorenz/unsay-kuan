import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ business, categories }) {
  const { data, setData, put, processing } = useForm({
    name: business.name, owner_name: business.owner_name,
    contact_number: business.contact_number, address: business.address,
    category_id: business.category_id, description: business.description || '',
    operating_hours: business.operating_hours || '', status: business.status,
    rejection_reason: business.rejection_reason || '',
  });

  function submit(e) {
    e.preventDefault();
    put(`/admin/businesses/${business.id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Business" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Business</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded px-3 py-2" value={data.name}
                 onChange={e => setData('name', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" value={data.owner_name}
                 onChange={e => setData('owner_name', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" value={data.contact_number}
                 onChange={e => setData('contact_number', e.target.value)} />
          <textarea className="w-full border rounded px-3 py-2" value={data.address}
                    onChange={e => setData('address', e.target.value)} />
          <select className="w-full border rounded px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <textarea className="w-full border rounded px-3 py-2" value={data.description}
                    onChange={e => setData('description', e.target.value)} />
          <input className="w-full border rounded px-3 py-2" value={data.operating_hours}
                 onChange={e => setData('operating_hours', e.target.value)} />
          <select className="w-full border rounded px-3 py-2" value={data.status}
                  onChange={e => setData('status', e.target.value)}>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
          <textarea className="w-full border rounded px-3 py-2" value={data.rejection_reason}
                    onChange={e => setData('rejection_reason', e.target.value)}
                    placeholder="Rejection reason (if rejected)" />
          <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
