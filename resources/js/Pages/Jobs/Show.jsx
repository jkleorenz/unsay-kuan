import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ job }) {
  return (
    <PublicLayout>
      <Head title={job.title} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-500">{job.company}</p>
        {job.category?.name && <p className="text-gray-500">{job.category.name}</p>}

        <dl className="mt-4 space-y-2">
          <div><dt className="font-semibold">Type</dt><dd>{job.type}</dd></div>
          <div><dt className="font-semibold">Location</dt><dd>{job.location}</dd></div>
          <div><dt className="font-semibold">Contact email</dt><dd>{job.contact_email}</dd></div>
          <div><dt className="font-semibold">Contact phone</dt><dd>{job.contact_phone}</dd></div>
          <div><dt className="font-semibold">Description</dt><dd>{job.description}</dd></div>
        </dl>

        <a href="/jobs" className="text-gray-600 hover:text-gray-900 mt-6 inline-block">Back to listings</a>
      </div>
    </PublicLayout>
  );
}
