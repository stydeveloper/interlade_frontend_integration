"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import "../../../styles/table.css";
import {
  shipperCarrierActiveMockData,
  shipperCarrierCompleteMockData,
} from "@/components/MockData";

import { useQuery } from "@apollo/client";
import { Spin } from "antd";
// import { GET_USER_BY_ID } from "@/fetching/mutations/user";
import {
  GET_ACTIVE_ROLES_BY_ROLE,
  GET_COMPLETED_ROLES_BY_ROLE,
} from "@/fetching/queries/bol";

const CarrierProfile = ({ params, searchParams }) => {
  const router = useRouter();
  const [toggleTable, setToggleTable] = useState("shipper-carrier-active");

  const {
    loading: activeBlLoading,
    error: activeBlError,
    data: activeBolData,
  } = useQuery(GET_ACTIVE_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "1" },
  });

  const {
    loading: completedBlLoading,
    error: completedBlError,
    data: completedBolData,
  } = useQuery(GET_COMPLETED_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "1" },
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

  const handleToggle = () => {
    setToggleTable((prev) =>
      prev === "shipper-carrier-active"
        ? "shipper-carrier-complete"
        : "shipper-carrier-active"
    );
  };

  return (
    <div className="">
      <Image
        alt="Back"
        src={BackBtn}
        width={40}
        className="fixed top-[4.5rem] left-4 cursor-pointer"
        onClick={() => router.back()}
      />

      <div className="flex flex-col items-center custom-activebols-Cont w-full ">
        <h1 className="underline italic text-2xl font-semibold flex items-center justify-center h-[10%]">
          {/* params.id.name */}
          {searchParams ? searchParams.name : "Carrier Name"}
        </h1>
        <span className="flex items-center justify-center h-[10%]">
          <button
            className="border-2 rounded-md p-2 my-2 bg-linkBlue text-white hover:bg-sky-700"
            onClick={() => router.push("/createbol")}
          >
            Create BoL
          </button>
        </span>
        {/* Button to toggle table type with grayed-out hint */}
        <h1 className="underline text-2xl font-semibold  flex items-end justify-center h-[10%]">
          {" "}
          {toggleTable === "shipper-carrier-active"
            ? "Active B/Ls"
            : "Complete B/Ls"}
        </h1>
        <span className="flex items-center justify-center h-[10%] my-4">
          <button
            onClick={handleToggle}
            className="border-2 bg-gray rounded  p-2"
          >
            View{" "}
            {toggleTable === "shipper-carrier-active"
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
                toggleTable === "shipper-carrier-active"
                  ? shipperCarrierActiveMockData
                  : shipperCarrierCompleteMockData
              }
              allBols={
                toggleTable === "shipper-carrier-active"
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
        {/* {!completedBlLoading && allCompletedBols.length === 0 && (
          <div className="bg-cgray text-hoverGray text-2xl h-full w-full text-center mt-10">
            Empty
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CarrierProfile;
