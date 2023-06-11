import { APIRequestSignUp, APIResponseSignUp } from '@/types';
import { baseApi } from './base-api';

const signUpUrl = 'sign-up';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<APIResponseSignUp, APIRequestSignUp>({
      query: (body) => ({
        url: signUpUrl,
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useSignUpMutation } = authApi;
