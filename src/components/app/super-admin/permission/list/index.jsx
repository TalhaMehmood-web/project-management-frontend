"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import axiosInstance from "@/axios";
import { toast } from "sonner";
import PaginatedTable from "@/components/shared/molecules/paginated-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ManagePermissionRowOptions from "./rowOptions";

const getControllerNames = async () => {
  try {
    const response = await axiosInstance.get(
      "permissions/get-controller-file-names"
    );
    return response.data.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to fetch controller file names"
    );
    throw new Error("Error fetching controller names");
  }
};
export const getRoleNames = async () => {
  const response = await axiosInstance.get("roles/get-role-names");
  return response.data.data;
};
const PermissionListComponent = () => {
  const {
    data: controllers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["controllers-names"],
    queryFn: getControllerNames,
  });
  const { data: rolesNames } = useQuery({
    queryKey: ["roles-names"],
    queryFn: getRoleNames,
  });

  const columns = useMemo(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) =>
      //         table.toggleAllPageRowsSelected(!!value)
      //       }
      //       aria-label="Select all"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => {
      //         row.toggleSelected(!!value);
      //         if (value) {
      //           console.log("Selected row ID:", row.original._id);
      //         }
      //       }}
      //       aria-label="Select row"
      //     />
      //   ),
      // },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Permission Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("type").toUpperCase()}</div>,
      },
      {
        accessorKey: "endpoint",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Endpoint
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("endpoint")}</div>,
      },
      {
        accessorKey: "method",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Method
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("method")}</div>,
      },
      {
        accessorKey: "controller",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Controller
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("controller")}</div>,
      },

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ManagePermissionRowOptions row={row?.original} />,
      },
    ],
    []
  );
  const filterFields = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Permission Name",
      props: { placeholder: "Fetch Chat Users .." },
    },
    {
      id: "controller",
      name: "controller",
      type: "select",
      label: "Controller",
      props: { placeholder: "User , Notification etc.." },
      options:
        controllers?.map((controller) => ({
          label: controller,
          value: controller,
        })) || [],
    },
    {
      id: "type",
      name: "type",
      type: "select",
      label: "Type",
      options: [
        {
          label: "API",
          value: "api",
        },
        {
          label: "Page",
          value: "page",
        },
      ],
    },
  ];
  return (
    <PaginatedTable
      endpoint="permissions/get-all-permissions"
      columns={columns || []}
      filterFields={filterFields || []}
      dataKey="permissions"
    />
  );
};

export default PermissionListComponent;
