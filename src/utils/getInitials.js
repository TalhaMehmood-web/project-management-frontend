const getInitials = (name) => {
  if (!name) return "";

  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase(); // Single name -> return first letter
  }

  return (nameParts[0][0] + nameParts[1][0]).toUpperCase(); // First + Last initials
};
export default getInitials;
