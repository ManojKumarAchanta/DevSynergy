import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import ForgotPassword from "./ForgotPassword";

const AuthTabs = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = () => {
    setIsError(false);
    setMessage("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (formData.email && formData.password) {
        console.log("Logged in with", formData);
      } else {
        setIsError(true);
        setMessage("Please enter both email and password.");
      }
    }, 1000);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (
        formData.fullname &&
        formData.username &&
        formData.email &&
        formData.password
      ) {
        console.log("Signed up with", formData);
      } else {
        setIsError(true);
        setMessage("Please fill all the fields.");
      }
    }, 1000);
  };

  return (
    <AuthLayout>
      <Tabs defaultValue="login" className="w-full max-w-md shadow-lg p-6 rounded-md">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#e0f0ff]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="login-terms" />
                  <Label htmlFor="login-terms">Accept terms and conditions</Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center">
                    <ForgotPassword />
                </div>
              </form>

              {isError && (
                <p className="text-sm text-center text-red-600 mt-4">{message}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
            </CardHeader>
            <CardContent >
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">User Name</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Username"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="signup-terms" />
                  <Label htmlFor="signup-terms">Accept terms and conditions</Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>

              {isError && (
                <p className="text-sm text-center text-red-600 mt-4">{message}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default AuthTabs;
