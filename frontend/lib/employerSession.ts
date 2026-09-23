// Simple client-side "session" so an institute doesn't have to re-enter its
// profile every time. There's no login system yet — this just remembers the
// employer record this browser created, in localStorage.
const KEY = 'ms_employer_id';

export function getEmployerId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(KEY);
}

export function setEmployerId(id: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, id);
}

export function clearEmployerId() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}
