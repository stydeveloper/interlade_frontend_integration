// components/SignatureModal.js
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import withToast from "@/components/hoc/withToast.jsx"; // Import the HOC

const SignatureModal = ({ isOpen, onClose }) => {
  const [sign, setSign] = useState(null); // Initialize sign state as null

  const handleClear = () => {
    if (sign) {
      // Check if sign is not null
      sign.clear();
    }
  };

  const handleGenerate = () => {
    if (sign) {
      // Check if sign is not null
      const image = sign.getTrimmedCanvas().toDataURL("image/png");
      console.log(image);
      if (image) {
        console.log("hello beta");
        toast.success("Signature saved successfully", {
          position: "top-right",
        });
      }

      setSign(null);
      // Handle saving or further processing of the signature image
      onClose(); // Close the modal after processing
    }
  };

  return (
    <div
      className={`modal ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50`}
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
        <div className="signature-area">
          <SignatureCanvas
            ref={(ref) => setSign(ref)}
            canvasProps={{
              className: "signature-canvas border border-black rounded w-full",
            }}
            clearOnResize={false}
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

export default withToast(SignatureModal);
