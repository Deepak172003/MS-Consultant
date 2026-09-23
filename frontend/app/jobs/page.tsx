import { api } from '@/lib/api';
import JobCard from '@/components/JobCard';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { search?: string; location?: string; type?: string };
}) {
  let jobs: Awaited<ReturnType<typeof api.jobs.list>> = [];
  try {
    jobs = await api.jobs.list(searchParams);
  } catch {
    // API not reachable
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-1.5 block text-sm font-bold text-teal">Jobs</span>
      <h1 className="font-serif text-[28px]">Find your next teaching role</h1>
      <p className="mt-2 max-w-[60ch] text-slate">
        Search openings from verified schools and institutes across Jharkhand.
      </p>

      <form className="mt-7 flex flex-wrap gap-2.5 rounded-m border border-line bg-white p-4.5">
        <input
          name="search"
          defaultValue={searchParams.search}
          placeholder="Job title, subject or company"
          className="min-w-[160px] flex-1 rounded-md border border-line bg-paper px-3.5 py-3 text-sm"
        />
        <input
          name="location"
          defaultValue={searchParams.location}
          placeholder="Location"
          className="w-36 rounded-md border border-line bg-paper px-3.5 py-3 text-sm"
        />
        <select
          name="type"
          defaultValue={searchParams.type || ''}
          className="w-36 rounded-md border border-line bg-paper px-3.5 py-3 text-sm"
        >
          <option value="">All types</option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
        </select>
        <button className="rounded-[4px] bg-marigold px-5 py-3 text-sm font-semibold text-[#3a2405]">
          Search
        </button>
      </form>

      <div className="mt-7 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.length ? (
          jobs.map((j) => <JobCard key={j.id} job={j} />)
        ) : (
          <p className="col-span-full py-10 text-center text-slate">
            No jobs match your search yet — or the API isn&apos;t connected. Try different
            keywords, or start the backend to see live listings.
          </p>
        )}
      </div>
    </section>
  );
}
