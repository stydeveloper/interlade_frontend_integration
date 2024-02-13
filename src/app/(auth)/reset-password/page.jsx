"use client";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $resetToken: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      success
      message
    }
  }
`;

const ResetPassword = ({ params }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("resetToken");

  const [resetPassword, { loading, error: mutationError }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onError: (error) => {
        console.error("Error:", error.message);
      },
      onCompleted: (data) => {
        console.log("Data:", data);
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
    <div className="bg-gray-500 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="block text-gray-700 text-sm font-bold mb-2"
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Reset Password"}
          </button>
          {mutationError && (
            <p className="text-red-500 mt-2">{mutationError.message}</p>
          )}
        </>
      </form>
    </div>
  );
};

export default ResetPassword;