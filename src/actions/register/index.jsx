"use client";
import { useState } from "react";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useRegisterFormAction = (reset) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const registerFormAction = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("user/register", formData);

      if (response.data.status === 200) {
        reset();
        toast.success("User Registered Successfully");
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        router.push("/login");
      }
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Occured");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { registerFormAction, loading };
};

export default useRegisterFormAction;
