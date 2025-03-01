"use client";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useChatContext } from "@/context/chat-context";
import { useSocketContext } from "@/context/socket-context";
import { SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMessages } from "@/hooks/useMessages";
import MessageRenderor from "@/components/app/chat/inbox/messages-renderor";

const ChatSpaceRenderor = () => {
  const { selectedChat } = useChatContext();
  const { socket, isConnected } = useSocketContext();
  const { data: previousMessages, isLoading } = useMessages(
    selectedChat?.chatId
  );

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (previousMessages) {
      setMessages(previousMessages);
    }
  }, [previousMessages]);

  useEffect(() => {
    if (!isConnected || !selectedChat?.chatId) return;

    socket.emit("joinRoom", selectedChat?.chatId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.emit("leaveRoom", selectedChat?.chatId);
      socket.off("receiveMessage");
    };
  }, [isConnected, socket, selectedChat]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: user?._id,
      chatId: selectedChat?.chatId,
      content: message.trim(),
    };

    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="flex flex-1 border flex-col gap-2 p-2 rounded-md justify-between  ">
      <div className="h-16 border rounded-md">{selectedChat?.chatId}</div>

      {/* Chat Messages */}
      <MessageRenderor messages={messages} isMessagesLoading={isLoading} />

      {/* Message Input */}
      <div className="w-full flex items-center gap-3 ">
        <Input
          placeholder="Type message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendIcon
          className="cursor-pointer text-blue-500 hover:text-blue-400 transition-all duration-300 ease-in-out transform"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatSpaceRenderor;
