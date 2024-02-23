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
import { useQuery } from "@apollo/client";
import {
  GET_BOL_BY_ID,
  GET_CURRENT_BOL_LOCATION,
  GET_BOL_HISTORY_LOGS,
} from "@/fetching/queries/bol";
import { Spin } from "antd";

const Page = ({ params }) => {
  let role;

  if (typeof window !== "undefined") {
    role = localStorage.getItem("role_id");
  }

  const { loading, error, data } = useQuery(GET_BOL_BY_ID, {
    variables: { id: params.id },
  });

  const {
    loading: currentBlLoading,
    currentBlError,
    data: currentBlData,
  } = useQuery(GET_CURRENT_BOL_LOCATION, {
    variables: { bolId: params.id },
  });
  const {
    loading: bol_history_loading,
    bol_history_error,
    data: bol_history_data,
  } = useQuery(GET_BOL_HISTORY_LOGS, {
    variables: { bolId: params.id },
  });
  let bol_history_logs;
  if (bol_history_data && bol_history_data.getBolHistoryLogs) {
    bol_history_logs = bol_history_data?.getBolHistoryLogs;
    console.log("bol_history_logs ===========>>>>>>>", bol_history_logs);
  }

  let lastUser;
  if (currentBlData) {
    lastUser = currentBlData.getCurrentBolLocation;
  }
  let consigneeInfo;

  let currentBol;
  console.log(data);
  if (data) {
    consigneeInfo = data.getBol?.consignee_id;

    currentBol = data.getBol;
    console.log(data.getBol);
  }

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
            actionFunc={() => router.push(`/bol/${params.id}/viewbl`)}
          />
          {}
          <DocumentBtn
            srcImg={ViewImage}
            label="View Load Image(s)"
            actionFunc={() => router.push(`/bol/${params.id}/images`)}
          />
          {/* Only Display the below if the BL doesn't have an assigned driver AND if the Role is Carrier */}
          {/* use whatever api sends bl to driver */}
          {/* {latestAgent === "Shipper" && (
            <DocumentBtn
              srcImg={Send}
              label="Dispatch Driver"
              actionFunc={() => console.log("Send Invite to driver")}
            />
          )} */}

          {role && role === "1" && (
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
              className="bg-cancelRed border-2 border-white rounded-md px-12 py-4 mx-12 text-white font-bold text-xl hover:bg-hoverRed disabled:bg-hoverGray"
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
      <div className="bg-hoverGray w-full justify-center px-4">
        <h1 className="font-bold text-2xl my-2 ">Order No: {params.id}</h1>
        <div className="grid grid-rows-2 grid-cols-3 gap-4 h-4/5">
          <div className="relative bg-cgray border-2 border-white rounded-md flex flex-col py-4 px-12 text-white col-start-1 ">
            {loading && !consigneeInfo ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <>
                <h3 className="font-semibold underline mb-2 text-center text-xl">
                  Consignee
                </h3>
                {/* params.id.consignee */}
                <p className="mb-2">Name: {consigneeInfo?.name}</p>
                <p className="mb-2">Address: {consigneeInfo?.address}</p>
                <p className="mb-2">
                  Phone:{" "}
                  <a href={phone}>{consigneeInfo?.number || 9230239122}</a>
                </p>
                <p>
                  Email: <a href={email}>{consigneeInfo?.email}</a>
                </p>
              </>
            )}
          </div>
          <div className="relative bg-cgray border-2 border-white rounded-md flex flex-col py-4 px-12 text-white col-start-1 ">
            {loading || !currentBol ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <>
                <h3 className="font-semibold underline mb-2 text-center text-xl">
                  Current "Location"
                </h3>
                {/* based on most recent B/L agent in the action data*/}

                <CurrentBoLLocation
                  data={mockActionData}
                  lastUser={lastUser}
                  currentBol={currentBol}
                />
              </>
            )}
          </div>

          <div className="relative border-2  bg-cgray border-white rounded-md flex flex-col py-4 px-12 text-white col-span-2">
            {loading || !currentBol ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <>
                <h3 className="font-semibold underline mb-2 text-center text-xl">
                  Load Information
                </h3>
                {/* params.id.load */}
                <p className="mb-2">Package Type: {currentBol.package_type}</p>
                <p className="mb-2">Quantity: {currentBol.quantity}</p>
                <p className="mb-2">Description: {currentBol.description}</p>
                <p className="mb-2">Volume: {currentBol.volume}</p>
                <p className="mb-2">Weight: {currentBol.weight}</p>
                <p className="mb-2">Class: {currentBol.hazard_class}</p>
              </>
            )}
          </div>

          <div className="relative bg-cgray border-2 border-white rounded-md flex flex-col p-4 text-white row-start-1 col-start-2 col-span-2">
            {bol_history_loading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <>
                <h3 className="font-semibold underline mb-2 text-center text-xl">
                  Action History
                </h3>
                {/* params.id.actionData */}
                <ActionHistory
                  actionData={mockActionData.actionData}
                  bol_history_logs={bol_history_logs}
                />
              </>
            )}
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
