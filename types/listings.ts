import { Listing, Reservation } from '@prisma/client';

export type APIRequestCreateListing = Partial<{
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

export type APIResponseCreateListing = Listing;

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

export type APIRequestCreateReservation = {
  totalPrice: number;
  startDate?: Date;
  endDate?: Date;
  listingId: string;
};

export type APIRequestCreateFavorite = {
  id: string;
};

export type APIRequestDeleteFavorite = APIRequestCreateFavorite;

export type APIResponseFavorite = Partial<{
  favoriteIds: string[];
}>;

export type APIRequestDeleteReservation = {
  id: string;
};

export type APIResponseDeleteListing = {
  count: number;
};

export type APIRequestDeleteListing = {
  id: string;
};
