import AssignPermissionCard from "@/components/app/super-admin/roles/assign-permission";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
import PageWrapper from "@/components/shared/molecules/page-wrapper";
import React from "react";

const AssignPermission = async ({ params }) => {
  const { id } = await params;
  return (
    <PageWrapper>
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Manage Roles", href: "/super-admin/role/list" },
          { title: "Assign Permission" },
        ]}
      />
      <AssignPermissionCard id={id} />
    </PageWrapper>
  );
};

export default AssignPermission;
