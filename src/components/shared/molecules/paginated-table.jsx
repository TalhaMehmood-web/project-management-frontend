"use client";

import Table from "@/components/shared/ui/table";
import Filters from "./filters";
import usePaginatedTableData from "@/hooks/usePaginatedTableData";

const PaginatedTable = ({ endpoint, columns, filterFields, dataKey }) => {
  const {
    data,
    isLoading,
    isError,
    filters,
    setFilters,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
  } = usePaginatedTableData(endpoint);

  return (
    <div className="flex-1">
      {filterFields?.length > 0 && !isLoading && !isError && (
        <Filters
          fields={filterFields}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <Table
        isError={isError}
        data={data?.[dataKey] || []}
        columns={columns || []}
        isLoading={isLoading}
        sorting={sorting}
        setSorting={setSorting}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        total={data?.totalPages}
        hasNextPage={data?.hasNextPage}
      />
    </div>
  );
};

export default PaginatedTable;
