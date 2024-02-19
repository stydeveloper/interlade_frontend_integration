"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import {
  carrierShipperActiveMockData,
  carrierShipperCompleteMockData,
} from "@/components/MockData";
import '../../../styles/table.css'

const ShipperProfile = ({ params }) => {
  const router = useRouter();

  // Initializing the toggleTable state to a default value
  const [toggleTable, setToggleTable] = useState("carrier-shipper-active");

  // Function to toggle the table type
  const handleToggle = () => {
    setToggleTable((prev) =>
      prev === "carrier-shipper-active"
        ? "carrier-shipper-complete"
        : "carrier-shipper-active"
    );
  };

  return (
    <>
      <Image
        alt="Back"
        src={BackBtn}
        width={40}
        className="fixed top-[4.5rem] left-4  cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center w-full custom-activebols-Cont">
        <h1 className="underline italic text-2xl font-semibold flex items-center justify-center h-[10%]">
          {/* params.id.name */}
          Shipper Name
        </h1>

        {/* Button to toggle table type with grayed-out hint */}
        <h1 className="underline text-2xl font-semibold  flex items-end justify-center h-[10%]">
          {" "}
          {toggleTable === "carrier-shipper-active"
            ? "Active B/Ls"
            : "Complete B/Ls"}
        </h1>
        <span className="underline text-2xl font-semibold  flex items-center justify-center h-[10%]">

        <button
          onClick={handleToggle}
          className="border-2 bg-gray rounded p-2"
          >
          View{" "}
          {toggleTable === "carrier-shipper-active"
            ? "Complete B/Ls"
            : "Active B/Ls"}
        </button>
          </span>
        <Table
        heightClass='h-[70%]'
          type={toggleTable}
          tableData={
            toggleTable === "carrier-shipper-active"
              ? carrierShipperActiveMockData
              : carrierShipperCompleteMockData
          }
        />
      </div>
    </>
  );
};

export default ShipperProfile;
