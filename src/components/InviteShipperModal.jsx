"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { INVITE_SHIPPER_MUTATION } from "@/fetching/mutations/user";
import { toast } from "react-toastify";
import { emailRegex } from "@/utils/user-validation";
// import withToast from "@/components/hoc/withToast.jsx";
function InviteShipperModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);
  const textToCopy = "www.interlade.com/carrieruniqueinvite4shippertocreateBoL";
  const [inviteShipper, { data, loading, error }] = useMutation(
    INVITE_SHIPPER_MUTATION
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (err) {
      alert("Failed to copy text");
    }
  };

  const handleSendInvite = async () => {
    try {
      if (!email) {
        toast.error("Email is required!", { position: "top-right" });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
        return;
      }

      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.", {
          position: "top-right",
        });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
        return;
      }

      const response = await inviteShipper({ variables: { email } });

      if (response?.data?.inviteShipper?.success) {
        console.log(response.data.inviteShipper.message);
        toast.success("Invitation sent successfully.", {
          position: "top-right",
        });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
        setSuccessMessage(
          "Success! The Shipper Will Recieve An Email Invite To Create A Bill of Lading"
        );
        setEmail(""); // Clearing the form
        setErrorMessage(""); // Clearing any existing error message

        // Set a timer to clear the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setTimeout(() => {
          onClose();
        }, 6000);
      }
    } catch (error) {
      // Check if error is an instance of Error and then access its message property
      // if (error instanceof Error) {
      //   setErrorMessage(
      //     error.message || "An error occurred. Please try again."
      //   );
      // } else {
      //   // Handle cases where the error is not an instance of Error
      //   setErrorMessage("An unexpected error occurred. Please try again.");
      // }
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative w-[662.8px] bg-gray-400 rounded-md flex flex-col items-center py-12 px-24  h-[390px]">
          {/* Close button positioned in the top-right corner */}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer border-2 border-white rounded-full"
          >
            <Image
              alt="Close Modal"
              src="/images/cancel.png"
              width={25}
              height={25}
            />
          </button>
          <p className="text-2xl font-bold mb-6 underline">Invite Shipper(s)</p>
          <div className="flex flex-col w-full my-4 ">
            <label className="text-xl mb-2">Shipper(s):</label>
            <input
              className="rounded-md p-2"
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {successMessage && (
            <div className="text-successGreen text-lg font-bold">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="text-cancelRed text-lg font-bold">
              {errorMessage}
            </div>
          )}
          <button
            className="bg-sky-600 p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
            onClick={handleSendInvite}
            disabled={disable}
          >
            Send Invite(s) to Create B/L
          </button>
          {/* <p className="mb-4 font-semibold text-lg my-12">OR</p>
          <div className="flex flex-col w-full">
            {!copied ? (
              <>
                <p className="text-xl mb-2">Copy Link Below</p>
                <button
                  className="italic text-white bg-borderGrey p-2 rounded hover:bg-black"
                  onClick={handleCopyClick}
                >
                  {textToCopy}
                </button>
              </>
            ) : (
              <>
                <p className="text-xl mb-2">Copied!</p>
                <p className="italic text-white bg-gray p-2 rounded border-2 border-white">
                  {textToCopy}
                </p>
              </>
            )}
          </div> */}
        </div>
      </div>
    )
  );
}

export default InviteShipperModal;
