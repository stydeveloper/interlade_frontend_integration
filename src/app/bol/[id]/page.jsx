"use client";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import View from "../../../../public/images/view.svg";
import ViewImage from "../../../../public/images/viewImages.svg";
import UploadImageIcon from "../../../../public/images/upload_image.png";
import Send from "../../../../public/images/send.svg";
import Home from "../../../../public/images/home.svg";
import ActionHistory from "@/components/ActionTable";
import CurrentBoLLocation from "@/components/BoLLocation";
import { mockActionData } from "@/components/MockData";
import CancelBLModal from "@/components/CancelBLModal";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_IMAGE } from "@/fetching/mutations/bol_images";
// import BackBtn from "../../../../public/images/arrow-92-48.png";
import { Spin } from "antd";
import * as imageConversion from "image-conversion";

import {
  GET_BOL_BY_ID,
  GET_CURRENT_BOL_LOCATION,
  GET_BOL_HISTORY_LOGS,
  GETBOL_BYID,
} from "@/fetching/queries/bol";

import { GET_BOLIMAGES_BY_BOLID } from "@/fetching/queries/bol_images";
// import ActAsDriverModal from "@/components/ActAsDriverModal";
import Cookies from "js-cookie"; // Import js-cookie library
// import Link from "next/link";
import { convertToBase64 } from "@/utils/helper";
import { toast } from "react-toastify";
import DispatchBoLToDriverModal from "@/components/DispatchBoLToDriverModal";
// import Image from "next/image";

const Page = ({ params }) => {
  const [showActAsDriverModal, setShowActAsDriverModal] = useState(false);
  let role;
  const [inviteOpen, setInviteOpen] = useState(false);
  const [currentBol, setCurrentBol] = useState(null);
  const [consigneeInfo, setConsigneeInfo] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);

  // const [bolData, setBolData] = useState(null);
  let loggedInUser;
  const router = useRouter();
  if (typeof window !== "undefined") {
    // Check cookies for the role_id value
    role = Cookies.get("role_id");
    const userCookie = Cookies.get("user");
    loggedInUser = userCookie ? JSON.parse(userCookie) : null;
  }

  const { loading, error, data, refetch } = useQuery(GET_BOL_BY_ID, {
    variables: { id: params?.id },
    onCompleted: (data) => {
      // This function will be called when the query completes successfully
      // Update your state or perform any other actions here

      // if (
      //   !data?.getBol ||
      //   data?.getBol !== null ||
      //   data?.getBol !== undefined
      // ) {
      //   if (
      //     (loggedInUser?.id !== data?.getBol?.carrier_id?.id &&
      //       loggedInUser?.id !== data?.getBol?.shipper_id?.id) ||
      //     data?.getBol?.carrier_id?.id == null ||
      //     data?.getBol?.shipper_id?.id == null
      //   ) {
      //     toast.error("You are not allowed to view this page!", {
      //       position: "top-right",
      //     });
      //     router.push("/");
      //   }
      // }
      setCurrentBol(data?.getBol);
      setConsigneeInfo(data?.getBol?.consignee_id);
    },
    onError: (error) => {
      if (error instanceof Error) {
        router.push("/");
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
    },
  });

  const {
    loading: bolLoading,
    error: bolError,
    data: bolData,
    refetch: bolDataRefetch,
  } = useQuery(GETBOL_BYID, {
    variables: { getBolId: `${params?.id}` },
  });

  const [UploadImageMutation] = useMutation(UPLOAD_IMAGE);

  const {
    bolImagesLoading,
    bolImagesError,
    data: bolImagesData,
    refetch: bolImagesRefetch,
  } = useQuery(GET_BOLIMAGES_BY_BOLID, {
    variables: { bolId: params?.id },
  });

  const {
    loading: currentBlLoading,
    currentBlError,
    data: currentBlData,
    refetch: currentBlDataRefetch,
  } = useQuery(GET_CURRENT_BOL_LOCATION, {
    variables: { bolId: params?.id },
  });
  const {
    loading: bol_history_loading,
    bol_history_error,
    data: bol_history_data,
    refetch: bolHistoryLogsRefetch,
  } = useQuery(GET_BOL_HISTORY_LOGS, {
    variables: { bolId: params?.id },
  });

  // useEffect(() => {
  //   if (!loading && data) {
  //     setCurrentBol(data?.getBol);
  //     console.log("2i2", data?.getBol);
  //     setConsigneeInfo(data?.getBol?.consignee_id);
  //   }
  // }, [loading, data, params?.id]);

  // useEffect(() => {
  //   if (!loading && !data && !currentBol && !error) {
  //     console.log("3i3", currentBol);
  //     console.log(!loading && !currentBol && !error);
  //     router.push("/");
  //     // Redirect to home page if no data is found
  //   }
  // }, [loading, currentBol, error, router, data, params?.id]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  let bol_history_logs;
  if (bol_history_data && bol_history_data.getBolHistoryLogs) {
    bol_history_logs = bol_history_data?.getBolHistoryLogs;
  }

  let lastUser;
  if (currentBlData) {
    lastUser = currentBlData.getCurrentBolLocation;
  }
  // let consigneeInfo;
  let isDriverIsAssigned;

  // let currentBol;
  let driverId;
  let associatedCarrierIdToBol;
  let IsCarrierAsDriver;

  if (bolData && !bolLoading) {
    isDriverIsAssigned = bolData.getBol?.driver_id !== null;

    driverId = bolData?.getBol?.driver_id?.id;
    driverId = loggedInUser?.id;
    associatedCarrierIdToBol = bolData.getBol.carrier_id?.id;

    IsCarrierAsDriver =
      associatedCarrierIdToBol === driverId && driverId === loggedInUser?.id;
  }

  // if (data && !loading) {
  //   currentBol = data?.getBol;

  //   consigneeInfo = data.getBol?.consignee_id;
  // }

  // call api with params.id and match to bolId to populate realData
  const { bolId, consignee, load } = mockActionData;
  const { name, address, phone, email } = consignee;
  const { packageType, description, quantity, volume, weight, classType } =
    load;

  const mostRecentAction =
    mockActionData.actionData[mockActionData.actionData.length - 1];
  const latestAgent = mostRecentAction?.agent; // assuming "agent" is a field in the action data

  const handleUploadImage = async () => {
    // Create a hidden file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Limit file selection to image files
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB
    // Listen for changes in the selected file
    input.addEventListener("change", async (event) => {
      const file = event.target.files[0]; // Get the selected file

      // Check if file size exceeds maxSizeBytes
      if (file.size > maxSizeBytes) {
        toast.info(
          "The selected image is too large. Uploading may take some time.",
          {
            position: "top-right",
          }
        );
        return; // Stop further execution
      }

      if (file) {
        const resizedImage = await imageConversion.compressAccurately(
          file,
          700
        );
        const base64Image = await convertToBase64(resizedImage);

        // const imageUrl = URL.createObjectURL(file);

        const { data, loading } = await UploadImageMutation({
          variables: { bolId: params?.id, filename: base64Image },
        });

        if (data?.createBolImages?.message) {
          bolImagesRefetch();
          refetch();
          bolDataRefetch();
          currentBlDataRefetch();
          bolHistoryLogsRefetch();
          toast.success(data?.createBolImages?.message, {
            position: "top-right",
          });
        }
      }
    });

    // Trigger the file input dialog
    input.click();
  };

  // const handleUploadImage = async () => {
  //   // Trigger the file input dialog
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.style.display = "none";
  //   document.body.appendChild(input);

  //   // Listen for changes in the selected file
  //   input.addEventListener("change", async (event) => {
  //     const file = event.target.files[0]; // Get the selected file
  //     if (file) {
  //       const base64Image = await convertToBase64(file);
  //       const { data, loading } = await UploadImageMutation({
  //         variables: { bolId: params.id, filename: base64Image },
  //       });

  //       if (data?.createBolImages?.message) {
  //         bolImagesRefetch();
  //         refetch();
  //         bolDataRefetch();
  //         currentBlDataRefetch();
  //         bolHistoryLogsRefetch();
  //         toast.success(data?.createBolImages?.message, {
  //           position: "top-right",
  //         });
  //       }
  //     }

  //     // Remove the input element from the DOM
  //     document.body.removeChild(input);
  //   });

  //   // Trigger the file input dialog
  //   input.click();
  // };

  return (
    <div className="h-screen flex fixed w-full">
      <div className="bg-cgray  rounded-b-md flex flex-col w-[24%]">
        <div className=" mx-4 ">
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
            actionFunc={() => router.push(`/bol/${params?.id}/viewbl`)}
          />
          {bolImagesData &&
            bolImagesData?.getBolImagesByBolId &&
            bolImagesData?.getBolImagesByBolId.length > 0 && (
              <DocumentBtn
                srcImg={ViewImage}
                label="View Load Image(s)"
                actionFunc={() => router.push(`/bol/${params?.id}/images`)}
              />
            )}
          {role &&
            currentBol &&
            role === "1" &&
            IsCarrierAsDriver &&
            currentBol.status !== "CANCELLED" &&
            currentBol.status !== "DELIVERED" &&
            isDriverIsAssigned && (
              <DocumentBtn
                srcImg={UploadImageIcon}
                label="Upload Image"
                actionFunc={handleUploadImage}
              />
            )}

          {/* Only Display the below if the BL doesn't have an assigned driver AND if the Role is Carrier */}
          {/* use whatever api sends bl to driver */}
          {/* commented send button  */}
          {/* {latestAgent === "Shipper" && (
            <DocumentBtn
              srcImg={Send}
              label="Dispatch Driver"
              actionFunc={() => console.log("Send Invite to driver")}
            />
          )} */}
          {/* Dispatch Driver commented because not in figma */}
          {role &&
            role === "1" &&
            !isDriverIsAssigned &&
            currentBol?.status !== "CANCELLED" && (
              <DocumentBtn
                srcImg={Send}
                label="Dispatch Driver"
                actionFunc={() => setInviteOpen(true)}
              />
            )}
          <div className="flex flex-col justify-center items-center mt-8">
            {role &&
              role === "2" &&
              currentBol &&
              currentBol?.status === "AT_PICKUP" &&
              !isDriverIsAssigned && (
                <button
                  onClick={() => setCancelModal(true)}
                  disabled={latestAgent !== "Shipper"}
                  className="bg-cancelRed border-2 border-white rounded-md px-12 py-4 mx-12 text-white font-bold text-xl hover:bg-hoverRed disabled:bg-hoverGray"
                >
                  Cancel B/L
                </button>
              )}
            {latestAgent !== "Shipper" && (
              <span className="text-white text-xs text-center mt-2">
                B/L can only be canceled before the Carrier has dispatched a
                driver
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white w-full justify-center px-4">
        <h1 className="font-bold text-2xl my-2 ">Order No: {params?.id}</h1>
        <div className="grid grid-rows-2 grid-cols-3 gap-4 h-4/5">
          <div className="relative bg-mainBoxesBg border border-gray rounded-lg flex flex-col py-4 px-12 text-black col-start-1 ">
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
                <p className=" text-base mb-1">Name: {consigneeInfo?.name}</p>
                <p className=" text-base mb-1">
                  Address: {consigneeInfo?.address}
                </p>
                <p className=" text-base mb-1">
                  Phone: <span>{consigneeInfo?.number || 9230239122}</span>
                </p>
                <p className="text-base">
                  Email: <span>{consigneeInfo?.email}</span>
                </p>
              </>
            )}
          </div>
          <div className="relative bg-mainBoxesBg border border-gray rounded-lg flex flex-col py-4 px-12 text-black col-start-1 ">
            {loading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <>
                <h3 className="font-semibold underline mb-1 text-center text-xl">
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

          <div className="relative border  bg-mainBoxesBg border-gray rounded-lg flex flex-col py-4 px-12 text-black col-span-2">
            {loading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spin />
              </div>
            ) : (
              <div className="">
                <h3 className="font-semibold underline mb-2 text-center text-xl">
                  Load Information
                </h3>
                {/* params.id.load */}
                <p className="mb-1">Package Type: {currentBol?.package_type}</p>
                <p className="mb-1">Quantity: {currentBol?.quantity}</p>
                <p className="mb-1">Description: {currentBol?.description}</p>
                <p className="mb-1">Volume: {currentBol?.volume}</p>
                <p className="mb-1">Weight: {currentBol?.weight}</p>
                <p className="mb-1">Class: {currentBol?.hazard_class}</p>
              </div>
            )}
          </div>

          <div className="relative bg-mainBoxesBg border border-gray rounded-lg flex flex-col p-4 text-black row-start-1 col-start-2 col-span-2">
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
      {role && role === "2" && (
        <CancelBLModal
          isOpen={cancelModal}
          onClose={() => setCancelModal(false)}
          bol_id={params?.id}
          refetch={refetch}
          bolDataRefetch={bolDataRefetch}
          bolImagesRefetch={bolImagesRefetch}
          currentBlDataRefetch={currentBlDataRefetch}
          bolHistoryLogsRefetch={bolHistoryLogsRefetch}
        />
      )}
      {/* Modal component */}
      {/* <ActAsDriverModal
        isOpen={showActAsDriverModal}
        onClose={() => setShowActAsDriverModal(false)}
        onYes={() => {
          console.log("User confirmed to act as driver");
          // Handle logic when user confirms
        }}
        onNo={() => {
          console.log("User chose not to act as driver");
          // Handle logic when user cancels
        }}
      /> */}
      {inviteOpen && params?.id && (
        <DispatchBoLToDriverModal
          isOpen={inviteOpen}
          onClose={() => setInviteOpen(false)}
          callStatus={true}
          id={params?.id}
          refetch={refetch}
          bolDataRefetch={bolDataRefetch}
          bolImagesRefetch={bolImagesRefetch}
          currentBlDataRefetch={currentBlDataRefetch}
          bolHistoryLogsRefetch={bolHistoryLogsRefetch}
        />
      )}
    </div>
  );
};

export default Page;
