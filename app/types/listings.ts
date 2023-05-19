import { Listing } from '@prisma/client';

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
