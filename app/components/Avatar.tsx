'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src="/images/placeholder.jpg"
    />
  );
}
