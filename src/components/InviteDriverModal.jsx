"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { INVITE_DRIVER_MUTATION } from "@/fetching/mutations/user";

function InviteDriverModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [inviteDriver, { data, loading, error }] = useMutation(
    INVITE_DRIVER_MUTATION
  );

  const handleSendInvite = async () => {
    try {
      console.log(email);
      const response = await inviteDriver({ variables: { email } });
      console.log(response);
      if (response.data.inviteDriver.success) {
        console.log(response.data.inviteDriver.message);
        setSuccessMessage(
          "Success! The Driver Will Recieve An Email Invite for BoL document!"
        );
        setEmail(""); // Clearing the form
        setErrorMessage(""); // Clearing any existing error message

        // Set a timer to clear the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 10000);
      } else {
        setErrorMessage("Failed to send invite. Please try again.");
      }
    } catch (error) {
      // Check if error is an instance of Error and then access its message property
      if (error instanceof Error) {
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
      } else {
        // Handle cases where the error is not an instance of Error
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div
          className="relative bg-gray-300 rounded-md flex flex-col items-center py-12 px-16"
          style={{ border: "2px solid red" }}
        >
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
          >
            Send Invite(s)
          </button>
        </div>
      </div>
    )
  );
}

export default InviteDriverModal;
