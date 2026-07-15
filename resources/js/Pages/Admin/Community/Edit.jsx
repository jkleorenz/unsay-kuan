import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ post, categories }) {
  const { data, setData, put, processing } = useForm({
    title: post.title, category_id: post.category_id,
    content: post.content, location: post.location || '',
    status: post.status, rejection_reason: post.rejection_reason || '',
  });

  function submit(e) {
    e.preventDefault();
    put(`/admin/community/${post.id}`);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Community Post" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Community Post</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.title}
                 onChange={e => setData('title', e.target.value)} />
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.category_id}
                  onChange={e => setData('category_id', e.target.value)}>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <textarea className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.content}
                    onChange={e => setData('content', e.target.value)} />
          <input className="w-full border border-gray-300 rounded-xl px-3 py-2" value={data.location}
                 onChange={e => setData('location', e.target.value)} />
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
