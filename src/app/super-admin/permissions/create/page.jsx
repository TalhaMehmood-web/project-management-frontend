import PageWrapper from "@/components/shared/molecules/page-wrapper";
import CreatePermissionForm from "@/forms/create-permission-form";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
import React from "react";

const PermissionPage = () => {
  return (
    <PageWrapper>
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Manage Permission" },
        ]}
      />
      <CreatePermissionForm />
    </PageWrapper>
  );
};

export default PermissionPage;
