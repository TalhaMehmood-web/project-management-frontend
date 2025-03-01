import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import FormHelperText from "../molecules/form-helper-text";

const InputFieldRenderor = ({
  labelClassName,
  inputClassName,
  containerClassName,
  label,
  id,
  type = "text",
  error,
  ...props
}) => {
  return (
    <div
      className={clsx(
        containerClassName,
        "flex   flex-col flex-1 w-full gap-2"
      )}
    >
      <Label
        className={clsx(labelClassName, "uppercase text-xs  font-bold")}
        htmlFor={id}
      >
        {label}
      </Label>
      <Input
        className={clsx(inputClassName)}
        id={id}
        type={type}
        name={id}
        {...props}
      />
      {error && <FormHelperText message={error} />}
    </div>
  );
};

export default InputFieldRenderor;
