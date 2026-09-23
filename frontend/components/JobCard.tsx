import Link from 'next/link';
import type { Job } from '@/lib/api';

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex flex-col gap-2.5 rounded-m border border-line border-l-[3px] border-l-marigold bg-white p-5 hover:border-l-teal"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-ink">{job.title}</h3>
          <div className="text-[13.5px] font-medium text-slate-soft">
            {job.employer?.instituteName}
          </div>
        </div>
        {job.employer?.verified && (
          <span className="rounded-full bg-teal/10 px-2.5 py-1 text-[11.5px] font-bold text-teal">
            Verified
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3.5 text-xs text-slate-soft">
        <span>📍 {job.location}</span>
        <span>💰 {job.salaryRange}</span>
        <span>🕒 {job.experience}</span>
      </div>
      <span className="w-fit rounded-full bg-marigold/15 px-2.5 py-1 text-[11.5px] font-bold text-marigold-ink">
        {job.type === 'full_time' ? 'Full Time' : 'Part Time'}
      </span>
    </Link>
  );
}
