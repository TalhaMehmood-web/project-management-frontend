"use client";
import React, { useEffect, useState } from "react";
import { Loader, RotateCcw } from "lucide-react";
import NotificationItem from "./notification-item";
import PageTitle from "@/components/shared/molecules/page-title";
import NotificationPagination from "./notification-pagination";
import Tooltip from "@/components/shared/ui/shad-tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import NotificationButton from "./notification-button";
import { useSocketContext } from "@/context/socket-context";
import { useNotificationQueries } from "@/actions/notifications";
import NotificationActionDropDown from "./action-dropdown";
import { useAuth } from "@/context/auth-context";
// import NotificationTune from "@/assets/audio/notification.mp3";

const NotificatioRenderor = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const { socket, isConnected } = useSocketContext();
  const [realTimeNotifications, setRealTimeNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const { data, error, isLoading, refetch } = useNotificationQueries(
    page,
    pageSize
  );

  const notifications = [
    ...realTimeNotifications,
    ...(data?.notifications || []),
  ];
  const pagination = data?.pagination || {};
  // socket effect
  useEffect(() => {
    if (!isConnected) return;

    const handleNotification = (newNotification) => {
      // if (newNotification) {
      //   const audio = new Audio(NotificationTune);
      //   audio
      //     .play()
      //     .catch((error) => console.warn("Audio play failed:", error));
      setRealTimeNotifications((prev) => [newNotification, ...prev]);
      // }
    };
    socket.emit("join", user?._id);
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, isConnected, user?._id, setRealTimeNotifications]);
  console.log("realTimeNotifications", realTimeNotifications);
  //  Handle individual selection
  const handleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  //  Handle Parent checkbox
  const handleSelectAll = () => {
    if (selectedNotifications?.length === notifications?.length) {
      setSelectedNotifications([]);
    } else {
      const allIds = notifications?.map((n) => n?._id);
      setSelectedNotifications(allIds);
    }
  };

  // Check if all notifications are selected
  const isAllSelected =
    notifications.length > 0 &&
    selectedNotifications.length === notifications.length;

  if (error) {
    return <div className="text-red-500">Failed to load notifications.</div>;
  }

  return (
    <div className="flex-1">
      <PageTitle
        title="Notifications"
        className="p-3 border-b border-b-slate-100"
      />

      {/* Actions & Pagination */}
      {notifications?.length > 0 && (
        <div className="py-2 px-6 w-full flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            {/*  Parent Checkbox */}
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            {/* refresh data */}
            <NotificationButton>
              <Tooltip text="Refresh">
                <RotateCcw
                  size={20}
                  onClick={refetch}
                  className="font-extrabold"
                />
              </Tooltip>
            </NotificationButton>
            {/* actions dropdown */}
            <NotificationActionDropDown
              selectedNotifications={selectedNotifications}
              setSelectedNotifications={setSelectedNotifications}
              refetch={refetch}
            />
          </div>

          <NotificationPagination setPage={setPage} pagination={pagination} />
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex justify-center items-center h-full">
          <Loader className="animate-spin" />
        </div>
      )}

      {/* Notifications List */}
      {notifications?.length > 0 &&
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id + notification?.createdAt}
            {...notification}
            isSelected={selectedNotifications.includes(notification._id)}
            onSelect={() => handleSelectNotification(notification._id)}
          />
        ))}
    </div>
  );
};

export default NotificatioRenderor;
