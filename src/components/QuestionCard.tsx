import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function QuestionCard() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="text-center"
    >
      <motion.p
        variants={fadeUp}
        className="mb-3 font-body text-sm font-medium tracking-wide text-wine/90"
      >
        J&apos;ai une petite question à te poser...
      </motion.p>
      <motion.h1
        variants={fadeUp}
        className="text-balance font-display text-4xl font-medium leading-[1.15] text-ink sm:text-5xl md:text-6xl"
      >
        Est-ce que tu accepterais
        <br className="hidden sm:block" /> un petit rendez-vous
        <br className="hidden sm:block" /> avec moi&nbsp;? <span aria-hidden="true">❤️</span>
      </motion.h1>
    </motion.div>
  );
}
