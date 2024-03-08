import Cookies from "js-cookie";

const COOKIE_NAME = "notification_data";

export const getNotificationDataFromCookies = () => {
  const cookieData = Cookies.get(COOKIE_NAME);
  return cookieData ? JSON.parse(cookieData) : { messages: [] };
};

export const setNotificationDataToCookies = (data) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(data));
};

export const removeNotificationDataFromCookies = () => {
  Cookies.remove(COOKIE_NAME);
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
