import Link from "next/link";
import "../styles/table.css";
import { formatDate } from "@/utils/helper";
import { UPDATE_BOL } from "@/fetching/mutations/bol";
import { useMutation } from "@apollo/client";

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

const Row = ({ rowData, checked, toggleCheckbox, type, index }) => {
  const [updateBol] = useMutation(UPDATE_BOL);
  console.log("rowData.last_opened", rowData.last_opened);
  const handleClick = async (bolId) => {
    const currentDate = new Date().toISOString();
    // Perform your API call here
    try {
      // Example API call using fetch
      const response = await updateBol({
        variables: { id: bolId, lastOpened: currentDate },
      });
      if (response?.data?.updateBol) {
        console.log("hellop");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("rowdata ====>", type);
  switch (type) {
    case "active":
    case "recent":
      return (
        <tr className="text-center  table-row-class  bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{rowData?.consignee_id?.name}</td>

          <td>{rowData.description}</td>
          <td>{rowData?.carrier_id?.name}</td>
          <td>{rowData?.status}</td>
          <td>
            <Link
              href={`/bol/${rowData.id}`}
              className="underline"
              onClick={() => handleClick(rowData?.id)}
            >
              View B/L
            </Link>
          </td>
          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "complete":
      return (
        <tr className="text-center table-row-class text-white hover:bg-textgray">
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
    case "carrier-complete":
      return (
        <tr className="text-center table-row-class bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{formatDate(rowData?.created_at)} </td>
          <td>{rowData?.status || "unknown"}</td>
          <td>{formatDate(rowData?.updated_at) || "hello"} </td>
          <td>{rowData?.price}</td>
          {/* <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td> */}
        </tr>
      );
    case "carrier-active":
      return (
        <tr className="text-center table-row-class bg-cgray text-white hover:bg-gray-300 text-sm">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{formatDate(rowData?.created_at)}</td>
          <td>{rowData?.driver_id?.name || "not assigned"}</td>
          <td>{rowData?.status || "asasd"}</td>
          <td>{rowData?.price}</td>
          <td>
            <Link
              href={`/bol/${rowData.id}`}
              className="underline"
              onClick={() => handleClick(rowData?.id)}
            >
              View B/L
            </Link>
          </td>
          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "consignee-active":
    case "shipper-active":
      return (
        <tr className="text-center table-row-class bg-cgray text-white hover:bg-gray-300 text-sm">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />

          <td>{rowData?.shipper_id?.name || "shipper"}</td>
          <td>{rowData?.description || "unknown"}</td>
          <td>{rowData?.carrier_id?.name || "asasd"}</td>
          <td>{rowData?.status}</td>
          <td>
            <Link
              href={`/bol/${rowData.id}`}
              className="underline"
              onClick={() => handleClick(rowData?.id)}
            >
              View B/L
            </Link>
          </td>
          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "consignee-complete":
    case "shipper-complete":
      return (
        <tr className="text-center table-row-class bg-cgray text-white hover:bg-gray-300 text-sm">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />

          <td>{rowData?.id || "id"}</td>
          <td>{rowData?.consignee_id?.name || "asasd"}</td>
          <td>{rowData?.description || "unknown"}</td>
          <td>{rowData?.carrier_id?.name || "asasd"}</td>

          <td>{rowData.price}</td>
        </tr>
      );
    case "shipper-carrier-active":
      return (
        <tr className="text-center table-row-class bg-cgray text-white hover:bg-hoverGray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
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
        <tr className="text-center table-row-class text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* completed at / updated at */}
          <td>{formatDate(rowData?.updated_at) || "unknown"}</td>

          {/* //payment type */}
          <td>{rowData?.price} </td>
          {/* //bol id */}
          <td>{rowData.id}</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );

    case "carrier-shipper-active":
      return (
        <tr className="text-center table-row-class text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* driver name */}
          <td>driver</td>

          {/* //status*/}
          <td>{rowData?.status} </td>
          {/* //bol id */}
          <td>{rowData.price}</td>
          <td>last action</td>
          <td>
            <Link href={`/bol/${rowData.id}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );

    case "carrier-shipper-complete":
      return (
        <tr className="text-center table-row-class text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* driver name */}
          <td>driver</td>

          {/* //status*/}
          <td>{formatDate(rowData?.updated_at)} </td>
          {/* //bol id */}
          <td>{rowData.price}</td>

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
