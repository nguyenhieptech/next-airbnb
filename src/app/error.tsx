'use client';

import { EmptyState } from '@/components';
import { useEffect } from 'react';

type ErrorStateProps = {
  error: Error;
};

export default function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="404 - Page not found"
      subtitle="Something went wrong!"
      showReset
      buttonText="Back to Home page"
    />
  );
}
