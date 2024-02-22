"use client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FORGOT_PASSWORD_MUTATION } from "@/fetching/mutations/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [forgotPassword, { loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    {
      onError: (error) => {
        console.error("Error:", error.message);
      },
      onCompleted: (data) => {
        console.log("Data:", data);
        const { token } = data.forgotPasswordResolver;
        router.push(`/reset-password?resetToken=${token}`);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ variables: { email } });
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
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
