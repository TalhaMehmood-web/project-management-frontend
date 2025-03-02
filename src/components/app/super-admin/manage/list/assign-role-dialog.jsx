"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/axios";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { toast } from "sonner";
import { SUPER_ADMIN_ENDPOINTS } from "@/lib/api";
export const fetchRoles = async () => {
  const { data } = await axiosInstance.post(`roles/get-roles`);
  return data?.data?.roles || [];
};

const AssignRoleDialog = ({ open, setOpen, rowUser }) => {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState(rowUser?.role?._id);
  const { data: roles, isLoading } = useQuery({
    queryKey: ["getRoles"],
    queryFn: fetchRoles,
    enabled: open,
  });
  const assignRoleMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.patch("super_admin/assign-role", {
        userId: rowUser?._id,
        selectedRole,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        SUPER_ADMIN_ENDPOINTS.GET_NOT_INDENTIFIED_USERS
      );
      setOpen(false);
    },
  });
  const handleCheckboxChange = (roleId) => {
    setSelectedRole(selectedRole === roleId ? null : roleId);
  };
  const handleAssignRole = () => {
    if (!selectedRole) return;

    toast.promise(assignRoleMutation.mutateAsync(), {
      loading: "Assigning role...",
      success: "Role assigned successfully!",
      error: (error) =>
        error?.response?.data?.message || "Something went wrong!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Available Roles</DialogTitle>
          <DialogDescription>
            Select a role from the checkbox and save changes. You can assign
            only one role to a user.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Role Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles?.map((role) => (
                <TableRow
                  className={clsx(
                    selectedRole === role?._id && "bg-slate-100",
                    "transition-all duration-300 ease-in-out transform"
                  )}
                  key={role._id}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRole === role._id}
                      onCheckedChange={() => handleCheckboxChange(role._id)}
                    />
                  </TableCell>
                  <TableCell>{role.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <DialogFooter>
          <Button
            type="button"
            onClick={handleAssignRole}
            disabled={!selectedRole}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignRoleDialog;
