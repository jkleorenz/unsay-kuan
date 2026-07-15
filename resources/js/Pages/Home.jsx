import { Head } from '@inertiajs/react';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f8] flex flex-col items-center justify-center px-6">
      {/* Faded SVG background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/map.svg')" }}
      />
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Unsay Kuan?</h1>
        <p className="mt-3 text-sm text-gray-500">
          Jobs, businesses, tourism &amp; community — all in one place.
        </p>

        <form
          method="GET"
          action="/businesses"
          className="mt-8 flex w-full items-center rounded-full bg-white px-4 py-2 shadow-md"
        >
          <MagnifyingGlass className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search businesses..."
            className="flex-1 border-none bg-transparent px-3 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="rounded-full bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
