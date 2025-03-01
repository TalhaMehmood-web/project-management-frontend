import GetPermissionByIdComponent from "@/components/app/super-admin/permission/get-permission-by-id";
import React from "react";

const PermissionGetByIdPage = async ({ params }) => {
  const { id } = await params;

  return <GetPermissionByIdComponent id={id} />;
};

export default PermissionGetByIdPage;
