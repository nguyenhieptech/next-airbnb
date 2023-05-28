'use client';

import { Button, Heading } from '@/components';
import { useRouter } from 'next/navigation';

type EmptyStateProps = Partial<{
  title: string;
  subtitle: string;
  showReset: boolean;
  buttonText: string;
}>;

export function EmptyState(props: EmptyStateProps) {
  const {
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters.',
    showReset,
    buttonText = 'Remove all filters',
  } = props;

  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button variant="outline" onClick={() => router.push('/')}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
