import { useEffect, useState } from 'react';

/**
 * Minimal typed localStorage-backed state. Used only to smooth the
 * experience (e.g. surviving an accidental refresh) — never for
 * anything sensitive, and it fails silently if storage is unavailable
 * (private browsing, quota, etc.) rather than breaking the app.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently ignore — persistence is a nice-to-have, not a requirement.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
