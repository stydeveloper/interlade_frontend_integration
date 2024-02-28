"use client";
import Image from "next/image";
import Link from "next/link";
import Active from "../../public/images/document.png";
import Completed from "../../public/images/secure-document.png";
import CreateDoc from "../../public/images/create-document.png";
import BoxManIcon from "../../public/images/shipper.png";
import DriversIcon from "../../public/images/driverIcon.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie library
import {
  GET_ASSOCIATED_CARRIER_DETAILS_CARD,
  GET_ASSOCIATED_SHIPPER_DETAILS_CARD,
  GET_ASSOCIATED_BOL_COUNT_DRIVER_CARD,
} from "@/fetching/queries/user";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";

const Box = ({ title, desc, imageSrc, link }) => {
  return (
    <Link
      href={`${link}`}
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

const ShippersBox = () => {
  const { data, loading, error } = useQuery(
    GET_ASSOCIATED_SHIPPER_DETAILS_CARD,
    {
      fetchPolicy: "network-only", // or "cache-and-network"
    }
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // const associatedShippersCount =
  //   data?.getAssociatedShipperDetails?.associatedShippersCount;
  const activeBillCount = data?.getAssociatedShipperDetails?.activeBolsCount;
  const completedBillCount =
    data?.getAssociatedShipperDetails?.completedBolsCount;
  const prepaidCount = data?.getAssociatedShipperDetails?.prepaidCount;
  const collectCount = data?.getAssociatedShipperDetails?.collectCount;

  return (
    <Link
      href="/shippers"
      className="relative bg-boxblack hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center h-[100%] flex flex-col font-semibold"
    >
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spin size="small" />
        </div>
      ) : (
        <>
          <div className="flex items-center m-4 mt-2 mb-2">
            <Image src={BoxManIcon} alt="Shippers Icon" width={50} />
            <p className="text-white ml-4 mt-2 text-xl">Shippers</p>
          </div>
          <p className="text-white mx-6 text-sm">
            Active B/Ls: {activeBillCount}
          </p>
          <p className="text-white mx-6 text-sm">
            Completed B/Ls: {completedBillCount}
          </p>
          <p className="text-white mx-6 text-sm">
            Prepaid: {prepaidCount || 0}
          </p>
          <p className="text-white mx-6 text-sm">
            Collect: {collectCount || 0}
          </p>
        </>
      )}
    </Link>
  );
};

const CarriersBox = () => {
  const { data, loading, error } = useQuery(
    GET_ASSOCIATED_CARRIER_DETAILS_CARD,
    {
      fetchPolicy: "network-only", // or "cache-and-network"
    }
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const associatedCarriersCount =
    data?.getAssociatedCarriersDetails?.associatedCarriersCount;
  const activeBillCount = data?.getAssociatedCarriersDetails?.activeBolsCount;
  const completedBillCount =
    data?.getAssociatedCarriersDetails?.completedBolsCount;

  return (
    <Link
      href="/carriers"
      className="relative bg-boxblack hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center h-[100%] flex flex-col font-semibold"
    >
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spin size="small" />
        </div>
      ) : (
        <>
          <div className="flex items-center m-4 mt-2 mb-2">
            <Image src={BoxManIcon} alt="Carriers Icon" width={50} />
            <p className="text-white ml-4 mt-2 text-xl">Carriers</p>
          </div>
          <p className="text-white mx-6 mt-2 text-sm">
            Associated Carriers: {associatedCarriersCount}
          </p>
          <p className="text-white mx-6 my-2 text-sm">
            Active B/Ls: {activeBillCount}
          </p>
          <p className="text-white mx-6 text-sm">
            Completed B/Ls: {completedBillCount}
          </p>
        </>
      )}
    </Link>
  );
};

const DriversBox = () => {
  const { data, loading, error } = useQuery(
    GET_ASSOCIATED_BOL_COUNT_DRIVER_CARD,
    {
      fetchPolicy: "network-only", // or "cache-and-network"
    }
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const atPickupCount = data?.getBolStatusCount?.bolStatusCounts?.AT_PICKUP;
  const inTransitCount = data?.getBolStatusCount?.bolStatusCounts?.IN_TRANSIT;
  const atDropoffCount = data?.getBolStatusCount?.bolStatusCounts?.AT_DROPOFF;
  const inActiveCount = data?.getBolStatusCount?.bolStatusCounts?.CANCELLED;
  return (
    <Link
      href="/drivers"
      className="relative bg-boxblack  hover:bg-blue-700 border-2 border-gray rounded-md w-72 justify-center  h-[100%]  flex flex-col font-semibold"
    >
      {loading || !data ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spin size="small" />
        </div>
      ) : (
        <>
          <div className="flex items-center m-4 mt-2 mb-0">
            <Image src={DriversIcon} alt="Drivers Icon" width={50} />
            <p className="text-white ml-4 text-xl">Drivers</p>
          </div>
          <p className="text-white mx-6 text-sm">In Route to Pickup: 0</p>
          <p className="text-white mx-6 text-sm">At Pickup: {atPickupCount}</p>
          <p className="text-white mx-6 text-sm">
            In Route to Dropoff: {inTransitCount}
          </p>
          <p className="text-white mx-6 text-sm">
            At Dropoff: {atDropoffCount}
          </p>
          <p className="text-white mx-6 text-sm mb-2">
            Inactive: {inActiveCount}
          </p>
        </>
      )}
    </Link>
  );
};

const FourBox = () => {
  const [roleId, setRoleId] = useState(null);
  useEffect(() => {
    // Check cookies for the role_id value
    const roleIdFromCookie = Cookies.get("role_id");
    setRoleId(roleIdFromCookie);
  }, []);

  return (
    <div className="flex justify-between h-[80%] items-center w-full relative z-20 bg-transparent mx-16">
      {roleId && roleId !== "3" && roleId !== "2" && <ShippersBox />}
      {roleId && roleId !== "3" && roleId !== "2" && roleId !== "4" && (
        <DriversBox />
      )}
      {roleId && roleId !== "1" && <CarriersBox />}
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
