import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  let job;
  try {
    job = await api.jobs.get(params.id);
  } catch {
    notFound();
  }
  if (!job) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/jobs" className="mb-5.5 inline-flex text-sm font-semibold text-slate hover:text-navy">
        ← Back to Jobs
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_.9fr]">
        <div className="rounded-m border border-line bg-white p-7.5">
          <h1 className="font-serif text-[26px]">{job.title}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-soft">
            <span>{job.employer?.instituteName}</span>
            <span>📍 {job.location}</span>
            <span>💰 {job.salaryRange}</span>
            <span>🕒 {job.experience}</span>
          </div>
          <div className="mt-3 flex gap-2">
            {job.employer?.verified && (
              <span className="rounded-full bg-teal/10 px-2.5 py-1 text-[11.5px] font-bold text-teal">
                Verified Employer
              </span>
            )}
            <span className="rounded-full bg-marigold/15 px-2.5 py-1 text-[11.5px] font-bold text-marigold-ink">
              {job.type === 'full_time' ? 'Full Time' : 'Part Time'}
            </span>
          </div>

          <div className="mt-5.5 flex gap-2.5">
            <button className="rounded-[4px] bg-marigold px-5 py-3 text-sm font-semibold text-[#3a2405]">
              Apply Now
            </button>
            <button className="rounded-[4px] border border-line px-5 py-3 text-sm font-semibold">
              ☆ Save
            </button>
          </div>

          <div className="mt-6 space-y-6 border-t border-line pt-6 text-[14.5px] leading-relaxed text-slate">
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Job Description</h3>
              <p>{job.description}</p>
            </div>
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Requirements</h3>
              <ul className="list-disc space-y-1.5 pl-4.5">
                {job.requirements.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Benefits</h3>
              <ul className="list-disc space-y-1.5 pl-4.5">
                {job.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 rounded-m border border-line bg-white p-5.5">
            <div className="flex justify-between border-b border-paper-2 py-2.5 text-sm">
              <span className="text-slate-soft">Application ends</span>
              <span className="font-medium text-ink">{job.applicationDeadline}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-slate-soft">Location</span>
              <span className="font-medium text-ink">{job.location}, Jharkhand</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
