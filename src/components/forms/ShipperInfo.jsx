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
        newErrors.shipperNumber = !validatePhoneNumber(value)
          ? "The number should be between 8 and 15 digits."
          : "";
        break;
      case "shipperAddress":
        newErrors.shipperAddress = !validateAddress(value)
          ? "Address should be at least 5 characters long."
          : "";
        break;
      case "shipperCity":
        newErrors.shipperCity = !validateCity(value)
          ? "City should be at least 3 characters long."
          : "";
        break;
      case "shipperState":
        newErrors.shipperState = !validateState(value)
          ? "State should be at least 3 characters long."
          : "";
        break;
      case "shipperZipcode":
        newErrors.shipperZipcode = !validateZipcode(value)
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
