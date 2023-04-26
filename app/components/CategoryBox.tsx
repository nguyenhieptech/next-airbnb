'use client';

import { IconType } from 'react-icons';
import { classNames } from '../utils';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export function CategoryBox(props: CategoryBoxProps) {
  const { label, isSelected, onClick, icon: Icon } = props;

  return (
    <div
      onClick={onClick}
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
