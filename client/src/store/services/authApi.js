import { BASE_URL } from '@/constants';
import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refreshtoken',
        method: 'POST',
        body: {},
      }),
    }),
    signup: builder.mutation({
      query: ({ name, username, email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: { name, username, email, password },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/forgotpasword',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `/reset-password?token=${encodeURIComponent(token)}`,
        method: 'POST',
        body: { password },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token }) => ({
        url: `/verifyemail?token=${token}`,
        method: 'POST',
        body: {},
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useSignupMutation,
  useRefreshTokenMutation,
} = authApi;
