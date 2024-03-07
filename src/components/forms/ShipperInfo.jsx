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
        } else if (value.length < 5) {
          newErrors.shipperAddress =
            "Address should be at least 5 characters long.";
        } else if (!/[a-zA-Z]/.test(value) && !/\d/.test(value)) {
          newErrors.shipperAddress =
            "Address should contain at least one letter or number.";
        } else {
          newErrors.shipperAddress = ""; // Clear the error if the address is valid
        }
        break;

      case "city":
        if (value.trim() === "") {
          newErrors.shipperCity = "City cannot be empty.";
        } else if (/\d/.test(value)) {
          newErrors.shipperCity = "City cannot contain numbers.";
        } else if (!/^[a-zA-Z\s-]{3,}$/.test(value)) {
          newErrors.shipperCity = "City should be at least 3 characters long.";
        } else {
          newErrors.shipperCity = "";
        }
        break;

      case "shipperState":
        if (value.trim() === "") {
          newErrors.shipperState = "State cannot be empty.";
        } else if (/\d/.test(value)) {
          newErrors.shipperState = "State cannot contain numbers.";
        } else if (!/^[a-zA-Z\s-]{2,}$/.test(value)) {
          newErrors.shipperState =
            "State should be at least 3 characters long.";
        } else {
          newErrors.shipperState = "";
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
        break;
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
          // onChange={(e) => handleInputChange(e, "shipperName")}
          className="px-2 rounded-md"
          readOnly
        />
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
