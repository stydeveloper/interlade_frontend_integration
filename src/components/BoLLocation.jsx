import Image from "next/image";
import Marker from "../../public/images/polygon.png";

const LocationMarker = ({ ltr, name, latestAgent }) => {
  const fullLtrWord = (ltr, latestAgent) => {
    switch (ltr) {
      case "s":
        return "Shipper";
      case "c":
        return latestAgent === "Carrier" ? "Carrier" : "Driver";
      case "r":
        return "Consignee";
    }
  };

  const bgColor =
    latestAgent === fullLtrWord(ltr, latestAgent) ? "bg-lilPurp" : "";
  return (
    <div className="flex items-center my-4">
      {latestAgent === fullLtrWord(ltr, latestAgent) && (
        <Image src={Marker} alt="Marker" width={25} className="mr-2 " />
      )}
      <p className={`${bgColor} border-2 border-black py-1 px-4 uppercase`}>
        {ltr}
      </p>
      <p className="ml-4 font-semibold text-base">{name}</p>
    </div>
  );
};

const CurrentBoLLocation = ({ data, lastUser, currentBol }) => {
  const mostRecentAction = data.actionData[data.actionData.length - 1];
  // const latestAgent = mostRecentAction?.agent;
  const latestAgent = lastUser;
  console.log("latestAgent---", latestAgent);

  return (
    <div>
      <LocationMarker
        ltr="s"
        // name={data.shipper.name}
        name={currentBol?.shipper_id?.name}
        latestAgent={latestAgent}
      />
      <LocationMarker
        ltr="c"
        // name={data.carrier.name}
        name={currentBol?.carrier_id?.name}
        latestAgent={latestAgent}
      />
      <LocationMarker
        ltr="r"
        // name={data.consignee.name}
        name={currentBol?.consignee_id?.name}
        latestAgent={latestAgent}
      />
    </div>
  );
};

export default CurrentBoLLocation;
