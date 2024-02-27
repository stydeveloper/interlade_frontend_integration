"use client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FORGOT_PASSWORD_MUTATION } from "@/fetching/mutations/user";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import Image from "next/image";
import { toast } from "react-toastify";

import BackBtn from "../../../../public/images/backBtn.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [disable, setDisabled] = useState(false);
  const router = useRouter();

  const [forgotPassword, { loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    {
      onError: (error) => {
        console.error("Error:", error.message);
        toast.error(error.message, { position: "top-right" });
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 6000);
      },
      onCompleted: (data) => {
        console.log("Data:", data);
        const { token } = data.forgotPasswordResolver;
        toast.success(data.forgotPasswordResolver.message, {
          position: "top-right",
        });
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 6000);

        // router.push(`/reset-password?resetToken=${token}`);
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

  //   <form
  //   onSubmit={handleSubmit}
  //   className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  // >
  //   <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
  //   <div className="mb-4">
  //     <label
  //       htmlFor="email"
  //       className="block text-gray-700 text-sm font-bold mb-2"
  //     >
  //       Email
  //     </label>
  //     <input
  //       type="email"
  //       id="email"
  //       name="email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //       placeholder="Enter your email"
  //       className="w-full p-2 border border-gray-300 rounded"
  //       required
  //     />
  //   </div>
  //   <button
  //     type="submit"
  //     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
  //     disabled={loading}
  //   >
  //     {loading ? "Submitting..." : "Submit"}
  //   </button>
  //   {error && <p className="text-red-500 mt-2">{error.message}</p>}
  // </form>

  return (
    <div className="flex items-center justify-center h-screen bg-cgray">
      <div className="w-full max-w-xs ">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2"
        >
          <Image
            alt="Back"
            src={BackBtn}
            width={40}
            className="absolute top-[0.9rem] left-3 cursor-pointer"
            onClick={() => router.back()}
            title="Back to Login"
          />
          <div className="flex flex-col mb-8 items-center justify-center">
            <Image src={interladeBlue} width={50} alt="" />
            <h1 className="text-2xl font-medium my-1 text-linkBlue">
              Interlade
            </h1>
            <span className="text-xs text-linkBlue">
              Better Bill of Lading Management.
            </span>
          </div>
          <h3 className="mb-4 text-2xl text-center  font-bold">
            Forgot Password
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-md appearance-none border border-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-2 flex items-center justify-between">
            <button
              className="bg-linkBlue hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading || disable}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          {/* {error && <p className="text-red-500 mt-2">{error.message}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

{
  /* <form
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
        </form> */
}
