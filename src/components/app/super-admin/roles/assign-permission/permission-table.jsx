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
import { useAssignPermissionToRole } from "@/context/assign-permission-to-role-context";

const PermissionsTable = ({
  permissions,
  effectiveStates,
  handlePermissionSelection,
  handleHeaderCheckboxChange,
  allEffectiveChecked,
}) => {
  const { selectedPermissionType } = useAssignPermissionToRole();
  return (
    <div className="border rounded-lg p-4 shadow-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={allEffectiveChecked}
                onCheckedChange={handleHeaderCheckboxChange}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            {selectedPermissionType === "api" ? (
              <>
                <TableHead>Endpoint</TableHead>
                <TableHead>Controller</TableHead>
                <TableHead>Method</TableHead>
              </>
            ) : (
              <TableHead>Page Path</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions?.map((perm) => (
            <TableRow key={perm._id}>
              <TableCell>
                <Checkbox
                  checked={effectiveStates[perm._id]}
                  onCheckedChange={() => handlePermissionSelection(perm._id)}
                />
              </TableCell>
              <TableCell>{perm.name}</TableCell>
              <TableCell>{perm.type}</TableCell>
              {selectedPermissionType === "api" ? (
                <>
                  <TableCell>{perm.endpoint || "-"}</TableCell>
                  <TableCell>{perm.controller || "-"}</TableCell>
                  <TableCell>{perm.method || "-"}</TableCell>
                </>
              ) : (
                <TableCell>{perm.pagePath || "-"}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionsTable;
