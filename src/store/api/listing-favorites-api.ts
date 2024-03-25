import {
  APIRequestCreateFavorite,
  APIRequestDeleteFavorite,
  APIResponseFavorite,
} from '@/types';
import { baseApi } from './base-api';

const listingFavoritesUrl = 'favorites';

export const listingFavoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation<
      APIResponseFavorite,
      APIRequestCreateFavorite
    >({
      query: (body) => ({
        url: `${listingFavoritesUrl}/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
    deleteFavorite: builder.mutation<
      APIResponseFavorite,
      APIRequestDeleteFavorite
    >({
      query: (body) => ({
        url: `${listingFavoritesUrl}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateFavoriteMutation, useDeleteFavoriteMutation } =
  listingFavoritesApi;
