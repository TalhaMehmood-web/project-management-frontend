import { Label } from "@/components/ui/label";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import FormHelperText from "../molecules/form-helper-text";

const SelectFieldRenderer = ({
  label,
  selectItems,
  control,
  name,
  className,
  error,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-xs font-bold uppercase">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger className={clsx(className)}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {selectItems?.map((item, index) => (
                  <SelectItem key={index + item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
      {error && <FormHelperText message={error} />}
    </div>
  );
};

export default SelectFieldRenderer;
