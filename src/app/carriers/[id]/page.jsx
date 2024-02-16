"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import {
  shipperCarrierActiveMockData,
  shipperCarrierCompleteMockData,
} from "@/components/MockData";

import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      address
      city
      created_at
      email
      number
      password
      role_id {
        name
        id
      }
      state
      zipcode
    }
  }
`;

const GET_ACTIVE_ROLES_BY_ROLE = gql`
  query GetActiveBolsByRole($id: ID!, $roleId: ID!) {
    getActiveBolsByRole(id: $id, role_id: $roleId) {
      id
      carrier_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      shipper_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      consignee_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      weight
      volume
      quantity
      un_na_number
      hazard_class
      description
      packing_group
      package_type
      status
      price
      created_at
    }
  }
`;

const GET_COMPLETED_ROLES_BY_ROLE = gql`
  query GetCompletedBolsByRole($id: ID!, $roleId: ID!) {
    getCompletedBolsByRole(id: $id, role_id: $roleId) {
      id
      carrier_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      shipper_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      consignee_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      weight
      volume
      quantity
      un_na_number
      hazard_class
      description
      packing_group
      package_type
      status
      price
      created_at
    }
  }
`;

const CarrierProfile = ({ params }) => {
  const router = useRouter();

  // Initializing the toggleTable state to a default value
  // Initialize the toggleTable state to "shipper-carrier-active"
  const [toggleTable, setToggleTable] = useState("shipper-carrier-active");

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: params.id },
  });

  const {
    loading: activeBlLoading,
    activeBlError,
    data: activeBolData,
  } = useQuery(GET_ACTIVE_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "1" },
  });
  let allAcitveBols;
  if (!activeBlLoading && activeBolData && activeBolData.getActiveBolsByRole) {
    console.log(activeBolData.getActiveBolsByRole);
    allAcitveBols = activeBolData.getActiveBolsByRole;
  }

  const {
    loading: completedBlLoading,
    completedBlError,
    data: completedBolData,
  } = useQuery(GET_COMPLETED_ROLES_BY_ROLE, {
    variables: { id: `${params.id}`, roleId: "1" },
  });

  let allCompletedBols;
  if (
    !completedBlLoading &&
    completedBolData &&
    completedBolData.getCompletedBolsByRole
  ) {
    console.log(completedBolData.getCompletedBolsByRole.length === 0);
    allCompletedBols = completedBolData.getCompletedBolsByRole;
  }

  // if (loading)
  //   return (
  //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  //       <Spin size="small" />
  //     </div>
  //   );

  let carrier;
  if (!loading && data) {
    carrier = data?.getUserById;
  }

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
          {carrier ? carrier.name : "Carrier Name"}
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
        {(allAcitveBols || allCompletedBols) &&
          ((allAcitveBols && allAcitveBols.length > 0) ||
            (allCompletedBols && allCompletedBols.length > 0)) && (
            <Table
              type={toggleTable}
              tableData={
                toggleTable === "shipper-carrier-active"
                  ? shipperCarrierActiveMockData
                  : shipperCarrierCompleteMockData
              }
              allBols={
                toggleTable === "shipper-carrier-active"
                  ? allAcitveBols
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
    </>
  );
};

export default CarrierProfile;
