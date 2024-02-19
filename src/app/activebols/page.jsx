"use client";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import { activeMockData, carrierActiveMockData } from "@/components/MockData";
import SidePanel from "@/components/SidePanel";
import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";
import "../../styles/table.css";

// needs to take in user's role & id to decide which view of active b/ls to show (shipper/carrier/drivers/receiver)
const GET_ACTIVE_BOLS = gql`
  query GetActiveBols {
    getActiveBols {
      id
      carrier_id {
        id
        name
        email
        address
        state
        city
        number
        created_at
        zipcode
        role_id {
          id
          name
        }
      }
      shipper_id {
        id
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
        role_id {
          id
          name
        }
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

const ActiveBoLs = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ACTIVE_BOLS);
  let allBols;
  if (data) {
    allBols = data?.getActiveBols;
  }

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="flex custom-activebols-Cont  fixed w-full">
      <SidePanel />
      <div className="flex flex-col items-center justify-center h-full w-full ml-[14rem]">
        <h1 className="underline text-2xl font-semibold flex items-center h-[10%] ">
          Active B/Ls
        </h1>
        {allBols && allBols.length > 0 && (
          <Table
            type="rolewise-active"
            tableData={carrierActiveMockData}
            allBols={allBols}
            heightClass="h-[90%]"
          />
        )}
      </div>
    </div>
  );
};

export default ActiveBoLs;
