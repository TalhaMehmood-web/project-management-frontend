import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Loader } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
const TableBodyRenderor = ({ isLoading, columns, table, isError }) => {
  return (
    <TableBody className>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center">
            <div className="flex justify-center items-center h-24">
              <Loader className="animate-spin" />
            </div>
          </TableCell>
        </TableRow>
      ) : isError ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center">
            <div className="flex justify-center items-center h-24">
              No Result Found.
            </div>
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyRenderor;
