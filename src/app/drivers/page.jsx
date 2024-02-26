"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ProfileIcon from "../../../public/images/user.svg";
import ActiveIcon from "../../../public/images/activeBlshipperIcon.svg";
import CompleteIcon from "../../../public/images/completeBlshipperIcon.svg";
import Location from "../../../public/images/location.png";
import { mockDriverData } from "@/components/MockData";
import SidePanel from "@/components/SidePanel";
import InviteDriverModal from "@/components/InviteDriverModal";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_BOLS_FOR_DRIVERS } from "@/fetching/queries/bol";

const DriverBox = ({
  driverId,
  activeBolsCount: activeBls,
  completedBolsCount: completeBls,
  driverName: name,
}) => {
  return (
    <div className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-md hover:bg-hoverGray w-60 flex-wrap">
      <Link href={{ pathname: `drivers/${driverId}`, query: { name } }}>
        <div className="flex items-center mb-2">
          <p className="text-xl">{name}</p>
        </div>
        <div className="flex items-center">
          <Image src={ProfileIcon} alt="Driver Icon" width={30} />
          <p className="ml-2">{driverId}</p>
        </div>
        <div className="flex items-center my-2">
          <Image src={ActiveIcon} alt="Active B/Ls Icon" width={30} />
          <p className="ml-2">Active B/Ls: {activeBls}</p>
        </div>
        <div className="flex items-center mb-2">
          <Image src={CompleteIcon} alt="Complete B/Ls Icon" width={30} />
          <p className="ml-2">Complete B/Ls: {completeBls}</p>
        </div>
        <div className="flex items-center mb-2">
          <Image
            src={Location}
            alt="Complete B/Ls Icon"
            width={30}
            className="ml-0.5"
          />
          <p className="ml-2">Status: in route to Pickup</p>
        </div>
        <p className="underline text-linkBlue">See Logs...</p>
      </Link>
    </div>
  );
};

const Drivers = () => {
  // in useEffect fetch with carrier's login id for data of shippers connected. Store in state.
  const [drivers, setDrivers] = useState(mockDriverData);
  const [inviteOpen, setInviteOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_BOLS_FOR_DRIVERS);
  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const driversData = data.getBolsForDrivers;
  console.log(driversData);

  return (
    <>
      <div className="flex w-full h-full">
        <SidePanel />
        <div className="w-full flex flex-col items-center m-6 ml-60">
          <>
            <h1 className="underline text-2xl font-semibold mb-2">Drivers</h1>
            <button
              className="border-2 rounded-md p-2 mb-12 bg-linkBlue text-white hover:bg-sky-700"
              onClick={() => setInviteOpen(true)}
            >
              Invite Driver +
            </button>
            {driversData !== undefined && driversData.length > 0 && (
              <div className="grid grid-cols-4 gap-4 ">
                {driversData.map((profile, i) => (
                  <DriverBox {...profile} key={i} />
                ))}
              </div>
            )}
          </>
          {inviteOpen && (
            <div className="bg-gray rounded-md flex flex-col items-center justify-center py-12 px-24 ">
              <p className="text-2xl font-bold mb-6 underline">
                Invite Driver(s)
              </p>
              <div className="flex flex-col w-full my-4 mb-12">
                <label className="text-xl mb-2">Driver(s) Email:</label>
                <input
                  className="rounded-md p-2"
                  type="email"
                  autoFocus
                  required
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <p className="text-md">
                Driver(s) will receive an invitation to utilize BLs on the road
                via the Interlade Driver App.
              </p>
              <a
                className="italic text-linkBlue"
                href="https://www.apple.com/jp/app-store/"
                target="_blank"
              >
                (www.linktodownloaddriverapp.com)
              </a>
              <button
                className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
                onClick={() => console.log("invite func")}
              >
                Send Invite(s)
              </button>
            </div>
          )}
        </div>
      </div>
      <InviteDriverModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
};

export default Drivers;
