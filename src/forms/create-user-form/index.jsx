"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import Next.js navigation hooks
import MultiStepFormbar from "./multi-step-form-bar";
import CreateUserBasicInfo from "./basic-info";
import { FormProvider, useForm } from "react-hook-form";
import { createUserValidationSchema } from "@/form-validations/create-user-form-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormLocalStorage from "@/hooks/useFormLocalStorage";
import RoleSpecificInfo from "./role-specific-info";
import PermissionsAndAccess from "./permissions-and-access";

const steps = [
  { title: "Basic Info", key: "basic-info" },
  { title: "Role-Specific Info", key: "role-specific-info" },
  { title: "Permissions & Access", key: "permissions" },
  { title: "Review & Submit", key: "review" },
];

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  userType: "",
  assignedProjects: [],
  department: "",
  seniorityLevel: "",
  companyName: "",
  contactPerson: "",
  industryType: "",
  contractStartDate: "",
  contractEndDate: "",
  assignedTeam: "",
  roleInProject: "",
  skills: [],
  availability: "",
  userStatus: "Active",
  accessLevel: "Read-only",
  notificationPreferences: false,
};

const CreateUserForm = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get step from URL or default to step 0
  const currentStepFromURL = steps.findIndex(
    (step) => step.key === searchParams.get("step")
  );
  const [currentStep, setCurrentStep] = useState(
    currentStepFromURL >= 0 ? currentStepFromURL : 0
  );

  const methods = useForm({
    resolver: yupResolver(createUserValidationSchema),
    defaultValues,
  });
  const { reset, handleSubmit, setValue, watch } = methods;

  // Use custom hook for local storage form management
  useFormLocalStorage(watch, setValue, "createUserForm");

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);

  // Function to update step in state and URL
  const updateStep = (newStep) => {
    if (newStep >= 0 && newStep < steps.length) {
      setCurrentStep(newStep);
      router.push(`?step=${steps[newStep].key}`, { scroll: false }); // Update URL without reloading
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 flex flex-1 flex-col"
      >
        <MultiStepFormbar steps={steps} currentStep={currentStep} />

        {/* Render step content dynamically */}
        <div className="mt-6 flex flex-1">
          {currentStep === 0 && <CreateUserBasicInfo />}
          {currentStep === 1 && <RoleSpecificInfo />}
          {currentStep === 2 && (
            <p>
              <PermissionsAndAccess />
            </p>
          )}
          {currentStep === 3 && <p>Review & Submit</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => updateStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => updateStep(currentStep + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateUserForm;
