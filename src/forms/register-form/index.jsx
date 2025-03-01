"use client";
import FormStepItemWrapper from "@/components/shared/molecules/form-step-item-wrapper";
import formFields from "./form-fields";
import PageTitle from "@/components/shared/molecules/page-title";
import { FormProvider, useForm } from "react-hook-form";
import InputFieldRenderor from "@/components/shared/ui/input-field-renderer";
import PasswordEye from "@/components/shared/molecules/password-eye";
import Link from "next/link";
import Image from "next/image";
import RegisterIllustration from "@/assets/login.jpg";
import RegisterValidationSchema from "@/form-validations/register-form-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@/components/shared/molecules/form-helper-text";
import useRegisterFormAction from "@/actions/register";
import LoadingButton from "@/components/shared/molecules/loading-button";

const RegiserForm = () => {
  const methods = useForm({
    resolver: yupResolver(RegisterValidationSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;
  const { email } = watch();

  const { registerFormAction, loading } = useRegisterFormAction(reset);

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
        return (
          <InputFieldRenderor
            key={field.id}
            name={field.name}
            label={field.label}
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={errors[field.name] ? errors[field.name].message : ""}
          />
        );
      case "password":
        return (
          <PasswordEye
            key={field.id}
            name={field.name}
            label={field.label}
            id={field.id}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.name] ? errors[field.name].message : ""}
          />
        );
      case "checkbox":
        return (
          <div key={field.id} className="mb-4 flex  gap-2 flex-col ">
            <div>
              <input
                id={field.id}
                type="checkbox"
                {...register(field.name)}
                className="mr-2"
              />
              <label htmlFor={field.id} className="text-sm">
                {field.label}
              </label>
            </div>
            {errors.terms && <FormHelperText message={errors.terms.message} />}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormStepItemWrapper className="flex-1 lg:flex-row flex-col lg:gap-0 gap-10 ">
      <div className="flex flex-col gap-2">
        <PageTitle title="Register" />
        <Link href="/login" className="text-sm text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
        <Image
          src={RegisterIllustration}
          alt="register-image"
          width={500}
          height={500}
          className="flex-1 object-cover lg:block hidden"
        />
      </div>
      <FormProvider {...methods}>
        <form
          className="flex-1 grid grid-cols-1 gap-y-3 "
          onSubmit={handleSubmit(registerFormAction)}
          noValidate
        >
          {formFields?.map((field) => renderField(field))}
          <LoadingButton loading={loading} size="lg" type="submit">
            {loading ? "Processing..." : "Register"}
          </LoadingButton>
        </form>
      </FormProvider>
    </FormStepItemWrapper>
  );
};

export default RegiserForm;
