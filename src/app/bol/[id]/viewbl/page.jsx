"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import Print from "../../../../../public/images/print.svg";
import Send from "../../../../../public/images/send.svg";
import Download from "../../../../../public/images/download.png";
import Home from "../../../../../public/images/home.svg";
import BLImage from "../../../../../public/images/BLImage.png";
import { useState } from "react";
import SignatureModal from "@/components/SignatureModal";

const ViewBl = ({ params }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(params);
  return (
    <div className="flex  justify-between">
      <div className="bg-cgray rounded-b-md flex w-80 flex-col fixed h-full">
        <div className="mx-8">
          <div className="flex justify-center my-8">
            <MainBtn
              srcImg={Home}
              label="back"
              actionFunc={() => router.back()}
            />
          </div>
          <p className="text-white font-bold text-2xl text-center mb-4">
            B/L Actions
          </p>
          <DocumentBtn
            srcImg={Print}
            label="Print"
            actionFunc={() => console.log("Print")}
          />
          {/* <DocumentBtn
            srcImg={Send}
            label="Send"
            actionFunc={() => console.log("Send")}
          /> */}
          <DocumentBtn
            srcImg={Download}
            label="Download"
            actionFunc={() => console.log("Download")}
          />
        </div>
      </div>
      <div className="bg-hoverGray gap-2 flex flex-col items-center justify-center py-4 ml-80 px-4">
        {/* params.id.blImage */}
        <div className="w-full flex gap-2 justify-end">
          <button
            className="bg-linkBlue text-white py-4 px-2 rounded-md"
            onClick={openModal}
          >
            Sign As Driver
          </button>
          <button
            className="bg-linkBlue text-white py-4 px-2 rounded-md"
            onClick={openModal}
          >
            Sign As Consignee
          </button>
        </div>
        <div className="w-full">
          <Image src={BLImage} alt="Bill of Lading" />
        </div>
      </div>
      <SignatureModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ViewBl;
