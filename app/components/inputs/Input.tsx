'use client';

import { classNames } from '@/app/utils';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: FieldErrors | string[] | string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      label,
      errors,
      placeholder = 'placeholder',
      type = 'text',
      ...rest
    } = props;

    return (
      <div className="relative w-full">
        <input
          className={classNames(
            'peer w-full rounded-md border bg-white p-4 pt-6 text-sm text-text-primary placeholder-transparent outline-none transition',
            'disabled:cursor-not-allowed disabled:opacity-70',
            errors
              ? 'border-primary focus:border-2 focus:border-primary'
              : 'border-neutral-600 focus:border-2 focus:border-text-primary'
          )}
          placeholder={placeholder}
          type={type}
          ref={ref}
          {...rest}
        />
        <label
          className={classNames(
            'absolute left-4.5 top-2 z-10 origin-[0] scale-75 transform text-sm text-text-secondary transition-all',
            'peer-placeholder-shown:top-5 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:scale-75'
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
