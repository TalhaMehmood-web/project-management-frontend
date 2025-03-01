"use client";
import { useNotificationMutations } from "@/actions/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, BookmarkCheckIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

const NotificationActionDropDown = ({
  selectedNotifications,
  setSelectedNotifications,
  refetch,
}) => {
  const { markAsReadMutation, deleteNotificationsMutation } =
    useNotificationMutations(
      refetch,
      selectedNotifications,
      setSelectedNotifications
    );

  const handleOptionClicked = () => {
    if (selectedNotifications?.length === 0) {
      toast.warning(
        "Please select atleast on Notification to perform any action",
        {
          position: "bottom-right",
          duration: 2000,
        }
      );
      return;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={selectedNotifications?.length === 0}
        asChild
        onClick={handleOptionClicked}
      >
        <div className="hover:bg-slate-100 p-2 rounded-full cursor-pointer">
          <EllipsisVertical size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => markAsReadMutation.mutate()}>
          <BookmarkCheckIcon /> Toggle Read Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteNotificationsMutation.mutate()}>
          <Trash2Icon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationActionDropDown;
