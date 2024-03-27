"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import Print from "../../../../../public/images/print.svg";
import Send from "../../../../../public/images/send.svg";
import Download from "../../../../../public/images/download.png";
import Home from "../../../../../public/images/home.svg";
import BLImage from "../../../../../public/images/BLImage.png";
import { useEffect, useState } from "react";
import SignatureModal from "@/components/SignatureModal";
import { GETBOL_BYID } from "@/fetching/queries/bol";
import { useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import BackBtn from "../../../../../public/images/arrow-92-48.png";
import { GET_BOLIMAGES_BY_BOLID } from "@/fetching/queries/bol_images";
import { BOL_DOWNLOAD } from "@/fetching/mutations/bol";

import {
  GET_BOL_VERSION_BYIDS,
  GET_BOL_VERSION_BY_USERID,
} from "@/fetching/queries/bol_version";
import { GENERATE_BOL_STATUS_HISTORY } from "@/fetching/queries/bol_history";
import { formatDate } from "@/utils/helper";
import PDFTemplate from "@/components/PdfTemplate";
import { BOL_DETAILS_PDF } from "@/fetching/queries/bol";

const ViewBl = ({ params }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userCookie = Cookies.get("user");
  const loggedInUser = userCookie ? JSON.parse(userCookie) : null;
  // console.log("loggedInUser", JSON.parse(Cookies.get("user")).id);
  // console.log("loggedInUserRoleId", JSON.parse(Cookies.get("user")).role_id.id);
  let consigneeId;

  const {
    loading: bolLoading,
    error: bolError,
    data: bolData,

    refetch: refetchBolData,
  } = useQuery(GETBOL_BYID, {
    variables: { getBolId: `${params?.id}` },
    skip: !params?.id || !loggedInUser?.id, // Skip query if params.id or loggedInUser.id is not present
  });
  const {
    loading: bolDetailsPdfLoading,
    error: bolDetailsPdfError,
    data: bolDetailsPdfData,

    refetch: refetchbolDetailsPdf,
  } = useQuery(BOL_DETAILS_PDF, {
    variables: { bolId: `${params?.id}` },
    skip: !params?.id, // Skip query if params.id or loggedInUser.id is not present
  });
  const {
    loading: genBolHistoryLoading,
    error: genBolHistoryError,
    data: genBolHistoryData,

    refetch: refetchGenBolHistory,
  } = useQuery(GENERATE_BOL_STATUS_HISTORY, {
    variables: { bolId: `${params?.id}` },
    skip: !params?.id, // Skip query if params.id or loggedInUser.id is not present
  });

  const [bolDownload] = useMutation(BOL_DOWNLOAD);

  const {
    loading: bolImagesLoading,
    error: bolImagesError,
    data: bolImagesData,

    refetch: refetchBolImagesData,
  } = useQuery(GET_BOLIMAGES_BY_BOLID, {
    variables: { bolId: `${params?.id}` },
    skip: !params?.id, // Skip query if params.id or loggedInUser.id is not present
  });

  let bolDetails;

  if (bolDetailsPdfData && !bolDetailsPdfLoading) {
    bolDetails = bolDetailsPdfData?.getBolDetailsPdf;
    console.log(bolDetails);
  }

  let hasDriverUploadedImage;

  let bolHistoryActions;

  if (genBolHistoryData && !genBolHistoryLoading) {
    bolHistoryActions = genBolHistoryData?.generateBolStatusHistory;
  }

  if (bolImagesData && !bolImagesLoading) {
    hasDriverUploadedImage = bolImagesData.getBolImagesByBolId.length > 0;
  }

  const {
    loading: bolVersionLoading,
    error: bolVersionError,
    data: BolVersionData,
    refetch: refetchBolVersionData,
  } = useQuery(GET_BOL_VERSION_BYIDS, {
    variables: { userId: `${loggedInUser?.id}`, bolId: `${params?.id}` },
    skip: !loggedInUser?.id || !params?.id, // Skip query if params.id or loggedInUser.id is not present
  });
  let driverId;
  let associatedCarrierIdToBol;
  let IsCarrierAsDriver;

  let bolStatus;

  if (bolData && !bolLoading) {
    driverId = bolData?.getBol?.driver_id?.id;
    associatedCarrierIdToBol = bolData?.getBol?.carrier_id?.id;
    consigneeId = bolData?.getBol?.consignee_id?.id;
    bolStatus = bolData?.getBol?.status;

    IsCarrierAsDriver =
      associatedCarrierIdToBol === driverId && driverId === loggedInUser?.id;
  }

  const {
    loading: bolVersionConsigneeLoading,
    error: bolVersionConsigneeError,
    data: BolVersionConsigneeData,
    refetch: refetchBolVersionConsigneeData,
  } = useQuery(GET_BOL_VERSION_BY_USERID, {
    variables: { userId: `${consigneeId}` },
    skip: !consigneeId, // Skip query if params.id or loggedInUser.id is not present
  });
  useEffect(() => {
    if (params?.id && loggedInUser?.id) {
      // Only fetch data if both params.id and loggedInUser.id are present
      refetchBolData();
      refetchBolVersionData();
      refetchBolVersionConsigneeData();
      refetchBolImagesData();
    }
  }, [
    params?.id,
    loggedInUser,
    refetchBolData,
    refetchBolImagesData,
    refetchBolVersionConsigneeData,
    refetchBolVersionData,
  ]);
  let hasAlreadySigned;
  let hasConsigneeSignature = false;

  if (BolVersionConsigneeData && !bolVersionConsigneeLoading) {
    const bolVersions = BolVersionConsigneeData?.getBolVersionByUserId;

    if (bolVersions) {
      // If data is not null, iterate through each object
      for (let i = 0; i < bolVersions.length; i++) {
        const version = bolVersions[i];
        if (
          version.bol_id.id === params?.id &&
          version.user_id.id === consigneeId
        ) {
          hasConsigneeSignature = true;

          break;
        }
      }
    }
  }

  if (!bolVersionLoading && BolVersionData) {
    hasAlreadySigned =
      BolVersionData.getBolVersionsByIDs === null ? false : true;
  }

  // Determine if the Sign As Consignee button should be disabled
  const disableSignAsConsignee =
    (loggedInUser?.role_id?.id === "4" && bolStatus !== "AT_DROPOFF") || // Condition 1
    (loggedInUser?.role_id?.id === "1" &&
      !hasAlreadySigned &&
      bolStatus === "IN_TRANSIT") || // New Condition 2
    (hasAlreadySigned && bolStatus !== "AT_DROPOFF"); // New Condition 3

  console.log("hasConsigneeSignature", hasConsigneeSignature);

  const disableSignAsDriver =
    !hasDriverUploadedImage ||
    hasAlreadySigned ||
    bolStatus === "AT_PICKUP" ||
    bolStatus === "AT_DROPOFF" ||
    bolStatus === "DELIVERED";

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownload = async () => {
    try {
      const response = await bolDownload({
        variables: { bolId: `${params?.id}` },
      });

      if (response?.data?.bolDownload) {
        // Open the PDF URL in a new tab
        window.open(response.data.bolDownload, "_blank");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      } else {
        console.log("An unknown error occurred ");
      }
    }
  };

  console.log(
    "oo",
    loggedInUser?.role_id &&
      bolStatus !== "CANCELLED" &&
      loggedInUser?.role_id?.id === "4"
  );
  return (
    <div className="flex  justify-between">
      <div className="bg-cgray rounded-b-md flex w-80 flex-col fixed h-full ">
        <div className="relative overflow-y-auto">
          <Image
            alt="Back"
            src={BackBtn}
            width={25}
            className="absolute top-[0.9rem] left-0 cursor-pointer  mx-8"
            onClick={() => router.back()}
            title="Go Back"
          />
          <div className="flex justify-center my-2  mx-8">
            <MainBtn
              srcImg={Home}
              label="Home"
              actionFunc={() => router.push("/")}
            />
          </div>

          {bolHistoryActions && (
            <div>
              <h3 className="text-center mb-2 text-2xl text-white font-bold">
                Version History
              </h3>
              {bolHistoryActions.map((action, index) => (
                <p
                  key={index} // Add key prop here
                  className={`text-xs px-2 py-1 ${
                    index % 2 === 0 ? "bg-oddColor" : "bg-mainBoxesBg"
                  }`}
                >
                  {formatDate(action.time)}: {action.message}
                </p>
              ))}
              {bolHistoryActions?.length === 6 && (
                <p className="bg-oddColor text-center text-sm py-1">
                  Delivery Complete!
                </p>
              )}
            </div>
          )}

          <p className="text-white font-bold text-xl text-center mb-4 mt-2  mx-8">
            Version History Actions
          </p>
          <div className="btn-container mx-8 ">
            <DocumentBtn
              srcImg={Print}
              label="Print"
              actionFunc={handleDownload}
              width={30}
            />
            {/* <DocumentBtn
            srcImg={Send}
            label="Send"
            actionFunc={() => console.log("Send")}
          /> */}
            <DocumentBtn
              srcImg={Download}
              label="Download"
              actionFunc={handleDownload}
              width={30}
            />
          </div>
        </div>
      </div>
      <div className="bg-hoverGray flex-1 gap-2 flex flex-col items-center justify-center py-4 ml-80 px-4">
        {/* params.id.blImage */}

        {/* IsCarrierAsDriver &&
          bolStatus !== "CANCELLED") ||
          loggedInUser?.role_id.id == "4") */}

        <div className="w-full flex gap-2 justify-end">
          {loggedInUser?.role_id &&
            bolStatus !== "CANCELLED" &&
            loggedInUser?.role_id?.id === "1" &&
            IsCarrierAsDriver &&
            bolImagesData.getBolImagesByBolId.length !== 0 && (
              <button
                className="bg-linkBlue text-white py-4 px-2 rounded-md"
                onClick={openModal}
                disabled={disableSignAsDriver}
              >
                Sign As Driver
              </button>
            )}
          {loggedInUser?.role_id &&
            bolStatus !== "CANCELLED" &&
            (loggedInUser?.role_id?.id === "4" ||
              (loggedInUser?.role_id?.id === "1" && IsCarrierAsDriver)) &&
            bolImagesData?.getBolImagesByBolId?.length !== 0 && (
              <button
                className="bg-linkBlue text-white py-4 px-2 rounded-md"
                onClick={openModal}
                disabled={disableSignAsConsignee}
              >
                Sign As Consignee
              </button>
            )}
        </div>

        <div className="w-full ">
          {/* <Image src={BLImage} alt="Bill of Lading" /> */}
          <PDFTemplate users={bolDetails} />
        </div>
      </div>
      {isModalOpen && (
        <SignatureModal
          isOpen={isModalOpen}
          onClose={closeModal}
          bol_id={params?.id}
          refetchBolData={refetchBolData}
          refetchBolVersionData={refetchBolVersionData}
          refetchBolVersionConsigneeData={refetchBolVersionConsigneeData}
          refetchGenBolHistory={refetchGenBolHistory}
          refetchbolDetailsPdf={refetchbolDetailsPdf}
        />
      )}
    </div>
  );
};

export default ViewBl;

// {loggedInUser?.id !== "1" &&
// IsCarrierAsDriver && // Remove the parentheses here
// hasAlreadySigned === null && (
//   <div className="w-full flex gap-2 justify-end">
//     <button
//       className="bg-linkBlue text-white py-4 px-2 rounded-md"
//       onClick={openModal}
//     >
//       Sign As Driver
//     </button>
//     <button
//       className="bg-linkBlue text-white py-4 px-2 rounded-md"
//       onClick={openModal}
//     >
//       Sign As Consignee
//     </button>
//   </div>
// )}
