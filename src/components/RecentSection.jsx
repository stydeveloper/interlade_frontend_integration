"use client";
import Table from "./Tables";
import { activeMockData, carrierActiveMockData } from "./MockData";

import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import Select from "react-select";

import { GET_ALL_BOLS_QUERY } from "@/fetching/queries/bol";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FilterContext } from "./FilterProvider";

let recentBolsRefetchFunction;

const RecentSection = ({
  customHeightClass,
  filters,
  setFilters,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [roleId, setRoleId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // const [filters, setFilters] = useState({
  //   carrierName: null,
  //   status: null,
  //   shipperName: null,
  //   consigneeName: null,
  // });

  // Load filters state from localStorage or initialize with default values
  // const [filters, setFilters] = useState(() => {
  //   const storedFilters = localStorage.getItem("filters");
  //   return storedFilters
  //     ? JSON.parse(storedFilters)
  //     : {
  //         carrierName: null,
  //         status: null,
  //         shipperName: null,
  //         consigneeName: null,
  //       };
  // });
  useEffect(() => {
    // Check cookies for the role_id value
    const roleIdFromCookie = Cookies.get("role_id");
    setRoleId(roleIdFromCookie);

    // Determine user role based on roleId
    if (roleIdFromCookie === "1") {
      setUserRole("carrier");
    }
  }, []);

  // useEffect(() => {
  //   // Save filters state to localStorage whenever it changes
  //   localStorage.setItem("filters", JSON.stringify(filters));
  // }, [filters]);
  console.log("muazan ", filters.status);

  const {
    data,
    loading,
    error,
    refetch: recentBolsRefetch,
  } = useQuery(GET_ALL_BOLS_QUERY, {
    variables: {
      filters,
    }, // Pass filters as variables
    fetchPolicy: "network-only",
  });
  console.log("baasir ", filters.status);
  let allBols;
  if (data && !loading) {
    allBols = data.getBols;
    console.log(allBols);
    recentBolsRefetchFunction = recentBolsRefetch;
  }

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData =
    allBols &&
    allBols.filter((row) => {
      return (
        row.consignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.loadDesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.carrier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.lastAction?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleFilterChange = (selectedOptions) => {
    if (selectedOptions.length > 0) {
      const latestOption = selectedOptions[selectedOptions.length - 1];
      const { label, value } = latestOption;

      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };

        // Check the label and set the corresponding value in the filters state
        if (value === "carrier") {
          console.log("hello");
          updatedFilters.carrierName = [
            ...(updatedFilters.carrierName || []),
            label,
          ];
        } else if (value === "status") {
          updatedFilters.status = [...(updatedFilters.status || []), label];
        } else if (value === "shipper") {
          updatedFilters.shipperName = [
            ...(updatedFilters.shipperName || []),
            label,
          ];
        } else if (value === "consignee") {
          updatedFilters.consigneeName = [
            ...(updatedFilters.consigneeName || []),
            label,
          ];
        }

        return updatedFilters;
      });
      setSelectedFilters(selectedOptions);
    } else {
      setFilters({
        carrierName: null,
        status: null,
        shipperName: null,
        consigneeName: null,
      });
      setSelectedFilters([]);
    }
  };

  const createGroupedOptions = (tableData) => {
    const consigneesSet = new Set();
    const carriersSet = new Set();
    const shippersSet = new Set();
    const statusSet = new Set();

    // Iterate through the tableData to populate the sets with unique names

    if (tableData) {
      tableData.forEach((row) => {
        consigneesSet.add(row.consignee_id?.name);
        carriersSet.add(row.carrier_id?.name);
        shippersSet.add(row.shipper_id?.name);
        statusSet.add(row.status);
      });
    }

    // Convert sets to arrays
    const consignees = [...consigneesSet];
    const carriers = [...carriersSet];
    const shippers = [...shippersSet];
    const status = [...statusSet];

    // Map the arrays to the required format
    return [
      {
        label: "Consignee",
        options: consignees.map((name) => ({
          label: name,
          value: "consignee",
        })),
      },

      {
        label: "Shipper",
        options: shippers.map((name) => ({ label: name, value: "shipper" })),
      },
      {
        label: "Carrier",
        options: carriers.map((name) => ({ label: name, value: "carrier" })),
      },
      {
        label: "Status",
        options: status.map((name) => ({ label: name, value: "status" })),
      },
    ];
  };

  const groupedOptions = createGroupedOptions(allBols);

  return (
    <div className={`flex flex-col items-center ${customHeightClass} `}>
      <p className="underline text-xl h-[20%] flex items-center justify-center font-semibold">
        Recent B/Ls
      </p>

      <div className="flex h-[10%] items-center justify-center ">
        <input
          type="text"
          placeholder="Search..."
          className="p-1.5 border-2 border-textgray rounded-md w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          options={groupedOptions}
          onChange={handleFilterChange}
          isMulti
          placeholder="Filter by ..."
          className="w-96 mx-4 max-h-[40px]  border-[1px] z-20 border-textgray rounded-md"
        />
        <label className="mr-2">Date Range:</label>
        <input
          type="date"
          className="p-1 border-2 border-textgray rounded-md"
        />
        <hr className="border-2 border-textgray w-6" />
        <input
          type="date"
          className="p-1 border-2 border-textgray rounded-md"
        />
      </div>
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
          tableData={allBols}
          allBols={allBols}
          roleId={roleId}
          setFilters={setFilters}
          filters={filters}
        />
      )}
      {/* carrier's view*/}
      {/* <Table type="carrier-active" tableData={carrierActiveMockData}/> */}
    </div>
  );
};
export { recentBolsRefetchFunction };
export default RecentSection;
