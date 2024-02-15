"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { mockCarrierData } from "@/components/MockData";
// import BackBtn from "../../../public/images/backBtn.svg";
import ProfileIcon from "../../../public/images/user.svg";
import ActiveIcon from "../../../public/images/activeBlshipperIcon.svg";
import CompleteIcon from "../../../public/images/completeBlshipperIcon.svg";
import DriverCountIcon from "../../../public/images/icons8-in-transit-96 1.png";
import SidePanel from "@/components/SidePanel";
import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";

const GET_BOLS_FOR_CARRIERS = gql`
  query GetBolsForCarriers {
    getBolsForCarriers {
      carrierId
      carrierName
      activeBolsCount
      completedBolsCount
      associatedDriverCount
    }
  }
`;

const CarrierProfileBox = ({
  carrierId,
  carrierName: name,
  activeBolsCount: activeBls,
  completedBolsCount: completeBls,
  associatedDriverCount,
}) => {
  return (
    <div className="flex flex-col items-center p-4 border-2 border-textgray rounded-md hover:bg-hoverGray">
      <Link href={`carriers/${carrierId}`}>
        {/* {logo && (
          <Image
            src={logo}
            width={100}
            alt="Carrier Logo"
            className="text-center"
          />
        )} */}
        <div className="flex items-center">
          <Image src={ProfileIcon} alt="Carrier Name Icon" width={30} />
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
        <div className="flex items-center">
          <Image src={DriverCountIcon} alt="Driver Icon" width={30} />
          <p className="ml-4">Drivers Allocated: {associatedDriverCount}</p>
        </div>
        <p className="underline text-linkBlue">See More...</p>
      </Link>
    </div>
  );
};

const Carriers = () => {
  const router = useRouter();
  // in useEffect fetch with shippers's login id for data of carriers connected. Store in state.

  const [carriers, setCarrier] = useState(mockCarrierData);

  const { loading, error, data } = useQuery(GET_BOLS_FOR_CARRIERS);
  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const carriersData = data.getBolsForCarriers;
  console.log(carriersData);

  return (
    <div className="flex">
      <SidePanel />
      <div className="flex flex-col items-center m-6 ml-72 justify-center">
        <h1 className="underline text-2xl font-semibold mb-12">Carriers</h1>
        {carriersData !== undefined && carriersData.length > 0 ? (
          <div className="grid grid-rows-2 grid-cols-4 gap-8">
            {carriersData.map((profile, i) => (
              <CarrierProfileBox {...profile} key={i} />
            ))}
          </div>
        ) : (
          <div className="bg-gray p-36 rounded-md flex flex-col justify-center">
            <h3 className="text-xl mb-4 text-center">No Associated Carriers</h3>
            <button
              className="bg-linkBlue px-4 rounded-md text-white"
              onClick={() => router.push("/createbol")}
            >
              Create BoL +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carriers;
