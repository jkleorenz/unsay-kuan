import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ post }) {
  return (
    <PublicLayout>
      <Head title={post.title} />
      <div className="max-w-3xl mx-auto p-6">
        <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">{post.category?.name}</span>
        <h1 className="text-2xl font-bold mt-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{post.location}</p>
        <p className="mt-4 whitespace-pre-line">{post.content}</p>

        <a href="/community" className="text-gray-600 hover:text-gray-900 mt-6 inline-block">Back to community</a>
      </div>
    </PublicLayout>
  );
}
