import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AuthLayout from '@/layouts/AuthLayout'
import { EyeClosed } from 'lucide-react'
import { EyeIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignupMutation } from '@/store/services/authApi'
import toast from 'react-hot-toast'
import EmailVerification from './model/EmailVerification'

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
 
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      name: '',
      email: '',
      password: ''
    };

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

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
      await signup(formData).unwrap();
      toast.success('Account created successfully!');
      // setShowVerificationModal(true);
    } catch (error) {
      if (error.status === 400) {
        toast.error("Username or email already exists");
      } else {
        toast.error('Signup failed. Please try again later.');
      }
    }
  };

 

  return (
    <AuthLayout>
      <div className="w-full max-w-[500px] px-4 md:px-8 py-6 md:py-12 flex flex-col justify-center gap-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold">
            Join the DevSynergy Community
          </h1>
        </div>

        <div className="w-full flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                autoComplete="username"
                className="w-full p-4 md:p-6 text-base md:text-lg text-[#162533] bg-[#e7eef2] focus:bg-white rounded-lg"
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">{errors.username}</span>
              )}
            </div>

            <div className="w-full">
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="name"
                className="w-full p-4 md:p-6 text-base md:text-lg text-[#6384A0] bg-[#e7eef2] focus:bg-white rounded-lg"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">{errors.name}</span>
              )}
            </div>

            <div className="w-full">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                autoComplete="email"
                className="w-full p-4 md:p-6 text-base md:text-lg text-[#6384A0] bg-[#e7eef2] focus:bg-white rounded-lg"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
              )}
            </div>

            <div className="w-full relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full p-4 md:p-6 text-base md:text-lg text-[#6384A0] bg-[#e7eef2] focus:bg-white rounded-lg"
              />
              <div 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 
                  <EyeIcon className="h-5 w-5 text-gray-500" /> : 
                  <EyeClosed className="h-5 w-5 text-gray-500" />
                }
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
              )}
            </div>

            <span className="text-sm md:text-base text-gray-600 mt-1">
              Use 6 or more characters with mix of letters, numbers & symbols
            </span>

            <Button 
              type="submit"
              className="w-full py-4 md:py-6 text-base md:text-lg font-medium mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <div className="flex flex-col w-full text-[#6384A0] text-center">
              <Link 
                to="/login" 
                className="text-base md:text-lg hover:text-blue-700 transition-colors underline cursor-pointer"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>

      
    </AuthLayout>
  )
}

export default Signup