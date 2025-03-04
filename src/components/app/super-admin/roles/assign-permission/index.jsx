"use client";
import React, { useState, useMemo } from "react";
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
import { TypeSwitcher } from "./type-switcher";
import { useAssignPermissionToRole } from "@/context/assign-permission-to-role-context";

const AssignPermissionCard = ({ id }) => {
  // Tracks only the permissions the user has toggled
  const [clickedPermissions, setClickedPermissions] = useState([]);
  const { selectedPermissionType } = useAssignPermissionToRole();
  const {
    data: permissions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllPermissions", selectedPermissionType],
    queryFn: () => fetchPermissions(selectedPermissionType),
  });

  const { data: role, refetch: refetchRolePermissions } = useQuery({
    queryKey: ["getRoleById", id],
    queryFn: () => fetchRoleById(id),
  });

  // Compute effective checked state for each permission once per render.
  // For a default permission: effective state = true if not toggled (i.e. not in clickedPermissions)
  // For a non-default permission: effective state = true only if toggled (i.e. in clickedPermissions)
  const effectiveStates = useMemo(() => {
    const defaultSet = new Set(role?.permissions || []);
    const toggledSet = new Set(clickedPermissions);
    if (!permissions) return {};
    return permissions.reduce((acc, perm) => {
      const isDefault = defaultSet.has(perm._id);
      const isToggled = toggledSet.has(perm._id);
      acc[perm._id] = isDefault ? !isToggled : isToggled;
      return acc;
    }, {});
  }, [role, clickedPermissions, permissions]);

  // Determine if all permissions are effectively checked.
  const allEffectiveChecked = useMemo(() => {
    if (!permissions || permissions.length === 0) return false;
    return permissions.every((perm) => effectiveStates[perm._id]);
  }, [effectiveStates, permissions]);

  // Toggle a single permission by updating clickedPermissions.
  const handlePermissionSelection = (permissionId) => {
    setClickedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Toggle all: if not all are checked, set them to checked; otherwise, uncheck all.
  const handleHeaderCheckboxChange = () => {
    if (!permissions) return;
    if (!allEffectiveChecked) {
      // Select all: For each permission that is not effectively checked,
      // update clickedPermissions accordingly.
      setClickedPermissions((prev) => {
        const toggledSet = new Set(prev);
        permissions.forEach((perm) => {
          const isDefault = role?.permissions.includes(perm._id);
          // If not checked, we want to mark it as checked.
          if (!effectiveStates[perm._id]) {
            // For default permissions, they are normally checked.
            // If they are not effectively checked, they must be toggled off.
            // Remove the toggle (if present) to make them checked.
            if (isDefault && toggledSet.has(perm._id)) {
              toggledSet.delete(perm._id);
            }
            // For non-default permissions, add them to toggledSet.
            if (!isDefault) {
              toggledSet.add(perm._id);
            }
          }
        });
        return Array.from(toggledSet);
      });
    } else {
      // Deselect all: For each permission that is effectively checked,
      // update clickedPermissions so they become unchecked.
      setClickedPermissions((prev) => {
        const toggledSet = new Set(prev);
        permissions.forEach((perm) => {
          const isDefault = role?.permissions.includes(perm._id);
          if (effectiveStates[perm._id]) {
            // For default permissions, add them to toggledSet to uncheck.
            if (isDefault) {
              toggledSet.add(perm._id);
            }
            // For non-default permissions, remove them from toggledSet.
            else {
              toggledSet.delete(perm._id);
            }
          }
        });
        return Array.from(toggledSet);
      });
    }
  };

  // Mutation: Only send the clicked (i.e. toggled) permission IDs.
  const { mutate: assignPermissions, isLoading: isAssigning } = useMutation({
    mutationFn: assignPermissionsApi,
    onSuccess: async () => {
      await refetchRolePermissions();
      setClickedPermissions([]);
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
      <div className="flex items-start gap-4">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Assign Permission
        </h2>
        <p className="bg-green-200/50 rounded-lg py-1 px-3 font-semibold text-sm text-green-800 w-fit">
          {formatRoleName(role?.name).toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <TypeSwitcher />

        <Button
          onClick={handleAssignPermission}
          disabled={isAssigning || !clickedPermissions.length}
          className="hover:bg-transparent hover:text-green-500"
          size="lg"
          variant="success"
        >
          <UserPlus /> Assign To a Role
        </Button>
      </div>
      <PermissionsTable
        permissions={permissions}
        effectiveStates={effectiveStates}
        handlePermissionSelection={handlePermissionSelection}
        handleHeaderCheckboxChange={handleHeaderCheckboxChange}
        allEffectiveChecked={allEffectiveChecked}
      />
    </div>
  );
};

export default AssignPermissionCard;
