// services/customBaseQuery.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, updateToken } from '../slices/authSlice';
import { BASE_URL } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Send cookies (important for refresh token in cookies)
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      {
        url: '/refreshtoken',
        method: 'POST',
        body: { refreshToken: api.getState().auth.refreshToken }
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Store new tokens
      api.dispatch(updateToken(refreshResult.data.accessToken));

      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - logout user
      api.dispatch(logout());
    }
  }

  return result;
};
