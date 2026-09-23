const TEAM = ['Manoj Singh, Founder', 'Sunita Rao, Operations', 'Arjun Deb, Partnerships', 'Kavita Nair, Support'];
const FAQS = [
  { q: 'Is registration free for candidates?', a: 'Yes. Creating a candidate profile, uploading your resume and applying to jobs is completely free.' },
  { q: 'How long does it take to hear back after applying?', a: 'Most employers respond within 5–7 working days. You can track application status from your Candidate Dashboard.' },
  { q: 'Can institutes post more than one job at a time?', a: 'Yes, employers can post and manage multiple openings from a single Employer Dashboard.' },
  { q: 'Do courses include recorded lectures?', a: 'Most courses combine live classes with recorded sessions so you can revise at your own pace.' },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-1.5 block text-sm font-bold text-teal">About Us</span>
      <h1 className="font-serif text-[28px]">Company overview</h1>
      <p className="mt-2 max-w-[65ch] text-slate">
        MS Consultant was founded to close the gap between Jharkhand&apos;s schools, coaching
        institutes and the talented educators who want to teach there.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4.5 md:grid-cols-2">
        <div className="rounded-m border border-line bg-white p-6">
          <h3 className="mb-2.5 text-[17px] font-semibold">Mission</h3>
          <p className="text-slate">To make hiring and career discovery simple and transparent for every teacher, student and institute in the region.</p>
        </div>
        <div className="rounded-m border border-line bg-white p-6">
          <h3 className="mb-2.5 text-[17px] font-semibold">Vision</h3>
          <p className="text-slate">A future where the right educator and the right classroom always find each other, no matter how small the town.</p>
        </div>
      </div>

      <h2 className="mb-6 mt-14 font-serif text-2xl">The people behind MS Consultant</h2>
      <div className="grid grid-cols-2 gap-4.5 md:grid-cols-4">
        {TEAM.map((t) => {
          const [n, r] = t.split(', ');
          return (
            <div key={n} className="rounded-m border border-line bg-white p-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-paper-2 text-lg font-bold text-navy">
                {n.split(' ').map((x) => x[0]).join('')}
              </div>
              <b className="block text-[14.5px]">{n}</b>
              <span className="text-xs text-slate-soft">{r}</span>
            </div>
          );
        })}
      </div>

      <h2 className="mb-6 mt-14 font-serif text-2xl">Frequently asked questions</h2>
      <div className="max-w-[760px] rounded-m border border-line bg-white p-6">
        {FAQS.map((f) => (
          <details key={f.q} className="border-b border-line py-4 last:border-none">
            <summary className="cursor-pointer text-[15px] font-semibold">{f.q}</summary>
            <p className="mt-2.5 text-sm text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
