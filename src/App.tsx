import { AnimatePresence, motion } from 'framer-motion';
import { RomanticBackground } from '@/components/RomanticBackground';
import { FloatingHearts } from '@/components/FloatingHearts';
import { ProposalPage } from '@/pages/ProposalPage';
import { PlanningPage } from '@/pages/PlanningPage';
import { RecapPage } from '@/pages/RecapPage';
import { pageTransition } from '@/animations/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AppStep, DateProposal } from '@/types';

const EMPTY_PROPOSAL: DateProposal = {
  answer: 'yes',
  date: null,
  location: '',
  createdAt: '',
};

export default function App() {
  const [step, setStep] = useLocalStorage<AppStep>('rdv:step', 'proposal');
  const [proposal, setProposal] = useLocalStorage<DateProposal>('rdv:proposal', EMPTY_PROPOSAL);

  const handleYes = () => setStep('planning');

  const handlePlanningSubmit = (date: string, location: string) => {
    setProposal({ answer: 'yes', date, location, createdAt: new Date().toISOString() });
    setStep('summary');
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      <RomanticBackground />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === 'proposal' && (
          <motion.div key="proposal" variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <ProposalPage onYes={handleYes} />
          </motion.div>
        )}

        {step === 'planning' && (
          <motion.div key="planning" variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <PlanningPage
              initialDate={proposal.date}
              initialLocation={proposal.location}
              onSubmit={handlePlanningSubmit}
            />
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.div key="summary" variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <RecapPage date={proposal.date} location={proposal.location} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
