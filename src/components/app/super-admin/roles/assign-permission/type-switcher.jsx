import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssignPermissionToRole } from "@/context/assign-permission-to-role-context";
import { Label } from "@/components/ui/label";

export function TypeSwitcher() {
  const { selectedPermissionType, setSelectedPermissionType } =
    useAssignPermissionToRole();
  return (
    <div className="flex flex-col gap-2">
      <Label>Change Permission Type</Label>
      <Select
        value={selectedPermissionType}
        onValueChange={setSelectedPermissionType}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Permission Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Permission Type</SelectLabel>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="page">PAGE</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
