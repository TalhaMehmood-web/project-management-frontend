"use client";
import PaginatedTable from "@/components/shared/molecules/paginated-table";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ManageAdminRowsOptions from "../../manage/list/rowsOptions";
import ManageListRowsOptions from "./rowsOptions";
const ListRolesComponent = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ManageListRowsOptions row={row?.original} />,
      },
    ],
    []
  );
  const filterFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Full Name",
      props: { placeholder: "Type Role and hit enter" },
    },
  ];

  return (
    <PaginatedTable
      columns={columns}
      filterFields={filterFields}
      endpoint="roles/get-roles"
      dataKey="roles"
    />
  );
};

export default ListRolesComponent;
