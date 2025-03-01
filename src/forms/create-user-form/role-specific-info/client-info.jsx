import DatePicker from "@/components/shared/molecules/date-picker";
import FormStepItemWrapper from "@/components/shared/molecules/form-step-item-wrapper";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import SelectFieldRenderer from "@/components/shared/ui/select-field-renderer";
import React from "react";
import { useFormContext } from "react-hook-form";

const industryTypes = [
  { value: "technology_software", label: "Technology & Software" },
  { value: "finance_banking", label: "Finance & Banking" },
  { value: "healthcare_pharma", label: "Healthcare & Pharmaceuticals" },
  { value: "education_elearning", label: "Education & E-Learning" },
  { value: "retail_ecommerce", label: "Retail & E-Commerce" },
  { value: "manufacturing_industrial", label: "Manufacturing & Industrial" },
  { value: "media_entertainment", label: "Media & Entertainment" },
  { value: "construction_real_estate", label: "Construction & Real Estate" },
  { value: "transportation_logistics", label: "Transportation & Logistics" },
  { value: "marketing_advertising", label: "Marketing & Advertising" },
  { value: "government_public_sector", label: "Government & Public Sector" },
  { value: "hospitality_tourism", label: "Hospitality & Tourism" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "energy_utilities", label: "Energy & Utilities" },
  { value: "non_profit_ngos", label: "Non-Profit & NGOs" },
  { value: "legal_consulting", label: "Legal & Consulting" },
  { value: "automotive", label: "Automotive" },
  {
    value: "agriculture_food_processing",
    label: "Agriculture & Food Processing",
  },
  { value: "other", label: "Other" },
];

const ClientInfo = () => {
  const { control, setValue, register, watch } = useFormContext();
  return (
    <FormStepItemWrapper className="rounded-2xl border">
      <InputFieldRenderor
        placeholder="Tesla , Meta ,Reliance etc..."
        label="Company Name"
        id="companyName"
        {...register("companyName")}
      />
      <DatePicker
        onChange={(value) => setValue("contractStartDate", value)}
        label="Contract Start Date"
        value={watch("contractStartDate")}
      />
      <DatePicker
        onChange={(value) => setValue("contractEndDate", value)}
        label="Contract End Date"
        value={watch("contractEndDate")}
      />

      <SelectFieldRenderer
        control={control}
        name="industryType"
        selectItems={industryTypes}
        label="Industry Type"
        value={watch("industryType")}
      />
    </FormStepItemWrapper>
  );
};

export default ClientInfo;
