"use client";
import React, { useState } from "react";
import Image from "next/image";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SubscriptionEmailModal from "@/components/SubscriptionEmailModal/SubscriptionEmailModal";
import {
  validatePassword,
  validateName,
  validateAddress,
  validateState,
  validateCity,
  validateZipcode,
  validatePhoneNumber,
  emailRegex,
} from "@/utils/user-validation"; // Import the validation functions

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    number: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    number: "",
  });

  const [signupResponse, setSignupResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input dynamically
    const newErrors = { ...formErrors };
    switch (name) {
      case "name":
        newErrors.name = !validateName(value)
          ? "Name must be at least three characters long!"
          : "";
        break;
      case "email":
        newErrors.email = !emailRegex.test(value)
          ? "Invalid email address! Please provide a valid email (abc@example.com)."
          : "";
        break;
      case "password":
        if (value.length < 8) {
          newErrors.password =
            "Invalid password! Password should be at least 8 characters long.";
        } else {
          newErrors.password = !validatePassword(value)
            ? "Invalid password format! (Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character)"
            : "";
        }
        break;
      case "address":
        newErrors.address = !validateAddress(value)
          ? "Invalid address! Address should be at least 5 characters long."
          : "";
        break;
      case "state":
        newErrors.state = !validateState(value)
          ? "Invalid state! State should be at least 3 characters long."
          : "";
        break;
      case "city":
        newErrors.city = !validateCity(value)
          ? "Invalid city! City should be at least 3 characters long."
          : "";
        break;
      case "zipcode":
        newErrors.zipcode = !validateZipcode(value)
          ? "Invalid zipcode! Zipcode should be at least 4 characters long."
          : "";
        break;
      case "number":
        newErrors.number = !validatePhoneNumber(value)
          ? "Invalid phone number! The number should be between 8 and 15 digits."
          : "";
        break;
      default:
        break;
    }

    // Update errors state
    setFormErrors(newErrors);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Check if there are any errors
    if (Object.values(formErrors).some((error) => error !== "")) {
      toast.error("Please fix all errors before submitting.");
      return;
    }

    try {
      // Call the signup mutation
      // const response = await signupUser({
      //   variables: formData,
      // });
      // setSignupResponse("Signup successful!");
      // localStorage.setItem("role_id", `${response.data.signupUser.role_id.id}`);
      // localStorage.setItem("token", `${response.data.signupUser.token}`);
      // localStorage.setItem("user", JSON.stringify(response?.data?.signupUser));

      // Clear form data
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   address: "",
      //   state: "",
      //   city: "",
      //   zipcode: "",
      //   number: "",
      // });

      // Show success modal
      setShowModal(true);
      // toast.success("Signed up successfully!", { position: "top-right" });
      // router.push("/");
    } catch (error) {
      toast.error("An error occurred while signing up.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="h-[90%] max-w-lg my-8">
        <form
          onSubmit={handleSignup}
          className="bg-white border-2 border-blue-100 rounded-md px-8 pt-6 pb-8 mb-4"
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
          <h3 className="mb-3 text-3xl text-center font-bold">Sign Up</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-bold mb-1" htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  className="border-1 border-blue-200 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id={key}
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={handleInputChange}
                />
                {formErrors[key] && (
                  <p className="text-cancelRed text-xs mt-1 ml-1">
                    {formErrors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <a className="text-blue-500" href="/login">
              Log In
            </a>
          </p>
        </form>
      </div>
      <SubscriptionEmailModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default SignupPage;