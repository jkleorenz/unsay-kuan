import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Users({ users }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">User Management</h2>}>
            <Head title="Users" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-gray-0 border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Email</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Roles</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-b border-gray-100 last:border-0">
                                        <td className="px-4 py-3 text-gray-900">{user.name}</td>
                                        <td className="px-4 py-3 text-gray-500">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1 flex-wrap">
                                                {user.roles.map(role => (
                                                    <span key={role} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{role}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{user.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
