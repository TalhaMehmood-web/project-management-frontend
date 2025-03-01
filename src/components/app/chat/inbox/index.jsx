"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ChatSearch from "@/components/shared/molecules/chat-search";
import ChatSpaceRenderor from "@/components/shared/molecules/chat-space-renderor";
import ChatItem from "@/components/shared/ui/chat/chat-item";
import { CHATS_ENDPOINT } from "@/lib/api";
import axiosInstance from "@/axios";
import { useChatContext } from "@/context/chat-context";
import { useRouter } from "next/navigation";
// Function to fetch chat users based on search
const fetchChatUsers = async (searchQuery) => {
  const { data } = await axiosInstance.get(`${CHATS_ENDPOINT.GET_CHAT_USERS}`, {
    params: searchQuery ? { searchQuery } : {},
  });
  return data?.data;
};

const ChatInbox = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedChat } = useChatContext();
  // React Hook Form setup
  const { register, watch } = useForm({
    defaultValues: { search: "" },
  });

  // Watch input changes and debounce API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(watch("search"));
    }, 500); // Debounce input by 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [watch("search")]);

  // Fetch chat users with dynamic search
  const {
    data: chatUsers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chat-users", searchQuery], // Re-fetch when searchQuery changes
    queryFn: () => fetchChatUsers(searchQuery),
  });
  const handleChatItemClicked = (chat) => {
    setSelectedChat(chat);
    router.push(`/chats/inbox?chatId=${chat.chatId}`, { scroll: false });
  };
  return (
    <div className="flex-1 flex p-2 gap-2">
      <div className="flex-[0.5] border p-2 rounded-md">
        {/* Search Input */}
        <ChatSearch
          type="search"
          name="search"
          placeholder="Search Chats"
          {...register("search")} // Bind input to react-hook-form
        />

        {/* Chat List */}
        <div className="flex-1 gap-2 flex flex-col my-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching Chat Users</p>
          ) : chatUsers?.length > 0 ? (
            chatUsers.map((chatUser) => (
              <ChatItem
                onClick={() => handleChatItemClicked(chatUser)}
                key={chatUser?._id}
                user={chatUser}
              />
            ))
          ) : (
            <p>No chats found</p>
          )}
        </div>
      </div>
      <ChatSpaceRenderor />
    </div>
  );
};

export default ChatInbox;
