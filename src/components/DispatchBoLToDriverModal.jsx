"use client";
import React, { useState } from "react";
import Image from "next/image";
import Close from "../../public/images/cancel.png";
import Select from "react-select";
import { GET_BOL_BY_STATUS } from "@/fetching/queries/bol";
import { CREATE_USER_INVITTATION } from "@/fetching/mutations/user-invitation";
import { useQuery, useMutation } from "@apollo/client";
import { emailRegex } from "@/utils/user-validation";
import { toast } from "react-toastify";
import withToast from "@/components/hoc/withToast.jsx"; // Import the HOC
import { CARRIER_AS_A_DRIVER } from "@/fetching/mutations/bol";

const DispatchBoLToDriverModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [selectedBolId, setSelectedBolId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [disable, setDisabled] = useState(false);
  const [createInvitation] = useMutation(CREATE_USER_INVITTATION);
  const [associateCarrierToDriver] = useMutation(CARRIER_AS_A_DRIVER);
  const { data, loading, error } = useQuery(GET_BOL_BY_STATUS, {
    variables: { status: "AT_PICKUP" },
  });

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedBolId(selectedOption.value.id);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Please provide a valid email (abc@example.com).");
    } else {
      setEmailError("");
    }
  };

  const handleBolInvite = async () => {
    if (!email || !selectedBolId || emailError) return;

    try {
      const { data } = await createInvitation({
        variables: { email: email, bolId: selectedBolId },
      });

      // Handle success
      // console.log("Invitation created:", data.createUserInvitations.message);
      toast.success(data?.createUserInvitations?.message, {
        position: "top-right",
      });

      // Add any further logic here after successful invitation creation
    } catch (error) {
      // Handle error
      // console.log(error.message);

      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
    } finally {
      onClose();
      setEmailError("");
      setEmail("");
      setSelectedBolId(null);
    }
  };
  let options = [];
  if (data && data.getBolsByStatus) {
    options = data.getBolsByStatus.map((bol) => ({
      value: bol,
      label: `Order No: ${bol.id} -- Shipper : ${bol.shipper_id.name}`,
    }));
  }

  const handleActAsDriver = async () => {
    try {
      if (!selectedBolId) {
        toast.error(`Please select any bol from dropdown`, {
          position: "top-right",
        });
        return;
      }

      const { data, loading } = await associateCarrierToDriver({
        variables: { bolId: selectedBolId },
      });

      if (!loading && data) {
        setDisabled(true);
        toast.success(`Now you are a driver for the bol no ${selectedBolId}`, {
          position: "top-right",
        });
        setTimeout(() => {
          setDisabled(false);
        }, 6000);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-right" });
      } else {
        toast.error("An unknown error occurred", { position: "top-right" });
      }
    } finally {
      onClose();

      setSelectedBolId(null);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative bg-hoverGray rounded-md flex flex-col items-center py-12 px-24">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer border-2 border-white rounded-full"
          >
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <p className="text-2xl font-bold mb-6 underline">
            Dispatch BoL to Driver
          </p>

          <div className="flex flex-col gap-1 mx-4 ">
            <label htmlFor="" className="text-xl">
              BoL
            </label>
            <Select
              options={options}
              onChange={handleSelectChange}
              placeholder="Select Active BoL ..."
              className="w-96 max-h[38px] border-[1px] rounded-md mb-4"
              required
            />
          </div>

          <div className="flex flex-col gap-1 px-4">
            <label htmlFor="" className="text-xl">
              Email
            </label>
            <input
              type="email"
              className="w-96 h-10 border-[1px] rounded-md mb-1 pl-2"
              placeholder="Driver email here"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <p className="text-md mt-4">
            Driver will receive an invitation to accept BoL on the road via the
            Interlade Driver App.
          </p>

          <div className="flex gap-4 items-center justify-center">
            <button
              disabled={!email || !selectedBolId || emailError}
              className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
              onClick={handleBolInvite}
            >
              Send BoL
            </button>

            <h3 className="text-white font-bold mt-8">OR</h3>
            <button
              className="bg-green-700 p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-green-900"
              onClick={handleActAsDriver}
              disabled={disable}
            >
              Act as Driver
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default withToast(DispatchBoLToDriverModal);
