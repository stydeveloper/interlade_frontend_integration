"use client";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import {
  completeMockData,
  carrierCompleteMockData,
} from "@/components/MockData";
import SidePanel from "@/components/SidePanel";
import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";

const GET_COMPLETED_BOLS = gql`
  query GetCompletedBols {
    getCompletedBols {
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

const CompletedBoLs = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_COMPLETED_BOLS);
  let allBols;
  if (data) {
    allBols = data?.getCompletedBols;
  }

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error) return <div>Error! {error.message}</div>;
  return (
    <div className="flex h-screen fixed w-full">
      <SidePanel />
      <div className="flex flex-col items-center justify-center m-6 ml-60 h-[90vh] w-full">
        <h1 className="underline text-2xl font-semibold mb-12">
          Completed B/Ls
        </h1>
        {/* <Table type="complete" tableData={completeMockData} /> */}
        {/* carrier view */}
        <Table
          type="rolewise-complete"
          tableData={carrierCompleteMockData}
          allBols={allBols}
        />
      </div>
    </div>
  );
};

export default CompletedBoLs;
