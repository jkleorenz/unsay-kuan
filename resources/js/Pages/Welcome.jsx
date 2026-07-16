import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    const { data, setData, get, processing } = useForm({
        search: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.search.trim()) {
            get(route('businesses.index'), {
                queryParams: { search: data.search.trim() },
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Unsay Kuan? — Your local community hub" />
            <div className="min-h-screen bg-gray-0 flex flex-col" style={{ backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)' }}>
                <nav className="border-b border-gray-200 bg-gray-0">
                    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3" onClick={e => e.preventDefault()}>
                            <ApplicationLogo className="h-8 w-8 fill-accent-500" />
                            <span className="text-lg font-bold font-display text-accent-500">Unsay Kuan?</span>
                        </Link>
                        <div className="flex items-center gap-4 text-sm">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Dashboard</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-500 hover:text-accent-700 transition-colors duration-150">Log in</Link>
                                    <Link href={route('register')} className="inline-flex items-center px-4 py-2 bg-accent-500 text-white rounded-md text-sm font-medium hover:bg-accent-600 transition-colors duration-150">Sign up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
                    <div className="w-full max-w-4xl text-center">
                        <h1 className="font-bold font-display text-accent-500 text-5xl sm:text-6xl lg:text-7xl leading-tight tracking-tight">
                            Unsay Kuan?
                        </h1>

                        <form onSubmit={handleSubmit} className="mt-12 relative max-w-xl mx-auto">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <input
                                value={data.search}
                                onChange={e => setData('search', e.target.value)}
                                type="text"
                                placeholder="Search businesses, jobs, places, posts…"
                                className="w-full h-14 pl-12 pr-44 bg-gray-0 border border-gray-200 rounded-full text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-3 focus:ring-accent-100 transition-colors duration-150"
                                disabled={processing}
                                autoComplete="off"
                            />
                            {data.search.trim() && !processing && (
                                <button
                                    type="button"
                                    onClick={() => setData('search', '')}
                                    className="absolute right-[120px] top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition-colors duration-150"
                                    aria-label="Clear search"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={processing || !data.search.trim()}
                                style={{
                                    backgroundColor: processing || !data.search.trim() ? '#24C351' : '#24C351',
                                }}
                                 className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 text-white rounded-full text-sm font-medium transition-colors duration-150 flex items-center gap-2 hover:bg-[#179e3d]"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Searching…
                                    </>
                                ) : 'Search'}
                            </button>
                        </form>

                    </div>
                </main>

                <footer className="border-t border-gray-200 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
                        <p className="flex flex-wrap items-center justify-center gap-2">
                            <Link href={route('businesses.index')} className="font-medium text-accent-700 hover:text-accent-600 underline underline-offset-2">Browse Businesses</Link>
                            <span aria-hidden="true">·</span>
                            <Link href={route('jobs.index')} className="font-medium text-accent-700 hover:text-accent-600 underline underline-offset-2">Find a Job</Link>
                            <span aria-hidden="true">·</span>
                            <Link href={route('tourism.index')} className="font-medium text-accent-700 hover:text-accent-600 underline underline-offset-2">Explore Places</Link>
                            <span aria-hidden="true">·</span>
                            <Link href={route('community-posts.index')} className="font-medium text-accent-700 hover:text-accent-600 underline underline-offset-2">Read Posts</Link>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}