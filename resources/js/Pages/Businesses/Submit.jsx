import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Submit({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '', owner_name: '', contact_number: '', address: '',
    category_id: '', description: '', operating_hours: '', photos: [],
  });

  function submit(e) {
    e.preventDefault();
    post('/businesses');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Submit a Business" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Submit a Business</h1>
        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
          <input className="w-full border rounded px-3 py-2" placeholder="Business name"
                 value={data.name} onChange={e => setData('name', e.target.value)} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input className="w-full border rounded px-3 py-2" placeholder="Owner / contact person"
                 value={data.owner_name} onChange={e => setData('owner_name', e.target.value)} />

          <input className="w-full border rounded px-3 py-2" placeholder="Contact number"
                 value={data.contact_number} onChange={e => setData('contact_number', e.target.value)} />

          <textarea className="w-full border rounded px-3 py-2" placeholder="Address"
                    value={data.address} onChange={e => setData('address', e.target.value)} />

          <select className="w-full border rounded px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="w-full border rounded px-3 py-2" placeholder="Description (optional)"
                    value={data.description} onChange={e => setData('description', e.target.value)} />

          <input className="w-full border rounded px-3 py-2" placeholder="Operating hours (optional)"
                 value={data.operating_hours} onChange={e => setData('operating_hours', e.target.value)} />

          <input type="file" multiple accept="image/*"
                 onChange={e => setData('photos', Array.from(e.target.files))} />

          <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
