import { FormWrapper } from "../FormWrapper";

export function PaymentInfo({
  prepaid,
  collect,
  dap,
  thirdPartyBilling,
  update,
}) {
  return (
    <FormWrapper title="Payment Information">
      <label>Prepaid:</label>
      <input
        type="checkbox"
        checked={prepaid}
        onChange={(e) => update({ prepaid: e.target.checked })}
        className="px-2 rounded-md"
      />
      <label>Collect:</label>
      <input
        type="checkbox"
        checked={collect}
        onChange={(e) => update({ collect: e.target.checked })}
        className="px-2 rounded-md"
      />
      <label>D.A.P:</label>
      <input
        type="checkbox"
        checked={dap}
        onChange={(e) => update({ dap: e.target.checked })}
        className="px-2 rounded-md"
      />
      <label>Third Party Billing:</label>
      <input
        type="checkbox"
        checked={thirdPartyBilling}
        onChange={(e) => update({ thirdPartyBilling: e.target.checked })}
        className="px-2 rounded-md"
      />
    </FormWrapper>
  );
}
