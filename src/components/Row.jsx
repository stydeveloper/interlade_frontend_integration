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

const Row = ({
  bolId,
  consignee,
  loadDesc,
  carrier,
  status,
  lastAction,
  paymentType,
  checked,
  index,
  type,
  placedAt,
  shipper,
  completedAt,
  driver,
  activity,
  dateTime,
  toggleCheckbox,
}) => {
  console.log(type);
  switch (type) {
    case "active":
    case "recent":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{consignee}</td>
          <td>{loadDesc}</td>
          <td>{carrier}</td>
          <td>{status}</td>
          <td>{lastAction}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
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
    case "carrier-complete":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{shipper}</td>
          <td>{consignee}</td>
          <td>{placedAt}</td>
          <td>{driver}</td>
          <td>{completedAt}</td>
          <td>{paymentType}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "carrier-active":
      return (
        <tr className="text-center bg-cgray text-white hover:bg-gray-300">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{shipper}</td>
          <td>{consignee}</td>
          <td>{driver}</td>
          <td>{status}</td>
          <td>{paymentType}</td>
          <td>{placedAt}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "carrier-shipper-active":
      return (
        <tr className="text-center text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{consignee}</td>
          <td>{placedAt}</td>
          <td>{driver}</td>
          <td>{status}</td>
          <td>{paymentType}</td>
          <td>{lastAction}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "carrier-shipper-complete":
      return (
        <tr className="text-center text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{consignee}</td>
          <td>{placedAt}</td>
          <td>{driver}</td>
          <td>{completedAt}</td>
          <td>{paymentType}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View B/L
            </Link>
          </td>
        </tr>
      );
    case "driver-logs":
      return (
        <tr className="text-center text-white hover:bg-textgray">
          <Checkbox
            isChecked={checked}
            toggleFunc={toggleCheckbox}
            index={index}
          />
          <td>{shipper}</td>
          <td>{consignee}</td>
          <td>{activity}</td>
          <td>{dateTime}</td>
          <td>
            <Link href={`/bol/${bolId}`} className="underline">
              View Assoc. B/L
            </Link>
          </td>
        </tr>
      );

    default:
      return null;
  }
};

export default Row;
