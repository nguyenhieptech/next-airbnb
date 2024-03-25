import { getCurrentUser, getFavoriteListings } from '@/app/actions';
import { ClientOnly, EmptyState } from '@/components';
import { FavoritesClient } from './favorites-client';

export default async function FavoritesPage() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
}
