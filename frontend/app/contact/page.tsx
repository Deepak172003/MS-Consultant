import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-1.5 block text-sm font-bold text-teal">Contact</span>
      <h1 className="font-serif text-[28px]">Get in touch</h1>
      <p className="mt-2 max-w-[65ch] text-slate">
        Questions about a job, a course or a partnership? Reach out — we usually reply within a day.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <div className="mb-4.5 rounded-m border border-line bg-white p-6">
            {[
              ['📍', 'Address', 'Ranchi, Jharkhand, India'],
              ['📞', 'Phone', '+91 98765 43210'],
              ['✉️', 'Email', 'info@msconsultant.in'],
              ['💬', 'WhatsApp', '+91 98765 43210'],
              ['🕒', 'Office Hours', 'Mon–Sat: 9:00 AM–6:00 PM · Sunday: Closed'],
            ].map(([icon, label, value]) => (
              <div key={label} className="flex gap-3.5 border-b border-paper-2 py-4 last:border-none">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-paper-2 text-sm">{icon}</div>
                <div>
                  <b className="block text-sm text-ink">{label}</b>
                  <span className="text-[13px] text-slate-soft">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex h-48 items-center justify-center rounded-m border border-line bg-[#eef1e6] text-3xl">
            📍
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
