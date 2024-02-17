"use client";
import { useState } from "react";
import FourBox from "../components/Boxes";
import RecentSection from "../components/RecentSection";
import LegalTermsAndConditions from "@/components/LegalTermsAndConditions";

export default function Home() {
  const [termsOpen, setTermsOpen] = useState(true);

  return (
    <div className="fixed custom-activebols-Cont w-full">
      <div className="border-b-2 border-b-gray h-32">
        <FourBox />
      </div>
      <RecentSection />
      <LegalTermsAndConditions
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
    </div>
  );
}
