'use client';

import { classNames } from '@/app/utils';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  hasOutline?: boolean;
  isSmall?: boolean;
  icon?: IconType;
}

export function Button(props: ButtonProps) {
  const { label, hasOutline, isSmall, children, icon: Icon, ...rest } = props;

  return (
    <button
      className={classNames(
        'relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        hasOutline
          ? 'border-black bg-white text-black'
          : 'border-primary bg-primary text-white',
        isSmall
          ? 'border py-1 text-sm font-normal'
          : 'text-md border-2 py-3 font-semibold'
      )}
      {...rest}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} />}
      {label}
      {children}
    </button>
  );
}
