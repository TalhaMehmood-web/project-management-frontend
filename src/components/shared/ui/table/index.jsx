"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import TablePagination from "./TablePagination";
import TableHeader from "./TableHeader";
import TableBodyRenderor from "./TableBody";

const RenderTable = ({
  isError,
  data,
  columns,
  isLoading,
  sorting,
  setSorting,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  total,
  hasNextPage,
}) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table className="border">
        <TableHeader table={table} />
        <TableBodyRenderor
          isError={isError}
          isLoading={isLoading}
          columns={columns}
          table={table}
        />
      </Table>
      {!isLoading && !isError && (
        <TablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          hasNextPage={hasNextPage}
          totalPages={total}
        />
      )}
    </div>
  );
};

export default RenderTable;
