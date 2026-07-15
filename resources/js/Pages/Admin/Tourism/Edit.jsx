import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ item, categories }) {
  const { data, setData, put, processing } = useForm({
    name: item.name, category_id: item.category_id,
    description: item.description || '', contact_number: item.contact_number || '',
    location: item.location || '', entrance_fee: item.entrance_fee || '',
    operating_hours: item.operating_hours || '', status: item.status,
    rejection_reason: item.rejection_reason || '',
  });

  function submit(e) {
    e.preventDefault();
    put(`/admin/tourism/${item.id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Tourism" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Tourism</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.name}
                 onChange={e => setData('name', e.target.value)} />
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.description}
                    onChange={e => setData('description', e.target.value)} />
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.contact_number}
                 onChange={e => setData('contact_number', e.target.value)} />
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.location}
                 onChange={e => setData('location', e.target.value)} />
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.entrance_fee}
                 onChange={e => setData('entrance_fee', e.target.value)} />
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.operating_hours}
                 onChange={e => setData('operating_hours', e.target.value)} />
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.status}
                  onChange={e => setData('status', e.target.value)}>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>
          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.rejection_reason}
                    onChange={e => setData('rejection_reason', e.target.value)}
                    placeholder="Rejection reason (if rejected)" />
          <button disabled={processing} className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">Save</button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
