"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import {
  shipperCarrierActiveMockData,
  shipperCarrierCompleteMockData,
} from "@/components/MockData";

const CarrierProfile = ({ params }) => {
  const router = useRouter();

  // Initializing the toggleTable state to a default value
  const [toggleTable, setToggleTable] = useState("shipper-carrier-active");

  // Function to toggle the table type
  const handleToggle = () => {
    setToggleTable((prev) =>
      prev === "shipper-carrier-active"
        ? "shipper-carrier-complete"
        : "shipper-carrier-active"
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
      <div className="flex flex-col items-center mt-6 h-[90vh] w-full">
        <h1 className="underline italic text-2xl font-semibold mb-2">
          {/* params.id.name */}
          Carrier Name
        </h1>
        <button
          className="border-2 rounded-md p-2 mb-12 bg-linkBlue text-white hover:bg-sky-700"
          onClick={() => router.push("/createbol")}
        >
          Send BoL
        </button>
        {/* Button to toggle table type with grayed-out hint */}
        <h1 className="underline text-2xl font-semibold mt-8">
          {" "}
          {toggleTable === "shipper-carrier-active"
            ? "Active B/Ls"
            : "Complete B/Ls"}
        </h1>
        <button
          onClick={handleToggle}
          className="border-2 bg-gray rounded mt-4 mb-8 p-2"
        >
          View{" "}
          {toggleTable === "shipper-carrier-active"
            ? "Complete B/Ls"
            : "Active B/Ls"}
        </button>
        <Table
          type={toggleTable}
          tableData={
            toggleTable === "shipper-carrier-active"
              ? shipperCarrierActiveMockData
              : shipperCarrierCompleteMockData
          }
        />
      </div>
    </>
  );
};

export default CarrierProfile;
