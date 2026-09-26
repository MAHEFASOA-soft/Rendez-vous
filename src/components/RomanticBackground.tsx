import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

/**
 * Full-viewport backdrop: a soft ivory base with two very slow,
 * low-opacity gradient blooms. Pure CSS — no canvas/WebGL — so it
 * stays cheap on low-end mobile devices.
 */
export function RomanticBackground() {
  const reduced = useReducedMotionPref();

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-ivory">
      <div
        className={`absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-gradient-to-br from-rose/50 via-blush/40 to-transparent blur-3xl ${
          reduced ? '' : 'animate-drift'
        }`}
      />
      <div
        className={`absolute -bottom-1/4 -right-1/4 h-[75vh] w-[75vh] rounded-full bg-gradient-to-tl from-plum/25 via-rose/30 to-transparent blur-3xl ${
          reduced ? '' : 'animate-drift'
        }`}
        style={{ animationDelay: '-3.5s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(251,246,243,0.6)_100%)]" />
    </div>
  );
}
