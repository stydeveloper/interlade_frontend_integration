"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockDailyLogData } from "@/components/MockData";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import Select from "react-select";
import DriverIcon from "../../../../public/images/drivers-icon.png";
import { GET_DAILY_LOGS_DRIVER } from "@/fetching/queries/bol";

import DispatchBoLToDriverModal from "@/components/DispatchBoLToDriverModal";
import { useQuery } from "@apollo/client";

const DriverProfile = ({ params, searchParams }) => {
  const router = useRouter();
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_DAILY_LOGS_DRIVER, {
    variables: { userId: params?.id },
    fetchPolicy: "network-only", // or "cache-and-network"
  });
  let allBols;

  if (data && !loading) {
    allBols = data?.getDailyLogsDriver;
  }

  // Access the name parameter from router.query
  const { name } = searchParams;
  console.log(searchParams);

  return (
    <>
      <Image
        alt="Back"
        src={BackBtn}
        width={40}
        className="fixed top-18 left-4 mt-6 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center custom-activebols-Cont w-full">
        <Image src={DriverIcon} alt="Shipper Name Icon" width={60} />
        <h1 className="underline  text-2xl  flex items-center justify-center ">
          {/* fetch driver data via params.id */}
          {name || "John Doe"}
        </h1>

        <p className=" flex items-start justify-center text-base">
          Employee Id:
          {params.id}
        </p>
        <span className="flex items-center justify-center h-[10%] ">
          <button
            className=" rounded-md p-2  bg-linkBlue text-white hover:bg-sky-700"
            onClick={() => setInviteOpen(true)}
          >
            Send BoL to Driver
          </button>
        </span>
        <h1 className="underline text-2xl font-semibold flex items-center justify-center h-[10%]">
          Daily Logs
        </h1>
        <Table
          heightClass="h-[59%]"
          type="carrier-driver-logs"
          tableData={mockDailyLogData}
          // tableData={allBols}
          allBols={allBols}
        />
      </div>
      <DispatchBoLToDriverModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};

export default DriverProfile;
// heightClass="h-[80%]"
// type={userRole === "carrier" ? "carrier-recent" : "recent"}
// tableData={allBols}
// allBols={allBols}
// roleId={roleId}
