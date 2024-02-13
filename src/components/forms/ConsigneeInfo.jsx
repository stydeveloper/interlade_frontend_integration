import { FormWrapper } from "../FormWrapper";

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
  return (
    <FormWrapper title="Consignee Information">
      <label>Consignee Email:</label>
      <input
        autoFocus
        required
        type="email"
        value={consigneeEmail}
        onChange={(e) => update({ consigneeEmail: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee Name:</label>
      <input
        required
        type="text"
        value={consigneeName}
        onChange={(e) => update({ consigneeName: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee Number:</label>
      <input
        required
        type="number"
        value={consigneeNumber}
        onChange={(e) => update({ consigneeNumber: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee Address:</label>
      <input
        required
        type="text"
        value={consigneeAddress}
        onChange={(e) => update({ consigneeAddress: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee City:</label>
      <input
        required
        type="text"
        value={consigneeCity}
        onChange={(e) => update({ consigneeCity: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee State:</label>
      <input
        required
        type="text"
        value={consigneeState}
        onChange={(e) => update({ consigneeState: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Consignee Zipcode:</label>
      <input
        required
        type="number"
        value={consigneeZipcode}
        onChange={(e) => update({ consigneeZipcode: e.target.value })}
        className="px-2 rounded-md"
      />
    </FormWrapper>
  );
}
