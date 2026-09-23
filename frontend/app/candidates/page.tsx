'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

const NAV: [string, string, string][] = [
  ['register', '📝', 'Register'],
  ['overview', '👤', 'Profile'],
  ['applications', '📄', 'Applications'],
  ['alerts', '🔔', 'Alerts'],
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subjectSpecialisation: '',
  location: '',
  resumeUrl: '',
  message: '',
};

function buildWhatsAppMessage(f: typeof EMPTY_FORM) {
  const lines = [
    'New candidate registration — MS Consultant',
    '',
    `Name: ${f.fullName}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone}`,
    `Subject: ${f.subjectSpecialisation || '—'}`,
    `Preferred location: ${f.location || '—'}`,
    f.resumeUrl ? `Resume link: ${f.resumeUrl}` : null,
    f.message ? `Message: ${f.message}` : null,
  ].filter(Boolean);
  return lines.join('\n');
}

export default function CandidatesPage() {
  const [tab, setTab] = useState('register');
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setNotice(null);

    // Save to our own records too, but don't let a save failure (e.g. this
    // email already registered before) block sending the WhatsApp message —
    // WhatsApp is the primary path the candidate actually cares about.
    try {
      await api.candidates.create({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        subjectSpecialisation: form.subjectSpecialisation,
        resumeUrl: form.resumeUrl,
      });
    } catch {
      // likely already registered with this email — that's fine, continue.
    }

    const text = encodeURIComponent(buildWhatsAppMessage(form));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setNotice('Opening WhatsApp with your details filled in — just hit send there to complete your registration.');
    setSubmitting(false);
  }

  const inputCls =
    'w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-soft focus:outline-2 focus:outline-marigold';
  const labelCls = 'mb-1.5 block text-[13px] font-semibold text-ink';

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-1.5 block text-sm font-bold text-teal">Candidates</span>
      <h1 className="font-serif text-[28px]">Register, apply, get hired</h1>
      <p className="mt-2 max-w-[65ch] text-slate">
        Fill in your details once — we&apos;ll open WhatsApp with everything ready to send straight
        to our team.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-4.5 md:grid-cols-4">
        {[
          ['📝', 'Register', 'Send your details via WhatsApp'],
          ['⬆️', 'Add Resume Link', 'Stand out to employers'],
          ['📌', 'Saved Jobs', 'Come back anytime'],
          ['🔔', 'Job Alerts', 'Never miss a match'],
        ].map(([ic, b, s]) => (
          <div key={b} className="flex items-center gap-3 rounded-m border border-line bg-white p-4.5">
            <div className="flex h-10.5 w-10.5 items-center justify-center rounded-[9px] bg-paper-2 text-lg">{ic}</div>
            <div><b className="block text-sm text-ink">{b}</b><span className="text-xs text-slate-soft">{s}</span></div>
          </div>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-1 overflow-hidden rounded-m border border-line bg-white md:grid-cols-[210px_1fr]">
        <div className="flex flex-row gap-1 overflow-x-auto bg-navy p-3 md:flex-col md:p-5.5">
          <div className="mb-3 hidden border-b border-white/10 pb-4.5 text-sm font-bold text-white md:block">Candidate Menu</div>
          {NAV.map(([id, ic, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`whitespace-nowrap rounded-md px-3.5 py-2.5 text-left text-[13.5px] md:rounded-none ${
                tab === id ? 'font-bold text-marigold md:border-r-[3px] md:border-marigold md:bg-marigold/10' : 'text-[#c2c9e2]'
              }`}
            >
              {ic} {label}
            </button>
          ))}
        </div>
        <div className="p-6.5">
          {tab === 'register' && (
            <div>
              <h2 className="mb-1.5 text-xl font-semibold">Register as a candidate</h2>
              <p className="mb-5 text-sm text-slate">
                Fill this in, and we&apos;ll open WhatsApp with a message already written — you just
                hit send.
              </p>
              {notice && (
                <div className="mb-5 rounded-md border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal">
                  {notice}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Full name</label>
                    <input required className={inputCls} value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input required type="email" className={inputCls} value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input required className={inputCls} placeholder="+91 98765 43210" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Subject specialisation</label>
                    <input className={inputCls} placeholder="e.g. Mathematics" value={form.subjectSpecialisation}
                      onChange={(e) => setForm({ ...form, subjectSpecialisation: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Preferred location</label>
                    <input className={inputCls} placeholder="e.g. Ranchi" value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Resume link (optional)</label>
                    <input className={inputCls} placeholder="Google Drive / Dropbox link" value={form.resumeUrl}
                      onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Anything else you&apos;d like us to know</label>
                  <textarea rows={3} className={inputCls} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button disabled={submitting} className="w-full rounded-[4px] bg-teal py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8">
                  {submitting ? 'Opening WhatsApp…' : '💬 Send via WhatsApp'}
                </button>
              </form>
            </div>
          )}

          {tab === 'overview' && (
            <div>
              <h2 className="mb-1.5 text-xl font-semibold">Candidate Dashboard</h2>
              <p className="mb-5 text-slate">
                This dashboard shows sample data for now — once you register above, our team follows
                up directly on WhatsApp.
              </p>
              <div className="grid grid-cols-3 gap-3.5">
                <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">3</b><span className="text-xs text-slate-soft">Applied Jobs</span></div>
                <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">2</b><span className="text-xs text-slate-soft">Saved Jobs</span></div>
                <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">5</b><span className="text-xs text-slate-soft">Job Alerts</span></div>
              </div>
            </div>
          )}
          {tab === 'applications' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Applied Jobs</h2>
              <p className="text-sm text-slate-soft">
                Browse the <a href="/jobs" className="font-semibold text-teal">Jobs page</a> and apply
                — your applications will be tracked here in a future update.
              </p>
            </div>
          )}
          {tab === 'alerts' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Job Alerts</h2>
              <p className="text-sm text-slate-soft">Coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
