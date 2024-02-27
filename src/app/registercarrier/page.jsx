// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import interladeBlue from "../../../public/images/interladeBlue.png";
// import { useMutation, gql } from "@apollo/client";

// const REGISTER_CARRIER_MUTATION = gql`
//   mutation RegisterCarrier(
//     $name: String!
//     $email: String!
//     $password: String!
//     $address: String!
//     $state: String!
//     $city: String!
//     $zipcode: String!
//     $number: String
//   ) {
//     registerCarrier(
//       name: $name
//       email: $email
//       password: $password
//       address: $address
//       state: $state
//       city: $city
//       zipcode: $zipcode
//       number: $number
//     ) {
//       address
//       address
//       city
//       email
//       id
//       message
//       name
//       password
//       state
//       status
//       zipcode
//       role_id {
//         id
//         name
//       }
//       number
//       token
//       created_at
//     }
//   }
// `;

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     state: "",
//     city: "",
//     zipcode: "",
//     number: "",
//   });
//   const [registerResponse, setRegisterResponse] = useState("");
//   const [registerError, setRegisterError] = useState("");

//   const [registerCarrier] = useMutation(REGISTER_CARRIER_MUTATION);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerCarrier({ variables: formData });
//       setRegisterResponse("SUCCESS NIGGA");
//       localStorage.setItem("token", response.data.registerCarrier.token); // Store token if needed
//       console.log(response);
//     } catch (error) {
//       if (error instanceof Error) {
//         // Now TypeScript knows that error is an Error instance and has a message property
//         setRegisterError(error.message);
//       } else {
//         // If it's not an Error instance, you can handle it differently or provide a generic message
//         setRegisterError("An unknown error occurred");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-black">
//       <div className="w-full max-w-md">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-2 gap-4 bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 "
//         >
//           <div className="flex flex-col mb-4 items-center justify-center col-span-2">
//             <Image src={interladeBlue} width={50} alt="" />
//             <h1 className="text-2xl font-medium my-1 text-linkBlue">
//               Interlade
//             </h1>
//             <span className="text-xs text-linkBlue">
//               Better Bill of Lading Management.
//             </span>
//           </div>
//           <h3 className="mb-3 text-lg text-center font-medium col-span-2">
//             Register
//           </h3>
//           {/* Name Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Address Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="address">
//               Address
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="address"
//               name="address"
//               type="text"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>

//           {/* State Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="state">
//               State
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="state"
//               name="state"
//               type="text"
//               placeholder="State"
//               value={formData.state}
//               onChange={handleChange}
//             />
//           </div>

//           {/* City Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="city">
//               City
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="city"
//               name="city"
//               type="text"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Zipcode Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="zipcode">
//               Zipcode
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="zipcode"
//               name="zipcode"
//               type="text"
//               placeholder="Zipcode"
//               value={formData.zipcode}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Number Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="number">
//               Phone Number
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="number"
//               name="number"
//               type="text"
//               placeholder="Phone Number"
//               value={formData.number}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-linkBlue hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Register
//             </button>
//           </div>

//           {/* Response Messages */}
//           {registerResponse && (
//             <p className="text-successGreen text-xs italic">
//               {registerResponse}
//             </p>
//           )}
//           {registerError && (
//             <p className="text-cancelRed text-xs italic">{registerError}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
