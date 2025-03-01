"use client";
import PermissionDisplayCard from "./permission-display-card";
import { Button } from "@/components/ui/button";
import { User2Icon, UserPlus } from "lucide-react";
import AssignPermissionToRoleDialog from "./assign-permission-to-role-dialog";
import { useState } from "react";

const GetPermissionByIdComponent = ({ id }) => {
  const [openPermissionRoleDialog, setOpenPermissionRoleDialog] =
    useState(false);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex w-full justify-between items-center flex-wrap p-2 ">
        <h2 className="text-xl font-semibold text-primary mb-4">
          Assign Permission
        </h2>
        <div className="flex items-center flex-wrap gap-3">
          <Button
            onClick={() => setOpenPermissionRoleDialog(true)}
            className="hover:bg-transparent hover:text-green-500  "
            size="lg"
            variant="success"
          >
            <UserPlus /> Assign To a Role
          </Button>
          <Button
            className="hover:bg-blue-500 hover:text-white"
            size="lg"
            variant="link"
          >
            <User2Icon /> Assign to a User
          </Button>
        </div>
      </div>
      <PermissionDisplayCard id={id} />
      <AssignPermissionToRoleDialog
        openPermissionRoleDialog={openPermissionRoleDialog}
        setOpenPermissionRoleDialog={setOpenPermissionRoleDialog}
        id={id}
      />
    </div>
  );
};

export default GetPermissionByIdComponent;
