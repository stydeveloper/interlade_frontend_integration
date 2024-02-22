"use client";
import { useEffect, useState } from "react";
import FourBox from "../components/Boxes";
import RecentSection from "../components/RecentSection";
import LegalTermsAndConditions from "@/components/LegalTermsAndConditions";
import "../styles/table.css";

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    // Check local storage for the flag indicating whether the terms have been acknowledged
    let hasAcknowledgedTerms;
    if (typeof window !== "undefined") {
      hasAcknowledgedTerms = localStorage.getItem("termsAcknowledged");
    }

    // If the terms have been acknowledged, close the terms dialog
    if (hasAcknowledgedTerms) {
      setTermsOpen(false);
    }
  }, []); // Empty dependency array ensures that the effect runs only once

  const handleTermsAcknowledgement = () => {
    // Set a flag in local storage indicating that the terms have been acknowledged
    localStorage.setItem("termsAcknowledged", "true");
    setTermsOpen(false); // Close the terms dialog
  };

  return (
    <div className="fixed custom-activebols-Cont w-full">
      <div className="h-[35%] flex items-center relative  justify-center ">
        <FourBox />

        <span className="w-full h-[2px] max-xl:hidden absolute z-10 bg-gray-600 "></span>
      </div>
      <RecentSection customHeightClass="h-[65%]" />
      {termsOpen && (
        <LegalTermsAndConditions
          isOpen={termsOpen}
          onClose={handleTermsAcknowledgement} // Call handleTermsAcknowledgement when the terms dialog is closed
        />
      )}
    </div>
  );
}
