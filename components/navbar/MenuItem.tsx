import { classNames } from '@/utils';
import { Menu } from '@headlessui/react';

interface MenuItemProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export function MenuItem(props: MenuItemProps) {
  const { label, onClick } = props;
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={classNames(
            'text-normal px-4 py-3 text-neutral-800 transition hover:bg-neutral-100 focus:outline-none',
            active ? 'bg-neutral-100' : ''
          )}
          onClick={onClick}
        >
          {label}
        </div>
      )}
    </Menu.Item>
  );
}
