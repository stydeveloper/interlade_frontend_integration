"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Table from "@/components/Tables";
import {
  completeMockData,
  carrierCompleteMockData,
} from "@/components/MockData";
import SidePanel from "@/components/SidePanel";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_COMPLETED_BOLS } from "@/fetching/queries/bol";

const CompletedBoLs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const search = searchParams.get("type");

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
    <div className="flex custom-activebols-Cont  fixed w-full">
      <SidePanel />
      <div className="flex flex-col items-center justify-center h-full w-full ml-[14rem]">
        <h1 className="underline text-2xl font-semibold flex items-center h-[10%] ">
          Completed B/Ls
        </h1>
        {/* <Table type="complete" tableData={completeMockData} /> */}
        {/* carrier view */}
        {allBols && allBols.length > 0 && search && (
          <Table
            type={`${search}`}
            tableData={carrierCompleteMockData}
            allBols={allBols}
            heightClass="h-[90%]"
          />
        )}
      </div>
    </div>
  );
};

export default CompletedBoLs;
