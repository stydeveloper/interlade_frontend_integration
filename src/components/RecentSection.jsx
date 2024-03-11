import Table from "./Tables";
import { activeMockData, carrierActiveMockData } from "./MockData";

import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_ALL_BOLS_QUERY } from "@/fetching/queries/bol";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

let recentBolsRefetchFunction;

const RecentSection = ({ customHeightClass }) => {
  const [roleId, setRoleId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    // Check cookies for the role_id value
    const roleIdFromCookie = Cookies.get("role_id");
    setRoleId(roleIdFromCookie);

    // Determine user role based on roleId
    if (roleIdFromCookie === "1") {
      setUserRole("carrier");
    }
  }, []);
  const {
    data,
    loading,
    error,
    refetch: recentBolsRefetch,
  } = useQuery(GET_ALL_BOLS_QUERY, {
    fetchPolicy: "network-only", // or "cache-and-network"
  });
  let allBols;
  if (data && !loading) {
    allBols = data.getBols;
    recentBolsRefetchFunction = recentBolsRefetch;
    console.log(allBols);
  }

  return (
    <div className={`flex flex-col items-center ${customHeightClass} `}>
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
          type={userRole === "carrier" ? "carrier-recent" : "recent"}
          tableData={activeMockData}
          allBols={allBols}
        />
      )}
      {/* carrier's view*/}
      {/* <Table type="carrier-active" tableData={carrierActiveMockData}/> */}
    </div>
  );
};
export { recentBolsRefetchFunction };
export default RecentSection;
