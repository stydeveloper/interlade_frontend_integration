import Image from "next/image";
import Close from "../../public/images/cancel.png";

const CancelBLModal = ({ isOpen, onClose, submitFunc }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-cancelRed bg-opacity-70 z-50">
        <div className="relative flex flex-col justify-center items-center bg-black text-white py-12 px-24 border-2 border-gray rounded-md ">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer"
          >
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <p className="text-2xl font-bold mb-6 underline">You are about to void this Bill of Lading!</p>
          <p className="text-lg">This will cancel the order with your carrier.</p>
          <p className="mt-8 text-lg">Please be sure this action is correct.</p>
          <button className="bg-cancelRed p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:hoverRed hover:border-white hover:border-2" onClick={submitFunc}>Continue to Cancel B/L</button>
        </div>
      </div>
    )
  );
};

export default CancelBLModal;
