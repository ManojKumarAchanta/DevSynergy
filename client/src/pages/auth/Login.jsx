import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/AuthLayout';
import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ForgotPassword from './model/ForgotPassword';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useLoginMutation } from '@/store/services/authApi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { useState } from 'react';

const Login=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      // Extract the required data from the response
      const { accessToken, refreshToken, user, message } = result;
      
      // Update Redux store with credentials
      dispatch(setCredentials({ accessToken, refreshToken, user }));
      
      // Show success message
      toast.success(message || 'Successfully logged in!');
      
      // Navigate to the intended page or home
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.data?.message || "Invalid credentials");
      } else {
        toast.error('Login failed. Please try again later.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[500px] px-4 md:px-8 py-6 md:py-12 flex flex-col justify-center gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold">
            Welcome back
          </h1>
          <p className="text-base md:text-lg text-gray-600">Login to your DevSynergy account</p>
        </div>
        
        <div className="w-full flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="email" className='text-base md:text-lg font-medium mb-1.5'>Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full p-4 md:p-6 text-base md:text-lg text-[#162533] bg-[#e7eef2] focus:bg-white rounded-lg"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <label htmlFor="password" className='text-base md:text-lg font-medium mb-1.5'>Password</label>
              <div className="w-full relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full p-4 md:p-6 text-base md:text-lg text-[#6384A0] bg-[#e7eef2] focus:bg-white rounded-lg"
                />
                <div 
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 
                    <EyeIcon className="h-5 w-5 text-gray-500" /> : 
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 md:py-6 text-base md:text-lg font-medium mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="flex flex-col w-full text-[#6384A0] text-center gap-2 mt-2">
            <ForgotPassword />
            <Link 
              to="/signup" 
              className="text-base md:text-lg hover:text-blue-700 transition-colors underline cursor-pointer"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;