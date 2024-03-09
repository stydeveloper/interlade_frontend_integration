export const formatDate = (dateString) => {
  // Parse the date string into a Date object
  console.log("dateString", dateString);
  const date = new Date(dateString);
  console.log("dateString after", dateString);

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

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
