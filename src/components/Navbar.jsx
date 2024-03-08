import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SupportModal from "./SupportModal";
import NavProfileModal from "./NavProfileModal";
import NotificationPanel from "./NotificationPanel";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import {
  getNotificationDataFromCookies,
  setNotificationDataToCookies,
  removeNotificationDataFromCookies,
} from "@/utils/notificationUtils";

const Navbar = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = Cookies.get("user");
    const loggedInUserEmail = user ? JSON.parse(user) : null;
    setEmail(loggedInUserEmail?.email);
  }, []);

  useEffect(() => {
    const socket = io("https://api.interlade.com", {
      rememberUpgrade: true,
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    socket.on("userSubscriptionStatusUpdate", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    if (email) {
      socket.on(`bolStatusUpdate-${email}`, (data) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, data.message];
          setNotificationDataToCookies({ messages: updatedMessages });
          return updatedMessages;
        });
        setUnreadCount((prevCount) => prevCount + 1);
      });
    }

    socket.on("invitationStatusUpdate", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, [email]);

  const handleNotificationClick = () => {
    setNotificationOpen((prevOpen) => !prevOpen);
    // Reset unread count only when opening the notification panel
    if (!notificationOpen) {
      setUnreadCount(0);
    }
  };

  const handleRemoveMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    // Decrement the unread count when removing a message
    setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const handleClearAll = () => {
    // Clear all messages
    setMessages([]);
    // Reset the unread count to zero
    setUnreadCount(0);
  };

  const handleNotificationClose = () => {
    // Update notification data in cookies only if the panel was open previously
    if (notificationOpen) {
      setNotificationDataToCookies({ messages });
    }
    // Always close the notification panel
    setNotificationOpen(false);
  };

  return (
    <>
      <div className=" bg-cgray border-b-2 border-gray-300 h-14 flex items-center justify-between fixed top-0 left-0 w-full z-10 px-24">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/images/interlade.png"
              alt="Interlade"
              width={40}
              height={40}
            />
            <h1 className="text-white font-semibold text-xl ml-2">Interlade</h1>
          </div>
        </Link>
        <div className="flex">
          <button onClick={() => setSupportOpen(true)}>
            <Image
              alt="Help Icon"
              src="/images/help.svg"
              width={30}
              height={30}
            />
          </button>
          <button onClick={handleNotificationClick}>
            <div className="relative">
              <Image
                alt="Notification Icon"
                src="/images/notification.svg"
                className="ml-[24px]"
                width={30}
                height={30}
              />
              {unreadCount > 0 && (
                <div className="absolute top-0 right-0 mt-[-10px] mr-[-10px] bg-red-500 text-white text-center rounded-full w-6 h-6 flex justify-center items-center text-xs">
                  {unreadCount}
                </div>
              )}
            </div>
          </button>
          <button onClick={() => setProfileOpen(true)}>
            <Image
              alt="Profile Icon"
              src="/images/profile.svg"
              className="ml-[24px]"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
      <NavProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      {notificationOpen && (
        <NotificationPanel
          messages={messages}
          onClose={handleNotificationClose}
          onRemoveMessage={handleRemoveMessage}
          onClearAll={handleClearAll}
          setMessages={setMessages}
        />
      )}
    </>
  );
};

export default Navbar;
