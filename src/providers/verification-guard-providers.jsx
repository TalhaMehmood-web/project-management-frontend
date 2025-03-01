"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const VerificationGuard = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user?.isVerified) {
      router.replace("/chats/inbox");
    }
  }, [user, router]);

  // Render children only if user is verified
  if (!user?.isVerified) return null;

  return <>{children}</>;
};

export default VerificationGuard;
