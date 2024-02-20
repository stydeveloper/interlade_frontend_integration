"use client";
import { FormWrapper } from "../FormWrapper";
import { useEffect } from "react";

export function ShipperInfo({
  email: shipperEmail,
  name: shipperName,
  number: shipperNumber,
  address: shipperAddress,
  city: shipperCity,
  state: shipperState,
  zipcode: shipperZipcode,
  update,
}) {
  useEffect(() => {
    // Set initial values when component mounts
    update({
      shipperEmail,
      shipperName,
      shipperNumber,
      shipperAddress,
      shipperCity,
      shipperState,
      shipperZipcode,
    });
  }, [
    shipperEmail,
    shipperName,
    shipperNumber,
    shipperAddress,
    shipperCity,
    shipperState,
    shipperZipcode,
  ]); // Empty dependency array ensures this effect runs only once, when the component mounts

  return (
    <FormWrapper title="Shipper Information">
      <label>Shipper Email:</label>
      <input
        autoFocus
        required
        type="email"
        value={shipperEmail}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper Name:</label>
      <input
        required
        type="text"
        value={shipperName}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper Number:</label>
      <input
        required
        type="number"
        value={shipperNumber}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper Address:</label>
      <input
        required
        type="text"
        value={shipperAddress}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper City:</label>
      <input
        required
        type="text"
        value={shipperCity}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper State:</label>
      <input
        required
        type="text"
        value={shipperState}
        className="px-2 rounded-md"
        readOnly
      />
      <label>Shipper Zipcode:</label>
      <input
        required
        type="number"
        value={shipperZipcode}
        className="px-2 rounded-md"
        readOnly
      />
    </FormWrapper>
  );
}
