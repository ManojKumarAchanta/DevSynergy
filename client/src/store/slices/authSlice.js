import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authSelector = (state)=>state.auth;
export const { setCredentials, setOtpToken, setPhoneNumber, logout } =
  authSlice.actions;
export default authSlice.reducer;
