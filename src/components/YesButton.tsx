import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface YesButtonProps {
  onClick: () => void;
}

/**
 * The button the whole page is designed to sell. A subtle shimmer,
 * a lift on hover, and a satisfying squash on tap — nothing loud,
 * just enough to feel alive and inevitable.
 */
export const YesButton = forwardRef<HTMLButtonElement, YesButtonProps>(function YesButton(
  { onClick },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative isolate min-w-[168px] overflow-hidden rounded-full bg-gradient-to-r from-wine via-wineDeep to-plum bg-[length:200%_100%] px-9 py-4 font-body text-base font-semibold text-ivory shadow-[0_8px_30px_-6px_rgba(90,21,35,0.55)] animate-shimmer sm:text-lg"
    >
      <span className="relative z-10">Oui ❤️</span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-white/30"
        initial={{ opacity: 0, scale: 0.6 }}
        whileTap={{ opacity: [0.5, 0], scale: 1.6 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
});
