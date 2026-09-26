import { useEffect, useState } from 'react';

/**
 * Reactively tracks `prefers-reduced-motion`. Components use this to
 * disable large/decorative motion (floating hearts, confetti, the
 * runaway button's long dodges) while keeping the app fully usable.
 */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
