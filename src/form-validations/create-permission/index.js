import * as yup from "yup";

const permissionSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  type: yup
    .string()
    .oneOf(["api", "page"], "Invalid type")
    .required("Type is required"),
  endpoint: yup
    .string()
    .when("type", ([type], schema) =>
      type === "api" ? schema.required("Endpoint is required") : schema.strip()
    ),
  controller: yup
    .string()
    .when("type", ([type], schema) =>
      type === "api"
        ? schema.required("Controller is required")
        : schema.strip()
    ),
  method: yup
    .string()
    .when("type", ([type], schema) =>
      type === "api"
        ? schema
            .oneOf(["GET", "POST", "PUT", "DELETE", "PATCH"], "Invalid method")
            .required("Method is required")
        : schema.strip()
    ),
  pagePath: yup
    .string()
    .when("type", ([type], schema) =>
      type === "page"
        ? schema.required("Page Path is required")
        : schema.strip()
    ),
});

export default permissionSchema;
