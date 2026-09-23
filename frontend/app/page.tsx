import Link from 'next/link';
import { api } from '@/lib/api';
import JobCard from '@/components/JobCard';
import CourseCard from '@/components/CourseCard';

const HOW_IT_WORKS = [
  { n: 1, title: 'Create Profile', body: 'Sign up and build your candidate profile in minutes.' },
  { n: 2, title: 'Find Jobs', body: 'Browse or search roles that match your subject and location.' },
  { n: 3, title: 'Apply', body: 'Apply directly and track every application from your dashboard.' },
  { n: 4, title: 'Get Hired', body: 'Interview, get shortlisted, and start your next chapter.' },
];

const TESTIMONIALS = [
  { q: "MS Consultant helped me get my dream job. The platform is easy to use and very helpful.", n: 'Priya Sharma', r: 'Teacher, Ranchi' },
  { q: 'I found a Chemistry Faculty role within two weeks of registering.', n: 'Rohit Kumar', r: 'Faculty, Bokaro' },
  { q: 'As an institute, we filled three faculty positions faster than through any other portal.', n: 'Anjali Singh', r: 'HR Head, XYZ Institute' },
];

export default async function HomePage() {
  let jobs: Awaited<ReturnType<typeof api.jobs.list>> = [];
  let courses: Awaited<ReturnType<typeof api.courses.list>> = [];
  try {
    [jobs, courses] = await Promise.all([api.jobs.list(), api.courses.list()]);
  } catch {
    // API not reachable during build/preview — sections render empty state below.
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-2 py-16 pb-24 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-marigold">
              <span className="h-0.5 w-6 bg-marigold" /> JOBS &amp; COURSES, TOGETHER
            </div>
            <h1 className="max-w-[11.5ch] font-serif text-[42px] font-semibold leading-[1.08] text-white sm:text-[52px]">
              Your career starts <em className="text-marigold not-italic italic">here.</em>
            </h1>
            <p className="mt-4.5 max-w-[46ch] text-[17.5px] text-[#c9d0e2]">
              MS Consultant connects teachers and students across Jharkhand with the right
              faculty roles and the right coaching courses — under one roof.
            </p>
            <div className="mt-8 flex gap-8">
              <div><b className="block font-serif text-2xl text-white">1,200+</b><span className="text-xs text-[#9aa4c2]">Jobs Posted</span></div>
              <div><b className="block font-serif text-2xl text-white">340+</b><span className="text-xs text-[#9aa4c2]">Partner Institutes</span></div>
              <div><b className="block font-serif text-2xl text-white">8,500+</b><span className="text-xs text-[#9aa4c2]">Candidates Placed</span></div>
            </div>
            <Link
              href="/jobs"
              className="mt-8 inline-block rounded-[4px] bg-marigold px-6 py-3 font-semibold text-[#3a2405] hover:bg-[#e9992a]"
            >
              Search Jobs
            </Link>
          </div>
          <div className="rounded-2xl border border-white/15 bg-paper p-5 shadow-2xl">
            {jobs.slice(0, 3).map((j) => (
              <div key={j.id} className="mb-2.5 flex items-center justify-between rounded-[9px] border border-line bg-white p-3.5 last:mb-0">
                <div>
                  <div className="text-[14.5px] font-bold text-ink">{j.title}</div>
                  <div className="mt-0.5 text-xs text-slate-soft">{j.employer?.instituteName} · {j.location}</div>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="p-4 text-sm text-slate-soft">
                Connect the API to see live featured jobs here.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-1.5 block text-sm font-bold text-teal">Featured Jobs</span>
            <h2 className="font-serif text-[28px]">Recently posted openings</h2>
          </div>
          <Link href="/jobs" className="rounded-[4px] border border-line px-4 py-2 text-sm font-semibold">
            View all jobs
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 3).map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      </section>

      <section className="border-y border-line bg-paper-2 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <span className="mb-1.5 block text-sm font-bold text-teal">How It Works</span>
          <h2 className="mb-8 font-serif text-[28px]">Four steps to your next role</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="flex h-9.5 w-9.5 flex-none items-center justify-center rounded-full bg-navy font-serif text-[15px] font-semibold text-marigold">
                  {s.n}
                </div>
                <div>
                  <h3 className="mb-1 text-[15.5px] font-semibold text-ink">{s.title}</h3>
                  <p className="text-[13.5px]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="mb-1.5 block text-sm font-bold text-teal">Our Courses</span>
            <h2 className="font-serif text-[28px]">Prepare for what&apos;s next</h2>
          </div>
          <Link href="/courses" className="rounded-[4px] border border-line px-4 py-2 text-sm font-semibold">
            View all courses
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      <section className="border-y border-line bg-paper-2 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <span className="mb-1.5 block text-sm font-bold text-teal">What Our Users Say</span>
          <h2 className="mb-8 font-serif text-[28px]">Trusted by faculty and institutes</h2>
          <div className="grid grid-cols-1 gap-4.5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.n} className="rounded-m border border-line bg-white p-5.5">
                <p className="font-serif text-[16.5px] italic text-ink">&quot;{t.q}&quot;</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-paper-2 text-[13px] font-bold text-navy">
                    {t.n.split(' ').map((x) => x[0]).join('')}
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-ink">{t.n}</b>
                    <span className="text-xs text-slate-soft">{t.r}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-navy p-10 text-white">
          <div>
            <h3 className="max-w-[26ch] font-serif text-2xl text-white">Are you an employer?</h3>
            <p className="mt-1.5 text-[#aab2cc]">Find talented faculty for your institute — post a job in minutes.</p>
          </div>
          <Link href="/employers" className="rounded-[4px] bg-marigold px-6 py-3 font-semibold text-[#3a2405]">
            Post a Job
          </Link>
        </div>
      </section>
    </>
  );
}
