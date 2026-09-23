const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://ms-consultant-api.onrender.com/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${path}`);
  }
  return res.json();
}

export interface Employer {
  id: string;
  instituteName: string;
  contactEmail: string;
  contactPhone?: string;
  location: string;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  salaryRange: string;
  experience: string;
  type: 'full_time' | 'part_time';
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  isOpen: boolean;
  employer: Employer;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  tagline: string;
  syllabus: string;
  duration: string;
  instructor: string;
  price: string | number;
  mode: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateJobPayload {
  title: string;
  location: string;
  salaryRange: string;
  experience: string;
  type: 'full_time' | 'part_time';
  description: string;
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  isOpen?: boolean;
  employerId: string;
}

export interface CreateCoursePayload {
  title: string;
  category: string;
  tagline: string;
  syllabus: string;
  duration: string;
  instructor: string;
  price: number;
  mode: string;
}

export interface CreateEmployerPayload {
  instituteName: string;
  contactEmail: string;
  contactPhone?: string;
  location: string;
}

export interface CreateCandidatePayload {
  fullName: string;
  email: string;
  phone?: string;
  subjectSpecialisation?: string;
  resumeUrl?: string;
}

export const api = {
  jobs: {
    list: (params?: { search?: string; location?: string; type?: string }) => {
      const qs = new URLSearchParams(
        Object.entries(params || {}).filter(([, v]) => !!v) as string[][],
      ).toString();
      return request<Job[]>(`/jobs${qs ? `?${qs}` : ''}`);
    },
    get: (id: string) => request<Job>(`/jobs/${id}`),
    create: (payload: CreateJobPayload) =>
      request<Job>(`/jobs`, { method: 'POST', body: JSON.stringify(payload) }),
    update: (id: string, payload: Partial<CreateJobPayload>) =>
      request<Job>(`/jobs/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  },
  courses: {
    list: (category?: string) =>
      request<Course[]>(`/courses${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    get: (id: string) => request<Course>(`/courses/${id}`),
    create: (payload: CreateCoursePayload) =>
      request<Course>(`/courses`, { method: 'POST', body: JSON.stringify(payload) }),
    update: (id: string, payload: Partial<CreateCoursePayload>) =>
      request<Course>(`/courses/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  },
  employers: {
    list: () => request<Employer[]>(`/employers`),
    create: (payload: CreateEmployerPayload) =>
      request<Employer>(`/employers`, { method: 'POST', body: JSON.stringify(payload) }),
  },
  candidates: {
    create: (payload: CreateCandidatePayload) =>
      request<{ id: string }>(`/candidates`, { method: 'POST', body: JSON.stringify(payload) }),
  },
  contact: {
    send: (payload: ContactMessagePayload) =>
      request(`/contact`, { method: 'POST', body: JSON.stringify(payload) }),
  },
  applications: {
    create: (jobId: string, candidateId: string) =>
      request(`/applications`, {
        method: 'POST',
        body: JSON.stringify({ jobId, candidateId }),
      }),
    byCandidate: (candidateId: string) =>
      request(`/applications?candidateId=${candidateId}`),
  },
};
