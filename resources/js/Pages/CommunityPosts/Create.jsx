import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('community-posts.store'));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Post</h2>}>
            <Head title="Create Post" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <h1 className="text-xl font-semibold text-gray-900 mb-6">Create Community Post</h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            {errors.title && <p className="text-sm text-danger mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea value={data.content} onChange={e => setData('content', e.target.value)} rows={8} className="w-full px-3 py-2 border border-gray-200 rounded-sm bg-gray-0 text-sm focus:border-accent-500 focus:ring-3 focus:ring-accent-100 outline-none" />
                            {errors.content && <p className="text-sm text-danger mt-1">{errors.content}</p>}
                        </div>

                        <button type="submit" disabled={processing} className="px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors duration-150">
                            Submit for Moderation
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
