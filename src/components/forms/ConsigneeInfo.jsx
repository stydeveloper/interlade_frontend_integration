"use client";
import { FormWrapper } from "../FormWrapper";
import React, { useState } from "react";
import {
  validateName,
  validateAddress,
  validateState,
  validateCity,
  validateZipcode,
  validatePhoneNumber,
  emailRegex,
} from "@/utils/user-validation";

export function ConsigneeInfo({
  consigneeEmail,
  consigneeName,
  consigneeNumber,
  consigneeAddress,
  consigneeCity,
  consigneeState,
  consigneeZipcode,
  update,
}) {
  const [formErrors, setFormErrors] = useState({
    consigneeEmail: "",
    consigneeName: "",
    consigneeNumber: "",
    consigneeAddress: "",
    consigneeCity: "",
    consigneeState: "",
    consigneeZipcode: "",
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    // Validate input dynamically
    const newErrors = { ...formErrors };
    switch (field) {
      case "consigneeName":
        newErrors.consigneeName =
          !value || value.length < 3
            ? "Name must be at least 3 characters long"
            : "";
        break;
      case "consigneeEmail":
        newErrors.consigneeEmail =
          !emailRegex.test(value) && value !== ""
            ? "Please provide a valid email (abc@example.com)."
            : "";
        break;
      case "consigneeNumber":
        const sanitizedValue = value.replace(/\s/g, ""); // Remove spaces
        if (sanitizedValue === "") {
          newErrors.consigneeNumber = ""; // Clear the error if the field is empty
        } else if (!/^\d{10}$/.test(sanitizedValue)) {
          newErrors.consigneeNumber = "The number should be 10 digits long.";
        } else {
          newErrors.consigneeNumber = ""; // Clear the error if the number is valid
        }
        break;
      case "consigneeAddress":
        if (value.trim() === "") {
          newErrors.consigneeAddress = "Address cannot be empty.";
        } else if (value.length < 5) {
          newErrors.consigneeAddress =
            "Address should be at least 5 characters long.";
        } else if (!/[a-zA-Z]/.test(value) && !/\d/.test(value)) {
          newErrors.consigneeAddress =
            "Address should contain at least one letter or number.";
        } else {
          newErrors.consigneeAddress = ""; // Clear the error if the address is valid
        }
        break;
      case "consigneeCity":
        if (value.trim() === "") {
          newErrors.consigneeCity = "City cannot be empty.";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          newErrors.consigneeCity =
            "City should only contain letters or spaces.";
        } else if (!/[a-zA-Z]/.test(value.trim())) {
          newErrors.consigneeCity = "City must contain at least one letter.";
        } else if (/\d/.test(value.trim())) {
          newErrors.consigneeCity = "City should not contain numbers.";
        } else if (value.trim().length < 3) {
          newErrors.consigneeCity =
            "City should be at least 3 characters long.";
        } else {
          newErrors.consigneeCity = ""; // Clear the error if the input is valid
        }
        break;
      case "consigneeState":
        if (value.trim() === "") {
          newErrors.consigneeState = "State cannot be empty.";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          newErrors.consigneeState =
            "State should only contain letters or spaces.";
        } else if (!/[a-zA-Z]/.test(value.trim())) {
          newErrors.consigneeState = "State must contain at least one letter.";
        } else if (/\d/.test(value.trim())) {
          newErrors.consigneeState = "State should not contain numbers.";
        } else if (value.trim().length < 3) {
          newErrors.consigneeState =
            "State should be at least 3 characters long.";
        } else {
          newErrors.consigneeState = ""; // Clear the error if the input is valid
        }
        break;
      case "consigneeZipcode":
        if (value === "") {
          newErrors.consigneeZipcode = ""; // Clear the error if the field is empty
        } else if (!value || value.length < 4) {
          newErrors.consigneeZipcode =
            "Zipcode should be at least 4 digits long.";
        } else if (!/^\d+$/.test(value.trim())) {
          newErrors.consigneeZipcode = "Zipcode should only contain digits.";
        } else {
          newErrors.consigneeZipcode = ""; // Clear the error if the input is valid
        }
        break;
      default:
        break;
    }

    // Update errors state
    setFormErrors(newErrors);

    // Update form data
    let formattedValue = value;
    if (field === "consigneeNumber") {
      // Format the phone number with spaces after every third and sixth digit
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, (_, p1, p2, p3) => {
          let result = p1;
          if (p2) result += ` ${p2}`;
          if (p3) result += ` ${p3}`;
          return result;
        });
    }

    // Update form data
    update({ [field]: formattedValue });
  };

  return (
    <FormWrapper title="Consignee Information">
      <label>Consignee Email:</label>
      <div className="flex flex-col gap-1">
        <input
          autoFocus
          required
          type="email"
          value={consigneeEmail}
          onChange={(e) => handleInputChange(e, "consigneeEmail")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeEmail && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeEmail}
          </p>
        )}
      </div>
      <label>Consignee Name:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeName}
          onChange={(e) => handleInputChange(e, "consigneeName")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeName && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeName}
          </p>
        )}
      </div>
      <label>Consignee Number:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeNumber}
          onChange={(e) => handleInputChange(e, "consigneeNumber")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeNumber && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeNumber}
          </p>
        )}
      </div>
      <label>Consignee Address:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeAddress}
          onChange={(e) => handleInputChange(e, "consigneeAddress")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeAddress && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeAddress}
          </p>
        )}
      </div>
      <label>Consignee City:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeCity}
          onChange={(e) => handleInputChange(e, "consigneeCity")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeCity && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeCity}
          </p>
        )}
      </div>
      <label>Consignee State:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeState}
          onChange={(e) => handleInputChange(e, "consigneeState")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeState && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeState}
          </p>
        )}
      </div>
      <label>Consignee Zipcode:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={consigneeZipcode}
          onChange={(e) => handleInputChange(e, "consigneeZipcode")}
          className="px-2 rounded-md"
        />
        {formErrors.consigneeZipcode && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.consigneeZipcode}
          </p>
        )}
      </div>
    </FormWrapper>
  );
}
