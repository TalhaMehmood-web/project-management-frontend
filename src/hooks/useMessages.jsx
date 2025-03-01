import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const fetchMessages = async (chatId) => {
  if (!chatId) throw new Error("Chat ID is required");
  const { data } = await axiosInstance.get(`messages/${chatId}`);
  return data?.data;
};

export const useMessages = (chatId) => {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId),
    enabled: !!chatId, // Only run query if chatId exists
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
