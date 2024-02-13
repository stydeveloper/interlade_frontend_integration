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

const ViewBl = ({ params }) => {
  const router = useRouter();
  return (
    <div className="flex bg-hoverGray justify-between">
      <div className="bg-borderGrey rounded-b-md flex w-96 flex-col fixed h-full">
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
          <DocumentBtn
            srcImg={Send}
            label="Send"
            actionFunc={() => console.log("Send")}
          />
          <DocumentBtn
            srcImg={Download}
            label="Download"
            actionFunc={() => console.log("Download")}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center my-8 ml-96">
        {/* params.id.blImage */}
        <Image src={BLImage} alt="Bill of Lading" />
      </div>
    </div>
  );
};

export default ViewBl;
