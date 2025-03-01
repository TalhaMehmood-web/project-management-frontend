"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const useFetchControllerNames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["controller-Names"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "permissions/get-controller-file-names"
      );
      return response.data?.data;
    },
  });

  return { data, isLoading, error };
};

export default useFetchControllerNames;
