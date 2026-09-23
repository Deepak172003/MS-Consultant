import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-0 bg-navy pb-8 pt-12 text-[#aab2cc]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-white">MS Consultant</h4>
            <p className="max-w-[32ch] text-[13.5px]">
              Connecting Jharkhand&apos;s teachers, students and institutes with the right jobs
              and the right courses, in one place.
            </p>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-white">Explore</h4>
            <Link href="/jobs" className="mb-2 block text-[13.5px] hover:text-marigold">Find Jobs</Link>
            <Link href="/courses" className="mb-2 block text-[13.5px] hover:text-marigold">Course Catalogue</Link>
            <Link href="/about" className="mb-2 block text-[13.5px] hover:text-marigold">About Us</Link>
            <Link href="/contact" className="mb-2 block text-[13.5px] hover:text-marigold">Contact</Link>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-white">For You</h4>
            <Link href="/candidates" className="mb-2 block text-[13.5px] hover:text-marigold">Candidate Dashboard</Link>
            <Link href="/employers" className="mb-2 block text-[13.5px] hover:text-marigold">Employer Dashboard</Link>
            <Link href="/employers" className="mb-2 block text-[13.5px] hover:text-marigold">Post a Job</Link>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-semibold text-white">Get in touch</h4>
            <Link href="/contact" className="mb-2 block text-[13.5px] hover:text-marigold">Ranchi, Jharkhand, India</Link>
            <Link href="/contact" className="mb-2 block text-[13.5px] hover:text-marigold">+91 98765 43210</Link>
            <Link href="/contact" className="mb-2 block text-[13.5px] hover:text-marigold">info@msconsultant.in</Link>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5 text-xs text-[#8a92b2]">
          <span>© 2026 MS Consultant. All rights reserved.</span>
          <span>
            Design and developed by{' '}
            <a
              href="https://orbitodigitalmedia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#aab2cc] hover:text-marigold"
            >
              Orbito Digital Media
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
