import { FormWrapper } from "../FormWrapper";

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
  return (
    <FormWrapper title="Load Information">
      <label>Units:</label>
      <input
        autoFocus
        required
        type="number"
        value={units}
        onChange={(e) => update({ units: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Package Type:</label>
      <input
        required
        type="text"
        value={packageType}
        onChange={(e) => update({ packageType: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Volume:</label>
      <input
        required
        type="number"
        value={volume}
        onChange={(e) => update({ volume: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Weight(lbs):</label>
      <input
        required
        type="text"
        value={weight}
        onChange={(e) => update({ weight: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>UN or NA Number:</label>
      <input
        required
        type="text"
        value={unOrNaNumber}
        onChange={(e) => update({ unOrNaNumber: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Hazardous Class:</label>
      <input
        required
        type="text"
        value={hazardousClass}
        onChange={(e) => update({ hazardousClass: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Packing Group:</label>
      <input
        required
        type="text"
        value={packingGroup}
        onChange={(e) => update({ packingGroup: e.target.value })}
        className="px-2 rounded-md"
      />
      <label>Load Description:</label>
      <textarea
        required
        value={loadDesc}
        onChange={(e) => update({ loadDesc: e.target.value })}
        className="px-2 rounded-md"
      />
      <button
        className="bg-borderGrey rounded-md p-2 text-white hover:bg-primary-500"
        onClick={() => alert("create functionality")}
      >
        Additional Package +
      </button>
    </FormWrapper>
  );
}
