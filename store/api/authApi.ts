import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types';
import { baseApi } from './baseApi';

const signUpUrl = 'sign-up';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
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
