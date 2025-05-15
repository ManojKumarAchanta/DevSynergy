import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, updateToken } from '../slices/authSlice';
import { BASE_URL } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Required for cookies to be sent
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

  if (result.error?.status === 401) {
    // Try to refresh access token
    const refreshResult = await baseQuery(
      {
        url: '/refreshtoken',
        method: 'POST',
        // Don't send refreshToken manually if it's in cookie
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      // Update the new access token
      api.dispatch(updateToken(refreshResult.data.accessToken));

      // Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      api.dispatch(logout());
    }
  }

  return result;
};
