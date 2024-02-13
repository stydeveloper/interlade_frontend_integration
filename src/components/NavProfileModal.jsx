import Image from "next/image";
import Close from "../../public/images/cancel.png";
import Profile from "../../public/images/user.png";
import LogOutBtn from "./LogOutBtn";

const NavProfileModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative flex flex-col bg-black text-white py-10 px-8 border-2 border-gray rounded-md">
          <button onClick={onClose} className="absolute top-0 right-0 m-4 cursor-pointer">
            <Image alt="Close Modal" src={Close} width={25} height={25} />
          </button>
          <div className="flex items-center">
            {/* User profile image or placeholder */}
            <Image src={Profile} alt="Profile Image" width={80} height={80} />
            {/* User name and email */}
            <div className="ml-4">
              <p>Company Name</p>
              <p>info@companyname.com</p>
            </div>
          </div>
          <div className="h-[2px] bg-white my-6"></div>
          <div className="flex flex-col mr-80">
            {/* <Link href="/settings" onClick={onClose} className="underline mb-4">
              Settings
            </Link> */}
            <LogOutBtn />
          </div>
        </div>
      </div>
    )
  );
};

export default NavProfileModal;