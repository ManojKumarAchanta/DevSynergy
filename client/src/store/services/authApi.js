import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants";
import { setCredentials, updateToken, logout } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced base query with automatic token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Token expired, attempting refresh...");

    // Try to refresh the token
    const refreshResult = await baseQuery(
      {
        url: "/refreshtoken",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store the new tokens
      api.dispatch(
        updateToken({
          accessToken: refreshResult.data.accessToken,
          expiresIn: refreshResult.data.expiresIn,
        })
      );

      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, logout user
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/refreshtoken",
        method: "POST",
        body: {},
      }),
    }),
    signup: builder.mutation({
      query: ({ name, username, email, password }) => ({
        url: "/signup",
        method: "POST",
        body: { name, username, email, password },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/forgotpassword", // Fixed typo
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `/reset-password?token=${encodeURIComponent(token)}`,
        method: "POST",
        body: { password },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token }) => ({
        url: `/verifyemail?token=${token}`,
        method: "POST",
        body: {},
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    // Add endpoint to verify current session
    verifySession: builder.query({
      query: () => ({
        url: "/verify-session",
        method: "GET",
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
