"use client";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import { activeMockData, carrierActiveMockData } from "@/components/MockData";
import SidePanel from "@/components/SidePanel";
import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";
import "../../styles/table.css";
import { GET_ACTIVE_BOLS } from "@/fetching/queries/bol";
import { useSearchParams } from "next/navigation";
import withSuspense from "@/components/hoc/withSuspense";

// needs to take in user's role & id to decide which view of active b/ls to show (shipper/carrier/drivers/receiver)

const ActiveBoLs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("type");

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
        {/* {allBols && allBols.length > 0 && search && (
          <Table
            type={`${search}`}
            tableData={carrierActiveMockData}
            allBols={allBols}
            heightClass="h-[90%]"
          />
        )} */}

        <Table
          type={`${search}`}
          tableData={carrierActiveMockData}
          allBols={allBols}
          heightClass="h-[90%]"
        />
      </div>
    </div>
  );
};

export default withSuspense(ActiveBoLs);
