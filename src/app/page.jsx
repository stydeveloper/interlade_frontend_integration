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

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(true);

  const router = useRouter();
  const { filters, setFilters, selectedFilters, setSelectedFilters } =
    React.useContext(FilterContext);
  useEffect(() => {
    // Check cookies for the flag indicating whether the terms have been acknowledged
    const hasAcknowledgedTerms = Cookies.get("termsAcknowledged");

    // Set loading to false after useEffect completes

    // If the terms have been acknowledged, close the terms dialog
    if (hasAcknowledgedTerms === "true") {
      setTermsOpen(true);
    } else if (hasAcknowledgedTerms === "false") {
      setTermsOpen(false);
    }
  }, []); // Empty dependency array ensures that the effect runs only once

  const handleTermsAcknowledgement = () => {
    // Set a flag in cookies indicating that the terms have been acknowledged

    if (typeof window !== "undefined") {
      Cookies.set("termsAcknowledged", "true");
      setTermsOpen(true); // Close the terms dialog
    }
  };

  return (
    <div className="fixed custom-activebols-Cont w-full">
      <div className="h-[35%] flex items-center relative  justify-center ">
        <FourBox />

        <span className="w-full h-[2px] max-xl:hidden absolute z-10 bg-gray-600 "></span>
      </div>

      <RecentSection
        customHeightClass="h-[65%]"
        filters={filters}
        setFilters={setFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {!termsOpen && (
        <LegalTermsAndConditions
          isOpen={!termsOpen}
          onClose={handleTermsAcknowledgement} // Call handleTermsAcknowledgement when the terms dialog is closed
        />
      )}
    </div>
  );
}
