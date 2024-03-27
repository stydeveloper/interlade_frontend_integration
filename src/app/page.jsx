"use client";
import React, { useEffect, useState } from "react";
import FourBox from "../components/Boxes";
import RecentSection from "../components/RecentSection";
import LegalTermsAndConditions from "@/components/LegalTermsAndConditions";
import "../styles/table.css";
import Cookies from "js-cookie"; // Import js-cookie library
import { FilterContext } from "@/components/FilterProvider";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { GET_USER_SUB_BY_EMAIL } from "@/fetching/queries/user_subscriptions";
import { useQuery } from "@apollo/client";

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(true);
  const [status, setStatus] = useState("Active");
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    // Check cookies for the flag indicating whether the terms have been acknowledged
    const hasAcknowledgedTerms = Cookies.get("termsAcknowledged");
    const status = Cookies.get("status");
    const userCookie = Cookies.get("user");
    let user = userCookie ? JSON.parse(userCookie) : null;
    setLoggedInUser(user);
    setStatus(status);
    // Set loading to false after useEffect completes

    // If the terms have been acknowledged, close the terms dialog
    if (hasAcknowledgedTerms === "true") {
      setTermsOpen(true);
    } else if (hasAcknowledgedTerms === "false") {
      setTermsOpen(false);
    }
  }, [status]); // Empty dependency array ensures that the effect runs only once
  const { loading, error, data } = useQuery(GET_USER_SUB_BY_EMAIL, {
    variables: {
      email: loggedInUser?.email,
    },
    skip: !loggedInUser,
  });

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    // Check if data is available and if status is null
    console.log("loggedInUser", typeof loggedInUser?.role_id?.id);
    if (
      data &&
      data.getUsersSubByEmail &&
      data.getUsersSubByEmail.status === null &&
      loggedInUser?.role_id?.id === "1"
    ) {
      console.log("agay data bhai ,", data?.getUsersSubByEmail);
      // Redirect to signup page
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("role_id");
      Cookies.remove("isAuthenticated");
      Cookies.remove("termsAcknowledged");
      Cookies.remove("status");
      router.push("/signup");
    }
  }, [data]); // Run this effect whenever data changes
  // const userCookie = Cookies.get("user");
  // loggedInUser = userCookie ? JSON.parse(userCookie) : null;
  const router = useRouter();
  const { filters, setFilters, selectedFilters, setSelectedFilters } =
    React.useContext(FilterContext);

  const handleTermsAcknowledgement = () => {
    // Set a flag in cookies indicating that the terms have been acknowledged

    if (typeof window !== "undefined") {
      Cookies.set("termsAcknowledged", "true");
      setTermsOpen(true); // Close the terms dialog
    }
  };

  if (loggedInUser?.role_id?.id === "1" && (loading || !data)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="fixed custom-activebols-Cont w-full">
      <div className="h-[35%] flex items-center relative  justify-center ">
        {status && <FourBox />}

        <span className="w-full h-[2px] max-xl:hidden absolute z-10 bg-gray-600 "></span>
      </div>

      {status && (
        <RecentSection
          customHeightClass="h-[65%]"
          filters={filters}
          setFilters={setFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          status={status}
        />
      )}

      {!termsOpen && (
        <LegalTermsAndConditions
          isOpen={!termsOpen}
          onClose={handleTermsAcknowledgement} // Call handleTermsAcknowledgement when the terms dialog is closed
        />
      )}
    </div>
  );
}
