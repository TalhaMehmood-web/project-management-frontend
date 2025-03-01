import FormSectionWrapper from "@/components/shared/molecules/form-section-wrapper";
import PageTitle from "@/components/shared/molecules/page-title";
import CreateUserForm from "@/forms/create-user-form";
import React from "react";

const CreateUser = () => {
  return (
    <FormSectionWrapper>
      <PageTitle title="Create User" />
      <div className="flex flex-1">
        <CreateUserForm />
      </div>
    </FormSectionWrapper>
  );
};

export default CreateUser;
