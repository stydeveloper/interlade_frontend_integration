import Link from "next/link";
import "../styles/table.css";
import { formatDate } from "@/utils/helper";
import { UPDATE_BOL } from "@/fetching/mutations/bol";
import { useMutation } from "@apollo/client";

const Checkbox = ({ isChecked, toggleFunc, index, bolId }) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleFunc(index, bolId)}
        className="border border-black rounded h-5 w-5 my-2"
      />
    </td>
  );
};
// checked={checkboxes[index]}
// toggleCheckbox={toggleCheckbox}
// type={type}

const Row = ({ rowData, checked, toggleCheckbox, type, index }) => {
  const [updateBol] = useMutation(UPDATE_BOL);

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

  switch (type) {
    case "active":
    case "recent":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
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
    case "carrier-recent":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          <td>{rowData?.consignee_id?.name}</td>

          <td>{rowData.description}</td>
          <td>{rowData?.shipper_id?.name}</td>
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
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
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
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <th>Consignee</th>
          <th>Placed</th>
          <th>Driver</th>
          <th>Completed</th>
          <th>Prepaid/Collect</th>
          <th className="w-[15%]">Last Opened</th> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{formatDate(rowData?.created_at)} </td>
          <td>{rowData?.driver_id?.name || "not assigned"}</td>
          <td>{formatDate(rowData?.updated_at) || "hello"} </td>
          <td>{rowData?.price}</td>
          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "carrier-active":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
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
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <th className="w-[15%]">Consignee</th>
          <th className="w-[15%]">Load Description</th>
          <th className="w-[15%]">Carrier</th>
          <th className="w-[15%]">Status</th>
          <th className="w-[10%]">Go to B/L</th>
          <th className="w-[10%]">Last Opened</th> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
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
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
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
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <>
            <th>Consignee</th>
            <th>Placed</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Prepaid/Collect</th>
            <th className="w-[10%]">Go to B/L</th>
            <th>Last Opened</th>
          </> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>

          <td>{rowData?.driver_id?.name || "not assigned"}</td>
          {/* //payment type */}
          <td>{rowData?.status}</td>
          <td>{rowData?.price}</td>

          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "shipper-carrier-complete":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <>
            <th>Consignee</th>
            <th>Placed </th>
            <th>Driver</th>
            <th>Completed</th>
            <th>Prepaid/Collect</th>

            <th>Last Opened</th>
          </> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* completed at / updated at */}
          <td>{rowData?.driver_id?.name || "not assigned"}</td>

          {/* //payment type */}

          <td>{formatDate(rowData?.updated_at)} </td>
          <td>{rowData?.price} </td>
          {/* //bol id */}

          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );

    case "carrier-shipper-active":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <>
            <th>Consignee</th>
            <th>Placed</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Prepaid/Collect</th>
            <th className="w-[10%]">Go to B/L</th>
            <th className="w-[15%]">Last Opened</th>
          </> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* driver name */}
          <td>{rowData?.driver_id?.name || "not assigned"}</td>

          {/* //status*/}
          <td>{rowData?.status} </td>
          {/* //bol id */}
          <td>{rowData.price}</td>

          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );

    case "carrier-shipper-complete":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <>
            <th>Consignee</th>
            <th>Placed </th>
            <th>Driver</th>
            <th>Completed </th>
            <th>Prepaid/Collect</th>
            <th className="w-[15%]">Last Opened</th>
          </> */}

          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          {/* //placedAt */}
          <td>{formatDate(rowData?.created_at)} </td>
          {/* driver name */}
          <td>{rowData?.driver_id?.name || "not assigned"}</td>

          {/* //status*/}
          <td>{formatDate(rowData?.updated_at)} </td>
          {/* //bol id */}
          <td>{rowData.price}</td>

          <td>
            {rowData?.last_opened === undefined || rowData?.last_opened === null
              ? "----"
              : formatDate(rowData?.last_opened)}
          </td>
        </tr>
      );
    case "carrier-driver-logs":
      return (
        <tr
          className={`text-center table-row-class ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
          } text-black hover:bg-gray-400`}
        >
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
            bolId={rowData?.id}
          />

          {/* <th>Shipper</th>
          <th>Consignee</th>
          <th>B/L No.</th>
          <th>Activity Description</th>
          <th>Date/Time</th> */}

          <td>{rowData?.shipper_id?.name || "shipper"}</td>
          <td>{rowData?.consignee_id?.name || "consignee"}</td>
          <td>{rowData?.id || "order no"}</td>
          <td>{rowData?.description}</td>
          <td>{formatDate(rowData?.updated_at)} </td>
        </tr>
      );

    default:
      return null;
  }
};

export default Row;
