"use client";
import { useState } from "react";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { ROLES } from "@/utils/enum";

const useLoginFormAction = (reset) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const loginFormAction = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("user/login", formData);

      if (response?.data?.status === 200 && response?.data?.data) {
        toast.success("Logged in Successfully!");
        const user = response.data?.data;
        setUser(user);
        if (!user) {
          throw new Error("User data is missing in the response.");
        }

        setLoading(false);
        reset();
        localStorage.setItem("user", JSON.stringify(user));

        const returnUrl = searchParams.get("returnUrl");

        if (returnUrl) {
          router.push(decodeURIComponent(returnUrl));
          return;
        }

        if (user?.role === ROLES.SUPER_ADMIN) {
          router.push("/super-admin/dashboard");
          return;
        } else {
          router.push("/chats");
        }

        return user;
      } else {
        throw new Error(
          response?.data?.message || "Invalid response structure"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Error Occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loginFormAction, loading };
};

export default useLoginFormAction;
