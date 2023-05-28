import { CreateReservationRequest, DeleteReservationRequest, SafeReservation } from '@/types';
import { baseApi } from './baseApi';

const reservationsUrl = 'reservations';

export const reservationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation<SafeReservation, CreateReservationRequest>({
      query: (body) => ({
        url: reservationsUrl,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reservations'],
    }),
    deleteReservation: builder.mutation<SafeReservation, DeleteReservationRequest>({
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
