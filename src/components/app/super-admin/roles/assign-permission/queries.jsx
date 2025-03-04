import axiosInstance from "@/axios";

// 🔄 Fetch all permissions
export const fetchPermissions = async (selectedPermissionType) => {
  const { data } = await axiosInstance.post(
    "/permissions/get-all-permissions",
    {
      filters: {
        name: "",
        type: selectedPermissionType,
      },
    }
  );
  return data?.data?.permissions || [];
};

// 🔄 Fetch role by ID
export const fetchRoleById = async (id) => {
  const { data } = await axiosInstance.get(`/roles/${id}`);
  return data?.data || [];
};

// 🔗 Assign permissions to role
export const assignPermissionsApi = async ({ roleId, permissions }) => {
  const { data } = await axiosInstance.post("/roles/assign-permission", {
    roleId,
    permissions,
  });
  return data;
};
