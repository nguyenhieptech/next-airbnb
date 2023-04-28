'use client';

import { classNames } from '@/app/utils';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'fill';
  size?: 'sm' | 'md';
  startIcon?: IconType;
}

/**
 * Examples:
 * ```tsx
 * <Button variant="outline" size="sm" startIcon={AiFillGithub}>
 *   Continue with Github
 * </Button>
 * <Button variant="outline" size="md" startIcon={FcGoogle}>
 *   Continue with Google
 * </Button>
 * ```
 * Naming convention is similar to MUI v5
 * @see https://mui.com/material-ui/react-button/
 */
export function Button(props: ButtonProps) {
  const {
    type = 'button',
    variant = 'fill',
    size = 'md',
    children,
    startIcon: StartIcon,
    ...rest
  } = props;

  return (
    <button
      className={classNames(
        'relative w-full rounded-lg text-sm transition hover:opacity-80',
        'disabled:cursor-not-allowed disabled:opacity-70',
        'focus:outline focus:outline-2 focus:outline-neutral-700',
        variant === 'outline'
          ? 'border border-neutral-700 bg-white text-neutral-700'
          : 'border-primary bg-primary text-white',
        size === 'sm' ? 'py-1 font-normal' : 'py-3 font-medium'
      )}
      type={type}
      {...rest}
    >
      {StartIcon && <StartIcon className="absolute left-4 top-3" size={24} />}
      {children}
    </button>
  );
}
