"use client";
import { createContext, useContext, useState } from "react";

const AssignPermissionToRoleContext = createContext();

export const AssignPermissionToRoleProvider = ({ children }) => {
  const [selectedPermissionType, setSelectedPermissionType] = useState("api");

  return (
    <AssignPermissionToRoleContext.Provider
      value={{ selectedPermissionType, setSelectedPermissionType }}
    >
      {children}
    </AssignPermissionToRoleContext.Provider>
  );
};

export const useAssignPermissionToRole = () => {
  return useContext(AssignPermissionToRoleContext);
};
