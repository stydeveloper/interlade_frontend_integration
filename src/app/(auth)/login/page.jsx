"use client";
import React, { useState } from "react";
import Image from "next/image";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      password
      role_id {
        id
        name
      }
      name
      address
      state
      city
      status
      zipcode
      message
      number
      token
      created_at
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const [loginUser] = useMutation(LOGIN_USER_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ variables: { email, password } });
      setLoginResponse("Login successful!");
      localStorage.setItem("role_id", `${response.data.loginUser.role_id.id}`);
      localStorage.setItem("token", `${response.data.loginUser.token}`);
      localStorage.setItem("user", JSON.stringify(response?.data?.loginUser));
      setEmail("");
      setPassword("");
      toast.success("Logged in successfull!", "top-right");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unknown error occurred");
      }
    }
  };

  const handleForgotPassword = () => {
    console.log("Hello");
    router.push("/forgot-password");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
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
          <h3 className="mb-3 text-lg text-center font-medium">Log In</h3>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              className="text-xs text-blue-500  flex justify-end cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </a>
          </div>
          <div className="mb-4">
            {loginResponse && (
              <p className="text-successGreen text-xs italic ">
                {loginResponse}
              </p>
            )}
            {loginError && (
              <p className="text-cancelRed text-xs italic">{loginError}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
