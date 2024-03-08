import Cookies from "js-cookie";

const COOKIE_NAME = "notification_data";

// Function to get notification data from cookies for a specific user
export const getNotificationDataFromCookies = (email) => {
  const cookieName = `notification_data_${email}`;
  const cookieData = Cookies.get(cookieName);
  return cookieData ? JSON.parse(cookieData) : { messages: [] };
};

// Function to set notification data to cookies for a specific user
export const setNotificationDataToCookies = (email, data) => {
  const cookieName = `notification_data_${email}`;
  Cookies.set(cookieName, JSON.stringify(data));
};

// Function to remove notification data from cookies for a specific user
export const removeNotificationDataFromCookies = (email) => {
  const cookieName = `notification_data_${email}`;
  Cookies.remove(cookieName);
};
export const getUnreadCountFromCookies = () => {
  const count = Cookies.get("unreadCount");
  return count ? parseInt(count) : 0;
};

export const setUnreadCountToCookies = (count) => {
  Cookies.set("unreadCount", count, { expires: 7 });
};

export const removeUnreadCountFromCookies = () => {
  Cookies.remove("unreadCount");
};
