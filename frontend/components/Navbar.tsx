'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About Us' },
  { href: '/candidates', label: 'Candidates' },
  { href: '/employers', label: 'Employers' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Guruzan MS Consultant" width={140} height={60} className="h-11 w-auto" priority />
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-slate hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            href="/employers"
            className="hidden rounded-[4px] bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-2 sm:inline-block"
          >
            Post a Job
          </Link>
          <button
            className="p-2 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="my-1 block h-0.5 w-5 bg-ink" />
            <span className="my-1 block h-0.5 w-5 bg-ink" />
            <span className="my-1 block h-0.5 w-5 bg-ink" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-white px-6 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-slate hover:text-navy"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
