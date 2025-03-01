import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, KeyRound, Eye, UserX, Edit } from "lucide-react";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { USER_PERMISSION_API } from "@/lib/api";
import Link from "next/link";

const ManageAdminRowsOptions = ({ row }) => {
  const queryClient = useQueryClient();

  const handleUserAction = (actionType, userId, successMessage) => {
    const apiCall = axiosInstance.put(
      `${USER_PERMISSION_API[actionType]}/${userId}`
    );

    toast.promise(apiCall, {
      loading: "Processing...",
      success: () => {
        queryClient.invalidateQueries("users");
        return successMessage;
      },
      error: (error) =>
        error?.response?.data?.message || "Something went wrong!",
    });
  };

  const handleVerifyUser = () =>
    handleUserAction(
      "VERIFY_USER",
      row?._id,
      `${row.fullName} Verified Successfully!`
    );
  const handleBlockUser = () =>
    handleUserAction(
      "BLOCK_USER",
      row?._id,
      `${row.fullName} Blocked Successfully!`
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {!row?.isVerified && (
          <DropdownMenuItem onClick={handleVerifyUser}>
            <KeyRound /> Verify
          </DropdownMenuItem>
        )}
        {row?.isVerified && (
          <DropdownMenuItem onClick={handleBlockUser}>
            <UserX /> Block
          </DropdownMenuItem>
        )}
        {row?.isVerified && (
          <DropdownMenuItem onClick={handleBlockUser}>
            <UserX /> Assign Role
          </DropdownMenuItem>
        )}
        <Link href={`/admin/users/overview/${row?._id}`}>
          <DropdownMenuItem>
            <Eye /> View
          </DropdownMenuItem>
        </Link>
        <Link href={`/admin/users/edit/${row?._id}`}>
          <DropdownMenuItem>
            <Edit /> Edit
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManageAdminRowsOptions;
