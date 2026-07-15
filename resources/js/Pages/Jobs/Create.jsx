import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Create({ categories, jobTypes }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '', company: '', location: '', type: '', category_id: '',
    description: '', contact_email: '', contact_phone: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/jobs');
  }

  return (
    <PublicLayout>
      <Head title="Post a Job" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Job title"
                 value={data.title} onChange={e => setData('title', e.target.value)} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Company (optional)"
                 value={data.company} onChange={e => setData('company', e.target.value)} />

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Location (optional)"
                 value={data.location} onChange={e => setData('location', e.target.value)} />

          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.type}
                  onChange={e => setData('type', e.target.value)}>
            <option value="">Select type (optional)</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category (optional)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Description"
                    value={data.description} onChange={e => setData('description', e.target.value)} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Contact email (optional)"
                 value={data.contact_email} onChange={e => setData('contact_email', e.target.value)} />
          {errors.contact_email && <p className="text-red-600 text-sm">{errors.contact_email}</p>}

          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" placeholder="Contact phone (optional)"
                 value={data.contact_phone} onChange={e => setData('contact_phone', e.target.value)} />

          <button disabled={processing} className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">
            Submit
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}
