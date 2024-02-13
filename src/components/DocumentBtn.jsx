import Image from "next/image";

const DocumentBtn = ({ label, srcImg, actionFunc }) => {
  return (
    <button
      className="flex text-white cursor-pointer w-full items-center hover:bg-textgray rounded-md p-4"
      onClick={actionFunc}
    >
      <Image alt="" src={srcImg} width={40} />
      <label className="text-lg mx-2 font-semibold">{label}</label>
    </button>
  );
};

export default DocumentBtn;