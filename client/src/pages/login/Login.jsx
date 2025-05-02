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
import AuthLayout from "../AuthLayout"; // Adjust path if needed

const Login = ({
  handleSubmit,
  handleChange,
  handleFocus,
  isLoading,
  isError,
  message,
}) => {
  return (
    <AuthLayout>
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
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
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {isError && (
            <p className="text-sm text-center text-red-600 mt-4">{message}</p>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground mx-auto">
          {/* Optional Footer Content */}
        </CardFooter>
      </Card>
    </AuthLayout>
  );
};

export default Login; 

