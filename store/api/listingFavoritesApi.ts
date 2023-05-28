import { CreateFavoriteRequest, DeleteFavoriteRequest, FavoriteResponse } from '@/types';
import { baseApi } from './baseApi';

const listingFavoritesUrl = 'favorites';

export const listingFavoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFavorite: builder.mutation<FavoriteResponse, CreateFavoriteRequest>({
      query: (body) => ({
        url: `${listingFavoritesUrl}/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Listings'],
    }),
    deleteFavorite: builder.mutation<FavoriteResponse, DeleteFavoriteRequest>({
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

export const { useCreateFavoriteMutation, useDeleteFavoriteMutation } = listingFavoritesApi;
