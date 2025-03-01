import { useAuth } from "@/context/auth-context";
import React from "react";
import AvatarComponent from "@/components/shared/molecules/avatar-component";
import getInitials from "@/utils/getInitials";
import clsx from "clsx";

const Message = ({ message }) => {
  const { user } = useAuth();
  const isOwnMessage = message?.senderId === user?._id;
  const messagePosition = isOwnMessage ? "justify-end" : "justify-start";
  const messageColor = isOwnMessage
    ? "bg-blue-500 text-white"
    : " bg-gray-100 text-black";
  return (
    <div className={clsx(messagePosition, "flex w-full items-start gap-2")}>
      <AvatarComponent
        fallback={
          user?._id === message?.senderId
            ? "You"
            : getInitials(message?.sender?.fullName)
        }
      />
      <div
        className={clsx(
          messageColor,
          "py-2 px-4 my-1 min-w-xs  rounded-lg max-w-sm "
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
