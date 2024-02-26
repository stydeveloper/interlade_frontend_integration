export const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Format the date without comma
  const formattedDate = date
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock
    })
    .replace(/,/g, ""); // Replace all commas with an empty string

  return formattedDate;
};
