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
import { useEffect, useState } from "react";
import SidePanel from "@/components/SidePanel";
import { useMutation, gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { CreatePublicBolMutation } from "@/fetching/mutations/bol";
import "react-toastify/dist/ReactToastify.css";
import {
  allNotificationsRefetchFunction,
  unreadCountRefetchFunction,
} from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import withSuspense from "@/components/hoc/withSuspense";

// import { recentBolsRefetchFunction } from "@/components/RecentSection";

import Cookies from "js-cookie"; // Import js-cookie library
import {
  emailRegex,
  validateAddress,
  validateCity,
  validateName,
  validatePhoneNumber,
  validateState,
  validateZipcode,
} from "@/utils/user-validation";

import {
  validateUnits,
  validateVolume,
  validateWeight,
  validateUnNaNumber,
  validateString,
} from "@/utils/bol-validation";
import { GET_USER_BY_EMAIL } from "@/fetching/queries/user";

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

const Page = () => {
  const [data, setData] = useState(initialData);
  const [disable, setDisabled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const carrierId = searchParams.get("id");
  const shipperEmail = searchParams.get("email");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      if (!carrierId || !shipperEmail) {
        // Redirect to login page if carrierId or shipperEmail is not present
        router.push("https://interlade.netlify.app/login");
      } else if (carrierId && shipperEmail) {
        setShow(true);
      }
    };

    // Call the function immediately
    redirectIfNotAuthenticated();

    // No need for cleanup function, as there's no setTimeout
  }, [carrierId, shipperEmail]);

  const [
    createBol,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CreatePublicBolMutation);
  //   const userInfo = Cookies.get("user");

  //   const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const parsedUserInfo = {
    email: "Lulu_Henry351@mailinator.com",
  };

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
  } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: shipperEmail,
    },
    skip: !shipperEmail,
  });

  const [loading, setLoading] = useState(false);

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // let userInfo;

  useEffect(() => {
    if (shipperEmail) {
      setData((prevData) => ({
        ...prevData,
        shipperEmail: shipperEmail || "",
      }));
    }
  }, [shipperEmail]);

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
    <CarrierInfo {...data} update={updateFields} id={carrierId} />,
    <ShipperInfo {...data} update={updateFields} />,
    <ConsigneeInfo {...data} update={updateFields} />,
    <LoadInfo {...data} update={updateFields} />,
    <PaymentInfo {...data} update={updateFields} />,
    <ReviewInfo {...data} />,
  ]);

  const submitFunc = async (e) => {
    e.preventDefault();

    const validateCurrentStep = () => {
      let isValid = true; // Initialize as true by default

      switch (currentStepIndex) {
        case 0: // Carrier Info
          // Validate carrier info fields
          // Example validation:
          if (!data.carrierName) {
            toast.error("Please enter the carrier's name.");
            isValid = false; // Set isValid to false if validation fails
          }
          // Additional validations for other fields...
          break;
        case 1: // Shipper Info
          // Validate shipper info fields

          isValid =
            validateName(data.shipperName) &&
            validatePhoneNumber(data.shipperNumber) &&
            validateAddress(data.shipperAddress) &&
            validateZipcode(data.shipperZipcode);

          if (!isValid) {
            // If any validation fails, show error messages accordingly
            toast.error("Incomplete information! please provide all details");
            setDisabled(true);
          }
          const updateUserInfo = {
            ...parsedUserInfo,
            name: data.shipperName,
          };
          Cookies.set("user", JSON.stringify(updateUserInfo));
          break;
        case 2: // Consignee Info
          // Validate consignee info fields
          // Example validation:

          isValid =
            emailRegex.test(data.consigneeEmail) &&
            validateName(data.consigneeName) &&
            validatePhoneNumber(data.consigneeNumber) &&
            validateAddress(data.consigneeAddress) &&
            validateZipcode(data.consigneeZipcode);

          if (!isValid) {
            // If any validation fails, show error messages accordingly
            toast.error("Incomplete information! please provide all details.");
            setDisabled(true);
          }
          break;

        case 3: // Load Info
          isValid =
            validateUnits(data.units) &&
            validateString(data.packageType) &&
            validateVolume(data.volume) &&
            validateWeight(data.weight) &&
            validateUnNaNumber(data.unOrNaNumber) &&
            validateString(data.hazardousClass) &&
            validateString(data.packingGroup);

          if (!isValid) {
            // If any validation fails, show error messages accordingly
            toast.error("Incomplete information! Please provide all details.");
            setDisabled(true);
          }
          break;

        case 4: // Payment Info
          isValid =
            data.prepaid || data.collect || data.dap || data.thirdPartyBilling;

          if (!isValid) {
            toast.error("Please select a payment type.");
            setDisabled(true);
          }
          break;

        // Add cases for other steps as needed...

        default:
          break;
      }

      setTimeout(() => {
        setDisabled(false);
      }, 6000);

      return isValid; // Return the overall validation result
    };
    const getPaymentType = () => {
      if (data.prepaid) {
        return "PREPAID";
      } else if (data.collect) {
        return "COLLECT";
      } else if (data.dap) {
        return "DAP";
      } else if (data.thirdPartyBilling) {
        return "THIRD_PARTY_BILLING";
      }
      // Default to "PREPAID" if none of the flags are true
      return "PREPAID";
    };
    // if (!isLastStep) {
    //   next();
    //   return;
    // }
    if (!isLastStep) {
      // Check if the current step is valid before proceeding
      const isStepValid = validateCurrentStep();
      if (!isStepValid) {
        return; // Stop submission if the step is not valid
      }

      next(); // Proceed to the next step if the current step is valid
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
        value: getPaymentType(), // Get the payment type dynamically
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

      const response = await createBol({
        variables: {
          input: input,
        },
      });

      if (response?.data?.createPublicBol) {
        toast.success(
          "BOL created successfully, please check your mail for credentials",
          { position: "top-right" }
        );

        // allNotificationsRefetchFunction();
        // unreadCountRefetchFunction();
        // recentBolsRefetchFunction();

        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
      // Handle the error appropriately
    } finally {
      setLoading(false);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 6000);
    }
  };

  return (
    <div className="flex h-full justify-center items-center  w-full overflow-auto">
      {/* <SidePanel /> */}
      {show && (
        <div className="w-full min-h-[50%] overflow-auto py-6 ">
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
                    className={`rounded-md px-4 py-1 text-white bg-linkBlue `}
                    // Set disabled attribute based on the disable state
                    disabled={disable}
                    style={{ cursor: disable ? "not-allowed" : "pointer" }} // Set cursor style
                  >
                    {isLastStep ? "Generate BoL" : "Next"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withSuspense(Page);
