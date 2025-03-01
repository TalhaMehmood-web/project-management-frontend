import PageWrapper from "@/components/shared/molecules/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/molecules/page-breadcrumb";
import CreateRoleForm from "@/forms/create-role-form";
const CreateRole = () => {
  return (
    <PageWrapper>
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Manage Roles" },
        ]}
      />
      <CreateRoleForm />
    </PageWrapper>
  );
};

export default CreateRole;
