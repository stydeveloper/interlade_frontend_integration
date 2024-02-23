"use client";
import { FormWrapper } from "../FormWrapper";
import React, { useState } from "react";
import {
  validateUnits,
  validateVolume,
  validateWeight,
  validateUnNaNumber,
  validateString,
} from "@/utils/bol-validation";

export function LoadInfo({
  units,
  packageType,
  volume,
  weight,
  unOrNaNumber,
  hazardousClass,
  packingGroup,
  loadDesc,
  update,
}) {
  const [formErrors, setFormErrors] = useState({
    units: "",
    packageType: "",
    volume: "",
    weight: "",
    unOrNaNumber: "",
    hazardousClass: "",
    packingGroup: "",
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    const newErrors = { ...formErrors };

    switch (field) {
      case "units":
        newErrors.units = !validateUnits(value)
          ? "Units must be a positive integer."
          : "";
        break;
      case "packageType":
        newErrors.packageType = !validateString(value)
          ? "Package type must be between 3 to 15 characters."
          : "";
        break;
      case "hazardousClass":
        newErrors.hazardousClass = !validateString(value)
          ? "Hazardous class must be between 3 to 15 characters."
          : "";
        break;
      case "packingGroup":
        newErrors.packingGroup = !validateString(value)
          ? "Packing group must be between 3 to 15 characters."
          : "";
        break;
      case "volume":
        newErrors.volume = !validateVolume(value)
          ? "Volume must be like this 20 or 20.50."
          : "";
        break;
      case "weight":
        newErrors.weight = !validateWeight(value)
          ? "Weight must be like this 20 or 20.50."
          : "";
        break;
      case "unOrNaNumber":
        newErrors.unOrNaNumber = !validateUnNaNumber(value)
          ? "UN or NA Number must be between 4 to 6 digits."
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
    <FormWrapper title="Load Information">
      {/* Units */}
      <label>Units:</label>
      <div className="flex flex-col gap-1">
        <input
          autoFocus
          required
          type="text"
          value={units}
          onChange={(e) => handleInputChange(e, "units")}
          className="px-2 rounded-md"
          inputMode="numeric"
        />
        {formErrors.units && (
          <p className="text-cancelRed text-xs ml-1">{formErrors.units}</p>
        )}
      </div>

      {/* Package Type */}
      <label>Package Type:</label>

      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={packageType}
          onChange={(e) => handleInputChange(e, "packageType")}
          className="px-2 rounded-md"
        />
        {formErrors.packageType && (
          <p className="text-cancelRed text-xs ml-1">
            {formErrors.packageType}
          </p>
        )}
      </div>

      {/* Volume */}
      <label>Volume:</label>

      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={volume}
          onChange={(e) => handleInputChange(e, "volume")}
          className="px-2 rounded-md"
          inputMode="numeric"
        />
        {formErrors.volume && (
          <p className="text-cancelRed text-xs ml-1">{formErrors.volume}</p>
        )}
      </div>

      {/* Weight */}
      <label>Weight(lbs):</label>

      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={weight}
          onChange={(e) => handleInputChange(e, "weight")}
          className="px-2 rounded-md"
          inputMode="numeric"
        />
        {formErrors.weight && (
          <p className="text-cancelRed text-xs ml-1">{formErrors.weight}</p>
        )}
      </div>

      {/* UN or NA Number */}
      <label>UN or NA Number:</label>

      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={unOrNaNumber}
          onChange={(e) => handleInputChange(e, "unOrNaNumber")}
          className="px-2 rounded-md"
        />
        {formErrors.unOrNaNumber && (
          <p className="text-cancelRed text-xs ml-1">
            {formErrors.unOrNaNumber}
          </p>
        )}
      </div>

      {/* Hazardous Class */}
      <label>Hazardous Class:</label>

      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={hazardousClass}
          onChange={(e) => handleInputChange(e, "hazardousClass")}
          className="px-2 rounded-md"
        />
        {formErrors.hazardousClass && (
          <p className="text-cancelRed text-xs ml-1">
            {formErrors.hazardousClass}
          </p>
        )}
      </div>

      {/* Packaging Group */}
      <label>Packing Group:</label>
      <div className="flex flex-col gap-1">
        <input
          required
          type="text"
          value={packingGroup}
          onChange={(e) => handleInputChange(e, "packingGroup")}
          className="px-2 rounded-md"
        />
        {formErrors.packingGroup && (
          <p className="text-cancelRed text-xs ml-1">
            {formErrors.packingGroup}
          </p>
        )}
      </div>

      {/* Load Description */}
      <label>Load Description:</label>

      <textarea
        required
        value={loadDesc}
        onChange={(e) => update({ loadDesc: e.target.value })}
        className="px-2 rounded-md"
      />
      {/* <button
        className="bg-borderGrey rounded-md p-2 text-white hover:bg-primary-500"
        onClick={() => alert("create functionality")}
      >
        Additional Package +
      </button> */}
    </FormWrapper>
  );
}
