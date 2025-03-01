import ListRolesComponent from "@/components/app/super-admin/roles/list";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
import PageWrapper from "@/components/shared/molecules/page-wrapper";
import React from "react";

const ListRoles = () => {
  return (
    <PageWrapper>
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "List Roles" },
        ]}
      />
      <ListRolesComponent />
    </PageWrapper>
  );
};

export default ListRoles;
