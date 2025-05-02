import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, resetAuthState } from "../../../features/auth/authSlice";
import AuthLayout from "../AuthLayout.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    // Optionally redirect or show persistent message on success
    if (isSuccess) {
      // Option 1: Redirect to login after a short delay
      // setTimeout(() => navigate('/login'), 2000);
      // Option 2: Keep the success message displayed (handled below)
    }

    // Reset state on component mount/unmount or when error/success changes
    return () => {
      if (isError || isSuccess) {
        dispatch(resetAuthState());
      }
    };
    // Add message to dependency array if you want reset on message change too
  }, [isSuccess, isError, navigate, dispatch]);

  const handleFocus = () => {
    if (isError || message) {
      // Clear previous error/message on new input focus
      dispatch(resetAuthState());
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm p-8 space-y-3 rounded-xl shadow-md bg-white text-gray-900">
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus} // Reset state on focus
              // onFocus={handleFocus} // Reset state on focus
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus} // Reset state on focus
              // onFocus={handleFocus} // Reset state on focus
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-md text-white bg-teal-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>
        {isError && (
          <p className="text-sm text-center text-red-600 mt-4">{message}</p>
        )}
        {isSuccess && (
          <p className="text-sm text-center text-green-600 mt-4">
            {message || "Registration successful! Please log in."}
          </p>
        )}
      </div>
    </AuthLayout>
  );
};

export default Signup;
