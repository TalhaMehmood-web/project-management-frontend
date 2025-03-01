"use client";
import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import LoadingButton from "@/components/shared/molecules/loading-button";

const fetchRoles = async () => {
  const { data } = await axiosInstance.get("roles/get-roles");
  return data?.data;
};

const AssignPermissionToRoleDialog = ({
  openPermissionRoleDialog,
  setOpenPermissionRoleDialog,
  id,
}) => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const {
    data: roles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getRoles"],
    queryFn: fetchRoles,
    enabled: openPermissionRoleDialog,
  });

  const allRoleIds = useMemo(
    () => (roles ? roles.map((role) => role._id) : []),
    [roles]
  );

  const isAllSelected = selectedRoles.length === allRoleIds.length;

  const handleSelectAll = () => {
    setSelectedRoles(isAllSelected ? [] : allRoleIds);
  };

  const handleRoleSelection = (roleId) => {
    setSelectedRoles((prevSelected) =>
      prevSelected.includes(roleId)
        ? prevSelected.filter((id) => id !== roleId)
        : [...prevSelected, roleId]
    );
  };
  const assignRolesMutation = useMutation({
    mutationFn: async ({ permissionId, roles }) => {
      return await toast.promise(
        axiosInstance.put(
          `permissions/assign-permission-to-role/${permissionId}`,
          {
            roles,
          }
        ),
        {
          loading: "Assigning roles to permission... ⏳",
          success: "✅ Roles assigned successfully!",
          error: (err) =>
            `❌ Failed to assign roles: ${
              err?.response?.data?.message || err.message
            }`,
        }
      );
    },
    onSuccess: () => {
      setOpenPermissionRoleDialog(false);
      setSelectedRoles([]);
    },
  });
  const handleSaveChanges = async () => {
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }
    assignRolesMutation.mutate({ permissionId: id, roles: selectedRoles });
  };

  return (
    <Dialog
      open={openPermissionRoleDialog}
      onOpenChange={setOpenPermissionRoleDialog}
    >
      <DialogContent className="sm:max-w-2xl border border-black">
        <DialogHeader>
          <DialogTitle>Select Roles</DialogTitle>
          <DialogDescription>
            Select roles and click on save changes when you are done 😊
          </DialogDescription>
        </DialogHeader>

        {/* 🌟 Roles Table with Checkboxes */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Role Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles?.map((role) => (
                <TableRow key={role._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRoles.includes(role._id)}
                      onCheckedChange={() => handleRoleSelection(role._id)}
                    />
                  </TableCell>
                  <TableCell>{role.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <LoadingButton onClick={handleSaveChanges}>
            Save changes
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPermissionToRoleDialog;
