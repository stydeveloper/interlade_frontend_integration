import React, { useState, useEffect } from "react";
import Row from "./Row";
import Image from "next/image";
import NoBills from "../../public/images/norecent.svg";
import Select from "react-select";
import "@/styles/table.css";
import { recentBolsRefetchFunction } from "./RecentSection";
import { FilterContext } from "./FilterProvider";

const getMessageByType = (type) => {
  const messages = {
    active: {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "carrier-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "carrier-complete": {
      title: "No Completed B/Ls",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    "consignee-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "consignee-complete": {
      title: "No Completed B/Ls",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    "shipper-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "shipper-complete": {
      title: "No Completed B/Ls",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    "shipper-carrier-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "shipper-carrier-complete": {
      title: "No Completed B/Ls",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    "carrier-shipper-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "carrier-shipper-complete": {
      title: "No Completed B/Ls",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    "carrier-driver-logs": {
      title: "No Driver Logs",
      description:
        "Documents that have been signed by the consignee will appear here.",
    },
    recent: {
      title: "No Recent B/Ls",
      description: "Documents that you recently worked on will appear here.",
    },
    "carrier-recent": {
      title: "No Recent B/Ls",
      description: "Documents that you recently worked on will appear here.",
    },
  };

  return messages[type] || null;
};

export const TableType =
  "active" ||
  "complete" ||
  "recent" ||
  "carrier-active" ||
  "carrier-complete" ||
  "carrier-shipper-active" ||
  "carrier-shipper-complete" ||
  "shipper-carrier-active" ||
  "shipper-carrier-complete" ||
  "driver-logs";
const excludedTypes = [
  "shipper-active",
  "shipper-complete",
  "carrier-active",
  "carrier-complete",
  "consignee-complete",
  "consignee-active",
  "recent",
  "active",
  "shipper-carrier-active",
  "shipper-carrier-complete",
  "carrier-shipper-active",
  "carrier-shipper-complete",
  "carrier-recent",
  "carrier-driver-logs",
];
const TableHeader = ({ type, masterInputCheck, masterInputOnChange }) => {
  return (
    <thead className="bg-white sticky top-0 z-10">
      <tr className="text-center">
        <th className="w-[5%]">
          <input
            type="checkbox"
            checked={masterInputCheck}
            onChange={masterInputOnChange}
            className="border-2 border-black rounded h-5 w-5 my-2"
          />
        </th>
        {(() => {
          switch (type) {
            case "active":
            case "recent":
              return (
                <>
                  <th>Consignee</th>
                  <th>Load Description</th>
                  <th>Carrier</th>
                  <th>Status</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th>Last Opened</th>
                </>
              );
            case "carrier-recent":
              return (
                <>
                  <th>Consignee</th>
                  <th>Load Description</th>
                  <th>Shipper</th>
                  <th>Status</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th>Last Opened</th>
                </>
              );
            case "complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Load Description</th>
                  <th>Carrier</th>
                  <th>Payment Type</th>
                  <th></th>
                </>
              );
            case "consignee-active":
            case "shipper-active":
              return (
                <>
                  <th className="w-[15%]">Consignee</th>
                  <th className="w-[15%]">Load Description</th>
                  <th className="w-[15%]">Carrier</th>
                  <th className="w-[15%]">Status</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th className="w-[10%]">Last Opened</th>
                </>
              );
            case "consignee-complete":
            case "shipper-complete":
              return (
                <>
                  <th className="w-[15%]">ID</th>
                  <th className="w-[15%]">Consignee</th>
                  <th className="w-[15%]">Load Description</th>
                  <th className="w-[15%]">Carrier</th>
                  <th className="w-[10%]">Prepaid/Collect</th>
                </>
              );
            case "carrier-active":
              return (
                <>
                  <th className="w-[15%]">Consignee</th>
                  <th className="w-[15%]">Placed </th>
                  <th className="w-[15%]">Driver</th>
                  <th className="w-[15%]">Status</th>
                  <th className="w-[10%]">Prepaid/Collect</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th className="w-[15%]">Last Opened</th>
                </>
              );
            case "carrier-complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed</th>
                  <th>Driver</th>
                  <th>Completed</th>
                  <th>Prepaid/Collect</th>
                  <th className="w-[15%]">Last Opened</th>
                </>
              );
            case "carrier-shipper-active":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Prepaid/Collect</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th className="w-[15%]">Last Opened</th>
                </>
              );
            case "carrier-shipper-complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed </th>
                  <th>Driver</th>
                  <th>Completed </th>
                  <th>Prepaid/Collect</th>
                  <th className="w-[15%]">Last Opened</th>
                </>
              );
            case "shipper-carrier-active":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Prepaid/Collect</th>
                  <th className="w-[10%]">Go to B/L</th>
                  <th>Last Opened</th>
                </>
              );
            case "shipper-carrier-complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed </th>
                  <th>Driver</th>
                  <th>Completed</th>
                  <th>Prepaid/Collect</th>

                  <th>Last Opened</th>
                </>
              );
            case "carrier-driver-logs":
              return (
                <>
                  <th>Shipper</th>
                  <th>Consignee</th>
                  <th>B/L No.</th>
                  <th>Activity Description</th>
                  <th>Date/Time</th>
                  <th className="w-[10%]">Go to B/L</th>
                </>
              );
          }
        })()}
        {!excludedTypes.includes(type) && (
          <th className="w-[10%]">Go to B/L</th>
        )}
      </tr>
    </thead>
  );
};
const Table = ({
  type,
  tableData,
  allBols,
  heightClass,
  setFilters,
  filters,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState(
    tableData ? Array(tableData.length).fill(false) : []
  );

  // const [roleId, setRoleId] = useState(null);

  // useEffect(() => {
  //   // Check cookies for the role_id value
  //   const roleIdFromCookie = Cookies.get("role_id");
  //   setRoleId(roleIdFromCookie);
  // }, []);
  const isAnyChecked = checkboxes.some((val) => val === true);
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckboxes(Array(tableData.length).fill(!selectAll));
  };

  const toggleCheckbox = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);

    if (newCheckboxes.every((val) => val === true)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  // const [searchTerm, setSearchTerm] = useState("");
  // const filteredData = tableData.filter((row) => {
  //   return (
  //     row.consignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.loadDesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.carrier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.lastAction?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  // const handleFilterChange = (selectedOptions) => {
  //   if (selectedOptions.length > 0) {
  //     const latestOption = selectedOptions[selectedOptions.length - 1];
  //     console.log(latestOption.label);
  //     console.log(latestOption.value);
  //   }

  //   setSelectedFilters(selectedOptions);
  // };

  // const handleFilterChange = (selectedOptions) => {
  //   if (selectedOptions.length > 0) {
  //     const latestOption = selectedOptions[selectedOptions.length - 1];
  //     const { label, value } = latestOption;

  //     setFilters((prevFilters) => {
  //       const updatedFilters = { ...prevFilters };

  //       // Check the label and set the corresponding value in the filters state
  //       if (value === "carrier") {
  //         console.log("hello");
  //         updatedFilters.carrierName = [
  //           ...(updatedFilters.carrierName || []),
  //           label,
  //         ];
  //       } else if (value === "status") {
  //         updatedFilters.status = [...(updatedFilters.status || []), label];
  //       } else if (value === "shipper") {
  //         updatedFilters.shipperName = [
  //           ...(updatedFilters.shipperName || []),
  //           label,
  //         ];
  //       } else if (value === "consignee") {
  //         updatedFilters.consigneeName = [
  //           ...(updatedFilters.consigneeName || []),
  //           label,
  //         ];
  //       }

  //       return updatedFilters;
  //     });
  //   }

  //   setSelectedFilters(selectedOptions);
  // };

  // const createGroupedOptions = (tableData) => {
  //   const consigneesSet = new Set();
  //   const carriersSet = new Set();
  //   const shippersSet = new Set();
  //   const statusSet = new Set();

  //   // Iterate through the tableData to populate the sets with unique names

  //   if (tableData) {
  //     tableData.forEach((row) => {
  //       consigneesSet.add(row.consignee_id?.name);
  //       carriersSet.add(row.carrier_id?.name);
  //       shippersSet.add(row.shipper_id?.name);
  //       statusSet.add(row.status);
  //     });
  //   }

  //   // Convert sets to arrays
  //   const consignees = [...consigneesSet];
  //   const carriers = [...carriersSet];
  //   const shippers = [...shippersSet];
  //   const status = [...statusSet];

  //   // Map the arrays to the required format
  //   return [
  //     {
  //       label: "Consignee",
  //       options: consignees.map((name) => ({
  //         label: name,
  //         value: "consignee",
  //       })),
  //     },

  //     {
  //       label: "Shipper",
  //       options: shippers.map((name) => ({ label: name, value: "shipper" })),
  //     },
  //     {
  //       label: "Carrier",
  //       options: carriers.map((name) => ({ label: name, value: "carrier" })),
  //     },
  //     {
  //       label: "Status",
  //       options: status.map((name) => ({ label: name, value: "status" })),
  //     },
  //   ];
  // };

  // const groupedOptions = createGroupedOptions(allBols);

  return (
    <div className={`w-full flex flex-col ${heightClass}  `}>
      <div
        className={`flex h-[10%] items-center w-full justify-center gap-2 my-1 ${
          !isAnyChecked && "opacity-0 pointer-events-none"
        }`}
      >
        {/* <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm"
          onClick={() => console.log("Clear")}
        >
          Clear
        </button>

        <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm"
          onClick={() => console.log("Print")}
        >
          Print
        </button>
        <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm "
          onClick={() => console.log("Download")}
        >
          Download
        </button> */}
        {/* <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm mx-2"
          onClick={() => console.log("Send")}
        >
          Send
        </button> */}
      </div>
      <div className="w-full relative  overflow-y-auto  rounded-sm h-[80%] px-6">
        <div className="rounded-lg border-2  overflow-hidden border-gray-300 mt-1">
          {allBols && allBols.length > 0 ? (
            <table className="w-[100%]   max-h-full">
              <TableHeader
                type={type}
                masterInputCheck={selectAll}
                masterInputOnChange={toggleSelectAll}
              />
              <tbody className="h-full  ">
                {allBols &&
                  allBols.length > 0 &&
                  allBols.map((rowData, index) => (
                    <Row
                      key={index}
                      checked={checkboxes[index]}
                      toggleCheckbox={toggleCheckbox}
                      type={type}
                      index={index}
                      rowData={rowData}
                    />
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center text-black bg-mainBoxesBg">
              <Image
                alt="No Recent B/Ls"
                src={NoBills}
                className="text-white "
              />
              <div className="flex flex-col">
                {(() => {
                  const message = getMessageByType(type);
                  console.log(message);
                  if (!message) return null;

                  return (
                    <div className="p-4">
                      <p className="font-bold text-2xl ">{message.title}</p>
                      <p className="max-w-[300px]">{message.description}</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
