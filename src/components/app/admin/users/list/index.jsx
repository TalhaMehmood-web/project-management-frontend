"use client";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import RowsOptions from "./rowsOptions";
import PaginatedTable from "@/components/shared/molecules/paginated-table";
import { USERS_API_ENDPOINTS } from "@/lib/api";

const ListAllUsers = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
      },
      {
        accessorKey: "userName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("userName")}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
      },
      {
        accessorKey: "isVerified",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Verified
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>{row.getValue("isVerified") ? "Yes" : "No"}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <RowsOptions row={row?.original} />,
      },
    ],
    []
  );
  const filterFields = [
    {
      id: "fullName",
      name: "fullName",
      type: "text",
      label: "Full Name",
      props: { placeholder: "John Doe" },
    },
    {
      id: "userName",
      name: "userName",
      type: "text",
      label: "User Name",
      props: { placeholder: "john@doe" },
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      props: { placeholder: "john@gmail.com" },
    },
    {
      id: "phone",
      name: "phone",
      type: "tel",
      label: "Phone",
      props: { placeholder: "0302425252" },
    },
  ];

  return (
    <PaginatedTable
      columns={columns}
      filterFields={filterFields}
      endpoint={USERS_API_ENDPOINTS.GET_ALL}
    />
  );
};

export default ListAllUsers;
