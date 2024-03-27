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
import withSuspense from "@/components/hoc/withSuspense";
import React, { useEffect, useState } from "react";
import { FilterContext } from "@/components/FilterProvider";
import SearchIcon from "../../../public/images/icons8-search-50.png";
import Image from "next/image";
import Select from "react-select";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const CompletedBoLs = () => {
  const router = useRouter();
  const { filters, setFilters, selectedFilters, setSelectedFilters } =
    React.useContext(FilterContext);
  const searchParams = useSearchParams();
  const search = searchParams.get("type");

  const { loading, error, data } = useQuery(GET_COMPLETED_BOLS, {
    variables: {
      filters,
    }, // Pass filters as variables
    fetchPolicy: "network-only",
  });
  let allBols;
  if (data) {
    allBols = data?.getCompletedBols;
  }
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

  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({ from: null, to: null });

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
        driverName: null,
      });
      setSelectedFilters([]);
    }
  };
  const handleDateChange = (type, value) => {
    setDate((prevDate) => ({
      ...prevDate,
      [type]: value,
    }));
  };

  const handleSetDate = () => {
    console.log(date);
    if (!date && !date.from && !date.to) {
      toast.error("Set date first", { position: "top-right" });
      return;
    }
    if (date.from && date.to && new Date(date.from) > new Date(date.to)) {
      toast.error("Start date cannot be greater than End date", {
        position: "top-right",
      });
      return;
    }
    // Perform search with updated filters including date
    setFilters({ ...filters, date });
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

    let returnValue;
    if (userRole === "carrier") {
      returnValue = [
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
          label: "Status",
          options: status.map((name) => ({ label: name, value: "status" })),
        },
      ];
    } else {
      returnValue = [
        {
          label: "Consignee",
          options: consignees.map((name) => ({
            label: name,
            value: "consignee",
          })),
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
    }

    return returnValue;
  };

  const groupedOptions = createGroupedOptions(allBols);

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
      <div className="flex flex-col items-center justify-center h-full w-full ml-[14rem] mt-4">
        <h1 className="underline text-2xl font-semibold flex items-center h-[10%] ">
          Completed B/Ls
        </h1>

        <div className="flex h-[10%] items-center justify-center relative mt-2">
          <div className="flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-1.5 border-2 border-textgray rounded-md w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Image
                src={SearchIcon}
                alt="Search"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    search: searchTerm, // Corrected syntax
                  }))
                }
              />
            </div>
          </div>

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
            value={date.from || ""}
            onChange={(e) => handleDateChange("from", e.target.value)}
          />
          <hr className="border-2 border-textgray w-6" />
          <input
            type="date"
            className="p-1 border-2 border-textgray rounded-md"
            value={date.to || ""}
            onChange={(e) => handleDateChange("to", e.target.value)}
          />
          <input
            type="button"
            className="p-1 ml-2 border-2 border-textgray rounded-md cursor-pointer"
            value="Find"
            onClick={handleSetDate}
          />
        </div>
        {/* <Table type="complete" tableData={completeMockData} /> */}
        {/* carrier view */}
        {/* {allBols && allBols.length > 0 && search && (
          <Table
            type={`${search}`}
            tableData={carrierCompleteMockData}
            allBols={allBols}
            heightClass="h-[90%]"
          />
        )} */}

        <Table
          type={`${search}`}
          tableData={allBols}
          allBols={allBols}
          heightClass="h-[90%]"
        />
      </div>
    </div>
  );
};

export default withSuspense(CompletedBoLs);
