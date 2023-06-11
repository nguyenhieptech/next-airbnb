'use client';

import { CategoryBox, Container } from '@/components';
import { categories } from '@/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export function Categories() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            isSelected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
