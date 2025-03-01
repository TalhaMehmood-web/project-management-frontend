import { headers } from "next/headers";
import FormSectionWrapper from "@/components/shared/molecules/form-section-wrapper";
import PageTitle from "@/components/shared/molecules/page-title";
import CreateProjectForm from "@/forms/create-project-form";

const CreateProject = async () => {
  return (
    <FormSectionWrapper>
      <PageTitle title="Create a Project" />
      <div className="flex flex-1">
        <CreateProjectForm />
      </div>
    </FormSectionWrapper>
  );
};

export default CreateProject;
