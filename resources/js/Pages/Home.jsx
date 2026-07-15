import { Head, Link } from '@inertiajs/react';
import { Briefcase, MagnifyingGlass, MapPin, Plus, Storefront, Users } from '@phosphor-icons/react';

const sections = [
    { label: 'Businesses', href: 'businesses.index', icon: Storefront },
    { label: 'Jobs', href: 'jobs.index', icon: Briefcase },
    { label: 'Tourism', href: 'tourism.index', icon: MapPin },
    { label: 'Community', href: 'community.index', icon: Users },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f7f8] px-6">
      {/* Faded SVG background */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/map.svg')" }}
      />
      <div className="absolute inset-0 bg-white/60" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end gap-3 px-6 py-4">
        <Link
          href={route('login')}
          className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          Log in
        </Link>
        <Link
          href={route('businesses.create')}
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          List your business
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">Unsay Kuan?</h1>
        <p className="mt-3 text-sm text-gray-500">
          Jobs, businesses, tourism &amp; community, all in one place.
        </p>

        <form
          method="GET"
          action={route('search')}
          className="mt-8 flex w-full items-center rounded-full bg-white px-4 py-2 shadow-md"
        >
          <MagnifyingGlass className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="q"
            aria-label="Search everything"
            placeholder="Search businesses, jobs, spots..."
            className="flex-1 border-none bg-transparent px-3 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {sections.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={route(href)}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-white/60 px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-white hover:text-gray-700"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
