"use client";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter from next/router
import DocumentBtn from "./DocumentBtn";
import MainBtn from "./MainBtn";
import Home from "../../public/images/home.svg";
import Complete from "../../public/images/secure-document.png";
import Create from "../../public/images/create-document.png";
import Active from "../../public/images/document.png";
import Carrier from "../../public/images/shipper.png";
import DriversIcon from "../../public/images/driverIcon.png";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ConditionalDocumentBtn = ({
  currentPath,
  path,
  srcImg,
  label,
  actionFunc,
  type, // Accepting type attribute
}) => {
  if (currentPath === path) {
    return null;
  }
  return (
    <DocumentBtn
      srcImg={srcImg}
      label={label}
      actionFunc={actionFunc}
      type={type} // Passing type attribute to DocumentBtn
    />
  );
};

const SidePanel = () => {
  const router = useRouter(); // Use useRouter to access router
  const pathname = usePathname();

  const [roleId, setRoleId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const roleIdFromCookie = Cookies.get("role_id");
    setRoleId(roleIdFromCookie);

    // Determine user role based on roleId
    if (roleIdFromCookie === "1") {
      setUserRole("carrier");
    } else if (roleIdFromCookie === "2") {
      setUserRole("shipper");
    } else if (roleIdFromCookie === "4") {
      setUserRole("consignee");
    }
  }, []);

  return (
    <div className="bg-cgray flex flex-col h-full w-56 fixed">
      <div>
        <div className="flex justify-center my-8">
          <MainBtn
            srcImg={Home}
            label="Home"
            actionFunc={() => router.push("/")}
          />
        </div>
        {/* if user role is Shipper display create and carriers */}
        {roleId && roleId === "2" && (
          <ConditionalDocumentBtn
            currentPath={pathname}
            path="/createbol"
            srcImg={Create}
            label="Create B/L"
            actionFunc={() => router.push(`/createbol`)}
          />
        )}

        {roleId && roleId === "2" && (
          <ConditionalDocumentBtn
            currentPath={pathname}
            path="/carriers"
            srcImg={Carrier}
            label="Carriers"
            actionFunc={() => router.push(`/carriers`)}
          />
        )}
        {/* if user role is Carrier display drivers and shippers */}
        {roleId && roleId === "1" && (
          <ConditionalDocumentBtn
            currentPath={pathname}
            path="/shippers"
            srcImg={Carrier}
            label="Shippers"
            actionFunc={() => router.push(`/shippers`)}
          />
        )}

        {roleId && roleId === "1" && (
          <ConditionalDocumentBtn
            currentPath={pathname}
            path="/drivers"
            srcImg={DriversIcon}
            label="Drivers"
            actionFunc={() => router.push(`/drivers`)}
          />
        )}

        <ConditionalDocumentBtn
          currentPath={pathname}
          path="/activebols"
          srcImg={Active}
          label="Active B/Ls"
          type={`${userRole}-active`}
          // actionFunc={() => router.push(`/activebols`)}
          actionFunc={() => router.push(`/activebols?type=${userRole}-active`)}
        />
        <ConditionalDocumentBtn
          currentPath={pathname}
          path="/completedbols"
          srcImg={Complete}
          label="Complete B/Ls"
          type={`${userRole}-complete`}
          // actionFunc={() => router.push(`/completedbols`)}
          actionFunc={() =>
            router.push(`/completedbols?type=${userRole}-complete`)
          }
        />
      </div>
    </div>
  );
};

export default SidePanel;
