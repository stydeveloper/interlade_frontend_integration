import React, { useState } from "react";
import { UPDATE_USER } from "@/fetching/mutations/user";
import { useMutation } from "@apollo/client";

// const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION);

// const handleLogin = async (e) => {
//   e.preventDefault();
//   setDisabled(true);

//   try {
//     const response = await loginUser({ variables: { email, password } });

function LegalTermsAndConditions({ isOpen, onClose }) {
  const [agreed, setAgreed] = useState(false);
  const [UpdateUser] = useMutation(UPDATE_USER);

  const handleSubmit = async () => {
    if (agreed) {
      console.log("running close");
      await UpdateUser({
        variables: { termsacknowledged: true },
      });

      // store their agreement for legal and so the modal doesnt display again
      onClose(); // Only close if agreed
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-70   ">
        <div className="relative  flex flex-col bg-black text-white py-2 px-4 border-2 border-gray rounded-md mx-12 mt-10">
          <div className=" flex items-center w-full h-full">
            <div className=" w-full h-full">
              <h1 className="text-2xl font-semibold my-2">
                Terms and Conditions
              </h1>
              <div className="bg-white text-black p-4">
                <p className="mb-2">
                  The Originating User and Interlade, representing each
                  Subsequent User, mutually agree that when a Subsequent User
                  accepts the Terms and Conditions and takes on an Electronic
                  Bill of Lading, they become a party to that Electronic Bill of
                  Lading through a process called novation. This Electronic Bill
                  of Lading acts as evidence of the contract of carriage between
                  the Originating User and all Subsequent Users.
                </p>
                <p className="my-4">
                  Both Originating and Subsequent Users acknowledge two things:
                </p>
                <p>
                  1. The electronic signature on the Electronic Bill of Lading
                  holds the same validity as a traditional signature on a paper
                  bill of lading.<br></br>
                  2. The Electronic Bill of Lading has the same status as a
                  paper bill of lading, meaning the transfer of rights and
                  obligations works the same way as with a paper version.
                  <br></br>
                </p>
                <p className="my-4">
                  All users commit to recognizing these points and not disputing
                  them. Additionally, third parties who transact based on the
                  Electronic Bill of Lading also agree to the same terms,
                  accepting the transfers as if the Electronic Bill of Lading
                  was a paper bill of lading.
                </p>
                <strong className="flex justify-center border-2 mt-12">
                  In order to continue using Interlade these terms must be
                  accepted.
                </strong>
              </div>
              <div className="h-[2px] bg-white my-6"></div>
              <div>
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <label htmlFor="agree" className="ml-2 text-lg">
                  I Agree to the Terms and Conditions
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gray-400 hover:border-slate-950 border-2 rounded-md px-4 py-2 mt-4 text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default LegalTermsAndConditions;
