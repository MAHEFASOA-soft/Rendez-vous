import { SummaryCard } from '@/components/SummaryCard';
import { LoveMessage } from '@/components/LoveMessage';
import { CelebrationAnimation } from '@/components/CelebrationAnimation';

interface RecapPageProps {
  date: string | null;
  location: string;
}

export function RecapPage({ date, location }: RecapPageProps) {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16">
      <CelebrationAnimation />
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <LoveMessage />
        <SummaryCard date={date} location={location} />
      </div>
    </div>
  );
}
