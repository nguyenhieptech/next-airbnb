'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { classNames } from '../utils';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  isSelected?: boolean;
}

export function CategoryBox(props: CategoryBoxProps) {
  const { label, isSelected, icon: Icon } = props;

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // Toggle/select/deselect category
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={classNames(
        'flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800',
        isSelected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'border-transparent text-neutral-500'
      )}
    >
      <Icon size={26} />
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
}
