'use client';

import { Container, Heading, ListingCard } from '@/components';
import { useDeleteReservationMutation } from '@/store/api';
import { SafeReservation, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type ReservationsClientProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

export function ReservationsClient(props: ReservationsClientProps) {
  const { reservations, currentUser } = props;
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const [deleteReservationMutation, deleteReservationResult] =
    useDeleteReservationMutation();

  const handleDeleteReservation = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteReservationMutation({ id });
      toast.success('Reservation cancelled');
      setDeletingId('');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation: SafeReservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleDeleteReservation}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
