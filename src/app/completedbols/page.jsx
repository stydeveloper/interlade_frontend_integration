"use client";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import {
  completeMockData,
  carrierCompleteMockData,
} from "@/components/MockData";
import SidePanel from "@/components/SidePanel";

const CompletedBoLs = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen fixed w-full">
      <SidePanel />
      <div className="flex flex-col items-center justify-center m-6 ml-60 h-[90vh] w-full">
        <h1 className="underline text-2xl font-semibold mb-12">
          Completed B/Ls
        </h1>
        {/* <Table type="complete" tableData={completeMockData} /> */}
        {/* carrier view */}
        <Table type="carrier-complete" tableData={carrierCompleteMockData} />
      </div>
    </div>
  );
};

export default CompletedBoLs;
