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
    }),
  }),
  overrideExisting: true,
});

export const { useCreateListingMutation } = listingsApi;
