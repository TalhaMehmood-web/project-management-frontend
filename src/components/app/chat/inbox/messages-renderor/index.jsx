"use client";
import { useRef, useEffect } from "react";
import Message from "./message";
import MessageSkeleton from "@/components/skeleton/message-skeleton";

const MessageRenderor = ({ messages, isMessagesLoading }) => {
  const chatEndRef = useRef(null); // Ref for auto-scrolling
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 border bg-slate-50/20 rounded-md overflow-y-auto max-h-[500px]  p-2">
      {!isMessagesLoading && (
        <div className="flex flex-col gap-4 w-full  flex-1  ">
          {messages?.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
        </div>
      )}
      {isMessagesLoading && (
        <div className="flex flex-col gap-4 w-full  flex-1  ">
          {Array.from({ length: 8 }).map((_, index) => (
            <MessageSkeleton key={index} index={index} />
          ))}
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MessageRenderor;
