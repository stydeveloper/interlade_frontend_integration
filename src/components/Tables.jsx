import { useState, useEffect } from "react";
import Row from "./Row";
import Image from "next/image";
import NoBills from "../../public/images/norecent.svg";
import Select from "react-select";

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

const TableHeader = ({ type, masterInputCheck, masterInputOnChange }) => {
  return (
    <thead className="bg-white sticky top-0">
      <tr className="text-center">
        <th>
          <input
            type="checkbox"
            checked={masterInputCheck}
            onChange={masterInputOnChange}
            className="border-2 border-black rounded h-5 w-5 my-2"
          />
        </th>
        {(() => {
          switch (type) {
            case "active" || "recent":
              return (
                <>
                  <th>Consignee</th>
                  <th>Load Description</th>
                  <th>Carrier</th>
                  <th>Status</th>
                  <th>Last Action</th>
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
            case "rolewise-active":
              return (
                <>
                  <th>Shipper</th>
                  <th>Consignee</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Payment Type</th>
                  <th>Placed At</th>
                </>
              );
            case "rolewise-complete":
              return (
                <>
                  <th>Shipper</th>
                  <th>Consignee</th>
                  <th>Placed At</th>
                  <th>Driver</th>
                  <th>Completed At</th>
                  <th>Payment Type</th>
                </>
              );
            case "carrier-shipper-active":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed At</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Payment Type</th>
                  <th>Last Action</th>
                </>
              );
            case "carrier-shipper-complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed At</th>
                  <th>Driver</th>
                  <th>Completed At</th>
                  <th>Payment Type</th>
                </>
              );
            case "shipper-carrier-active":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed At</th>
                  <th>Status</th>
                  <th>Payment Type</th>
                  <th>Last Action</th>
                </>
              );
            case "shipper-carrier-complete":
              return (
                <>
                  <th>Consignee</th>
                  <th>Placed At</th>
                  <th>Completed At</th>
                  <th>Payment Type</th>
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
        <th>Go to B/L</th>
      </tr>
    </thead>
  );
};

const Table = ({ type, tableData, allBols }) => {
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
    <>
      <div className="flex items-center justify-center">
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
          className="w-96 mx-4 max-h[38px]  border-[1px] border-textgray rounded-md"
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
        className={`flex mt-2 ${
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
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm mx-2"
          onClick={() => console.log("Send")}
        >
          Send
        </button>
        <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm"
          onClick={() => console.log("Print")}
        >
          Print
        </button>
        <button
          className="bg-gray px-2 border-2 border-borderGrey rounded-md text-sm mx-2"
          onClick={() => console.log("Download")}
        >
          Download
        </button>
      </div>
      <div className="w-full bg-borderGrey border-2 border-gray overflow-y-auto rounded-sm mt-2">
        {tableData.length ? (
          <table className="w-full">
            <TableHeader
              type={type}
              masterInputCheck={selectAll}
              masterInputOnChange={toggleSelectAll}
            />
            <tbody>
              {allBols &&
                allBols.length > 0 &&
                allBols.map((rowData, index) => (
                  <Row
                    key={index}
                    checked={checkboxes[index]}
                    toggleCheckbox={toggleCheckbox}
                    type={type}
                    rowData={rowData}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center text-white">
            <Image alt="No Recent B/Ls" src={NoBills} />
            <div className="flex flex-col">
              {(() => {
                switch (type) {
                  case "active" || "carrier-active" || "carrier-shipper-active":
                    return (
                      <>
                        <p className="font-bold text-2xl">No Active B/Ls</p>
                        <p className="max-w-[300px]">
                          Documents that are live in the field will appear here.
                        </p>
                      </>
                    );
                  case "complete" ||
                    "carrier-complete" ||
                    "carrier-shipper-complete":
                    return (
                      <>
                        <p className="font-bold text-2xl ">No Completed B/Ls</p>
                        <p className="max-w-[300px]">
                          Documents that have been signed by the consignee will
                          appear here.
                        </p>
                      </>
                    );
                  case "recent":
                    return (
                      <>
                        <p className="font-bold text-2xl">No Recent B/Ls</p>
                        <p className="max-w-[300px]">
                          Documents that you recently worked on will appear
                          here.
                        </p>
                      </>
                    );
                }
              })()}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
