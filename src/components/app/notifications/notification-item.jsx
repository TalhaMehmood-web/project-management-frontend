import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import formatDate from "./date-formate";

const NotificationItem = ({ isSelected, onSelect, ...props }) => {
  return (
    <div
      className={clsx(
        props?.isRead ? "font-normal" : "font-extrabold",
        "flex w-full justify-between border-b transition-all duration-300 ease-in-out transform hover:shadow-custom-dark cursor-pointer border-slate-100 py-3 px-6"
      )}
    >
      <div className="flex items-center flex-[0.3] gap-4">
        {/* ✅ Individual Checkbox */}
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
        <p>{props?.sender?.fullName}</p>
      </div>

      <div className="flex items-start justify-start flex-1 gap-4">
        <p>
          {props?.title} - {props?.message}
        </p>
      </div>

      <div>
        <p className="text-xs">{formatDate(props?.createdAt)}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
