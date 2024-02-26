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
import "../../../styles/table.css";
import {
  GET_ACTIVE_ROLES_BY_ROLE,
  GET_COMPLETED_ROLES_BY_ROLE,
} from "@/fetching/queries/bol";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";

const ShipperProfile = ({ params, searchParams }) => {
  const router = useRouter();

  // Initializing the toggleTable state to a default value
  const [toggleTable, setToggleTable] = useState("carrier-shipper-active");

  const {
    loading: activeBlLoading,
    error: activeBlError,
    data: activeBolData,
  } = useQuery(GET_ACTIVE_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "2" },
  });

  const {
    loading: completedBlLoading,
    error: completedBlError,
    data: completedBolData,
  } = useQuery(GET_COMPLETED_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "2" },
  });

  let allActiveBols;
  let allCompletedBols;

  if (!activeBlLoading && activeBolData && activeBolData.getActiveBolsByRole) {
    allActiveBols = activeBolData.getActiveBolsByRole;
  }

  if (
    !completedBlLoading &&
    completedBolData &&
    completedBolData.getCompletedBolsByRole
  ) {
    allCompletedBols = completedBolData.getCompletedBolsByRole;
  }

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
        <h1 className="underline  text-2xl font-semibold flex items-center justify-center h-[10%]">
          {/* params.id.name */}
          {searchParams ? searchParams.name : "Shipper Name"}
        </h1>

        {/* Button to toggle table type with grayed-out hint */}
        <h1 className="underline text-xl font-semibold  flex items-end justify-center h-[10%]">
          {" "}
          {toggleTable === "carrier-shipper-active"
            ? "Active B/Ls"
            : "Complete B/Ls"}
        </h1>
        <span className=" text-xl font-semibold  flex items-center justify-center h-[10%] ">
          <button
            onClick={handleToggle}
            className="border bg-hoverGray rounded p-2 border-black"
          >
            View{" "}
            {toggleTable === "carrier-shipper-active"
              ? "Complete B/Ls"
              : "Active B/Ls"}
          </button>
        </span>

        {(allActiveBols || allCompletedBols) &&
          ((allActiveBols && allActiveBols.length > 0) ||
            (allCompletedBols && allCompletedBols.length > 0)) && (
            <Table
              heightClass="h-[70%]"
              type={toggleTable}
              tableData={
                toggleTable === "carrier-shipper-active"
                  ? carrierShipperActiveMockData
                  : carrierShipperCompleteMockData
              }
              allBols={
                toggleTable === "carrier-shipper-active"
                  ? allActiveBols
                  : allCompletedBols
              }
            />
          )}
        {(activeBlLoading || completedBlLoading) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spin size="small" />
          </div>
        )}
        {/* <Table
          heightClass="h-[70%]"
          type={toggleTable}
          tableData={
            toggleTable === "carrier-shipper-active"
              ? carrierShipperActiveMockData
              : carrierShipperCompleteMockData
          }
        /> */}
      </div>
    </>
  );
};

export default ShipperProfile;
