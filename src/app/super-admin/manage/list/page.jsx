import PageWrapper from "@/components/shared/molecules/page-wrapper";
import ListAllAdmins from "@/components/app/super-admin/manage/list";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
const ManageAdmins = () => {
  return (
    <PageWrapper className="  ">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Manage Admins" },
        ]}
      />
      <ListAllAdmins />
    </PageWrapper>
  );
};

export default ManageAdmins;
