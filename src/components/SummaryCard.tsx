import { motion } from 'framer-motion';

interface SummaryCardProps {
  date: string | null;
  location: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return 'À définir ensemble';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function SummaryCard({ date, location }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl border border-white/60 bg-white/60 p-7 text-left shadow-[0_20px_60px_-20px_rgba(90,21,35,0.35)] backdrop-blur-md sm:p-9"
    >
      <p className="mb-5 font-display text-lg italic text-wine/80">Notre rendez-vous</p>

      <dl className="space-y-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-xl">
            📅
          </span>
          <div>
            <dt className="font-body text-xs font-medium uppercase tracking-wide text-ink/45">
              Date
            </dt>
            <dd className="font-body text-lg capitalize text-ink">{formatDate(date)}</dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-xl">
            📍
          </span>
          <div>
            <dt className="font-body text-xs font-medium uppercase tracking-wide text-ink/45">
              Lieu
            </dt>
            <dd className="font-body text-lg text-ink">{location || 'À définir ensemble'}</dd>
          </div>
        </div>
      </dl>
    </motion.div>
  );
}
