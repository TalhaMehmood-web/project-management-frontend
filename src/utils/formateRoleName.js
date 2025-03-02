const formatRoleName = (role) => {
  if (!role) return "";
  return role.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default formatRoleName;
