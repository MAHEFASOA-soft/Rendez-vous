import { motion } from 'framer-motion';
import type { LocationSuggestion } from '@/types';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const suggestions: LocationSuggestion[] = [
  { id: 'cafe', label: 'Café', emoji: '☕' },
  { id: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { id: 'parc', label: 'Parc', emoji: '🌳' },
  { id: 'cinema', label: 'Cinéma', emoji: '🎬' },
  { id: 'autre', label: 'Autre', emoji: '✨' },
];

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  const selectedId = suggestions.find((s) => s.label === value)?.id;

  return (
    <div>
      <span className="mb-2 block font-body text-sm font-medium text-ink/70">Où ?</span>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
        {suggestions.map((s) => {
          const active = selectedId === s.id;
          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => onChange(s.id === 'autre' ? '' : s.label)}
              whileTap={{ scale: 0.94 }}
              aria-pressed={active}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3.5 font-body text-xs transition-colors sm:text-sm ${
                active
                  ? 'border-wine bg-wine/10 text-wine'
                  : 'border-ink/10 bg-white/60 text-ink/80 hover:border-ink/20'
              }`}
            >
              <span className="text-xl" aria-hidden="true">
                {s.emoji}
              </span>
              {s.label}
            </motion.button>
          );
        })}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Précise un lieu, ou écris le tien..."
        maxLength={80}
        required
        aria-label="Lieu du rendez-vous"
        className="mt-3 w-full rounded-2xl border border-ink/10 bg-white/70 px-5 py-4 font-body text-base text-ink shadow-sm backdrop-blur-sm transition-colors placeholder:text-ink/35 focus:border-wine/50"
      />
    </div>
  );
}
