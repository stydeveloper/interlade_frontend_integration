import Image from "next/image";
import Close from "../../public/images/cancel.png";
import Select from "react-select";

const DispatchBoLToDriverModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        style={{ border: "2px solid red" }}
      >
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
          {/* supply select all the active bols that dont have an assigned driver */}
          <Select
            // options={groupedOptions}
            // onChange={() => handleFilterChange}
            isMulti
            placeholder="Select Active BoL ..."
            className="w-96 mx-4 max-h[38px]  border-[1px] border-textgray rounded-md mb-8"
          />
          <p className="text-md">
            Driver will receive an invitation to accept BL on the road via the
            Interlade Driver App.
          </p>
          <button
            className="bg-linkBlue p-4 h-16 rounded-md text-white font-2xl font-bold mt-8 hover:bg-sky-700 hover:border-white hover:border-2"
            onClick={() => console.log("invite func")}
          >
            Send BoL
          </button>
        </div>
      </div>
    )
  );
};

export default DispatchBoLToDriverModal;
