import { CreateListingRequest, CreateListingResponse } from '@/types';
import { baseApi } from './baseApi';

const listingsUrl = 'listings';

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation<CreateListingResponse, CreateListingRequest>({
      query: (body) => ({
        url: listingsUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
    deleteListing: builder.mutation<any, any>({
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

export const { useCreateListingMutation, useDeleteListingMutation } = listingsApi;
