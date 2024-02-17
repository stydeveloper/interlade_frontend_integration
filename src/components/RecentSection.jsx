import Table from "./Tables";
import { activeMockData, carrierActiveMockData } from "./MockData";

import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_ALL_BOLS_QUERY } from "@/fetching/queries/bol";

const RecentSection = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOLS_QUERY);
  let allBols;
  if (data) {
    allBols = data.getBols;
    console.log(allBols);
  }

  return (
    <div className="flex flex-col items-center h-[75vh]">
      <p className="underline text-xl mb-8 mt-24 font-semibold">Recent B/Ls</p>
      {/* call to get table data should probably happen in the Table component based off whath type is passed to it */}
      {/* shipper/receiver's view */}
      {/* <a className="button__sign-up" href="/api/auth/signup">
        Sign Up
      </a> */}
      {loading ? (
        <Spin />
      ) : (
        <Table type="active" tableData={activeMockData} allBols={allBols} />
      )}
      {/* carrier's view*/}
      {/* <Table type="carrier-active" tableData={carrierActiveMockData}/> */}
    </div>
  );
};

export default RecentSection;
