import React, { useState } from 'react';
import AuthLayout from '../../main';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '../../../components/ui/tabs';
import ForgotPassword from '../model/ForgotPassword';
import { useLoginMutation } from '@/store/services/authApi';
// import { useSelector } from 'react-redux';

// import your auth selector or remove if unused
// import { authSelector } from '@/store/slices/authSlice';

const AuthTabs = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = () => {
    setIsError(false);
    setMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setIsError(true);
      setMessage('Please enter email and password.');
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      console.log('Login success:', result);
    } catch (err) {
      console.error('Login error:', err);
      setIsError(true);
      setMessage(err?.data?.message || 'Login failed');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { fullname, username, email, password } = formData;

    if (!fullname || !username || !email || !password) {
      setIsError(true);
      setMessage('Please fill all the fields.');
      return;
    }

    console.log('Signed up with:', formData);
    setIsError(false);
    setMessage('Signup successful! You can now log in.');
  };

  return (
    <AuthLayout>
      <Tabs
        defaultValue="login"
        className="w-full max-w-md mx-auto shadow-lg rounded-lg bg-white"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#e0f0ff] rounded-t-lg">
          <TabsTrigger value="login" className="data-[state=active]:bg-white">Login</TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-white">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="border-none shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-2xl font-semibold text-gray-800">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-left block">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-left block">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter your password"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="login-terms" />
                  <Label htmlFor="login-terms" className="text-sm text-gray-600">
                    Accept terms and conditions
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="text-center pt-2">
                  <ForgotPassword />
                </div>
              </form>
              {isError && (
                <p className="text-sm text-center text-red-600 mt-4 p-2 bg-red-50 rounded">
                  {message}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="border-none shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-2xl font-semibold text-gray-800">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-sm font-medium text-left block">Full Name</Label>
                  <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-left block">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Choose a username"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-left block">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-left block">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Choose a password"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="signup-terms" />
                  <Label htmlFor="signup-terms" className="text-sm text-gray-600">
                    Accept terms and conditions
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" disabled={isLoading}>
                  {isLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </form>
              {isError && (
                <p className="text-sm text-center text-red-600 mt-4 p-2 bg-red-50 rounded">
                  {message}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default AuthTabs;
