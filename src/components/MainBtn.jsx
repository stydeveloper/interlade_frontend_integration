import Image from "next/image";

const MainBtn = ({ label, srcImg, actionFunc }) => {
  return (
    <button
      className="flex-col flex cursor-pointer items-center hover:bg-textgray rounded-md py-2 px-4"
      onClick={actionFunc}
    >
      <Image alt="" src={srcImg} width={40} />
      <label className="text-white font-semibold text-xs">{label}</label>
    </button>
  );
};

export default MainBtn;
