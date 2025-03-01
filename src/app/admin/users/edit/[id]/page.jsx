import React from "react";
import EditUser from "@/components/app/admin/users/edit";
const Edit = async ({ params }) => {
  const { id } = await params;

  return <EditUser id={id} />;
};

export default Edit;
