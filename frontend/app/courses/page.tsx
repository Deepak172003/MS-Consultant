import { api } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

export default async function CoursesPage() {
  let courses: Awaited<ReturnType<typeof api.courses.list>> = [];
  try {
    courses = await api.courses.list();
  } catch {
    // API not reachable
  }
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-1.5 block text-sm font-bold text-teal">Courses</span>
      <h1 className="font-serif text-[28px]">Course catalogue</h1>
      <p className="mt-2 max-w-[65ch] text-slate">
        Structured coaching programs for engineering entrance, medical entrance, board exams
        and early foundation years.
      </p>

      {categories.length > 0 && (
        <div className="mt-7 grid grid-cols-2 gap-4.5 md:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-3 rounded-m border border-line bg-white p-4.5">
              <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[9px] bg-paper-2 text-lg">📚</div>
              <div>
                <b className="block text-sm text-ink">{cat}</b>
                <span className="text-xs text-slate-soft">
                  {courses.filter((c) => c.category === cat).length} course(s)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
        {courses.length ? (
          courses.map((c) => <CourseCard key={c.id} course={c} />)
        ) : (
          <p className="col-span-full py-10 text-center text-slate">
            No courses yet — connect the API and run the seed script to see the catalogue.
          </p>
        )}
      </div>
    </section>
  );
}
