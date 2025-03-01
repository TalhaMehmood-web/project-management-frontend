import FormStepItemWrapper from "@/components/shared/molecules/form-step-item-wrapper";
import React from "react";
import { useFormContext } from "react-hook-form";

const TeamMemberInfo = () => {
  const { register, setValue, control } = useFormContext();
  return (
    <FormStepItemWrapper className="rounded-2xl border ">
      TeamMemberInfo
    </FormStepItemWrapper>
  );
};

export default TeamMemberInfo;
