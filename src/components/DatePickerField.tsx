interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * A styled native <input type="date">. A fully custom calendar widget
 * was considered, but the native control already gives every platform
 * (iOS, Android, desktop) its own accessible, well-tested picker —
 * reskinning it is far more robust than reinventing it.
 */
export function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <label htmlFor="date" className="mb-2 block font-body text-sm font-medium text-ink/70">
        Quand ?
      </label>
      <input
        id="date"
        type="date"
        min={today}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-2xl border border-ink/10 bg-white/70 px-5 py-4 font-body text-base text-ink shadow-sm backdrop-blur-sm transition-colors focus:border-wine/50"
      />
    </div>
  );
}
