import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';

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
          <input className="flex-1 border border-gray-300 rounded-xl px-3 py-2" placeholder="New category"
                 value={data.name} onChange={e => setData('name', e.target.value)} />
          <button disabled={processing} className="bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">Add</button>
        </form>
        <Card className="p-0">
          <ul className="divide-y divide-gray-100">
            {categories.data.map((c) => (
              <li key={c.id} className="p-3 flex justify-between">
                <span>{c.name}</span>
                <form method="POST" action={`/admin/categories/${c.id}`} className="inline"
                      onSubmit={e => { if(!confirm('Delete?')) e.preventDefault(); }}>
                  <input type="hidden" name="_method" value="DELETE" />
                  <button className="bg-red-600 text-white rounded-full px-3 py-1.5 text-xs font-medium hover:bg-red-500 transition">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
