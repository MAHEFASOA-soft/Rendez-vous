import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

interface FloatingHeartsProps {
  /** How many hearts to render — keep this low, they're a texture, not a feature. */
  count?: number;
}

/**
 * A handful of barely-there hearts drifting upward in the background.
 * Deliberately restrained: low opacity, slow, never covers content.
 */
export function FloatingHearts({ count = 7 }: FloatingHeartsProps) {
  const reduced = useReducedMotionPref();

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 6 + ((i * 97) % 88),
        size: 10 + ((i * 37) % 16),
        duration: 10 + ((i * 53) % 8),
        delay: (i * 1.7) % 8,
        opacity: 0.08 + ((i * 13) % 10) / 100,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-wine"
          style={{ left: `${h.left}%`, fontSize: h.size, opacity: h.opacity, bottom: -40 }}
          animate={{ y: ['0vh', '-115vh'] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}
