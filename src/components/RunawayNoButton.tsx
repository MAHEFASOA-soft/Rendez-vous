import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRunawayButton } from '@/hooks/useRunawayButton';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { pickEscapeMessage } from '@/utils/messages';

interface RunawayNoButtonProps {
  yesButtonRef: React.RefObject<HTMLButtonElement>;
}

/**
 * The "Non" button. On pointer devices it dodges the cursor before it
 * arrives; on touch it dodges on first contact. With reduced motion
 * requested, dodging is disabled so the control stays fully operable —
 * accessibility wins over the joke — but clicking it still just shows
 * one more affectionate line rather than doing anything final: there
 * is no "no" outcome in this flow, only gentle persuasion.
 */
export function RunawayNoButton({ yesButtonRef }: RunawayNoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotionPref();
  const [staticMessage, setStaticMessage] = useState<string | null>(null);

  const { offset, message, handlePointerMove, handleTouchStart } = useRunawayButton({
    buttonRef,
    safeZoneRef: yesButtonRef,
    enabled: !reduced,
  });

  const shownMessage = message ?? staticMessage;

  const handleClick = () => {
    // Only reachable when reduced motion is on (or on a lucky click) —
    // respond with the same warm teasing rather than nothing at all.
    setStaticMessage((prev) => pickEscapeMessage(prev ?? undefined));
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        aria-label="Non (ce bouton aime bien se faire désirer)"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="min-w-[120px] rounded-full border border-ink/15 bg-white/40 px-7 py-4 font-body text-base text-ink/80 backdrop-blur-sm transition-colors hover:text-ink sm:text-lg"
      >
        Non
      </motion.button>

      {/* Live region so screen-reader users hear the teasing line too. */}
      <div aria-live="polite" className="sr-only">
        {shownMessage}
      </div>

      <AnimatePresence>
        {shownMessage && (
          <motion.p
            key={shownMessage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink/90 px-5 py-2.5 text-center font-body text-sm text-ivory shadow-lg"
            role="status"
          >
            {shownMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
