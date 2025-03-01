import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const usePaginatedTableData = (endpoint, initialFilters = {}) => {
  const [filters, setFilters] = useState();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState([]);

  const fetchData = async ({ queryKey }) => {
    const [, filters, pageIndex, pageSize] = queryKey;
    const response = await axiosInstance.post(endpoint, {
      filters,
      page: pageIndex,
      pageSize,
    });
    console.log("res", response.data);
    return response.data?.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [endpoint, filters, pageIndex, pageSize],
    queryFn: fetchData,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    filters,
    setFilters,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
  };
};

export default usePaginatedTableData;
