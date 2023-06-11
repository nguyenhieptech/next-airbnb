import { APIRequestCreateReservation, APIRequestDeleteReservation, SafeReservation } from '@/types';
import { baseApi } from './base-api';

const reservationsUrl = 'reservations';

export const reservationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation<SafeReservation, APIRequestCreateReservation>({
      query: (body) => ({
        url: reservationsUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reservations'],
    }),
    deleteReservation: builder.mutation<SafeReservation, APIRequestDeleteReservation>({
      query: (body) => ({
        url: `${reservationsUrl}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Reservations'],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateReservationMutation, useDeleteReservationMutation } = reservationsApi;
