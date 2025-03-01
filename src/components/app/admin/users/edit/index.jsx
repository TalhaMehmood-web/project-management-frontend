"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";
import FormSectionWrapper from "@/components/shared/molecules/form-section-wrapper";
import PageTitle from "@/components/shared/molecules/page-title";
import EditUserForm from "@/forms/create-user-form";
const fetchUser = async (id) => {
  const response = await axiosInstance.get(`/user/${id}`);

  return response.data?.data;
};

const EditUser = ({ id }) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id, // Prevents fetching when id is undefined
    staleTime: "Infinity",
  });

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <FormSectionWrapper>
      <PageTitle title="Edit User" />
      <div className="flex flex-1">
        <EditUserForm data={user} />
      </div>
    </FormSectionWrapper>
  );
};

export default EditUser;
