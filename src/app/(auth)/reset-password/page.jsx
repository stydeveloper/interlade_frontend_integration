"use client";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RESET_PASSWORD_MUTATION } from "@/fetching/mutations/user";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import Image from "next/image";

const ResetPassword = ({ searchParams }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const resetToken = searchParams.resetToken;

  const [resetPassword, { loading, error: mutationError }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message, { position: "top-right" });
        } else {
          toast.error("An unknown error occurred", { position: "top-right" });
        }
      },
      onCompleted: (data) => {
        if (data.resetPassword.success) {
          toast.success(data.resetPassword.message, { position: "top-right" });
          router.push("/login");
        } else {
          setError(data.resetPassword.message);
        }
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await resetPassword({
        variables: { resetToken, newPassword: password, confirmPassword },
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cgray">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="flex flex-col mb-8 items-center justify-center">
            <Image src={interladeBlue} width={50} alt="" />
            <h1 className="text-2xl font-medium my-1 text-linkBlue">
              Interlade
            </h1>
            <span className="text-xs text-linkBlue">
              Better Bill of Lading Management.
            </span>
          </div>
          <h3 className="mb-3 text-3xl text-center  font-bold">
            Reset Password
          </h3>
          <>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="w-full mt-2 flex items-center justify-between">
              <button
                type="submit"
                className="bg-linkBlue hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Reset Password"}
              </button>
            </div>
            {mutationError && (
              <p className="text-red-500 mt-2">{mutationError.message}</p>
            )}
          </>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
