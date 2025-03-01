import AvatarComponent from "@/components/shared/molecules/avatar-component";
import { useChatContext } from "@/context/chat-context";
import { ROLES } from "@/utils/enum";
import clsx from "clsx";
const ChatItem = ({ user, ...props }) => {
  const { selectedChat } = useChatContext();
  const itemBackground =
    selectedChat?.chatId === user?.chatId ? "bg-slate-100" : "bg-tranparent";
  return (
    <div
      {...props}
      className={clsx(
        itemBackground,
        "w-full flex items-start rounded-md shadow-sm cursor-pointer hover:bg-slate-50 transition-all duration-300 ease-in-out transform p-2 border justify-between gap-2"
      )}
    >
      <div>
        <AvatarComponent
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          fallback="CN"
        />
      </div>
      <div className="flex flex-col flex-1 justify-start gap-2">
        <p className="text-xl font-bold">
          {user?.fullName}
          {user?.role === ROLES.SUPER_ADMIN && (
            <span className="text-sm font-light">(Super-Admin)</span>
          )}
          {user?.role === ROLES.ADMIN && (
            <span className="text-sm font-light">(Admin)</span>
          )}
        </p>
        <p className="line-clamp-1 overflow-ellipsis">
          {user?.lastMessage || "Click here to start Conversation"}
        </p>
      </div>
      <div className="  text-slate-400">
        <p>12m</p>
      </div>
    </div>
  );
};

export default ChatItem;
