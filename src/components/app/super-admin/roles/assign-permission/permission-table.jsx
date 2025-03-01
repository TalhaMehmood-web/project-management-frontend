"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const PermissionsTable = ({
  permissions,
  selectedPermissions,
  handlePermissionSelection,
}) => (
  <div className="border rounded-lg p-4 shadow-lg overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Endpoint</TableHead>
          <TableHead>Controller</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions?.map((perm) => (
          <TableRow key={perm._id}>
            <TableCell>
              <Checkbox
                checked={selectedPermissions.includes(perm._id)}
                onCheckedChange={() => handlePermissionSelection(perm._id)}
              />
            </TableCell>
            <TableCell>{perm.name}</TableCell>
            <TableCell>{perm.type}</TableCell>
            <TableCell>{perm.endpoint || "-"}</TableCell>
            <TableCell>{perm.controller || "-"}</TableCell>
            <TableCell>{perm.method || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PermissionsTable;
