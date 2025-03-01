const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Check if the date is today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Format as 2:15 a.m. or p.m.
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "p.m." : "a.m.";
    return `${hours}:${minutes} ${ampm}`;
  } else {
    // Format as Feb 1, 2025
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
};
export default formatDate;
