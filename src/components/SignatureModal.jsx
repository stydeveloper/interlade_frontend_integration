// components/SignatureModal.js
"use client";
import { CREATE_BOL_VERSION } from "@/fetching/mutations/bol_version";
import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
// import withToast from "@/components/hoc/withToast.jsx";
import "react-toastify/dist/ReactToastify.css";

const SignatureModal = ({
  isOpen,
  onClose,
  bol_id,
  refetchBolData,
  refetchBolVersionData,
  refetchBolVersionConsigneeData,
  refetchGenBolHistory,
}) => {
  const [sign, setSign] = useState(); // Initialize sign state as null

  const [CreateBolVersion] = useMutation(CREATE_BOL_VERSION);

  const handleClear = () => {
    if (sign) {
      // Check if sign is not null
      sign.clear();
    }
  };

  const handleGenerate = async () => {
    if (sign) {
      // Check if sign is not null
      const image = sign.getTrimmedCanvas().toDataURL("image/png");
      console.log(image);
      if (image) {
        try {
          const response = await CreateBolVersion({
            variables: { signature: image, bolId: bol_id },
          });

          if (response?.data?.createBolVersion) {
            toast.success("Signature saved successfully", {
              position: "top-right",
            });
            sign.clear();
            refetchBolData();
            refetchBolVersionData();
            refetchBolVersionConsigneeData();
            refetchGenBolHistory();
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message, { position: "top-right" });
          } else {
            toast.error("An unknown error occurred", { position: "top-right" });
          }
        }
      }

      // Handle saving or further processing of the signature image
      onClose(); // Close the modal after processing
    }
  };

  return (
    <div
      className={`modal ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center fixed top-0 left-0 w-full  h-full bg-gray-900 bg-opacity-50`}
    >
      <div className="modal-content bg-white w-[700px]  flex flex-col gap-2 p-8 rounded shadow-lg relative  ">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="signature-area h-64">
          <SignatureCanvas
            ref={(data) => setSign(data)}
            canvasProps={{
              width: 620,
              height: 256,
              className: "sigCanvas border border-black",
            }}
            // clearOnResize={false}
          />
        </div>
        <div className="button-container mt-4 flex justify-center">
          <button
            className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGenerate}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;
