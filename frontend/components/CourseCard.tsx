import Link from 'next/link';
import type { Course } from '@/lib/api';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex flex-col overflow-hidden rounded-m border border-line bg-white"
    >
      <div className="bg-navy p-5 text-white">
        <span className="text-[11.5px] font-bold tracking-wide text-marigold">
          {course.category}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold text-white">{course.title}</h3>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="text-[13px] text-slate">{course.tagline}</p>
        <div className="flex justify-between text-[13px] text-slate-soft">
          <span>Duration</span>
          <span>{course.duration}</span>
        </div>
        <div className="flex justify-between text-[13px] text-slate-soft">
          <span>Mode</span>
          <span>{course.mode}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <span className="font-serif text-xl font-semibold text-ink">₹{course.price}</span>
          <span className="rounded-[4px] border border-line px-3.5 py-1.5 text-[13.5px] font-semibold">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
