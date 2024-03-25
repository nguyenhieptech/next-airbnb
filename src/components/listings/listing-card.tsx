'use client';

import { Button, HeartButton } from '@/components';
import { useCountries } from '@/hooks';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export function ListingCard(props: ListingCardProps) {
  const {
    data,
    reservation,
    onAction = () => {},
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
  } = props;
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onAction(actionId);
  }

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            src={data.imageSrc}
            alt="Listing"
            fill
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-base font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="text-sm font-normal text-text-secondary">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1 text-sm text-text-primary">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div>night</div>}
        </div>
        {actionLabel && (
          <Button disabled={disabled} size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
