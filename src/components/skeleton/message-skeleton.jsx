import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

const MessageSkeleton = ({ index }) => {
  const itemPostiton = index % 2 === 0 ? "justify-start" : "justify-end";
  return (
    <div className={clsx("w-full  flex", itemPostiton)}>
      <Skeleton className="h-12 w-1/3" />
    </div>
  );
};

export default MessageSkeleton;
