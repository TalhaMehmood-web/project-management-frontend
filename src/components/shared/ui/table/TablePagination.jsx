// TablePagination.js
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TablePagination = ({
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  hasNextPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {totalPages}
      </div>

      <div className="space-x-2 flex items-center">
        <div>
          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPageIndex(0);
            }}
          >
            <SelectTrigger className="mr-2">
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Rows per page</SelectLabel>
                <SelectItem value={10}>10</SelectItem>
                <SelectItem value={20}>20</SelectItem>
                <SelectItem value={30}>30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0} // Disable if on first page
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={!hasNextPage} // Disable if no next page
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
