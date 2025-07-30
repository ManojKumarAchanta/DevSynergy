import { useEffect } from "react";
import { useRefreshTokenMutation } from "../store/services/authApi.js";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAccessToken,
  selectRefreshToken,
  logout,
  clearExpiredToken,
} from "../store/slices/authSlice.js";

const useAuthInit = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(selectRefreshToken);
  const accessToken = useSelector(selectAccessToken);
  const tokenExpiry = useSelector((state) => state.auth.tokenExpiry);
  const isTokenExpired = tokenExpiry ? Date.now() > tokenExpiry : false;
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Set up periodic token refresh
  useEffect(() => {
    if (!accessToken || !tokenExpiry) return;

    const timeUntilExpiry = tokenExpiry - Date.now();
    const refreshTime = timeUntilExpiry - 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (refreshTime > 0) {
      const timeoutId = setTimeout(async () => {
        if (refreshToken) {
          try {
            await refreshTokenMutation().unwrap();
          } catch (error) {
            console.error("Failed to refresh token:", error);
            dispatch(logout());
          }
        }
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [accessToken, tokenExpiry, refreshToken, refreshTokenMutation, dispatch]);

  // Clear expired tokens on mount
  useEffect(() => {
    if (isTokenExpired && !refreshToken) {
      dispatch(clearExpiredToken());
    }
  }, [isTokenExpired, refreshToken, dispatch]);
};

export default useAuthInit;
