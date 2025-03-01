"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import PermissionsTable from "./permission-table";
import {
  fetchPermissions,
  fetchRoleById,
  assignPermissionsApi,
} from "./queries";

const AssignPermissionCard = ({ id }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // 🚀 Get all permissions
  const {
    data: permissions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllPermissions"],
    queryFn: fetchPermissions,
  });

  // 🚀 Get assigned permissions for the role
  const { data: role, refetch: refetchRolePermissions } = useQuery({
    queryKey: ["getRoleById", id],
    queryFn: () => fetchRoleById(id),
  });

  useEffect(() => {
    if (role?.permissions && permissions) {
      const matchedPermissions = permissions
        .filter((perm) => role?.permissions.includes(perm._id))
        .map((perm) => perm._id);
      setSelectedPermissions(matchedPermissions);
    }
  }, [role?.permissions, permissions]);

  const handlePermissionSelection = (permissionId) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permissionId)
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId]
    );
  };

  // ⚡ Assign permissions mutation
  const { mutate: assignPermissions, isLoading: isAssigning } = useMutation({
    mutationFn: assignPermissionsApi,
    onSuccess: async () => {
      await refetchRolePermissions();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to assign permissions."
      );
    },
  });

  const handleAssignPermission = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        assignPermissions(
          { roleId: id, permissions: selectedPermissions },
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

  if (isLoading) return <div>Loading permissions...</div>;
  if (isError) return <div>Error loading permissions. Please try again.</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between items-center flex-wrap p-2">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Assign Permission
        </h2>
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
      <div>Assigned To : {role?.name}</div>
      <PermissionsTable
        permissions={permissions}
        selectedPermissions={selectedPermissions}
        handlePermissionSelection={handlePermissionSelection}
      />
    </div>
  );
};

export default AssignPermissionCard;
