import { Container, Heading, ListingCard } from '@/components';
import { SafeListing, SafeUser } from '@/types';

type FavoritesClientProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export function FavoritesClient(props: FavoritesClientProps) {
  const { listings, currentUser } = props;

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of your favorite places!" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}
