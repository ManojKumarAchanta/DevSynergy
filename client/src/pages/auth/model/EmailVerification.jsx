import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerification = ({ isOpen, onClose, email }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimer(30);
      setCanResend(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    console.log('Resending verification email to:', email);
    setTimer(30);
    setCanResend(false);
  };

  const handleClose = () => {
    onClose();
    navigate('/profile');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Verify Your Email</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
          <div className="relative">
            <Mail className="text-blue-500 w-16 h-16" />
            <CheckCircle2 className="text-green-500 w-8 h-8 absolute -bottom-2 -right-2" />
          </div>
          <h3 className="text-lg font-semibold text-blue-600">
            Check your inbox!
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              We've sent a verification link to: <br />
              <span className="font-medium text-black">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Please click the link in the email to verify your account.
              The link will expire in 24 hours.
            </p>
          </div>
          <div className="space-y-2 w-full">
            <Button
              variant="outline"
              className="w-full cursor-pointer hover:bg-gray-100"
              onClick={handleClose}
            >
              Close
            </Button>
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`${
                  canResend ? 'text-blue-600 hover:underline' : 'text-gray-400'
                } cursor-pointer`}
              >
                {canResend
                  ? 'click here to resend'
                  : `wait ${timer}s to resend`}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerification;
