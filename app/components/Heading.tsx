'use client';

import { Dialog } from '@headlessui/react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <Dialog.Title className="text-xl font-bold text-text-primary" as="h3">
        {title}
      </Dialog.Title>
      <div className="mt-2 text-sm font-light text-text-secondary">
        {subtitle}
      </div>
    </div>
  );
}
