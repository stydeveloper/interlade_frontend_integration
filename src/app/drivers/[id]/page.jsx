"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockDailyLogData } from "@/components/MockData";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import Select from "react-select";
import DispatchBoLToDriverModal from "@/components/DispatchBoLToDriverModal";

const DriverProfile = ({ params }) => {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <Image
        alt="Back"
        src={BackBtn}
        width={40}
        className="fixed top-18 left-4 mt-6 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center mt-6 h-[90vh]">
        <h1 className="underline italic text-2xl font-semibold ">
          {/* fetch driver data via params.id */}
          John Doe
        </h1>
        <p className="mb-2">
          Employee Id:
          {params.id}
        </p>
        <button
          className="border-2 rounded-md p-2 mb-12 bg-linkBlue text-white hover:bg-sky-700"
          onClick={() => setInviteOpen(true)}
        >
          Send BoL to Driver
        </button>
        <h1 className="underline text-2xl font-semibold my-8">Daily Logs</h1>
        <Table type="driver-logs" tableData={mockDailyLogData} />
      </div>
      <DispatchBoLToDriverModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};

export default DriverProfile;
