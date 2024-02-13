"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Table from "@/components/Tables";
import BackBtn from "../../../../public/images/backBtn.svg";
import { mockDailyLogData } from "@/components/MockData";

const DriverLogs = ({ params }) => {
  const router = useRouter();
  return (
    <>
      <Image
        alt="Back"
        src={BackBtn}
        width={40}
        className="fixed top-18 left-4 mt-6 cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center mt-6">
        <h1 className="underline italic text-2xl font-semibold">
          {/* fetch driver data via params.id */}
          John Doe
        </h1>
        <p className="mb-12">
          Employee Id:
          {params.id}
        </p>
        <h1 className="underline text-2xl font-semibold mb-8">Daily Logs</h1>
        <Table type="driver-logs" tableData={mockDailyLogData} />
      </div>
    </>
  );
};

export default DriverLogs;
