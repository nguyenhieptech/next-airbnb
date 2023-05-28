import { getCurrentUser } from '@/app/actions';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

type Params = {
  reservationId?: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        // Only creator of the reservation can delete the reservation
        { userId: currentUser.id },
        // Only creator of the listing can delete the reservation
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
