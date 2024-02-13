"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SupportModal from "./SupportModal";
import NavProfileModal from "./NavProfileModal";

const Navbar = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className=" bg-cgray border-b-2 border-gray-300 h-14 flex items-center justify-between fixed top-0 left-0 w-full z-10 px-24">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/images/interlade.png"
              alt="Interlade"
              width={40}
              height={40}
            />
            <h1 className="text-white font-semibold text-xl ml-2">Interlade</h1>
          </div>
        </Link>
        <div className="flex">
          <button onClick={() => setSupportOpen(true)}>
            <Image
              alt="Help Icon"
              src="/images/help.svg"
              width={25}
              height={25}
            />
          </button>
          <button onClick={() => setProfileOpen(true)}>
            <Image
              alt="Profile Icon"
              src="/images/profile.svg"
              className="ml-[24px]"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
      <NavProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export default Navbar;
