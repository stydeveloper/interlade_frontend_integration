import { useState, useEffect } from "react";
import Row from "./Row";
import Image from "next/image";
import NoBills from "../../public/images/norecent.svg";
import Select from "react-select";

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
      description: "Documents that are live in the field will appear here.",
    },
    "consignee-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "consignee-complete": {
      title: "No Completed B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "shipper-active": {
      title: "No Active B/Ls",
      description: "Documents that are live in the field will appear here.",
    },
    "shipper-complete": {
      title: "No Completed B/Ls",
      description: "Documents that are live in the field will appear here.",
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
    recent: {
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
];
const TableHeader = ({ type, masterInputCheck, masterInputOnChange }) => {
  return (
    <thead className="bg-white sticky top-0">
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
            case "driver-logs":
              return (
                <>
                  <th>Shipper</th>
                  <th>Consignee</th>
                  <th>Activity Description</th>
                  <th>Date/Time</th>
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
const Table = ({ type, tableData, allBols, heightClass }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState(
    tableData ? Array(tableData.length).fill(false) : []
  );
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

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = tableData.filter((row) => {
    return (
      row.consignee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.loadDesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.carrier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastAction?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

  const createGroupedOptions = (tableData) => {
    const consignees = [...new Set(tableData.map((row) => row.consignee))];
    const carriers = [...new Set(tableData.map((row) => row.carrier))];
    const status = [...new Set(tableData.map((row) => row.status))];

    return [
      {
        label: "Consignee",
        options: consignees.map((name) => ({ label: name, value: name })),
      },
      {
        label: "Carrier",
        options: carriers.map((name) => ({ label: name, value: name })),
      },
      {
        label: "Status",
        options: status.map((name) => ({ label: name, value: name })),
      },
    ];
  };

  const groupedOptions = createGroupedOptions(tableData);

  return (
    <div className={`w-full flex flex-col ${heightClass}`}>
      <div className="flex h-[10%] items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-1.5 border-2 border-textgray rounded-md w-60"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          options={groupedOptions}
          onChange={() => handleFilterChange}
          isMulti
          placeholder="Filter by ..."
          className="w-96 mx-4 max-h-[40px] overflow-y-auto border-[1px] border-textgray rounded-md"
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
      <div
        className={`flex h-[10%] items-center w-full justify-center gap-2 my-1 ${
          !isAnyChecked && "opacity-0 pointer-events-none"
        }`}
      >
        <button
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
        </button>
        {/* <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm mx-2"
          onClick={() => console.log("Send")}
        >
          Send
        </button> */}
      </div>
      <div
        className={`w-full table-bg  border-2 border-gray overflow-y-auto rounded-sm h-[80%]`}
      >
        {allBols && allBols.length > 0 ? (
          <table className="w-[100%]   max-h-full">
            <TableHeader
              type={type}
              masterInputCheck={selectAll}
              masterInputOnChange={toggleSelectAll}
            />
            <tbody className="h-full ">
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
          <div className="flex justify-center items-center text-white bg-cgray">
            <Image alt="No Recent B/Ls" src={NoBills} className="text-white " />
            <div className="flex flex-col">
              {(() => {
                const message = getMessageByType(type);
                console.log(message);
                if (!message) return null;

                return (
                  <div className=" p-4">
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
  );
};

export default Table;
