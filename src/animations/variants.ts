import type { Variants } from 'framer-motion';

/** Gentle staggered reveal for stacked text/content blocks. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Whole-page transition used between the three steps. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.99,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
};
