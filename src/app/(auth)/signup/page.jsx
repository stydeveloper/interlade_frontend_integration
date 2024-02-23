"use client";
import React, { useState } from "react";
import Image from "next/image";
import interladeBlue from "../../../../public/images/interladeBlue.png";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SubscriptionEmailModal from "@/components/SubscriptionEmailModal/SubscriptionEmailModal";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
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
  const [showPassword, setShowPassword] = useState(false);
  const [signupResponse, setSignupResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisabled] = useState(false);
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
          ? "Name must be at least three characters long"
          : "";
        break;
      case "email":
        newErrors.email = !emailRegex.test(value)
          ? "Please provide a valid email (abc@example.com)."
          : "";
        break;
      case "password":
        if (value.length < 8) {
          newErrors.password = "Password should be at least 8 characters long.";
        } else {
          newErrors.password = !validatePassword(value)
            ? "(Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character)"
            : "";
        }
        break;
      case "address":
        newErrors.address = !validateAddress(value)
          ? "Address should be at least 5 characters long."
          : "";
        break;
      case "state":
        newErrors.state = !validateState(value)
          ? "State should be at least 3 characters long."
          : "";
        break;
      case "city":
        newErrors.city = !validateCity(value)
          ? "City should be at least 3 characters long."
          : "";
        break;
      case "zipcode":
        newErrors.zipcode = !validateZipcode(value)
          ? "Zipcode should be at least 4 digits long."
          : "";
        break;
      case "number":
        newErrors.number = !validatePhoneNumber(value)
          ? "The number should be between 8 and 15 digits."
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

    setDisabled(true);
    // Check if there are any errors
    if (Object.values(formErrors).some((error) => error !== "")) {
      toast.error("Please fix all errors before submitting.");
      return;
    }

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!allFieldsFilled) {
      toast.error("Please fill in all fields.");
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

      // Show success modal only if all fields are filled and no errors
      setShowModal(true);
      // toast.success("Signed up successfully!", { position: "top-right" });
      // router.push("/");
    } catch (error) {
      toast.error("An error occurred while signing up.");
    } finally {
      setTimeout(() => {
        setDisabled(false);
      }, 6000);
    }
  };

  return (
    <div className="flex items-center justify-center bg-cgray">
      <div className="h-[90%] max-w-lg my-8">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
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
                {key === "password" ? (
                  <div className="relative">
                    <input
                      className="border border-black items-center justify-center appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id={key}
                      type={showPassword ? "text" : "password"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      onChange={handleInputChange}
                    />
                    {showPassword ? (
                      <EyeInvisibleOutlined
                        className="absolute top-2 mt-1 right-3 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOutlined
                        className="absolute top-2 mt-1 right-3 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                ) : key === "email" ? (
                  <input
                    className="border border-black appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={key}
                    type="email" // Change type to email
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    className="border border-black  appearance-none  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={key}
                    type="text" // Change type to text
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    onChange={handleInputChange}
                  />
                )}
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
              className={`${
                disable
                  ? "bg-linkBlue cursor-not-allowed"
                  : "bg-linkBlue hover:bg-sky-800"
              } text-white font-bold mt-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={disable}
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <a className="text-linkBlue" href="/login">
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
