import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function LoveMessage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-center">
      <motion.p variants={fadeUp} className="font-display text-2xl italic text-wine/90 sm:text-3xl">
        Alors c&apos;est officiel... <span aria-hidden="true">❤️</span>
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="mx-auto mt-5 max-w-md text-balance font-body text-base leading-relaxed text-ink/70 sm:text-lg"
      >
        Merci d&apos;avoir dit oui. Je ne sais pas encore comment cette journée va se
        passer, mais je sais déjà que j&apos;ai hâte de la partager avec toi.
      </motion.p>
    </motion.div>
  );
}
