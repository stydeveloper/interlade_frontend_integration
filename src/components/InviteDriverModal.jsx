"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { INVITE_DRIVER_MUTATION } from "@/fetching/mutations/user";
import { emailRegex } from "@/utils/user-validation";
import { toast } from "react-toastify";

function InviteDriverModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);

  const [inviteDriver, { data, loading, error }] = useMutation(
    INVITE_DRIVER_MUTATION
  );

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
      const response = await inviteDriver({ variables: { email } });
      console.log(response);
      if (response?.data?.inviteDriver?.success) {
        console.log(response.data.inviteDriver.message);

        toast.success("Invitation sent successfully.", {
          position: "top-right",
        });
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 6000);
        setSuccessMessage(
          "Success! The Driver Will Recieve An Email Invite for BoL document!"
        );
        setEmail(""); // Clearing the form
        setErrorMessage(""); // Clearing any existing error message

        // Set a timer to clear the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMessage("Failed to send invite. Please try again.");
      }
    } catch (error) {
      // Check if error is an instance of Error and then access its message property
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
        <div className="relative bg-gray-300 rounded-md flex flex-col items-center py-12 px-16">
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
          <p className="text-2xl font-bold mb-6 underline">Invite Driver(s)</p>
          <div className="flex flex-col w-full my-4 mb-12">
            <label className="text-xl mb-2">Driver(s) Email:</label>
            <input
              className="rounded-md p-2"
              type="email"
              autoFocus
              required
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
          <p className="text-md">
            Driver(s) will receive an invitation to utilize BLs on the road via
            the Interlade Driver App.
          </p>
          <a
            className="italic text-linkBlue"
            href="https://www.apple.com/jp/app-store/"
            target="_blank"
            rel="noreferrer"
          >
            (www.linktodownloaddriverapp.com)
          </a>

          <button
            className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
            onClick={handleSendInvite}
            disabled={disable}
          >
            Send Invite(s)
          </button>
        </div>
      </div>
    )
  );
}

export default InviteDriverModal;
