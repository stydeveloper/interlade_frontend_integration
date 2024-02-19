/* eslint-disable react/jsx-key */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMultistepForm } from "@/customHooks/useMultistepForm";
import { ShipperInfo } from "@/components/forms/ShipperInfo";
import { ConsigneeInfo } from "@/components/forms/ConsigneeInfo";
import { LoadInfo } from "@/components/forms/LoadInfo";
import { CarrierInfo } from "@/components/forms/CarrierInfo";
import { PaymentInfo } from "@/components/forms/PaymentInfo";
import { ReviewInfo } from "@/components/forms/ReviewInfo";
import { useState } from "react";
import SidePanel from "@/components/SidePanel";
import { useMutation, gql } from "@apollo/client";

const CREATE_BOL_MUTATION = gql`
  mutation CreateBol($input: BolInput) {
    createBol(input: $input) {
      id
      carrier_id {
        id
        role_id {
          id
          name
        }
        name
        email
        password
        address
        state
        city
        status
        zipcode
        message
        number
        token
        created_at
      }
      shipper_id {
        id
        role_id {
          name
          id
        }
        name
        password
        address
        email
        state
        city
        zipcode
        status
        message
        number
        token
        created_at
      }
      consignee_id {
        id
        name
        role_id {
          id
          name
        }
        email
        password
        address
        state
        city
        status
        message
        zipcode
        number
        token
        created_at
      }
      weight
      volume
      quantity
      un_na_number
      hazard_class
      description
      packing_group
      package_type
      status
      price
      created_at
    }
  }
`;

const initialData = {
  shipperEmail: "",
  shipperName: "",
  shipperNumber: "",
  shipperAddress: "",
  shipperCity: "",
  shipperState: "",
  shipperZipcode: "",
  consigneeEmail: "",
  consigneeName: "",
  consigneeNumber: "",
  consigneeAddress: "",
  consigneeCity: "",
  consigneeState: "",
  consigneeZipcode: "",
  units: "",
  packageType: "",
  volume: "",
  weight: "",
  hazardousClass: "",
  packingGroup: "",
  unOrNaNumber: "",
  loadDesc: "",
  carrierEmail: "",
  carrierName: "",
  carrierNumber: "",
  carrierAddress: "",
  carrierCity: "",
  carrierState: "",
  carrierZipcode: "",
  prepaid: false,
  collect: false,
  dap: false,
  thirdPartyBilling: false,
};

export default function Page() {
  const [data, setData] = useState(initialData);
  const [
    createBol,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BOL_MUTATION);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log(userInfo);

  const {
    step,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    isGenerateStep,
    next,
    back,
  } = useMultistepForm([
    <CarrierInfo {...data} update={updateFields} />,
    <ShipperInfo {...userInfo} update={updateFields} />,
    <ConsigneeInfo {...data} update={updateFields} />,
    <LoadInfo {...data} update={updateFields} />,
    <PaymentInfo {...data} update={updateFields} />,
    <ReviewInfo {...data} />,
  ]);

  console.log(isFirstStep);

  const submitFunc = async (e) => {
    e.preventDefault();

    if (!isLastStep) {
      next();
      return;
    }

    const {
      shipperEmail,
      shipperName,
      shipperNumber,
      shipperAddress,
      shipperCity,
      shipperState,
      shipperZipcode,
      consigneeEmail,
      consigneeName,
      consigneeNumber,
      consigneeAddress,
      consigneeCity,
      consigneeState,
      consigneeZipcode,
      units,
      packageType,
      volume,
      weight,
      hazardousClass,
      packingGroup,
      unOrNaNumber,
      loadDesc,
      carrierEmail,
      carrierName,
      carrierNumber,
      carrierAddress,
      carrierCity,
      carrierState,
      carrierZipcode,
      prepaid,
      collect,
      dap,
      thirdPartyBilling,
    } = data;

    const input = {
      paymentInfo: {
        value: "prepaid",
      },
      loadInfo: {
        weight: Number(weight),
        volume: Number(volume),
        quantity: Number(units),
        un_na_number: unOrNaNumber,
        description: loadDesc,
        hazard_class: hazardousClass,
        packing_group: packingGroup,
        package_type: packageType,
      },
      shipperInfo: {
        email: shipperEmail,
        name: shipperName,
        number: shipperNumber,
        address: shipperAddress,
        city: shipperCity,
        state: shipperState,
        zipcode: shipperZipcode,
      },
      consigneeInfo: {
        email: consigneeEmail,
        name: consigneeName,
        number: consigneeNumber,
        address: consigneeAddress,
        city: consigneeCity,
        state: consigneeState,
        zipcode: consigneeZipcode,
      },
      carrierInfo: {
        email: carrierEmail,
        name: carrierName,
        number: carrierNumber,
        address: carrierAddress,
        city: carrierCity,
        state: carrierState,
        zipcode: carrierZipcode,
      },
    };

    try {
      const response = await createBol({
        variables: {
          input: input,
        },
      });

      console.log("BOL Created", response);
    } catch (error) {
      console.log("Console.log Error", error);
      // Handle the error appropriately
    }
  };

  return (
    <div className="flex h-full  w-full overflow-auto">
      <SidePanel />
      <div className="w-full min-h-[50%] overflow-auto py-6 ml-60">
        <h1 className="font-bold text-2xl underline text-center mt-1">
          Straight Bill of Lading
        </h1>
        <div className="relative bg-hoverGray  border-2 border-gray rounded-md px-12 p-8 mt-6 mx-12">
          <form onSubmit={submitFunc}>
            <div className="absolute top-4 right-8 bg-linkBlue rounded-md px-4 text-white">
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div className="mt-12 flex gap-2 justify-center">
              { isFirstStep&&(
                <button
                  type="button"
                  onClick={back}
                  className="rounded-md px-4 bg-linkBlue text-white"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="rounded-md px-4 py-1 bg-linkBlue text-white"
              >
                {isLastStep ? "Generate BoL" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
