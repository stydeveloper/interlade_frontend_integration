import { useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "notification_data";

const getNotificationDataFromCookies = () => {
  const cookieData = Cookies.get(COOKIE_NAME);
  return cookieData ? JSON.parse(cookieData) : { messages: [] };
};

const setNotificationDataToCookies = (data) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(data));
};

const removeNotificationDataFromCookies = () => {
  Cookies.remove(COOKIE_NAME);
};

const NotificationPanel = ({
  messages,
  onClose,
  onClearAll,
  onRemoveMessage,
}) => {
  useEffect(() => {
    const { messages: storedMessages } = getNotificationDataFromCookies();
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  }, []);

  const handleRemoveMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    setNotificationDataToCookies({ messages: updatedMessages });
    onRemoveMessage(index);
  };

  const handleClearAll = () => {
    setMessages([]);
    removeNotificationDataFromCookies();
    onClearAll();
  };

  return (
    <div className="absolute top-14 right-0 bg-white border-l border-gray-300  w-60 shadow-lg z-10 transition-opacity duration-5000 opacity-100">
      <div className="flex justify-between items-center mb-2 p-2">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            className="hover:bg-slate-300 p-2 cursor-pointer"
            onClick={() => handleRemoveMessage(index)}
          >
            {message}
          </li>
        ))}
      </ul>
      {messages.length > 0 ? (
        <button
          className="text-blue-500 hover:text-blue-700 p-2 w-full text-left"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      ) : (
        <div className="text-hoverGray p-2 font-bold">
          No unread Notifications! <span className="text-red-600 h-8">☹</span>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
