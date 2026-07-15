import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ categories }) {
  const { data, setData, post, processing } = useForm({ name: '' });

  function submit(e) {
    e.preventDefault();
    post('/admin/categories');
  }

  return (
    <AuthenticatedLayout>
      <Head title="Categories" />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <form onSubmit={submit} className="flex gap-2 mb-4">
          <input className="flex-1 border rounded px-3 py-2" placeholder="New category"
                 value={data.name} onChange={e => setData('name', e.target.value)} />
          <button disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>
        <ul className="divide-y border rounded">
          {categories.data.map((c) => (
            <li key={c.id} className="p-3 flex justify-between">
              <span>{c.name}</span>
              <form method="POST" action={`/admin/categories/${c.id}`} className="inline"
                    onSubmit={e => { if(!confirm('Delete?')) e.preventDefault(); }}>
                <input type="hidden" name="_method" value="DELETE" />
                <button className="text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
}
