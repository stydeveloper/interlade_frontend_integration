"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SupportModal from "./SupportModal";
import NavProfileModal from "./NavProfileModal";
import NotificationPanel from "./NotificationPanel";
import { io } from "socket.io-client";

const Navbar = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // // Mock notification messages
  // const notificationMessages = [
  //   "Notification 1",
  //   "Notification 2",
  //   "Notification 3",
  //   // Add more notification messages as needed
  // ];

  useEffect(() => {
    const socket = io("http://3.86.80.67", {
      rememberUpgrade: true,
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    socket.on("message", (data) => {
      // Update message list with the received message
      setMessages((prevMessages) => [...prevMessages, data]);
      // Increment unread message count
      setUnreadCount((prevCount) => prevCount + 1);
    });

    socket.on("userSubscriptionStatusUpdate", (data) => {
      // Update your component state or perform any other action
      console.log(data);
      // For example, you can set a specific message for this event
      setMessages((prevMessages) => [...prevMessages, data.message]);
      // Increment unread message count if needed
      setUnreadCount((prevCount) => prevCount + 1);
    });

    socket.on("bolStatusUpdate", (data) => {
      // Update your component state or perform any other action
      console.log(data);
      // For example, you can set a specific message for this event
      setMessages((prevMessages) => [...prevMessages, data.message]);
      // Increment unread message count if needed
      setUnreadCount((prevCount) => prevCount + 1);
    });

    socket.on("invitationStatusUpdate", (data) => {
      // Update your component state or perform any other action
      console.log(data);
      // For example, you can set a specific message for this event
      setMessages((prevMessages) => [...prevMessages, data.message]);
      // Increment unread message count if needed
      setUnreadCount((prevCount) => prevCount + 1);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = () => {
    // Toggle notification panel visibility
    setNotificationOpen((prevOpen) => !prevOpen);
    // Reset unread message count when opening the notification panel
    setUnreadCount(0);
  };

  const handleRemoveMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleClearAll = () => {
    setMessages([]);
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
          onClose={() => setNotificationOpen(false)}
          onRemoveMessage={handleRemoveMessage}
          onClearAll={handleClearAll}
        />
      )}
    </>
  );
};

export default Navbar;
