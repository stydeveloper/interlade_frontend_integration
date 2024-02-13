"use client";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import { activeMockData, carrierActiveMockData } from "@/components/MockData";
import SidePanel from "@/components/SidePanel";

// needs to take in user's role & id to decide which view of active b/ls to show (shipper/carrier/drivers/receiver)

const ActiveBoLs = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen fixed w-full">
      <SidePanel />
      <div className="flex flex-col items-center justify-center m-6 h-[90vh] w-full ml-60">
        <h1 className="underline text-2xl font-semibold mb-12">Active B/Ls</h1>
        {/* <Table type="active" tableData={[]} /> */}
        {/* carrier view */}
        <Table type="carrier-active" tableData={carrierActiveMockData} />
      </div>
    </div>
  );
};

export default ActiveBoLs;
