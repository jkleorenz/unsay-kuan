import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f7f7f8]">
            <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10"
                style={{ backgroundImage: "url('/map.svg')" }}
            />
            <div className="absolute inset-0 bg-white/60" />

            <nav className="relative z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex shrink-0 items-center">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-900" />
                        </Link>

                        <div className="hidden gap-1 sm:flex">
                            <Link
                                href={route('businesses.index')}
                                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-900/5 hover:text-gray-900"
                            >
                                Businesses
                            </Link>
                            <Link
                                href={route('jobs.index')}
                                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-900/5 hover:text-gray-900"
                            >
                                Jobs
                            </Link>
                            <Link
                                href={route('tourism.index')}
                                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-900/5 hover:text-gray-900"
                            >
                                Tourism
                            </Link>
                            <Link
                                href={route('community.index')}
                                className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-900/5 hover:text-gray-900"
                            >
                                Community
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('login')}
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('businesses.create')}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            List your business
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 flex-1">{children}</main>
        </div>
    );
}
