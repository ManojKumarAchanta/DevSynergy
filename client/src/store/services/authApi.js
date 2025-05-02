import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../store/authSlice';
import { store } from '../store';
import { AUTH_URL } from '@/constants';


const baseQuery = fetchBaseQuery({
  baseUrl: AUTH_URL,
  credentials: 'include', // sends refresh token cookie
  prepareHeaders: (headers) => {
    const token = store.getState().auth.accessToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

// wrapper for auto-refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // try refresh
    const refreshResult = await baseQuery(
      '/auth/refresh-token',
      api,
      extraOptions
    );
    if (refreshResult?.data?.accessToken) {
      // update token
      store.dispatch(
        setCredentials({ accessToken: refreshResult.data.accessToken })
      );
      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      store.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}), // add endpoints here
});
