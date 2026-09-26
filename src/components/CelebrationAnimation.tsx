import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

const GLYPHS = ['❤', '✦', '❤', '✧'];

interface Particle {
  id: number;
  glyph: string;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
  color: string;
}

/**
 * A single, restrained celebration: a burst of hearts/sparkles that
 * fall once and fade — not a looping confetti cannon. Runs once on
 * mount (this component should be mounted only when the summary
 * page appears) and disables itself under reduced motion.
 */
export function CelebrationAnimation() {
  const reduced = useReducedMotionPref();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.6 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 120,
        size: 10 + Math.random() * 14,
        color: i % 3 === 0 ? '#7A2231' : i % 3 === 1 ? '#C89A6B' : '#E8B4C0',
      })),
    []
  );

  if (reduced) {
    // Respect the preference: a single soft glow instead of motion.
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[5] bg-[radial-gradient(circle_at_50%_20%,rgba(232,180,192,0.35),transparent_60%)]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%]"
          style={{ left: `${p.left}%`, fontSize: p.size, color: p.color }}
          initial={{ y: '-5vh', opacity: 0, rotate: 0 }}
          animate={{ y: '105vh', opacity: [0, 1, 1, 0], x: p.drift, rotate: 180 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>
  );
}
