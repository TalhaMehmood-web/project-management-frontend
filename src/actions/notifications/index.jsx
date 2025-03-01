"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/axios";

// ====== API Actions ======
// Fetch Notifications
const fetchNotifications = async ({ page, pageSize }) => {
  const response = await axiosInstance.get(
    `notifications/all?page=${page}&pageSize=${pageSize}`
  );
  return response?.data?.data || {};
};

// Mark Notifications as Read
const markAsReadNotifications = async (notificationIds) => {
  await axiosInstance.patch("notifications/mark-as-read", {
    notificationIds,
  });
};

// Delete Notifications
const deleteNotifications = async (notificationIds) => {
  await axiosInstance.delete("notifications", {
    data: { notificationIds },
  });
};

// ====== React Hooks ======
// Hook for fetching notifications
export const useNotificationQueries = (page, pageSize) => {
  return useQuery({
    queryKey: ["notifications", page, pageSize],
    queryFn: () => fetchNotifications({ page, pageSize }),
    keepPreviousData: true,
  });
};

// Hook for managing notification mutations (mark as read, delete)
export const useNotificationMutations = (
  refetch,
  selectedNotifications,
  setSelectedNotifications
) => {
  const markAsReadMutation = useMutation({
    mutationFn: () => markAsReadNotifications(selectedNotifications),
    onSuccess: () => {
      toast.success("Notifications Read Status Toggled");
      refetch();
      setSelectedNotifications([]);
    },
    onError: () => toast.error("Failed to mark notifications as read."),
  });

  const deleteNotificationsMutation = useMutation({
    mutationFn: () => deleteNotifications(selectedNotifications),
    onSuccess: () => {
      toast.success("Notifications deleted successfully.");
      refetch();
      setSelectedNotifications([]);
    },
    onError: () => toast.error("Failed to delete notifications."),
  });

  return { markAsReadMutation, deleteNotificationsMutation };
};
