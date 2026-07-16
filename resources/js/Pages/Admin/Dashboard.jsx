import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminDashboard({ stats }) {
    const cards = [
        { label: 'Pending Verifications', count: stats.pendingVerifications, href: route('admin.verifications.index'), color: 'bg-warning/10 text-warning' },
        { label: 'Open Reports', count: stats.openReports, href: route('admin.reports.index'), color: 'bg-danger/10 text-danger' },
        { label: 'Pending Posts', count: stats.pendingPosts, href: route('admin.community-posts.index'), color: 'bg-accent-50 text-accent-700' },
        { label: 'Total Users', count: stats.totalUsers, href: route('admin.users.index'), color: 'bg-gray-100 text-gray-700' },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Admin Dashboard</h2>}>
            <Head title="Admin" />
            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {cards.map(card => (
                            <Link key={card.label} href={card.href} className="bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className={`text-2xl font-semibold mt-1 ${card.color}`}>{card.count}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <Link href={route('admin.tourism.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
                            <h3 className="font-medium text-gray-900">Tourism Listings</h3>
                            <p className="text-sm text-gray-500 mt-1">Manage tourism destinations</p>
                        </Link>
                        <Link href={route('admin.verifications.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
                            <h3 className="font-medium text-gray-900">Business Verifications</h3>
                            <p className="text-sm text-gray-500 mt-1">Approve or reject business listings</p>
                        </Link>
                        <Link href={route('admin.community-posts.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
                            <h3 className="font-medium text-gray-900">Community Moderation</h3>
                            <p className="text-sm text-gray-500 mt-1">Moderate community posts</p>
                        </Link>
                        <Link href={route('admin.reports.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
                            <h3 className="font-medium text-gray-900">Reports</h3>
                            <p className="text-sm text-gray-500 mt-1">Review reported content</p>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
