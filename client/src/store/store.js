import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./services/authApi";
import authReducer from "./slices/authSlice";

// Configure store
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Setup listeners for automatic refetching
setupListeners(store.dispatch);

// Export store types for JavaScript usage
export const getStoreState = () => store.getState();
export const getStoreDispatch = () => store.dispatch;

// Optional: Add store reset functionality
export const resetStore = () => {
  // Reset auth state
  store.dispatch({ type: "auth/logout" });
};
