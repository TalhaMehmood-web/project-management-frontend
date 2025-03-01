"use client";
import React from "react";
import { useForm } from "react-hook-form";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import LoadingButton from "@/components/shared/molecules/loading-button";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";

const roleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const CreateRoleForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roleSchema),
    defaultValues: {
      name: "",
    },
  });

  const createRoleMutation = (data) => {
    return toast.promise(axiosInstance.post("roles/create-role", data), {
      loading: "Creating Role...",
      success: "Role created successfully!",
      error: (err) =>
        err?.response?.data?.message ||
        "Failed to create Role. Please try again.",
    });
  };
  const { mutate } = useMutation({
    mutationFn: createRoleMutation,
    onSuccess: () => reset(),
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full flex flex-col  "
    >
      <div className="grid  grid-cols-1 gap-2 md:grid-cols-2">
        {/* Name Field */}
        <InputFieldRenderor
          label="Name"
          id="name"
          placeholder="Enter role name"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>
      {/* Submit Button */}
      <div className="w-full flex justify-start">
        <LoadingButton type="submit">Create Role</LoadingButton>
      </div>
    </form>
  );
};

export default CreateRoleForm;
