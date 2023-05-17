'use client';

import { classNames } from '@/app/utils';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export function CategoryInput(props: CategoryInputProps) {
  const { icon: Icon, label, selected, onClick } = props;

  return (
    <div
      className={classNames(
        'flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition  hover:border-black',
        selected ? 'border-black' : 'border-neutral-200'
      )}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className="text-sm font-semibold text-text-primary">{label}</div>
    </div>
  );
}
