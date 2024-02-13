"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import Print from "../../../../../public/images/print.svg";
import Send from "../../../../../public/images/send.svg";
import Download from "../../../../../public/images/download.png";
import Home from "../../../../../public/images/home.svg";
import LoadImageEX from "../../../../../public/images/LoadImagEX.png";

const LoadImages = ({ params }) => {
  const router = useRouter();
  return (
    <div className="flex bg-hoverGray">
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
            Load Images
          </p>
          <DocumentBtn
            srcImg={Download}
            label="Download"
            actionFunc={() => console.log("Download")}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center mt-12 ml-96">
        <Image
          src={LoadImageEX}
          alt="Load Images"
          className="mr-4"
          width={500}
        />
        <Image
          src={LoadImageEX}
          alt="Load Images"
          className="mr-4"
          width={500}
        />
      </div>
    </div>
  );
};

export default LoadImages;
