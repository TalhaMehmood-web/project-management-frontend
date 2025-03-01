import * as Yup from "yup";

const RegisterValidationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .max(20, "Full Name should be greater than 20 characters"),
  userName: Yup.string()
    .required("User Name is required")
    .max(20, "User Name should be greater than 20 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string().notRequired(),
  termsAccepted: Yup.bool()
    .oneOf([true], "You must accept the terms & conditions")
    .required("You must accept the terms"),
});

export default RegisterValidationSchema;
