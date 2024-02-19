import Image from "next/image";
import Link from "next/link";
import Active from "../../public/images/document.png";
import Completed from "../../public/images/secure-document.png";
import CreateDoc from "../../public/images/create-document.png";
import BoxManIcon from "../../public/images/shipper.png";
import DriversIcon from "../../public/images/driverIcon.png";
import { useEffect, useState } from "react";

const Box = ({ title, desc, imageSrc, link }) => {
  return (
    <Link
      href={link}
      className="bg-boxblack hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center  h-[100%]  flex flex-col font-semibold"
    >
      <div className="flex items-center m-4">
        <Image alt="" src={imageSrc} height={60} width={60} />
        <p className="text-white ml-2">{title}</p>
      </div>
      <p className="text-white mx-6 underline text-sm">{desc}</p>
    </Link>
  );
};

const ShippersBox = ({
  activeBls,
  collectContracts,
  completedBls,
  prepaidContracts,
}) => {
  return (
    <Link
      href="/shippers"
      className="bg-boxblack hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center h-[100%] flex flex-col font-semibold"
    >
      <div className="flex items-center m-4 mt-2 mb-2">
        <Image src={BoxManIcon} alt="Shippers Icon" width={50} />
        <p className="text-white ml-4 mt-2 text-xl">Shippers</p>
      </div>
      <p className="text-white mx-6 text-sm">Active B/Ls: {activeBls}</p>
      <p className="text-white mx-6 text-sm">Completed B/Ls: {completedBls}</p>
      <p className="text-white mx-6 text-sm">Prepaid: {prepaidContracts}</p>
      <p className="text-white mx-6 text-sm">Collect: {collectContracts}</p>
    </Link>
  );
};

const CarriersBox = ({ numOfCarriers, activeBls, completedBls }) => {
  return (
    <Link
      href="/carriers"
      className="bg-boxblack  hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center  h-[100%]  flex flex-col font-semibold"
    >
      <div className="flex items-center m-4 mt-2 mb-2">
        <Image src={BoxManIcon} alt="Carriers Icon" width={50} />
        <p className="text-white ml-4 mt-2 text-xl">Carriers</p>
      </div>
      <p className="text-white mx-6 mt-2 text-sm">
        Associated Carriers: {numOfCarriers}
      </p>
      <p className="text-white mx-6 my-2 text-sm">Active B/Ls: {activeBls}</p>
      <p className="text-white mx-6 text-sm">Completed B/Ls: {completedBls}</p>
    </Link>
  );
};

const DriversBox = ({
  pickupInRoute,
  atPickup,
  dropoffInRoute,
  atDropoff,
  inactive,
}) => {
  return (
    <Link
      href="/drivers"
      className="bg-boxblack  hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center  h-[100%]  flex flex-col font-semibold"
    >
      <div className="flex items-center m-4 mt-2 mb-0">
        <Image src={DriversIcon} alt="Drivers Icon" width={50} />
        <p className="text-white ml-4 text-xl">Drivers</p>
      </div>
      <p className="text-white mx-6 text-sm">
        In Route to Pickup: {pickupInRoute}
      </p>
      <p className="text-white mx-6 text-sm">At Pickup: {atPickup}</p>
      <p className="text-white mx-6 text-sm">
        In Route to Dropoff: {dropoffInRoute}
      </p>
      <p className="text-white mx-6 text-sm">At Dropoff: {atDropoff}</p>
      <p className="text-white mx-6 text-sm">Inactive: {inactive}</p>
    </Link>
  );
};

const FourBox = () => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    setRoleId(localStorage.getItem("role_id"));
  }, []);
  return (
    <div className="flex justify-between h-[80%] items-center w-full relative z-20 bg-transparent mx-16">
      {roleId && roleId !== "3" && roleId !== "2" && (
        <ShippersBox
          activeBls={72}
          completedBls={127}
          prepaidContracts={42}
          collectContracts={130}
        />
      )}
      {roleId && roleId !== "3" && roleId !== "2" && (
        <DriversBox
          inactive={14}
          pickupInRoute={24}
          atPickup={13}
          dropoffInRoute={42}
          atDropoff={11}
        />
      )}
      {roleId && roleId !== "1" && (
        <CarriersBox activeBls={72} completedBls={127} numOfCarriers={22} />
      )}
      {roleId && roleId === "2" && (
        <Box
          title="Create BoL"
          desc="Create a BoL using our standardized template document"
          imageSrc={CreateDoc}
          link="/createbol"
        />
      )}
      <Box
        title="View Active BoLs"
        desc="See all your BoLs that have yet to be delivered"
        imageSrc={Active}
        link="/activebols"
      />
      <Box
        title="View Complete BoLs"
        desc="See all your BoLs that have been delivered"
        imageSrc={Completed}
        link="/completedbols"
      />
    </div>
    // <div className="flex justify-between pt-6 mb-12 mx-16">
    //   <ShippersBox
    //     activeBls={72}
    //     completedBls={127}
    //     prepaidContracts={42}
    //     collectContracts={130}
    //   />

    //   <DriversBox
    //     inactive={14}
    //     pickupInRoute={24}
    //     atPickup={13}
    //     dropoffInRoute={42}
    //     atDropoff={11}
    //   />

    //   <CarriersBox activeBls={72} completedBls={127} numOfCarriers={22} />

    //   <Box
    //     title="Create BoL"
    //     desc="Create a BoL using our standardized template document"
    //     imageSrc={CreateDoc}
    //     link="/createbol"
    //   />

    //   <Box
    //     title="View Active BoLs"
    //     desc="See all your BoLs that have yet to be delivered"
    //     imageSrc={Active}
    //     link="/activebols"
    //   />
    //   <Box
    //     title="View Complete BoLs"
    //     desc="See all your BoLs that have been delivered"
    //     imageSrc={Completed}
    //     link="/completedbols"
    //   />
    // </div>
  );
};

export default FourBox;
