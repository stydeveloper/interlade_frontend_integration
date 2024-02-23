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
      <div className="flex flex-col gap-4 w-[400px] h-[200px]">
        <label className="flex items-center justify-between text-xl w-full ">
          Prepaid
          <input
            type="radio"
            value="prepaid"
            checked={prepaid}
            onChange={() =>
              update({
                prepaid: true,
                collect: false,
                dap: false,
                thirdPartyBilling: false,
              })
            }
            className="px-2 rounded-md h-4 w-4 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between text-xl">
          Collect
          <input
            type="radio"
            value="collect"
            checked={collect}
            onChange={() =>
              update({
                prepaid: false,
                collect: true,
                dap: false,
                thirdPartyBilling: false,
              })
            }
            className="px-2 rounded-md h-4 w-4 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between text-xl">
          D.A.P
          <input
            type="radio"
            value="dap"
            checked={dap}
            onChange={() =>
              update({
                prepaid: false,
                collect: false,
                dap: true,
                thirdPartyBilling: false,
              })
            }
            className="px-2 rounded-md h-4 w-4 cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between text-xl">
          Third Party Billing
          <input
            type="radio"
            value="thirdPartyBilling"
            checked={thirdPartyBilling}
            onChange={() =>
              update({
                prepaid: false,
                collect: false,
                dap: false,
                thirdPartyBilling: true,
              })
            }
            className="px-2 rounded-md h-4 w-4 cursor-pointer"
          />
        </label>
      </div>
    </FormWrapper>
  );
}
