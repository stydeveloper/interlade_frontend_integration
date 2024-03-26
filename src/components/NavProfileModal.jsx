import React, { useState } from "react";
import Image from "next/image";
import Close from "../../public/images/cancel.png";
import Profile from "../../public/images/user.png";
import LogOutBtn from "./LogOutBtn";
import Cookies from "js-cookie";
import ConfirmationModal from "./ConfirmationModal";
import PlanModal from "./PlanModal/PlanModal";
import { CANCEL_SUBSCRIPTION } from "@/fetching/mutations/user";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const NavProfileModal = ({ isOpen, onClose, roleId, email }) => {
  const [cancelSub] = useMutation(CANCEL_SUBSCRIPTION);
  let userInfo;
  let status;
  if (typeof window !== "undefined") {
    try {
      userInfo = JSON.parse(Cookies.get("user"));
      status = Cookies.get("status");
      console.log("status check ", status);
    } catch (error) {
      console.error("Error parsing user info:", error);
      // Handle the error, e.g., set userInfo to a default value
      userInfo = null;
    }
  }

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handleCancelSubscription = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationOk = async () => {
    // Handle confirmation logic, e.g., cancel subscription
    try {
      const response = await cancelSub({ variables: { email } });
      console.log("response==============>", response.data);
      console.log("response==============>", response?.data?.success === true);
      Cookies.remove("status");
      Cookies.set("status", "Blocked");
      if (response?.data) {
        console.log("::::::-----:::::::");

        // toast.success("Subscription canceled successfully", {
        //   position: "top-right",
        // });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
    } finally {
      setIsConfirmationOpen(false);
      onClose();
      if (typeof window !== "undefined") {
        window.location.reload(); // Refresh the page
      }
    }

    // setIsPlanModalOpen(true);
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationOpen(false);
  };

  const handleRenewSubscription = () => {
    setIsPlanModalOpen(true);
  };

  const hanldeCloseRenewSub = () => {
    setIsPlanModalOpen(false);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative flex flex-col bg-black text-white py-10 px-8 border-2 border-gray rounded-md">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer"
          >
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <div className="flex items-center">
            {/* User profile image or placeholder */}
            <Image src={Profile} alt="Profile Image" width={80} height={80} />
            {/* User name and email */}
            <div className="ml-4">
              <p>{userInfo ? userInfo.name : "Company Name"}</p>
              <p>{userInfo ? userInfo.email : "info@companyname.com"}</p>
            </div>
          </div>
          <div className="h-[2px] bg-white my-6"></div>
          <div className="flex gap-4  mr-48  w-full">
            <LogOutBtn />
            {status === "Active" && roleId === "1" ? (
              <button
                className="bg-red-600 text-white rounded-md  px-2 py-1 border-2"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </button>
            ) : status === "Blocked" && roleId === "1" ? (
              <button
                className="bg-green-600 text-white rounded-md  px-2 py-1 border-2"
                onClick={handleRenewSubscription}
              >
                Renew Subscription
              </button>
            ) : null}
          </div>
        </div>

        {isConfirmationOpen && (
          <ConfirmationModal
            open={isConfirmationOpen}
            onOk={handleConfirmationOk}
            confirmLoading={false} // Set to true if you want to show loading state
            onCancel={handleConfirmationCancel}
            modalText="Are you sure you want to cancel the subscription?"
          />
        )}
        {isPlanModalOpen && (
          <PlanModal
            showModal={isPlanModalOpen}
            closeModal={hanldeCloseRenewSub}
            email={email}
          />
        )}
      </div>
    )
  );
};

export default NavProfileModal;
