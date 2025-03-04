"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssignPermissionCard from "../../roles/assign-permission";

const AssignPermissionToUserModal = ({ open, setOpen, rowUser }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AssignPermissionCard id={rowUser?.role?._id} />
      </DialogContent>
    </Dialog>
  );
};

export default AssignPermissionToUserModal;
