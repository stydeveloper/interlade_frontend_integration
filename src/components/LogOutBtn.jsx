"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie library
import Link from "next/link";
const LogOutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Perform any necessary cleanup or logout logic

    // Remove token from local storage
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // localStorage.removeItem("role_id");

    // Remove token, user, and role_id from cookies
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role_id");
    Cookies.remove("isAuthenticated");
    Cookies.remove("termsAcknowledged");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <a
      onClick={handleLogout}
      className="text-white bg-linkBlue font-semibold border-2 rounded-md px-2 py-1 hover:bg-sky-700 cursor-pointer"
    >
      Log Out
    </a>
  );
};

export default LogOutBtn;
