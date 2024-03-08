import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SupportModal from "./SupportModal";
import NavProfileModal from "./NavProfileModal";
import NotificationPanel from "./NotificationPanel";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_NOTIFICATIONS,
  GET_UNREAD_COUNT,
} from "@/fetching/queries/notifications";

import {
  setNotificationDataToCookies,
  getUnreadCountFromCookies,
  setUnreadCountToCookies,
  getNotificationDataFromCookies,
} from "@/utils/notificationUtils";
import {
  MARK_ALL_AS_READ,
  DELETE_ALL_NOTIFICATIONS,
  DELETE_SINGLE,
} from "@/fetching/mutations/notifications";

let allNotificationsRefetchFunction;
let unreadCountRefetchFunction;

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
  const {
    data: allNotificationsData,
    loading: allNotificationsLoading,
    refetch: allNotificationsRefetch,
  } = useQuery(GET_ALL_NOTIFICATIONS);
  const {
    data: unreadCountData,
    loading: unreadCountLoading,
    refetch: unreadCountRefetch,
  } = useQuery(GET_UNREAD_COUNT);

  const [markAllAsRead] = useMutation(MARK_ALL_AS_READ);
  const [deleteSingle] = useMutation(DELETE_SINGLE);
  const [deleteAll] = useMutation(DELETE_ALL_NOTIFICATIONS);

  if (!allNotificationsLoading && allNotificationsRefetch) {
    allNotificationsRefetchFunction = allNotificationsRefetch;
  }

  if (!unreadCountLoading && unreadCountRefetch) {
    unreadCountRefetchFunction = unreadCountRefetch;
  }

  useEffect(() => {
    if (allNotificationsData) {
      // Set notifications to the state
      console.log("kkkkkkkkkkkkkkkkkkkkkkkk");
      setMessages(allNotificationsData?.getAllNotifications);
    }

    if (unreadCountData) {
      console.log(
        "unreadCountData?.getUnreadCount",
        unreadCountData?.getUnreadCount
      );
      setUnreadCount(unreadCountData?.getUnreadCount);
    }
  }, [unreadCountData, allNotificationsData, email]);

  // useEffect(() => {
  //   const user = Cookies.get("user");
  //   const loggedInUserEmail = user ? JSON.parse(user) : null;
  //   setEmail(loggedInUserEmail?.email);

  //   // Retrieve notification data from cookies on mount
  //   const { messages: storedMessages } = getNotificationDataFromCookies(email);
  //   console.log("ak47", storedMessages);
  //   if (storedMessages.length > 0) {
  //     console.log("ak57", storedMessages);

  //     setMessages(storedMessages);
  //     setUnreadCount(storedMessages.length);
  //   }

  //   // Retrieve unread count from cookies on mount
  //   const storedUnreadCount = getUnreadCountFromCookies();
  //   if (storedUnreadCount >= 0) {
  //     setUnreadCount(storedUnreadCount);
  //   }
  // }, []);

  useEffect(() => {
    const socket = io("https://api.interlade.com", {
      rememberUpgrade: true,
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    // socket.on("message", (data) => {
    //   console.log(data);

    // });

    // socket.on("userSubscriptionStatusUpdate", (data) => {
    //   setMessages((prevMessages) => [...prevMessages, data.message]);
    //   setUnreadCount((prevCount) => prevCount + 1);
    // });

    if (email) {
      console.log("email hai bhai");
      socket.on(`bolStatusUpdate-${email}`, (data) => {
        // Update messages state with the new notification

        // Update unreadCount state
        // setUnreadCount((prevCount) => prevCount + 1);

        allNotificationsRefetch();
        // setMessages(allNotificationsData?.getAllNotifications);

        unreadCountRefetch();
        // setUnreadCount(unreadCountData?.getUnreadCount);
      });
    }

    // socket.on("invitationStatusUpdate", (data) => {
    //   setMessages((prevMessages) => [...prevMessages, data.message]);
    //   setUnreadCount((prevCount) => prevCount + 1);
    // });

    return () => {
      socket.disconnect();
    };
  }, [email]);

  const handleNotificationClick = async () => {
    try {
      setNotificationOpen((prev) => !prev);
      await markAllAsRead();
      unreadCountRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveMessage = async (id) => {
    try {
      await deleteSingle({ variables: { id } });
      allNotificationsRefetch();
    } catch (error) {
      console.log("Error in removing the single message", error);
    }
    // const updatedMessages = [...messages];
    // updatedMessages.splice(index, 1);
    // setMessages(updatedMessages);
    // // Decrement the unread count when removing a message
    // setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
    // // Update unread count in cookies
    // setUnreadCountToCookies(Math.max(0, unreadCount - 1));
  };

  const handleClearAll = async () => {
    try {
      await deleteAll();
      allNotificationsRefetch();
    } catch (error) {
      console.log("error in clearing all messages");
    }
  };

  const handleNotificationClose = () => {
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
          email={email}
        />
      )}
    </>
  );
};

export { allNotificationsRefetchFunction, unreadCountRefetchFunction };

export default Navbar;
