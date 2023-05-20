import { Listing, Reservation } from '@prisma/client';

export type CreateListingRequest = Partial<{
  category: string;
  location: {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
  };
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  title: string;
  description: string;
}>;

export type CreateListingResponse = Listing;

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export interface CreateFavoriteRequest {
  id: string;
}

export type DeleteFavoriteRequest = CreateFavoriteRequest;

export type FavoriteResponse = Partial<{
  favoriteIds: string[];
}>;
