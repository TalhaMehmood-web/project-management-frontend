import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHelperText from "./form-helper-text";
const PasswordEye = ({ register, name, placeholder, label, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="password">{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          {...register(name)}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
      {error && <FormHelperText message={error} />}
    </div>
  );
};

export default PasswordEye;
