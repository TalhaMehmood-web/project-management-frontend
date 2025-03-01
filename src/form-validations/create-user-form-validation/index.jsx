import * as yup from "yup";

export const createUserValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().optional(),
  userType: yup
    .string()
    .oneOf(["Project Lead", "Client", "Project Team Member"])
    .required("User Type is required"),

  // Conditional validations
  assignedProjects: yup.array().when("userType", {
    is: "Project Lead",
    then: (schema) => schema.min(1, "At least one project must be assigned"),
    otherwise: (schema) => schema.notRequired(),
  }),

  department: yup.string().when("userType", {
    is: "Project Lead",
    then: (schema) => schema.required("Department is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  seniorityLevel: yup.string().when("userType", {
    is: "Project Lead",
    then: (schema) => schema.required("Seniority Level is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  companyName: yup.string().when("userType", {
    is: "Client",
    then: (schema) => schema.required("Company Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  contactPerson: yup.string().when("userType", {
    is: "Client",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.notRequired(),
  }),

  industryType: yup.string().when("userType", {
    is: "Client",
    then: (schema) => schema.required("Industry Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  contractStartDate: yup.string().when("userType", {
    is: "Client",
    then: (schema) => schema.required("Contract Start Date is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  contractEndDate: yup.string().when("userType", {
    is: "Client",
    then: (schema) => schema.required("Contract End Date is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  assignedTeam: yup.string().when("userType", {
    is: "Project Team Member",
    then: (schema) => schema.required("Assigned Team is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  roleInProject: yup.string().when("userType", {
    is: "Project Team Member",
    then: (schema) => schema.required("Role in Project is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  skills: yup.array().when("userType", {
    is: "Project Team Member",
    then: (schema) => schema.min(1, "At least one skill is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  availability: yup.string().when("userType", {
    is: "Project Team Member",
    then: (schema) =>
      schema.oneOf(["Full-time", "Part-time"], "Invalid availability option"),
    otherwise: (schema) => schema.notRequired(),
  }),

  userStatus: yup.string().required("User Status is required"),
  accessLevel: yup
    .string()
    .oneOf(["Read-only", "Edit", "Admin"])
    .required("Access Level is required"),
  notificationPreferences: yup
    .boolean()
    .required("Notification Preference is required"),
});
