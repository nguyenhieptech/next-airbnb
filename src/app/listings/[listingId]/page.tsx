import { getCurrentUser, getListingById, getReservations } from '@/app/actions';
import { ClientOnly, EmptyState } from '@/components';
import { ListingClient } from './listing-client';

type Params = {
  listingId?: string;
};

export default async function ListingPage({ params }: { params: Params }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
