import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

// Store
import { selectIsAuthenticated } from "./store/slices/authSlice";

// Hooks
import useAuthInit from "./lib/useAuthInit.js";

import Navbar from "./components/shared/Navbar";

// Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/auth/components/UpdatePassword";

const AuthInitializer = ({ children }) => {
  useAuthInit();
  return children;
};

export default function App() {
  return (
    <AuthInitializer>
      <Main />
    </AuthInitializer>
  );
}

const Main = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Signup />}
        />

        {/* App Routes */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/update-password"
          element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" replace />}
        />

        {/* Root Route - Redirect based on auth status */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all route - Redirect to appropriate page based on auth status */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

