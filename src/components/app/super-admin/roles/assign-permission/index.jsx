"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import PermissionsTable from "./permission-table";
import {
  fetchPermissions,
  fetchRoleById,
  assignPermissionsApi,
} from "./queries";
import formatRoleName from "@/utils/formateRoleName";

const AssignPermissionCard = ({ id }) => {
  // This state holds only the permissions the user clicked (toggled)
  const [clickedPermissions, setClickedPermissions] = useState([]);

  // Fetch all available permissions
  const {
    data: permissions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllPermissions"],
    queryFn: fetchPermissions,
  });

  // Fetch the role details (including its default permissions)
  const { data: role, refetch: refetchRolePermissions } = useQuery({
    queryKey: ["getRoleById", id],
    queryFn: () => fetchRoleById(id),
  });

  // Compute the effective state for a permission:
  // If it is default selected, then it should be checked unless toggled;
  // if it’s not default selected, it should be unchecked unless toggled.
  const isEffectiveChecked = (permissionId) => {
    const isDefault = role?.permissions.includes(permissionId);
    const isToggled = clickedPermissions.includes(permissionId);
    return isDefault ? !isToggled : isToggled;
  };

  // When a permission is clicked, toggle its presence in the clickedPermissions state.
  const handlePermissionSelection = (permissionId) => {
    setClickedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Mutation to assign permissions.
  // Note that we send only the clicked permissions.
  const { mutate: assignPermissions, isLoading: isAssigning } = useMutation({
    mutationFn: assignPermissionsApi,
    onSuccess: async () => {
      await refetchRolePermissions();
      // Optionally reset the clickedPermissions state after successful update.
      setClickedPermissions([]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to assign permissions."
      );
    },
  });

  // Submit only the toggled (clicked) permissions to the backend.
  const handleAssignPermission = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        assignPermissions(
          { roleId: id, permissions: clickedPermissions },
          { onSuccess: resolve, onError: reject }
        );
      }),
      {
        loading: "Updating permissions...",
        success: "Permissions updated successfully!",
        error: (err) =>
          err?.response?.data?.message ||
          "An error occurred while updating permissions.",
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading permissions. Please try again.</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center flex-wrap p-2">
        <div className="flex items-start gap-4">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Assign Permission
          </h2>
          <p className="bg-green-200/50 rounded-lg py-1 px-3 font-semibold text-sm text-green-800 w-fit">
            {formatRoleName(role?.name).toUpperCase()}
          </p>
        </div>
        <Button
          onClick={handleAssignPermission}
          disabled={isAssigning}
          className="hover:bg-transparent hover:text-green-500"
          size="lg"
          variant="success"
        >
          <UserPlus /> Assign To a Role
        </Button>
      </div>

      <PermissionsTable
        permissions={permissions}
        isEffectiveChecked={isEffectiveChecked}
        handlePermissionSelection={handlePermissionSelection}
      />
    </div>
  );
};

export default AssignPermissionCard;
