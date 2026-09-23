'use client';
import { useEffect, useState } from 'react';
import { api, Job, Course, CreateJobPayload, CreateCoursePayload } from '@/lib/api';
import { getEmployerId, setEmployerId } from '@/lib/employerSession';

const NAV: [string, string, string][] = [
  ['overview', '📊', 'Overview'],
  ['myjobs', '📋', 'My Jobs'],
  ['courses', '🎓', 'Courses'],
  ['applicants', '🧑‍🎓', 'Applicants'],
  ['shortlist', '⭐', 'Shortlist'],
];

const EMPTY_JOB: CreateJobPayload = {
  title: '',
  location: '',
  salaryRange: '',
  experience: '',
  type: 'full_time',
  description: '',
  requirements: [],
  benefits: [],
  applicationDeadline: '',
  employerId: '',
};

const EMPTY_COURSE: CreateCoursePayload = {
  title: '',
  category: '',
  tagline: '',
  syllabus: '',
  duration: '',
  instructor: '',
  price: 0,
  mode: 'Online / Offline',
};

function toLines(v: string[] | undefined) {
  return (v || []).join('\n');
}
function fromLines(v: string) {
  return v
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function EmployersPage() {
  const [tab, setTab] = useState('overview');

  // --- employer "session" (no login system yet — just remembered locally) ---
  const [employerId, setEmployerIdState] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({
    instituteName: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // --- jobs ---
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobForm, setJobForm] = useState<CreateJobPayload>(EMPTY_JOB);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  // --- courses ---
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courseForm, setCourseForm] = useState<CreateCoursePayload>(EMPTY_COURSE);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [savingCourse, setSavingCourse] = useState(false);

  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setEmployerIdState(getEmployerId());
  }, []);

  async function refreshJobs() {
    setLoadingJobs(true);
    try {
      setAllJobs(await api.jobs.list());
    } catch {
      setNotice('Could not reach the API to load jobs. Is the backend running?');
    } finally {
      setLoadingJobs(false);
    }
  }
  async function refreshCourses() {
    setLoadingCourses(true);
    try {
      setCourses(await api.courses.list());
    } catch {
      setNotice('Could not reach the API to load courses. Is the backend running?');
    } finally {
      setLoadingCourses(false);
    }
  }

  useEffect(() => {
    if (tab === 'myjobs' || tab === 'overview') refreshJobs();
    if (tab === 'courses') refreshCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const myJobs = employerId ? allJobs.filter((j) => j.employer?.id === employerId) : [];

  async function handleCreateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const employer = await api.employers.create(profileForm);
      setEmployerId(employer.id);
      setEmployerIdState(employer.id);
      setNotice('Institute profile created. You can now post jobs.');
    } catch {
      setNotice('Could not create the institute profile. Check the backend is running.');
    } finally {
      setSavingProfile(false);
    }
  }

  function openNewJobForm() {
    setJobForm({ ...EMPTY_JOB, employerId: employerId || '' });
    setEditingJobId(null);
    setShowJobForm(true);
  }
  function openEditJobForm(j: Job) {
    setJobForm({
      title: j.title,
      location: j.location,
      salaryRange: j.salaryRange,
      experience: j.experience,
      type: j.type,
      description: j.description,
      requirements: j.requirements,
      benefits: j.benefits,
      applicationDeadline: j.applicationDeadline?.slice(0, 10),
      employerId: j.employer.id,
      isOpen: j.isOpen,
    });
    setEditingJobId(j.id);
    setShowJobForm(true);
  }
  async function handleSaveJob(e: React.FormEvent) {
    e.preventDefault();
    setSavingJob(true);
    try {
      if (editingJobId) {
        await api.jobs.update(editingJobId, jobForm);
        setNotice('Job updated.');
      } else {
        await api.jobs.create(jobForm);
        setNotice('Job posted — it now appears on the Jobs page.');
      }
      setShowJobForm(false);
      refreshJobs();
    } catch {
      setNotice('Could not save the job. Check every field is filled in.');
    } finally {
      setSavingJob(false);
    }
  }
  async function toggleJobOpen(j: Job) {
    try {
      await api.jobs.update(j.id, { isOpen: !j.isOpen });
      refreshJobs();
    } catch {
      setNotice('Could not update the job status.');
    }
  }

  function openNewCourseForm() {
    setCourseForm(EMPTY_COURSE);
    setEditingCourseId(null);
    setShowCourseForm(true);
  }
  function openEditCourseForm(c: Course) {
    setCourseForm({
      title: c.title,
      category: c.category,
      tagline: c.tagline,
      syllabus: c.syllabus,
      duration: c.duration,
      instructor: c.instructor,
      price: Number(c.price),
      mode: c.mode,
    });
    setEditingCourseId(c.id);
    setShowCourseForm(true);
  }
  async function handleSaveCourse(e: React.FormEvent) {
    e.preventDefault();
    setSavingCourse(true);
    try {
      if (editingCourseId) {
        await api.courses.update(editingCourseId, courseForm);
        setNotice('Course updated.');
      } else {
        await api.courses.create(courseForm);
        setNotice('Course added — it now appears on the Courses page.');
      }
      setShowCourseForm(false);
      refreshCourses();
    } catch {
      setNotice('Could not save the course. Check every field is filled in.');
    } finally {
      setSavingCourse(false);
    }
  }

  const inputCls =
    'w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-soft focus:outline-2 focus:outline-marigold';
  const labelCls = 'mb-1.5 block text-[13px] font-semibold text-ink';

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="mb-1.5 block text-sm font-bold text-teal">Employers</span>
          <h1 className="font-serif text-[28px]">Hire faculty, faster</h1>
          <p className="mt-2 max-w-[60ch] text-slate">
            Post a job, manage courses, and review applicants — all from one dashboard.
          </p>
        </div>
        {employerId && (
          <button
            onClick={() => {
              setTab('myjobs');
              openNewJobForm();
            }}
            className="rounded-[4px] bg-marigold px-5 py-3 text-sm font-semibold text-[#3a2405] hover:bg-[#e9992a]"
          >
            Post a Job
          </button>
        )}
      </div>

      {notice && (
        <div className="mt-5 flex items-center justify-between rounded-md border border-line bg-white px-4 py-3 text-sm text-ink">
          <span>{notice}</span>
          <button onClick={() => setNotice(null)} className="text-slate-soft">✕</button>
        </div>
      )}

      {!employerId ? (
        <div className="mx-auto mt-9 max-w-lg rounded-m border border-line bg-white p-7">
          <h2 className="mb-1.5 text-xl font-semibold">Set up your institute profile</h2>
          <p className="mb-5 text-sm text-slate">
            One-time setup so job postings and courses are linked to your institute. This browser
            will remember it after you save.
          </p>
          <form onSubmit={handleCreateProfile} className="space-y-4">
            <div>
              <label className={labelCls}>Institute name</label>
              <input required className={inputCls} value={profileForm.instituteName}
                onChange={(e) => setProfileForm({ ...profileForm, instituteName: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Contact email</label>
              <input required type="email" className={inputCls} value={profileForm.contactEmail}
                onChange={(e) => setProfileForm({ ...profileForm, contactEmail: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Contact phone</label>
              <input className={inputCls} value={profileForm.contactPhone}
                onChange={(e) => setProfileForm({ ...profileForm, contactPhone: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input required className={inputCls} placeholder="e.g. Ranchi, Jharkhand" value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} />
            </div>
            <button disabled={savingProfile} className="w-full rounded-[4px] bg-navy py-3 text-sm font-semibold text-white disabled:opacity-60">
              {savingProfile ? 'Saving…' : 'Save & continue'}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-9 grid grid-cols-1 overflow-hidden rounded-m border border-line bg-white md:grid-cols-[210px_1fr]">
          <div className="flex flex-row gap-1 overflow-x-auto bg-navy p-3 md:flex-col md:p-5.5">
            <div className="mb-3 hidden border-b border-white/10 pb-4.5 text-sm font-bold text-white md:block">Employer Menu</div>
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
            {tab === 'overview' && (
              <div>
                <h2 className="mb-1.5 text-xl font-semibold">Employer Dashboard</h2>
                <p className="mb-5 text-slate">Track every posting from one place.</p>
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">{myJobs.length}</b><span className="text-xs text-slate-soft">Your Jobs</span></div>
                  <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">{myJobs.filter((j) => j.isOpen).length}</b><span className="text-xs text-slate-soft">Open</span></div>
                  <div className="rounded-lg bg-paper-2 p-4 text-center"><b className="block font-serif text-2xl text-navy">{courses.length}</b><span className="text-xs text-slate-soft">Courses Listed</span></div>
                </div>
                <h3 className="mb-1 mt-6.5 text-[15px] font-semibold">Your Recent Postings</h3>
                {loadingJobs && <p className="text-sm text-slate-soft">Loading…</p>}
                {!loadingJobs && myJobs.length === 0 && (
                  <p className="text-sm text-slate-soft">You haven&apos;t posted any jobs yet.</p>
                )}
                {myJobs.slice(0, 5).map((j) => (
                  <div key={j.id} className="flex items-center justify-between border-b border-paper-2 py-3.5 last:border-none">
                    <div><div className="text-sm font-bold text-ink">{j.title}</div><div className="text-xs text-slate-soft">{j.location}</div></div>
                    <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${j.isOpen ? 'bg-teal/10 text-teal' : 'bg-rose/10 text-rose'}`}>
                      {j.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tab === 'myjobs' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Jobs</h2>
                  <button onClick={openNewJobForm} className="rounded-[4px] bg-marigold px-4 py-2 text-sm font-semibold text-[#3a2405] hover:bg-[#e9992a]">
                    + Post a new job
                  </button>
                </div>

                {showJobForm && (
                  <form onSubmit={handleSaveJob} className="mb-6 space-y-4 rounded-m border border-line bg-paper p-5">
                    <h3 className="text-[15px] font-semibold">{editingJobId ? 'Edit job' : 'New job'}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div><label className={labelCls}>Job title</label><input required className={inputCls} value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} /></div>
                      <div><label className={labelCls}>Location</label><input required className={inputCls} value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} /></div>
                      <div><label className={labelCls}>Salary range</label><input required placeholder="e.g. ₹3–5 LPA" className={inputCls} value={jobForm.salaryRange} onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })} /></div>
                      <div><label className={labelCls}>Experience</label><input required placeholder="e.g. 2+ Years" className={inputCls} value={jobForm.experience} onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })} /></div>
                      <div>
                        <label className={labelCls}>Type</label>
                        <select className={inputCls} value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as 'full_time' | 'part_time' })}>
                          <option value="full_time">Full Time</option>
                          <option value="part_time">Part Time</option>
                        </select>
                      </div>
                      <div><label className={labelCls}>Application deadline</label><input required type="date" className={inputCls} value={jobForm.applicationDeadline} onChange={(e) => setJobForm({ ...jobForm, applicationDeadline: e.target.value })} /></div>
                    </div>
                    <div><label className={labelCls}>Description</label><textarea required rows={3} className={inputCls} value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} /></div>
                    <div><label className={labelCls}>Requirements (one per line)</label><textarea rows={3} className={inputCls} value={toLines(jobForm.requirements)} onChange={(e) => setJobForm({ ...jobForm, requirements: fromLines(e.target.value) })} /></div>
                    <div><label className={labelCls}>Benefits (one per line)</label><textarea rows={3} className={inputCls} value={toLines(jobForm.benefits)} onChange={(e) => setJobForm({ ...jobForm, benefits: fromLines(e.target.value) })} /></div>
                    <div className="flex gap-3">
                      <button disabled={savingJob} className="rounded-[4px] bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                        {savingJob ? 'Saving…' : editingJobId ? 'Save changes' : 'Post job'}
                      </button>
                      <button type="button" onClick={() => setShowJobForm(false)} className="rounded-[4px] border border-line px-5 py-2.5 text-sm font-semibold">Cancel</button>
                    </div>
                  </form>
                )}

                {loadingJobs && <p className="text-sm text-slate-soft">Loading…</p>}
                {!loadingJobs && myJobs.length === 0 && <p className="text-sm text-slate-soft">No jobs posted yet.</p>}
                {myJobs.map((j) => (
                  <div key={j.id} className="flex items-center justify-between border-b border-paper-2 py-3.5 last:border-none">
                    <div>
                      <div className="text-sm font-bold text-ink">{j.title} · {j.location}</div>
                      <div className="text-xs text-slate-soft">{j.isOpen ? 'Open' : 'Closed'} · {j.type === 'full_time' ? 'Full Time' : 'Part Time'}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleJobOpen(j)} className="rounded-[4px] border border-line px-3.5 py-1.5 text-[13px] font-semibold">
                        {j.isOpen ? 'Close' : 'Reopen'}
                      </button>
                      <button onClick={() => openEditJobForm(j)} className="rounded-[4px] border border-line px-3.5 py-1.5 text-[13px] font-semibold">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'courses' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Courses</h2>
                  <button onClick={openNewCourseForm} className="rounded-[4px] bg-marigold px-4 py-2 text-sm font-semibold text-[#3a2405] hover:bg-[#e9992a]">
                    + Add a new course
                  </button>
                </div>

                {showCourseForm && (
                  <form onSubmit={handleSaveCourse} className="mb-6 space-y-4 rounded-m border border-line bg-paper p-5">
                    <h3 className="text-[15px] font-semibold">{editingCourseId ? 'Edit course' : 'New course'}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div><label className={labelCls}>Title</label><input required className={inputCls} value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} /></div>
                      <div><label className={labelCls}>Category</label><input required placeholder="e.g. Engineering Entrance" className={inputCls} value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} /></div>
                      <div><label className={labelCls}>Duration</label><input required placeholder="e.g. 12 Months" className={inputCls} value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} /></div>
                      <div><label className={labelCls}>Instructor</label><input required className={inputCls} value={courseForm.instructor} onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })} /></div>
                      <div><label className={labelCls}>Price (₹)</label><input required type="number" min={0} className={inputCls} value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })} /></div>
                      <div><label className={labelCls}>Mode</label><input required placeholder="Online / Offline" className={inputCls} value={courseForm.mode} onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })} /></div>
                    </div>
                    <div><label className={labelCls}>Tagline</label><input required className={inputCls} value={courseForm.tagline} onChange={(e) => setCourseForm({ ...courseForm, tagline: e.target.value })} /></div>
                    <div><label className={labelCls}>Syllabus</label><textarea required rows={3} className={inputCls} value={courseForm.syllabus} onChange={(e) => setCourseForm({ ...courseForm, syllabus: e.target.value })} /></div>
                    <div className="flex gap-3">
                      <button disabled={savingCourse} className="rounded-[4px] bg-navy px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                        {savingCourse ? 'Saving…' : editingCourseId ? 'Save changes' : 'Add course'}
                      </button>
                      <button type="button" onClick={() => setShowCourseForm(false)} className="rounded-[4px] border border-line px-5 py-2.5 text-sm font-semibold">Cancel</button>
                    </div>
                  </form>
                )}

                {loadingCourses && <p className="text-sm text-slate-soft">Loading…</p>}
                {!loadingCourses && courses.length === 0 && <p className="text-sm text-slate-soft">No courses yet.</p>}
                {courses.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border-b border-paper-2 py-3.5 last:border-none">
                    <div>
                      <div className="text-sm font-bold text-ink">{c.title}</div>
                      <div className="text-xs text-slate-soft">{c.category} · ₹{c.price}</div>
                    </div>
                    <button onClick={() => openEditCourseForm(c)} className="rounded-[4px] border border-line px-3.5 py-1.5 text-[13px] font-semibold">Edit</button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'applicants' && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Applicants</h2>
                <p className="text-sm text-slate-soft">
                  Candidates who apply through the Jobs page will appear here in a future update.
                  For now, candidates reach out directly via WhatsApp when they register.
                </p>
              </div>
            )}
            {tab === 'shortlist' && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Shortlist / Interview</h2>
                <p className="text-sm text-slate-soft">Coming soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
