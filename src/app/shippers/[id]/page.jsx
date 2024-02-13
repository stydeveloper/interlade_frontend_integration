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
        className="fixed top-18 left-4 mt-6 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center mt-6 w-full h-[90vh]">
        <h1 className="underline italic text-2xl font-semibold mb-2">
          {/* params.id.name */}
          Shipper Name
        </h1>

        {/* Button to toggle table type with grayed-out hint */}
        <h1 className="underline text-2xl font-semibold mt-8">
          {" "}
          {toggleTable === "carrier-shipper-active"
            ? "Active B/Ls"
            : "Complete B/Ls"}
        </h1>
        <button
          onClick={handleToggle}
          className="border-2 bg-gray rounded mt-4 mb-8 p-2"
        >
          View{" "}
          {toggleTable === "carrier-shipper-active"
            ? "Complete B/Ls"
            : "Active B/Ls"}
        </button>
        <Table
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
