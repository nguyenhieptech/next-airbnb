'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      <div className="mt-2 text-sm font-light text-text-secondary">
        {subtitle}
      </div>
    </div>
  );
}
