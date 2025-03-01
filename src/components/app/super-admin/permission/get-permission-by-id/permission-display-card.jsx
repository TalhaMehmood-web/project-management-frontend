"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getPermissionById = async (id) => {
  const { data } = await axiosInstance.get(`/permissions/get-by-id/${id}`);
  return data?.data;
};
const PermissionDisplayCard = ({ id }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPermissionById", id],
    queryFn: () => getPermissionById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );
  }

  if (isError) {
    toast.error(`Error: ${error?.response?.data?.message || error.message}`);
    return (
      <div className="text-red-500">Failed to load permission details.</div>
    );
  }
  return (
    <Card>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{data?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Type</TableCell>
              <TableCell>{data?.type?.toUpperCase()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Endpoint</TableCell>
              <TableCell>{data?.endpoint}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Method</TableCell>
              <TableCell>{data?.method}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Controller</TableCell>
              <TableCell>{data?.controller}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PermissionDisplayCard;
