import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react"; // green tick icon

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVerify = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setVerified(true);
    }
  };

  const handleClose = () => {
    setVerified(false);
    setEmail("");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-blue-600 hover:underline">
          Forgot Password?
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        {!verified ? (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email address to receive a reset link.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="email" className="mb-1 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleVerify}>Verify</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
              <CheckCircle2 className="text-green-500 w-16 h-16" />
              <h3 className="text-lg font-semibold text-green-600">
                Verify your Email
              </h3>
              <p className="text-sm text-gray-600">
                Link shared to the email: <br />
                <span className="font-medium text-black">{email}</span>
              </p>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
