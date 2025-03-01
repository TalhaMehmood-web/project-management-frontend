import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

const NotificationPagination = ({ setPage, pagination }) => {
  return (
    <div className="flex items-center gap-4 ">
      <p className="text-sm text-slate-500 ">
        {pagination?.displayedRange} of {pagination?.totalItems}
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!pagination?.hasPreviousPage}
          className={clsx(
            pagination?.hasPreviousPage
              ? "text-black hover:bg-slate-100 rounded-full"
              : "text-slate-300",
            " p-2"
          )}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagination?.hasNextPage}
          className={clsx(
            pagination?.hasNextPage
              ? "text-black hover:bg-slate-100 rounded-full "
              : "text-slate-300",
            "p-2"
          )}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default NotificationPagination;
