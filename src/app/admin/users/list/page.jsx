import ListAllUsers from "@/components/app/admin/users/list";
import PageTitle from "@/components/shared/molecules/page-title";
import PageWrapper from "@/components/shared/molecules/page-wrapper";

const Users = () => {
  return (
    <PageWrapper className="flex-1 ">
      <PageTitle title="Manage Users" />
      <ListAllUsers />
    </PageWrapper>
  );
};

export default Users;
