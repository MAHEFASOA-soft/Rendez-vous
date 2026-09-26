import { useRef } from 'react';
import { motion } from 'framer-motion';
import { QuestionCard } from '@/components/QuestionCard';
import { YesButton } from '@/components/YesButton';
import { RunawayNoButton } from '@/components/RunawayNoButton';

interface ProposalPageProps {
  onYes: () => void;
}

export function ProposalPage({ onYes }: ProposalPageProps) {
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <QuestionCard />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12"
        >
          <YesButton ref={yesButtonRef} onClick={onYes} />
          <RunawayNoButton yesButtonRef={yesButtonRef} />
        </motion.div>
      </div>
    </div>
  );
}
