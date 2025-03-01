"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const useFetchAppRoutes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["appRoutes"],
    queryFn: async () => {
      const response = await axiosInstance.get("permissions/routes");
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export default useFetchAppRoutes;
