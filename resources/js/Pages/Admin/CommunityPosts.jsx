import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function CommunityPosts({ pending, approved }) {
    const { flash } = usePage().props;

    function approve(id) {
        router.post(route('admin.community-posts.approve', id));
    }

    function deletePost(id) {
        if (confirm('Delete this post?')) {
            router.delete(route('admin.community-posts.destroy', id));
        }
    }

    function PostCard({ post, showActions }) {
        return (
            <div className="bg-gray-0 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-500">{post.user?.name} &middot; {new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.content}</p>
                {showActions && (
                    <div className="flex gap-2">
                        <button onClick={() => approve(post.id)} className="px-3 py-1.5 bg-success text-white rounded-md text-xs font-medium hover:bg-success/90 transition-colors duration-150">Approve</button>
                        <button onClick={() => deletePost(post.id)} className="px-3 py-1.5 bg-danger text-white rounded-md text-xs font-medium hover:bg-danger/90 transition-colors duration-150">Delete</button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Community Moderation</h2>}>
            <Head title="Community Moderation" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {flash?.success && <div className="mb-4 px-4 py-3 bg-success/10 text-success text-sm rounded-md">{flash.success}</div>}

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Moderation ({pending.length})</h2>
                    {pending.length === 0 ? (
                        <p className="text-gray-500 text-sm mb-8">No pending posts.</p>
                    ) : (
                        <div className="grid gap-4 mb-8">{pending.map(p => <PostCard key={p.id} post={p} showActions />)}</div>
                    )}

                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Approved Posts</h2>
                    <div className="grid gap-4">{approved.map(p => <PostCard key={p.id} post={p} />)}</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
