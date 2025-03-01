import PermissionListComponent from "@/components/app/super-admin/permission/list";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
import PageWrapper from "@/components/shared/molecules/page-wrapper";

const PermissionsListPage = () => {
  return (
    <PageWrapper>
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Manage Permission" },
        ]}
      />
      <PermissionListComponent />
    </PageWrapper>
  );
};

export default PermissionsListPage;
