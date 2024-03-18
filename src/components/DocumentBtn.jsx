import Image from "next/image";

const DocumentBtn = ({ label, srcImg, actionFunc, width = 40 }) => {
  return (
    <button
      className="flex text-white cursor-pointer w-full items-center hover:bg-hoverGray rounded-md p-4"
      onClick={actionFunc}
    >
      <Image alt="" src={srcImg} width={width} />
      <label className="text-lg mx-2 font-semibold cursor-pointer">
        {label}
      </label>
    </button>
  );
};

export default DocumentBtn;
