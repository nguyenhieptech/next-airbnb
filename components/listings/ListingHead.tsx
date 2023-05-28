'use client';

import { Heading, HeartButton } from '@/components';
import { useCountries } from '@/hooks';
import { SafeListing, SafeUser } from '@/types';
import Image from 'next/image';

interface ListingHeadProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
}

export function ListingHead(props: ListingHeadProps) {
  const { listing, currentUser } = props;
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  return (
    <>
      <Heading
        title={listing.title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          src={listing.imageSrc}
          fill
          className="w-full object-cover"
          alt="Image"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={listing.id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
