'use client';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      await api.contact.send({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        subject: String(data.get('subject') || ''),
        message: String(data.get('message') || ''),
      });
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-m border border-line bg-white p-7">
      <h3 className="mb-4.5 text-[17px] font-semibold">Send us a message</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Name</label>
          <input name="name" required placeholder="Your full name" className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm" />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-ink">Subject</label>
        <input name="subject" required placeholder="How can we help?" className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm" />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-ink">Message</label>
        <textarea name="message" required rows={5} placeholder="Write your message..." className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm" />
      </div>
      <button
        disabled={status === 'sending'}
        className="mt-4 rounded-[4px] bg-marigold px-6 py-3 text-sm font-semibold text-[#3a2405] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'sent' && <p className="mt-3 text-sm text-teal">Message sent — we&apos;ll get back to you soon.</p>}
      {status === 'error' && <p className="mt-3 text-sm text-rose">Couldn&apos;t send right now — check that the API is running.</p>}
    </form>
  );
}
