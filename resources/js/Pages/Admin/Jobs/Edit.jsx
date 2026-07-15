import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ job, categories }) {
  const { data, setData, put, processing, errors } = useForm({
    title: job.title, company: job.company || '', location: job.location || '',
    type: job.type || '', category_id: job.category_id || '', description: job.description || '',
    contact_email: job.contact_email || '', contact_phone: job.contact_phone || '',
    status: job.status,
  });

  function submit(e) {
    e.preventDefault();
    put(`/admin/jobs/${job.id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Job" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Job title"
                 value={data.title} onChange={e => setData('title', e.target.value)} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

          <input className="w-full border rounded px-3 py-2" placeholder="Company (optional)"
                 value={data.company} onChange={e => setData('company', e.target.value)} />

          <input className="w-full border rounded px-3 py-2" placeholder="Location (optional)"
                 value={data.location} onChange={e => setData('location', e.target.value)} />

          <input className="w-full border rounded px-3 py-2" placeholder="Type (optional)"
                 value={data.type} onChange={e => setData('type', e.target.value)} />

          <select className="w-full border rounded px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            <option value="">Select category (optional)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <textarea className="w-full border rounded px-3 py-2" placeholder="Description"
                    value={data.description} onChange={e => setData('description', e.target.value)} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}

          <input className="w-full border rounded px-3 py-2" placeholder="Contact email (optional)"
                 value={data.contact_email} onChange={e => setData('contact_email', e.target.value)} />
          {errors.contact_email && <p className="text-red-600 text-sm">{errors.contact_email}</p>}

          <input className="w-full border rounded px-3 py-2" placeholder="Contact phone (optional)"
                 value={data.contact_phone} onChange={e => setData('contact_phone', e.target.value)} />

          <select className="w-full border rounded px-3 py-2" value={data.status}
                  onChange={e => setData('status', e.target.value)}>
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>

          <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
