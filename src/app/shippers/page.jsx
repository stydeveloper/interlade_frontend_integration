"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/images/profile.svg";
import { useRouter } from "next/navigation";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { mockShipperData } from "@/components/MockData";
import ProfileIcon from "../../../public/images/user.svg";
import ActiveIcon from "../../../public/images/activeBlshipperIcon.svg";
import CompleteIcon from "../../../public/images/completeBlshipperIcon.svg";
import DriversAllo from "../../../public/images/drirversAllo.svg";
import SidePanel from "@/components/SidePanel";
import InviteShipperModal from "@/components/InviteShipperModal";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { GET_BOLS_FOR_SHIPPERS } from "@/fetching/queries/bol";

const ShipperProfileBox = ({
  shipperId,
  shipperName: name,
  activeBolsCount: activeBls,
  completedBolsCount: completeBls,
  associatedDriverCount: driversAllocated,
}) => {
  return (
    <div className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-md hover:bg-hoverGray">
      <Link href={{ pathname: `shippers/${shipperId}`, query: { name } }}>
        {/* {logo && (
          <Image
            src={logo}
            width={100}
            alt="Shipper Logo"
            className="text-center"
          />
        )} */}
        <div className="flex items-center">
          <Image src={ProfileIcon} alt="Shipper Name Icon" width={30} />
          <p className="ml-4">{name}</p>
        </div>
        <div className="flex items-center my-2">
          <Image src={ActiveIcon} alt="Active B/Ls Icon" width={30} />
          <p className="ml-4">Active B/Ls: {activeBls}</p>
        </div>
        <div className="flex items-center">
          <Image src={CompleteIcon} alt="Complete B/Ls Icon" width={30} />
          <p className="ml-4">Complete B/Ls: {completeBls}</p>
        </div>
        <div className="flex items-center my-2">
          <Image src={DriversAllo} alt="Drivers Allocated Icon" width={30} />
          <p className="ml-4">Drivers Allocated: {driversAllocated}</p>
        </div>
        <p className="underline text-linkBlue">See More...</p>
      </Link>
    </div>
  );
};

const Shippers = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_BOLS_FOR_SHIPPERS, {
    fetchPolicy: "network-only", // or "cache-and-network"
  });
  const [sentInvite, setSentInvite] = useState(false); // Moved outside of conditional block
  const [copied, setCopied] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const shippersData = data.getBolsForShippers;

  const textToCopy = "www.interlade.com/carrieruniqueinvite4shippertocreateBoL";

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (err) {
      alert("Failed to copy text");
    }
  };

  const inviteSentBtnFunc = () => {
    setSentInvite(true);
    setTimeout(() => {
      setSentInvite(false);
      console.log("5 seconds have passed!");
    }, 5000);
  };

  return (
    <>
      <div className="flex">
        <SidePanel />
        <div className="w-full flex flex-col items-center  m-4 ml-60 ">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="underline text-2xl font-semibold mb-2">Shippers</h1>
            <button
              className="border-2 rounded-md p-2 mb-12  bg-sky-600 text-white hover:bg-sky-900"
              onClick={() => setInviteOpen(true)}
            >
              Invite Shipper+
            </button>
            {shippersData !== undefined && shippersData.length > 0 && (
              <div className="grid grid-rows-2 grid-cols-5 gap-4">
                {shippersData.map((profile, i) => (
                  <ShipperProfileBox {...profile} key={i} />
                ))}
              </div>
            )}
          </div>

          {/* {inviteOpen && (
            <div className="bg-gray rounded-md flex flex-col items-center justify-center py-12 px-24 ">
              <p className="text-2xl font-bold mb-6 underline">
                Invite Shipper(s) to Create B/L
              </p>
              <div className="flex flex-col w-full my-4 mb-12">
                <label className="text-xl mb-2">Shipper(s) Email:</label>
                <input
                  className="rounded-md p-2"
                  type="email"
                  autoFocus
                  required
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              {!sentInvite ? (
                <button
                  className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mb-8 hover:bg-sky-700 hover:border-white hover:border-2"
                  onClick={() => inviteSentBtnFunc()}
                >
                  Send Invite to Create B/L
                </button>
              ) : (
                <p className=" font-semibold mb-8 w-1/2 text-center">
                  Shippers(s) will receive an invitation email to create a BL
                  for their associated load.
                </p>
              )}
              <p className="mb-4 font-semibold text-lg">OR</p>
              <div className="flex flex-col w-full">
                {!copied ? (
                  <>
                    <p className="text-xl mb-2">Copy Link Below</p>
                    <button
                      className="italic text-white bg-borderGrey p-2 rounded hover:bg-black"
                      onClick={handleCopyClick}
                    >
                      (www.interlade.com/carrieruniqueinvite4shippertocreateBoL)
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xl mb-2">Copied!</p>
                    <p className="italic text-white bg-gray p-2 rounded border-2 border-white">
                      www.interlade.com/carrieruniqueinvite4shippertocreateBoL
                    </p>
                  </>
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
      {inviteOpen && (
        <InviteShipperModal
          isOpen={inviteOpen}
          onClose={() => setInviteOpen(false)}
        />
      )}
    </>
  );
};

export default Shippers;
