'use client';

import { Container, Heading, ListingCard } from '@/components';
import { useDeleteListingMutation } from '@/store/api';
import { SafeListing, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type PropertiesClientProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export function PropertiesClient(props: PropertiesClientProps) {
  const { listings, currentUser } = props;
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const [deleteListingMutation, deleteListingResult] =
    useDeleteListingMutation();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteListingMutation({ id });
      setDeletingId('');
      toast.success('Listing deleted');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
    setDeletingId('');
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={handleDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
