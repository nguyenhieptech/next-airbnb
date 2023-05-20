'use client';

import { Button, Heading } from '@/app/components';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export function EmptyState(props: EmptyStateProps) {
  const {
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters.',
    showReset,
  } = props;

  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48">
        {showReset && (
          <Button variant="outline" onClick={() => router.push('/')}>
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
}
