"use client";
import {
  validateAddress,
  validateCity,
  validatePhoneNumber,
  validateState,
  validateZipcode,
} from "@/utils/user-validation";
import { FormWrapper } from "../FormWrapper";
import { useState } from "react";

export function ShipperInfo({
  shipperEmail,
  shipperName,
  shipperNumber,
  shipperAddress,
  shipperCity,
  shipperState,
  shipperZipcode,
  update,
}) {
  const [formErrors, setFormErrors] = useState({
    shipperName: "",
    shipperNumber: "",
    shipperAddress: "",
    shipperCity: "",
    shipperState: "",
    shipperZipcode: "",
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    // Validate input dynamically
    const newErrors = { ...formErrors };
    switch (field) {
      case "shipperName":
        newErrors.shipperName =
          !value || value.length < 3
            ? "Name must be at least 3 characters long"
            : "";
        break;
      case "shipperNumber":
        if (value === "") {
          newErrors.shipperNumber = ""; // Clear the error if the field is empty
        } else if (!/^\d+$/.test(value)) {
          newErrors.shipperNumber = "The number should only contain digits.";
        } else if (value.length < 8 || value.length > 15) {
          newErrors.shipperNumber =
            "The number should be between 8 and 15 digits long.";
        } else {
          newErrors.shipperNumber = ""; // Clear the error if the number is valid
        }
        break;
      case "shipperAddress":
        if (value.trim() === "") {
          newErrors.shipperAddress = "Address cannot be empty.";
        } else if (value.trim().length < 5) {
          newErrors.shipperAddress =
            "Address should be at least 5 characters long.";
        } else if (!/^[a-zA-Z\d\s]+$/.test(value.trim())) {
          newErrors.shipperAddress =
            "Address should contain letters, numbers, or spaces.";
        } else {
          newErrors.shipperAddress = ""; // Clear the error if the address is valid
        }
        break;

      case "shipperCity":
        if (value.trim() === "") {
          newErrors.shipperCity = "City cannot be empty.";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          newErrors.shipperCity = "City should only contain letters or spaces.";
        } else if (!/[a-zA-Z]/.test(value.trim())) {
          newErrors.shipperCity = "City must contain at least one letter.";
        } else if (/\d/.test(value.trim())) {
          newErrors.shipperCity = "City should not contain numbers.";
        } else if (value.trim().length < 3) {
          newErrors.shipperCity = "City should be at least 3 characters long.";
        } else {
          newErrors.shipperCity = ""; // Clear the error if the input is valid
        }
        break;
      case "shipperState":
        if (value.trim() === "") {
          newErrors.shipperState = "State cannot be empty.";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          newErrors.shipperState =
            "State should only contain letters or spaces.";
        } else if (!/[a-zA-Z]/.test(value.trim())) {
          newErrors.shipperState = "State must contain at least one letter.";
        } else if (/\d/.test(value.trim())) {
          newErrors.shipperState = "State should not contain numbers.";
        } else if (value.trim().length < 3) {
          newErrors.shipperState =
            "State should be at least 3 characters long.";
        } else {
          newErrors.shipperState = ""; // Clear the error if the input is valid
        }
        break;

      case "shipperZipcode":
        if (value === "") {
          newErrors.shipperZipcode = ""; // Clear the error if the field is empty
        } else if (!value || value.length < 4) {
          newErrors.shipperZipcode =
            "Zipcode should be at least 4 digits long.";
        } else if (!/^\d+$/.test(value.trim())) {
          newErrors.shipperZipcode = "Zipcode should only contain digits.";
        } else {
          newErrors.shipperZipcode = ""; // Clear the error if the input is valid
        }
        break;
      default:
        break; // Default case to handle unknown fields
    }

    // Update errors state
    setFormErrors(newErrors);

    // Update form data
    update({ [field]: value });
  };
  return (
    <FormWrapper title="Shipper Information">
      <label>Shipper Email:</label>
      <div className="flex flex-col gap-1">
        <input
          autoFocus
          required
          type="email"
          value={shipperEmail}
          // onChange={(e) => handleInputChange(e, "shipperEmail")}
          className="px-2 rounded-md"
          readOnly
        />
      </div>
      <label>Shipper Name:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperName}
          onChange={(e) => handleInputChange(e, "shipperName")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperName && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperName}
          </p>
        )}
      </div>
      <label>Shipper Number:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperNumber}
          onChange={(e) => handleInputChange(e, "shipperNumber")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperNumber && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperNumber}
          </p>
        )}
      </div>
      <label>Shipper Address:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperAddress}
          onChange={(e) => handleInputChange(e, "shipperAddress")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperAddress && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperAddress}
          </p>
        )}
      </div>
      <label>Shipper City:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperCity}
          onChange={(e) => handleInputChange(e, "shipperCity")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperCity && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperCity}
          </p>
        )}
      </div>
      <label>Shipper State:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperState}
          onChange={(e) => handleInputChange(e, "shipperState")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperState && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperState}
          </p>
        )}
      </div>
      <label>Shipper Zipcode:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={shipperZipcode}
          onChange={(e) => handleInputChange(e, "shipperZipcode")}
          className="px-2 rounded-md"
        />
        {formErrors.shipperZipcode && (
          <p className="text-cancelRed text-xs  ml-1">
            {formErrors.shipperZipcode}
          </p>
        )}
      </div>
    </FormWrapper>
  );
}
