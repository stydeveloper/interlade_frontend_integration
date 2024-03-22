import React from "react";
import "@/styles/pdfTemplate.css";

const PDFTemplate = ({ users }) => {
  return (
    <div className="font-sans bg-lightgrey  border-2 border-cgray ml-1 pl-8">
      <div className="header flex justify-between h-24 px-6 pt-2">
        <div className="header-left w-3/5 ">
          <div className="header-content ">CUSTOMER SERVICE 1-800-333-7400</div>
          <div className="header-content">
            STRAIGHT BILL OF LADING-SHIPPING ORDER NOT NEGOTIABLE - DOMESTIC
          </div>
          <div className="header-content">TForce Freight (TFF)</div>
        </div>
        <div className="header-right w-2/5 flex justify-end items-center mr-12">
          <div className="image-container mr-2">
            <img
              src="data:image/png;base64,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" // Placeholder image
              width="80px"
              height="80px"
              alt="Your Image"
              className="header-image"
            />
          </div>
          <div className="date-divider-container">
            <div className="date-heading">Date</div>
            <div className="divider">{users?.created_at}</div>
          </div>
        </div>
      </div>

      <div className="section-container px-6">
        {/* Shipper Info */}
        <section className="section w-2/5 mr-6">
          <h3 className="font-semibold underline mb-2">Shipper Info</h3>
          {users?.shipperEmail && (
            <div>
              {" "}
              <strong>Email :</strong> {users?.shipperEmail}
            </div>
          )}
          {users?.shipperName && (
            <div>
              {" "}
              <strong>Name :</strong> {users?.shipperName}
            </div>
          )}
          {users?.shipperNumber && (
            <div>
              {" "}
              <strong>Number :</strong> {users?.shipperNumber}
            </div>
          )}
          {users?.shipperAddress && (
            <div>
              {" "}
              <strong>Address :</strong> {users?.shipperAddress}
            </div>
          )}
          {users?.shipperCity && (
            <div>
              <strong>City :</strong> {users?.shipperCity}
            </div>
          )}
          {users?.shipperState && (
            <div>
              <strong>Zipcode :</strong> {users?.shipperState}
            </div>
          )}
          {users?.shipperZipcode && (
            <div>
              <strong>Zipcode :</strong> {users?.shipperZipcode}
            </div>
          )}
        </section>

        {/* Consignee Info */}
        <section className="section w-2/5 mr-6">
          <h3 className="font-semibold underline mb-2">Consignee Info</h3>
          {users?.consigneeEmail && (
            <div>
              <strong>Email :</strong> {users?.consigneeEmail}
            </div>
          )}
          {users?.consigneeName && (
            <div>
              <strong>Name :</strong> {users?.consigneeName}
            </div>
          )}
          {users?.consigneeNumber && (
            <div>
              <strong>Number :</strong> {users?.consigneeNumber}
            </div>
          )}
          {users?.consigneeAddress && (
            <div>
              {" "}
              <strong>Zipcode :</strong> {users?.consigneeAddress}
            </div>
          )}
          {users?.consigneeCity && (
            <div>
              <strong>Zipcode :</strong> {users?.consigneeCity}
            </div>
          )}
          {users?.consigneeState && (
            <div>
              <strong>Zipcode :</strong> {users?.consigneeState}
            </div>
          )}
          {users?.consigneeZipcode && (
            <div>
              <strong>Zipcode :</strong> {users?.consigneeZipcode}
            </div>
          )}
        </section>

        {/* Load Info */}
        <section className="section w-2/5 mr-6">
          <h3 className="font-semibold underline mb-2">Load Info</h3>
          {users?.quantity && (
            <div>
              {" "}
              <strong>Units :</strong> {users?.quantity}
            </div>
          )}
          {users?.package_type && (
            <div>
              {" "}
              <strong>Package Type :</strong> {users?.package_type}
            </div>
          )}
          {users?.volume && (
            <div>
              <strong>Volume :</strong> {users?.volume}
            </div>
          )}
          {users?.weight && (
            <div>
              <strong>Weight :</strong> {users?.weight}
            </div>
          )}
          {users?.hazard_class && (
            <div>
              <strong>Hazardous Class :</strong>
              {users?.hazard_class}
            </div>
          )}
          {users?.packing_group && (
            <div>
              <strong>Packing Group :</strong> {users?.packing_group}
            </div>
          )}
          {users?.un_na_number && (
            <div>
              <strong>UN or NA Number :</strong> {users?.un_na_number}
            </div>
          )}
          {users?.description && (
            <div>
              <strong>Load Description :</strong> {users?.description}
            </div>
          )}
          {users?.price && (
            <div>
              <strong>Payment Type :</strong> {users?.price}
            </div>
          )}
        </section>

        {/* Carrier Info */}
        <section className="section w-2/5 mr-6">
          <h3 className="font-semibold underline mb-2">Carrier Info</h3>
          {users?.carrierEmail && (
            <div>
              <strong>Email :</strong> {users?.carrierEmail}
            </div>
          )}
          {users?.carrierName && (
            <div>
              <strong>Name :</strong> {users?.carrierName}
            </div>
          )}
          {users?.carrierNumber && (
            <div>
              <strong>Number :</strong> {users?.carrierNumber}
            </div>
          )}
          {users?.carrierAddress && (
            <div>
              {" "}
              <strong>Number:</strong> {users?.carrierAddress}
            </div>
          )}
          {users?.carrierCity && (
            <div>
              <strong>City :</strong> {users?.carrierCity}
            </div>
          )}
          {users?.carrierState && (
            <div>
              <strong>State :</strong> {users?.carrierState}
            </div>
          )}
          {users?.carrierZipcode && (
            <div>
              <strong>Zipcode :</strong> {users?.carrierZipcode}
            </div>
          )}
        </section>
      </div>
      {/* Signature and Consignee Address */}
      <div className="signature-address-container px-6">
        <div className="signature-container">
          <div className="signature-border">
            {users?.driverSignature && (
              <img
                src={users?.driverSignature}
                height="20px"
                alt="Driver Signature"
              />
            )}
          </div>
          <div className="signature-heading">Driver Signature</div>
        </div>
        <div className="address-container">
          <div className="address-border">
            {users?.consigneeSignature && (
              <img
                src={users?.consigneeSignature}
                height="20px"
                alt="Consignee Signature"
              />
            )}
          </div>
          <div className="address-heading">Consignee Signature</div>
        </div>
      </div>
    </div>
  );
};

export default PDFTemplate;
