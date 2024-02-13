import { FormWrapper } from "../FormWrapper";

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
  return (
    <FormWrapper title="Shipper Information">
      <label>Shipper Email:</label>
      <input
        autoFocus
        required
        type="email"
        value={shipperEmail}
        onChange={(e) => update({ shipperEmail: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper Name:</label>
      <input
        required
        type="text"
        value={shipperName}
        onChange={(e) => update({ shipperName: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper Number:</label>
      <input
        required
        type="number"
        value={shipperNumber}
        onChange={(e) => update({ shipperNumber: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper Address:</label>
      <input
        required
        type="text"
        value={shipperAddress}
        onChange={(e) => update({ shipperAddress: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper City:</label>
      <input
        required
        type="text"
        value={shipperCity}
        onChange={(e) => update({ shipperCity: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper State:</label>
      <input
        required
        type="text"
        value={shipperState}
        onChange={(e) => update({ shipperState: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Shipper Zipcode:</label>
      <input
        required
        type="number"
        value={shipperZipcode}
        onChange={(e) => update({ shipperZipcode: e.target.value })}
        className="px-2 rounded-md"
      />
    </FormWrapper>
  );
}
