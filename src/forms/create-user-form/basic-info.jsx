"use client";
import FormStepItemWrapper from "@/components/shared/molecules/form-step-item-wrapper";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import SelectFieldRenderer from "@/components/shared/ui/select-field-renderer";
import { useFormContext } from "react-hook-form";

const CreateUserBasicInfo = () => {
  const { control, setValue, register, watch } = useFormContext();
  return (
    <FormStepItemWrapper className="rounded-2xl border">
      <InputFieldRenderor
        placeholder="John Doe"
        label="Full Name"
        type="text"
        id="fullName"
        {...register("fullName")}
      />
      <InputFieldRenderor
        placeholder="john@gmail.com"
        label="Email Address"
        type="email"
        id="email"
        {...register("email")}
      />
      <InputFieldRenderor
        placeholder="+(92) 302 4197272"
        label="Phone Number"
        type="tel"
        id="phone"
        {...register("phone")}
      />
      <SelectFieldRenderer
        control={control}
        label="User Type"
        name="userType"
        selectItems={[
          {
            value: "client",
            label: "Client",
          },
          {
            value: "teamLead",
            label: "Team Lead",
          },
          {
            value: "teamMember",
            label: "Team Member",
          },
        ]}
        onChange={(value) => setValue("userType", value)}
      />
    </FormStepItemWrapper>
  );
};

export default CreateUserBasicInfo;
