import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  tokenExpiry: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateToken: (state, action) => {
      const { accessToken, expiresIn } = action.payload;
      state.accessToken = accessToken;

      if (expiresIn) {
        state.tokenExpiry = Date.now() + expiresIn * 1000;
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;
    },
    clearExpiredToken: (state) => {
      state.accessToken = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
    },
  },
});

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectTokenExpiry = (state) => state.auth.tokenExpiry;
export const selectIsTokenExpired = (state) => {
  const expiry = state.auth.tokenExpiry;
  return expiry ? Date.now() > expiry : false;
};

export const {
  setCredentials,
  updateUser,
  updateToken,
  clearExpiredToken,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
