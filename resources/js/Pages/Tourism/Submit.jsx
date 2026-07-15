import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Submit({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '', category_id: '', description: '', contact_number: '',
    location: '', entrance_fee: '', operating_hours: '', photos: [],
  });

  function submit(e) {
    e.preventDefault();
    post('/tourism');
  }

  return (
    <PublicLayout>
      <Head title="Suggest a Tourism Spot" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Suggest a Tourism Spot</h1>
        <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Name"
                 value={data.name} onChange={e => setData('name', e.target.value)} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Description (optional)"
                    value={data.description} onChange={e => setData('description', e.target.value)} />

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Contact number (optional)"
                 value={data.contact_number} onChange={e => setData('contact_number', e.target.value)} />

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Location (optional)"
                 value={data.location} onChange={e => setData('location', e.target.value)} />

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Entrance fee (optional)"
                 value={data.entrance_fee} onChange={e => setData('entrance_fee', e.target.value)} />

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Operating hours (optional)"
                 value={data.operating_hours} onChange={e => setData('operating_hours', e.target.value)} />

          <input type="file" multiple accept="image/*"
                 onChange={e => setData('photos', Array.from(e.target.files))} />

          <button disabled={processing} className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">
            Submit
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}
