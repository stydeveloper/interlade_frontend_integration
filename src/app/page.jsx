"use client";
import { useState } from "react";
import FourBox from "../components/Boxes";
import RecentSection from "../components/RecentSection";
import LegalTermsAndConditions from "@/components/LegalTermsAndConditions";
import '../styles/table.css'

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(true);

  return (
    <div className="fixed custom-activebols-Cont w-full">
      <div className="h-[35%] flex items-center relative  justify-center ">
        <FourBox />

        <span className="w-full h-[2px] max-xl:hidden absolute z-10 bg-gray-600 "></span>
      </div>
      <RecentSection customHeightClass="h-[65%]"  />
      <LegalTermsAndConditions
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
    </div>
  );
}
