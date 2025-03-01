// TableHeader.js
"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

const TableHeader = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className="bg-slate-100" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell key={header.id} className="min-w-[150px]">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </thead>
  );
};

export default TableHeader;
