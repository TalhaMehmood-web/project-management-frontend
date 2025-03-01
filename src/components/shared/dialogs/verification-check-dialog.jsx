"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { useState, useEffect } from "react";

const VerificationCheckDialog = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user && user?.isVerified === false) {
      setIsOpen(true);
    }
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Verification Required
          </DialogTitle>
          <DialogDescription>
            Your account is not verified. Please complete the verification
            process to access all features. <br />
            You have given access to our chat support with super Admin . Text us
            and we will verifiy you account
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationCheckDialog;
