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
        newErrors.consigneeName = !validateName(value)
          ? "Name must be at least three characters long"
          : "";
        break;
      case "consigneeEmail":
        newErrors.consigneeEmail = !emailRegex.test(value)
          ? "Please provide a valid email (abc@example.com)."
          : "";
        break;
      case "consigneeNumber":
        newErrors.consigneeNumber = !validatePhoneNumber(value)
          ? "The number should be between 8 and 15 digits."
          : "";
        break;
      case "consigneeAddress":
        newErrors.consigneeAddress = !validateAddress(value)
          ? "Address should be at least 5 characters long."
          : "";
        break;
      case "consigneeCity":
        newErrors.consigneeCity = !validateCity(value)
          ? "City should be at least 3 characters long."
          : "";
        break;
      case "consigneeState":
        newErrors.consigneeState = !validateState(value)
          ? "State should be at least 3 characters long."
          : "";
        break;
      case "consigneeZipcode":
        newErrors.consigneeZipcode = !validateZipcode(value)
          ? "Zipcode should be at least 4 digits long."
          : "";
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
