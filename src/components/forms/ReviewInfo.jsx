import { BoLData } from "@/app/createbol/page";

export function ReviewInfo({ ...props }) {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-center text-white mb-8 font-semibold text-xl bg-borderGrey rounded-md w-1/2">
          Review BoL Information
        </h2>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <section>
          <h3 className="underline font-semibold text-xl mb-2">Shipper Info</h3>
          <div>
            <strong>Email:</strong> {props.shipperEmail}
          </div>
          <div>
            <strong>Name:</strong> {props.shipperName}
          </div>
          <div>
            <strong>Number:</strong> {props.shipperNumber}
          </div>
          <div>
            <strong>Address:</strong> {props.shipperAddress}
          </div>
          <div>
            <strong>City:</strong> {props.shipperCity}
          </div>
          <div>
            <strong>State:</strong> {props.shipperState}
          </div>
          <div>
            <strong>Zipcode:</strong> {props.shipperZipcode}
          </div>
        </section>

        <section>
          <h3 className="underline font-semibold text-xl mb-2">
            Consignee Info
          </h3>
          <div>
            <strong>Email:</strong> {props.consigneeEmail}
          </div>
          <div>
            <strong>Name:</strong> {props.consigneeName}
          </div>
          <div>
            <strong>Number:</strong> {props.consigneeNumber}
          </div>
          <div>
            <strong>Address:</strong> {props.consigneeAddress}
          </div>
          <div>
            <strong>City:</strong> {props.consigneeCity}
          </div>
          <div>
            <strong>State:</strong> {props.consigneeState}
          </div>
          <div>
            <strong>Zipcode:</strong> {props.consigneeZipcode}
          </div>
        </section>

        <section className="flex flex-col">
          <h3 className="underline font-semibold text-xl mb-2">Load Info</h3>
          <div>
            <strong>Units:</strong> {props.units}
          </div>
          <div>
            <strong>Package Type:</strong> {props.packageType}
          </div>
          <div>
            <strong>Volume:</strong> {props.volume}
          </div>
          <div>
            <strong>Weight:</strong> {props.weight}
          </div>
          <div>
            <strong>Hazardous Class:</strong> {props.hazardousClass}
          </div>
          <div>
            <strong>Packing Group:</strong> {props.packingGroup}
          </div>
          <div>
            <strong>UN or NA Number:</strong> {props.unOrNaNumber}
          </div>
          <div>
            <strong>Load Description:</strong>
            <p className="overflow-hidden text-ellipsis">{props.loadDesc}</p>
          </div>
        </section>

        <section>
          <h3 className="underline font-semibold text-xl mb-2">Carrier Info</h3>
          <div>
            <strong>Email:</strong> {props.carrierEmail}
          </div>
          <div>
            <strong>Name:</strong> {props.carrierName}
          </div>
          <div>
            <strong>Number:</strong> {props.carrierNumber}
          </div>
          <div>
            <strong>Address:</strong> {props.carrierAddress}
          </div>
          <div>
            <strong>City:</strong> {props.carrierCity}
          </div>
          <div>
            <strong>State:</strong> {props.carrierState}
          </div>
          <div>
            <strong>Zipcode:</strong> {props.carrierZipcode}
          </div>
        </section>
        <section>
          <h3 className="underline font-semibold text-xl mb-2">Payment Info</h3>
          {props.prepaid && (
            <div>
              <strong> Payment Type</strong>: Prepaid
            </div>
          )}
          {props.collect && (
            <div>
              <strong> Payment Type</strong>: Collect
            </div>
          )}
          {props.dap && (
            <div>
              <strong> Payment Type</strong>: D.A.P
            </div>
          )}
          {props.thirdPartyBilling && (
            <div>
              <strong> Payment Type</strong>: Third Party Billing
            </div>
          )}
        </section>
        {/* You can add more sections as needed. Remember to adjust the goTo index as per your form steps. */}
      </div>
    </>
  );
}
