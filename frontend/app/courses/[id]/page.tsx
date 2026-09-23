import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  let course;
  try {
    course = await api.courses.get(params.id);
  } catch {
    notFound();
  }
  if (!course) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/courses" className="mb-5.5 inline-flex text-sm font-semibold text-slate hover:text-navy">
        ← Back to Courses
      </Link>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_.9fr]">
        <div className="rounded-m border border-line bg-white p-7.5">
          <span className="rounded-full bg-marigold/15 px-2.5 py-1 text-[11.5px] font-bold text-marigold-ink">
            {course.category}
          </span>
          <h1 className="mt-3 font-serif text-[26px]">{course.title}</h1>
          <p className="mt-2 text-[15px] text-slate">{course.tagline}</p>
          <div className="mt-6">
            <h3 className="mb-2 text-[15px] font-semibold text-ink">Syllabus</h3>
            <p className="text-[14.5px] leading-relaxed text-slate">{course.syllabus}</p>
          </div>
        </div>
        <div>
          <div className="mb-4 rounded-m border border-line bg-white p-5.5">
            <div className="flex justify-between border-b border-paper-2 py-2.5 text-sm">
              <span className="text-slate-soft">Duration</span><span className="font-medium text-ink">{course.duration}</span>
            </div>
            <div className="flex justify-between border-b border-paper-2 py-2.5 text-sm">
              <span className="text-slate-soft">Instructor</span><span className="font-medium text-ink">{course.instructor}</span>
            </div>
            <div className="flex justify-between border-b border-paper-2 py-2.5 text-sm">
              <span className="text-slate-soft">Price</span><span className="font-medium text-ink">₹{course.price}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-slate-soft">Mode</span><span className="font-medium text-ink">{course.mode}</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            <button className="flex-1 rounded-[4px] bg-marigold px-5 py-3 text-sm font-semibold text-[#3a2405]">
              Enroll Now
            </button>
            <button className="flex-1 rounded-[4px] border border-line px-5 py-3 text-sm font-semibold">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
