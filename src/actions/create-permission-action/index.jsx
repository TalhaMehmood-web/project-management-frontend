"use client";
import axiosInstance from "@/axios";
import { toast } from "sonner";

export const createPermissionAction = async (formData) => {
  return toast.promise(axiosInstance.post("permissions", formData), {
    loading: "Creating permission...",
    success: "Permission created successfully!",
    error: (err) =>
      err?.response?.data?.message ||
      "Failed to create permission. Please try again.",
  });
};
