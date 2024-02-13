import Link from "next/link";
import Image from "next/image";
import Close from "../../public/images/cancel.png";

const SupportModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative flex flex-col justify-center items-center bg-black text-white py-12 px-24 border-2 border-gray rounded-md ">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 cursor-pointer"
          >
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <p className="text-2xl font-bold mb-6">Need Assistance?</p>
          <p className="italic text-lg">Frequently Asked Questions:</p>
          <Link
            href="https://www.interlade.com/faqs"
            target="_blank"
            className="underline"
          >
            FAQs
          </Link>
          <p className="italic mt-8 text-lg">Support Email:</p>
          <a href="mailto:info@interlade.com" className="underline">
            info@interlade.com
          </a>
          {/* <p className="italic mt-8 text-lg">Support Phone:</p>
          <a href="tel:888-888-8888" className="underline">+1(888)888-8888</a> */}
        </div>
      </div>
    )
  );
};

export default SupportModal;
