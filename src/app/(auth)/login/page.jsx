"use client";
import React, { useState } from "react";
import Image from "next/image";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { io } from "socket.io-client";
import { LOGIN_USER_MUTATION } from "@/fetching/mutations/user";
import { emailRegex } from "@/utils/user-validation"; // Import email regex and password validation
import { Spin } from "antd";
import Cookies from "js-cookie"; // Import js-cookie library

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disable, setDisabled] = useState(false);
  const router = useRouter();

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const response = await loginUser({ variables: { email, password } });

      // if (typeof window !== "undefined") {
      //   localStorage.setItem(
      //     "role_id",
      //     `${response.data.loginUser.role_id.id}`
      //   );
      //   localStorage.setItem("token", `${response.data.loginUser.token}`);
      //   localStorage.setItem("user", JSON.stringify(response?.data?.loginUser));
      // }
      // setEmail("");
      // setPassword("");
      // router.push("/");

      if (response?.data?.loginUser) {
        // Set cookies
        const {
          password,

          token,
          message,
          status,
          created_at,
          termsacknowledged,
          ...user
        } = response?.data?.loginUser;

        console.log("loing return value ", response?.data?.loginUser);

        if (typeof window !== "undefined") {
          Cookies.set("role_id", response.data.loginUser.role_id.id);
          Cookies.set("token", response.data.loginUser.token);
          Cookies.set("user", JSON.stringify(user));
          Cookies.set("isAuthenticated", true);
          Cookies.set("termsAcknowledged", termsacknowledged);
          Cookies.set("status", status);
        }
        setEmail("");
        setPassword("");
        router.push("/");
        toast.success("Logged in successfully!", { position: "top-right" });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
    } finally {
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 6000);
    }
  };

  const handleForgotPassword = () => {
    console.log("Hello");
    router.push("/forgot-password");
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (!emailRegex.test(value)) {
      setEmailError("Please provide a valid email (abc@example.com).");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-authBg">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-65"></div>
          <div className="relative">
            <Spin size="large" className="z-10" />
          </div>
        </div>
      )}
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
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
          <h3 className="mb-3 text-3xl text-center  font-bold">Log In</h3>
          <div className="mb-4">
            <label className="block text-sm font-bold " htmlFor="email">
              Email
            </label>
            <input
              className="shadow-md appearance-none border border-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-cancelRed text-xs mt-1">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-bold " htmlFor="password">
              Password
            </label>
            <input
              className="shadow-md  appearance-none border border-black rounded w-full py-2 px-3 mb-2 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <p className="text-cancelRed text-xs mt-1">{passwordError}</p>
            )}
            <a
              className="text-xs w-max text-linkBlue self-end cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </a>
          </div>
          <div className="w-full mt-2 flex items-center justify-between">
            <button
              className={`${
                disable ? "bg-linkBlue " : "bg-linkBlue hover:bg-sky-800"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={disable}
            >
              Log In
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <a className="text-linkBlue" href="/signup">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
