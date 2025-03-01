"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchAppRoutes from "@/hooks/useFetchAppRoutes";
import permissionSchema from "@/form-validations/create-permission";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import SelectFieldRenderer from "@/components/shared/ui/select-field-renderer";
import { useMutation } from "@tanstack/react-query";
import { createPermissionAction } from "@/actions/create-permission-action";
import LoadingButton from "@/components/shared/molecules/loading-button";
import useFetchControllerNames from "@/hooks/useFetchControllerNames";
const CreatePermissionForm = () => {
  const { data: routes, isLoading } = useFetchAppRoutes();
  const { data: controllers, isLoading: loadingControllers } =
    useFetchControllerNames();
  const { mutate } = useMutation({
    mutationFn: createPermissionAction,
    onSuccess: () => reset(),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(permissionSchema),
    defaultValues: {
      name: "",
      type: "api",
      endpoint: "",
      method: "",
      pagePath: "",
      controller: "",
    },
  });

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const type = watch("type");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full flex flex-col  "
    >
      <div className="grid  grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name Field */}
        <InputFieldRenderor
          label="Name"
          id="name"
          placeholder="Enter Permission name"
          error={errors.name?.message}
          {...register("name")}
        />

        {/* Type Select Field */}
        <SelectFieldRenderer
          label="Type"
          name="type"
          control={control}
          error={errors.type?.message}
          selectItems={[
            { value: "api", label: "API" },
            { value: "page", label: "Page" },
          ]}
        />

        {/* Conditional Fields */}
        {type === "api" && (
          <>
            <SelectFieldRenderer
              label="Controller"
              name="controller"
              error={errors.controller?.message}
              control={control}
              selectItems={
                loadingControllers
                  ? []
                  : controllers?.map((controller) => ({
                      value: controller,
                      label: controller,
                    }))
              }
            />
            <SelectFieldRenderer
              label="Endpoint"
              name="endpoint"
              error={errors.endpoint?.message}
              control={control}
              selectItems={
                isLoading
                  ? []
                  : routes?.map((route) => ({
                      value: route.path,
                      label: route.path,
                    }))
              }
            />

            <SelectFieldRenderer
              label="Method"
              name="method"
              error={errors.method?.message}
              control={control}
              selectItems={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
                { value: "PATCH", label: "PATCH" },
              ]}
            />
          </>
        )}

        {type === "page" && (
          <InputFieldRenderor
            label="Page Path"
            id="pagePath"
            error={errors.pagePath?.message}
            {...register("pagePath")}
          />
        )}
      </div>
      {/* Submit Button */}
      <div className="w-full flex justify-end">
        <LoadingButton type="submit">Create Permission</LoadingButton>
      </div>
    </form>
  );
};

export default CreatePermissionForm;
