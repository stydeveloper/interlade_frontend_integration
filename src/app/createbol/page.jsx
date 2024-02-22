/* eslint-disable react/jsx-key */
"use client";

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
import { toast } from "react-toastify";
import { Spin } from "antd";
import { CREATE_BOL_MUTATION } from "@/fetching/mutations/bol";

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
  const [disable, setDisabled] = useState(false);
  const router = useRouter();
  const [
    createBol,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BOL_MUTATION);

  const [loading, setLoading] = useState(false);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };
  let userInfo;

  if (typeof window !== "undefined") {
    userInfo = JSON.parse(localStorage.getItem("user"));
  }

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
    userInfo && <ShipperInfo {...userInfo} update={updateFields} />,
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
      setLoading(true);
      setDisabled(true);
      const response = await createBol({
        variables: {
          input: input,
        },
      });

      if (response?.data?.createBol) {
        toast.success("bol created successfully!", { position: "top-right" });
        router.push("/");
      }

      console.log("BOL Created", response.data.createBol);
    } catch (error) {
      console.log("Console.log Error", error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDisabled(false);
      }, 6000);
    }
  };

  return (
    <div className="flex h-full  w-full overflow-auto">
      <SidePanel />
      <div className="w-full min-h-[50%] overflow-auto py-6 ml-60">
        <h1 className="font-bold text-2xl underline text-center mt-1">
          Straight Bill of Lading
        </h1>
        <div className="relative bg-hoverGray min-h-[400px]  border-2 border-gray rounded-md px-12 p-8 mt-6 mx-12">
          {loading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spin size="large" />
            </div>
          ) : (
            <form onSubmit={submitFunc}>
              <div className="absolute top-4 right-8 bg-linkBlue rounded-md px-4 text-white">
                {currentStepIndex + 1} / {steps.length}
              </div>
              {step}
              <div className="mt-12 flex gap-2 justify-center">
                {isFirstStep && (
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
                  className={`rounded-md px-4 py-1 ${
                    isLastStep ? "bg-linkBlue" : "bg-linkBlue "
                  } text-white`}
                >
                  {isLastStep ? "Generate BoL" : "Next"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
