'use client';

import { Avatar } from '@/components';
import { useCountries } from '@/hooks';
import { SafeListing, SafeUser } from '@/types';
import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';
import { ListingCategory } from './listing-category';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

interface ListingInfoProps {
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  listing: SafeListing & {
    user: SafeUser;
  };
}

export function ListingInfo(props: ListingInfoProps) {
  const { listing, category } = props;
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing.locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {listing.user?.name}</div>
          <Avatar src={listing.user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 text-sm font-light text-neutral-500">
          <div>{listing.guestCount} guests</div>
          <div>{listing.roomCount} rooms</div>
          <div>{listing.bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-sm font-light text-neutral-500">
        {listing.description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
