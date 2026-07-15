import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Submit({ categories }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '', category_id: '', content: '', location: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/community');
  }

  return (
    <PublicLayout>
      <Head title="Post to the Community" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Post to the Community</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Title"
                 value={data.title} onChange={e => setData('title', e.target.value)} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Content"
                    value={data.content} onChange={e => setData('content', e.target.value)} />
          {errors.content && <p className="text-red-600 text-sm">{errors.content}</p>}

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Location (optional)"
                 value={data.location} onChange={e => setData('location', e.target.value)} />

          <button disabled={processing} className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">
            Submit
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}
