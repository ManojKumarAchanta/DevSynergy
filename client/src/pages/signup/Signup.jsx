import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import AuthLayout from "../AuthLayout";

const Signup = ({
  handleSubmit,
  handleChange,
  handleFocus,
  isLoading,
  isError,
  message,
}) => {
  return (
    <AuthLayout>
      <Card className="w-full max-w-[50%] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
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
                placeholder="username"
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
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "SignUp"}
            </Button>
          </form>

          {isError && (
            <p className="text-sm text-center text-red-600 mt-4">{message}</p>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground mx-auto">
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default Signup; 

