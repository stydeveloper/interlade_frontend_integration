import Table from "./Tables";
import { activeMockData, carrierActiveMockData } from "./MockData";

import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_ALL_BOLS_QUERY } from "@/fetching/queries/bol";

const RecentSection = ({ customHeightClass }) => {
  const { data, loading, error } = useQuery(GET_ALL_BOLS_QUERY, {
    fetchPolicy: "network-only", // or "cache-and-network"
  });
  let allBols;
  if (data) {
    allBols = data.getBols;
    console.log(allBols);
  }

  return (
    <div className={`flex flex-col items-center ${customHeightClass}`}>
      <p className="underline text-xl h-[20%] flex items-center justify-center font-semibold">
        Recent B/Ls
      </p>
      {/* call to get table data should probably happen in the Table component based off whath type is passed to it */}
      {/* shipper/receiver's view */}
      {/* <a className="button__sign-up" href="/api/auth/signup">
          Sign Up
        </a> */}
      {loading ? (
        <Spin />
      ) : (
        <Table
          heightClass="h-[80%]"
          type="active"
          tableData={activeMockData}
          allBols={allBols}
        />
      )}
      {/* carrier's view*/}
      {/* <Table type="carrier-active" tableData={carrierActiveMockData}/> */}
    </div>
  );
};

export default RecentSection;
