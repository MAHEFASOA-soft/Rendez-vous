import { useState } from 'react';
import { motion } from 'framer-motion';
import { DatePickerField } from '@/components/DatePickerField';
import { LocationSelector } from '@/components/LocationSelector';
import { fadeUp, staggerContainer } from '@/animations/variants';

interface PlanningPageProps {
  initialDate: string | null;
  initialLocation: string;
  onSubmit: (date: string, location: string) => void;
}

export function PlanningPage({ initialDate, initialLocation, onSubmit }: PlanningPageProps) {
  const [date, setDate] = useState(initialDate ?? '');
  const [location, setLocation] = useState(initialLocation);
  const [touched, setTouched] = useState(false);

  const isValid = date.trim().length > 0 && location.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onSubmit(date, location.trim());
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full max-w-md text-center"
      >
        <motion.p variants={fadeUp} className="font-display text-lg italic text-wine/80">
          Je savais que tu allais dire oui <span aria-hidden="true">❤️</span>
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2 font-display text-3xl font-medium text-ink sm:text-4xl"
        >
          Alors... quand et où&nbsp;?
        </motion.h2>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          noValidate
          className="mt-9 space-y-6 text-left"
        >
          <DatePickerField value={date} onChange={setDate} />
          <LocationSelector value={location} onChange={setLocation} />

          {touched && !isValid && (
            <p role="alert" className="text-sm text-wine">
              Choisis une date et un lieu pour continuer — même approximatif, c&apos;est parfait.
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-full bg-gradient-to-r from-wine to-plum px-8 py-4 font-body text-base font-semibold text-ivory shadow-[0_8px_30px_-6px_rgba(90,21,35,0.5)] transition-opacity disabled:opacity-40 sm:text-lg"
          >
            Continuer ❤️
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
