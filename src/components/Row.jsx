import Link from "next/link";

const Checkbox = ({ isChecked, toggleFunc, index }) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleFunc(index)}
        className="border-2 border-white rounded h-5 w-5 my-2"
      />
    </td>
  );
};
// checked={checkboxes[index]}
// toggleCheckbox={toggleCheckbox}
// type={type}

const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Format the date without comma
  const formattedDate = date
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock
    })
    .replace(/,/g, ""); // Replace all commas with an empty string

  return formattedDate;
};

const Row = ({ rowData, checked, toggleCheckbox, type }) => {
  console.log("rowdata ====>", type);
  switch (type) {
    case "active":
    case "recent":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={rowData.id}
          />
          <td>{rowData?.consignee_id?.name}</td>

          <td>{rowData.description}</td>
          <td>{rowData?.carrier_id?.name}</td>
          <td>{rowData.status}</td>
          <td>hellow</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "complete":
      return (
        <tr className="text-center text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>hello</td>
          <td>{loadDesc}</td>
          <td>{carrier}</td>
          <td>{paymentType}</td>
          <td>{lastAction}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "rolewise-complete":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={rowData.id}
          />
          <td>{rowData?.shipper_id?.name || shipper}</td>
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{formatDate(rowData?.created_at)} </td>
          <td>{rowData?.driver_id?.name || "unknown"}</td>
          <td>{formatDate(rowData?.created_at)} </td>
          <td>{rowData?.price}</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "rolewise-active":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={rowData.id}
          />
          <td>{rowData?.shipper_id?.name || shipper}</td>
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{rowData?.driver_id?.name || "unknown"}</td>
          <td>{rowData?.status || "asasd"}</td>
          <td>{rowData?.price}</td>
          <td>{rowData?.created_at}</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "shipper-carrier-active":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-hoverGray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={rowData.id}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>

          <td>{rowData?.status || "asasd"}</td>
          {/* //payment type */}
          <td>{rowData?.price}</td>
          <td>{rowData.id}</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "shipper-carrier-complete":
      return (
        <tr className="text-center text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={rowData.id}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          <td>{rowData?.driver_id?.name || "unknown"}</td>
          {/* completed at / updated at */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* //payment type */}
          <td>{rowData?.price}</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    // case "driver-logs":
    //   return (
    //     <tr className="text-center text-white hover:bg-textgray">
    //       <Checkbox
    //         isChecked={checked}
    //         toggleFunc={toggleCheckbox}
    //         index={index}
    //       />
    //       <td>{shipper}</td>
    //       <td>{consignee}</td>
    //       <td>{activity}</td>
    //       <td>{dateTime}</td>
    //       <td>
    //         <Link href={`/bol/${bolId}`} className="underline">
    //           View Assoc. B/L
    //         </Link>
    //       </td>
    //     </tr>
    //   );

    default:
      return null;
  }
};

export default Row;
