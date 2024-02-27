import Image from "next/image";
import Close from "../../public/images/cancel.png";

const ActAsDriverModal = ({ isOpen, onClose, onYes, onNo }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative flex flex-col justify-center items-center bg-white text-black py-12 px-24 border-2 border-gray rounded-md ">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer"
          >
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <p className="text-2xl font-bold mb-6">
            Are you sure you want to act as a driver?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onYes}
            >
              Yes
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onNo}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ActAsDriverModal;
