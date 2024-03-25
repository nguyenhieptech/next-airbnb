import {
  APIRequestCreateListing,
  APIRequestDeleteListing,
  APIResponseCreateListing,
  APIResponseDeleteListing,
} from '@/types';
import { baseApi } from './base-api';

const listingsUrl = 'listings';

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation<
      APIResponseCreateListing,
      APIRequestCreateListing
    >({
      query: (body) => ({
        url: listingsUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
    deleteListing: builder.mutation<
      APIResponseDeleteListing,
      APIRequestDeleteListing
    >({
      query: (body) => ({
        url: `${listingsUrl}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateListingMutation, useDeleteListingMutation } =
  listingsApi;
