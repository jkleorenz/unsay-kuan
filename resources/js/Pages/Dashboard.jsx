import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, userRole }) {
    const role = auth.user ? userRole : null;

    const seekerContent = (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-gray-0 border border-gray-200 rounded-lg p-4 shadow-xs">
                    <p className="text-sm text-gray-500">Active Listings</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">—</p>
                </div>
                <div className="bg-gray-0 border border-gray-200 rounded-lg p-4 shadow-xs">
                    <p className="text-sm text-gray-500">Applications</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">—</p>
                </div>
                <div className="bg-gray-0 border border-gray-200 rounded-lg p-4 shadow-xs">
                    <p className="text-sm text-gray-500">Saved</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">—</p>
                </div>
            </div>
            <div className="bg-gray-0 border border-gray-200 rounded-lg p-6 shadow-xs">
                <h3 className="font-medium text-gray-900">Recent Jobs</h3>
                <p className="text-sm text-gray-500 mt-2">Check out the latest job postings in your area.</p>
                <Link href={route('jobs.index')} className="mt-4 inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Browse Jobs</Link>
            </div>
        </div>
    );

    const ownerContent = (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <Link href={route('owner.businesses.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow duration-150">
                    <p className="text-sm text-gray-500">My Businesses</p>
                    <p className="text-2xl font-semibold text-accent-700 mt-1">Manage</p>
                </Link>
                <Link href={route('owner.jobs.index')} className="bg-gray-0 border border-gray-200 rounded-lg p-4 shadow-xs hover:shadow-sm transition-shadow duration-150">
                    <p className="text-sm text-gray-500">My Jobs</p>
                    <p className="text-2xl font-semibold text-accent-700 mt-1">Manage</p>
                </Link>
            </div>
            <div className="bg-gray-0 border border-gray-200 rounded-lg p-6 shadow-xs">
                <h3 className="font-medium text-gray-900">Quick Actions</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={route('owner.businesses.create')} className="inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Add Business</Link>
                    <Link href={route('owner.jobs.create')} className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-150">Post a Job</Link>
                    <Link href={route('owner.applications.index')} className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors duration-150">View Applications</Link>
                </div>
            </div>
        </div>
    );

    const posterContent = (
        <div className="space-y-6">
            <div className="bg-gray-0 border border-gray-200 rounded-lg p-6 shadow-xs">
                <h3 className="font-medium text-gray-900">Your Community Posts</h3>
                <p className="text-sm text-gray-500 mt-2">Share updates, announcements, and news with your community.</p>
                <Link href={route('community-posts.create')} className="mt-4 inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Write a Post</Link>
            </div>
        </div>
    );

    const roleContent = {
        job_seeker: seekerContent,
        business_owner: ownerContent,
        community_poster: posterContent,
        admin: null,
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {roleContent[role] || (
<div className="bg-gray-0 border border-gray-200 rounded-lg p-6 shadow-xs text-center">
                                <p className="text-gray-500">Welcome to <span className="font-bold font-display">Unsay Kuan?</span></p>
                            </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
