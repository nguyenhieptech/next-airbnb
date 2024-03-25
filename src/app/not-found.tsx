import { EmptyState } from '@/components';

export default function NotFound() {
  return (
    <EmptyState
      title="We can’t seem to find the page you’re looking for"
      subtitle="This page might not exist or has been moved."
      showReset
      buttonText="Back to Home page"
    />
  );
}
