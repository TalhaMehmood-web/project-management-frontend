import { redirect } from "next/navigation";

const Users = () => {
  redirect("/admin/users/list");
};

export default Users;
