"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const useFetchPermissionNames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["permissionNames"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "permissions/get-permission-names"
      );
      return response.data?.data;
    },
  });

  return { data, isLoading, error };
};

export default useFetchPermissionNames;
