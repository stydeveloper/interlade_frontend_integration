"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DocumentBtn from "@/components/DocumentBtn";
import MainBtn from "@/components/MainBtn";
import Download from "../../../../../public/images/download.png";
import Home from "../../../../../public/images/home.svg";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { useState } from "react";
import { GET_BOLIMAGES_BY_BOLID } from "@/fetching/queries/bol_images";
import BackBtn from "../../../../../public/images/arrow-92-48.png";

// const DOWNLOAD_IMAGE = gql`
//   query DownloadImage($imageUrl: String!) {
//     downloadImage(imageUrl: $imageUrl)
//   }
// `;

const LoadImages = ({ params }) => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_BOLIMAGES_BY_BOLID, {
    variables: { bolId: params?.id },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Spin size="large" />
      </div>
    );
  if (error)
    console.log(error.message == "No Bol images found for the provided Bol ID");

  let bolImages = [];
  if (data) {
    bolImages = data?.getBolImagesByBolId;
    console.log("data?.getBolImagesByBolId", data?.getBolImagesByBolId);
  }

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = () => {
    if (selectedImage) {
      fetch(selectedImage)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to download image");
          }
          return response.blob();
        })
        .then((blob) => {
          // Create a new anchor element to trigger the download
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "image.png"; // Change the filename as needed
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    }
  };

  return (
    <div className="flex h-full">
      <div className="bg-cgray rounded-b-md flex w-96 flex-col fixed  h-full">
        <div className="relative mx-8">
          <Image
            alt="Back"
            src={BackBtn}
            width={25}
            className="absolute top-[0.9rem] left-0 cursor-pointer "
            onClick={() => router.back()}
            title="Go Back"
          />
          <div className="flex justify-center my-8">
            <MainBtn
              srcImg={Home}
              label="Home"
              actionFunc={() => router.push("/")}
            />
          </div>
          {bolImages && bolImages.length > 0 && (
            <p className="text-white font-bold text-2xl text-center mb-4">
              {"Load Images"}
            </p>
          )}
          {/* {bolImages && bolImages.length > 0 && (
            <DocumentBtn
              srcImg={Download}
              label="Download"
              actionFunc={handleDownload}
            />
          )} */}
        </div>
      </div>
      <div className="bg-hoverGray flex-1 flex flex-col justify-center items-center py-12 ml-96">
        {bolImages &&
          bolImages.map((bolImage, index) => (
            <div className="my-10 " key={index}>
              <Image
                src={bolImage.filename}
                alt="Load Images"
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => handleImageClick(bolImage.filename)}
                width={200}
                height={400}
              />
            </div>
          ))}
        {bolImages.length === 0 &&
          error &&
          error.message === "No Bol images found for the provided Bol ID" && (
            <div className="text-white text-4xl">
              {`No Bol Images For BoL Id:${params?.id} For Now`}
            </div>
          )}
      </div>
    </div>
  );
};

export default LoadImages;
