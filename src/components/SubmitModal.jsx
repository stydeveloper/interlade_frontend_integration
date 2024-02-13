import Link from "next/link";

const SubmitModal = ({ isOpen, onClose, submitFunc }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-linkBlue bg-opacity-50 z-50">
        <div className="relative flex flex-col justify-center items-center bg-black text-white py-12 px-24 border-2 border-gray rounded-md ">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer underline"
          >
            Return to Edit B/L
          </button>
          <p className="text-2xl font-bold mb-6">Important!</p>
          <p className="text-lg">
            Once this document is submitted it will be available to the Carrier.
          </p>
          <p className="mt-8 text-lg">
            Please be sure the information is correct.
          </p>
          <Link href="/bol/123456">
            <button
              className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
              onClick={submitFunc}
            >
              Submit B/L to Carrier
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default SubmitModal;
