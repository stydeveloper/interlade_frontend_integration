"use client";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import View from "../../../../public/images/view.svg";
import ViewImage from "../../../../public/images/viewImages.svg";
import Send from "../../../../public/images/send.svg";
import Home from "../../../../public/images/home.svg";
import ActionHistory from "@/components/ActionTable";
import CurrentBoLLocation from "@/components/BoLLocation";
import { mockActionData } from "@/components/MockData";
import CancelBLModal from "@/components/CancelBLModal";

const Page = ({ params }) => {
  const router = useRouter();
  const [cancelModal, setCancelModal] = useState(false);

  // call api with params.id and match to bolId to populate realData
  const { bolId, consignee, load } = mockActionData;
  const { name, address, phone, email } = consignee;
  const { packageType, description, quantity, volume, weight, classType } =
    load;

  const mostRecentAction =
    mockActionData.actionData[mockActionData.actionData.length - 1];
  const latestAgent = mostRecentAction?.agent; // assuming "agent" is a field in the action data

  return (
    <div className="h-screen flex fixed w-full">
      <div className="bg-cgray  rounded-b-md flex flex-col">
        <div className="mx-4">
          <div className="flex justify-center my-8">
            <MainBtn
              srcImg={Home}
              label="Home"
              actionFunc={() => router.push("/")}
            />
          </div>
          <p className="text-white font-bold text-2xl text-center mb-4">
            B/L Actions
          </p>
          {/* only display if the driver has uploaded images */}
          <DocumentBtn
            srcImg={View}
            label="View BoL"
            actionFunc={() => router.push(`/bol/${bolId}/viewbl`)}
          />
          {}
          <DocumentBtn
            srcImg={ViewImage}
            label="View Load Image(s)"
            actionFunc={() => router.push(`/bol/${bolId}/images`)}
          />
          {/* Only Display the below if the BL doesn't have an assigned driver AND if the Role is Carrier */}
          {/* use whatever api sends bl to driver */}
          {latestAgent === "Shipper" && (
            <DocumentBtn
              srcImg={Send}
              label="Dispatch Driver"
              actionFunc={() => console.log("Send Invite to driver")}
            />
          )}
          <div className="flex flex-col justify-center items-center mt-8">
            <button
              onClick={() => setCancelModal(true)}
              disabled={latestAgent !== "Shipper"}
              className="bg-cancelRed border-2 border-white rounded-md px-12 py-4 mx-12 text-white font-bold text-xl hover:bg-hoverRed disabled:bg-textgray"
            >
              Cancel B/L
            </button>
            {latestAgent !== "Shipper" && (
              <span className="text-white text-xs text-center mt-2">
                B/L can only be canceled before the Carrier has dispatched a
                driver
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-hoverGray justify-center pl-4">
        <h1 className="font-bold text-2xl my-2 underline">BoL Id: {bolId}</h1>
        <div className="grid grid-rows-2 grid-cols-3 gap-4 h-4/5">
          <div className="bg-borderGrey border-2 border-white rounded-md flex flex-col py-4 px-12 text-white col-start-1 ">
            <h3 className="font-semibold underline mb-2 text-center text-xl">
              Consignee
            </h3>
            {/* params.id.consignee */}
            <p className="mb-2">Name: {name}</p>
            <p className="mb-2">Address: {address}</p>
            <p className="mb-2">
              Phone: <a href={phone}>{phone}</a>
            </p>
            <p>
              Email: <a href={email}>{email}</a>
            </p>
          </div>
          <div className="bg-borderGrey border-2 border-white rounded-md flex flex-col py-4 px-12 text-white col-start-1 ">
            <h3 className="font-semibold underline mb-2 text-center text-xl">
              Current "Location"
            </h3>
            {/* based on most recent B/L agent in the action data*/}
            <CurrentBoLLocation data={mockActionData} />
          </div>
          <div className="bg-borderGrey border-2 border-white rounded-md flex flex-col py-4 px-12 text-white col-span-2">
            <h3 className="font-semibold underline mb-2 text-center text-xl">
              Load Information
            </h3>
            {/* params.id.load */}
            <p className="mb-2">Package Type: {packageType}</p>
            <p className="mb-2">Quantity: {quantity}</p>
            <p className="mb-2">Description: {description}</p>
            <p className="mb-2">Volume: {volume}</p>
            <p className="mb-2">Weight: {weight}</p>
            <p className="mb-2">Class: {classType}</p>
          </div>
          <div className="bg-borderGrey border-2 border-white rounded-md flex flex-col p-4 text-white row-start-1 col-start-2 col-span-2">
            <h3 className="font-semibold underline mb-2 text-center text-xl">
              Action History
            </h3>
            {/* params.id.actionData */}
            <ActionHistory actionData={mockActionData.actionData} />
          </div>
        </div>
      </div>
      <CancelBLModal
        isOpen={cancelModal}
        onClose={() => setCancelModal(false)}
        submitFunc={() => console.log("api call with bolId to cancel B/L")}
      />
    </div>
  );
};

export default Page;
