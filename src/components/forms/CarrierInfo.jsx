// import Select from "react-select";
// import { useQuery } from "@apollo/client";
// import { GET_ALL_CARRIERS_QUERY } from "@/fetching/queries/user";

// export function CarrierInfo({
//   carrierEmail,
//   carrierName,
//   carrierNumber,
//   carrierAddress,
//   carrierCity,
//   carrierState,
//   carrierZipcode,
//   id,
//   update,
// }) {
//   const { data, loading, error } = useQuery(GET_ALL_CARRIERS_QUERY);

//   let options = [];
//   if (data && data.getAllCarrier) {
//     options = data.getAllCarrier.map((carrier) => ({
//       value: carrier,
//       label: `${carrier.name} -- Location: ${carrier.city}, ${carrier.state}`,
//     }));
//   }

//   const selectedCarrier = options.find(
//     (option) => option.value.name === carrierName
//   );

//   const handleSelectChange = (newValue) => {
//     if (newValue) {
//       const carrier = newValue;
//       update({
//         carrierEmail: carrier.value.email,
//         carrierName: carrier.value.name,
//         carrierNumber: carrier.value.number,
//         carrierAddress: carrier.value.address,
//         carrierCity: carrier.value.city,
//         carrierState: carrier.value.state,
//         carrierZipcode: carrier.value.zipcode,
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-center text-white mb-8 font-semibold text-xl bg-borderGrey rounded-md w-1/4">
//         Carrier Information
//       </h2>
//       <Select
//         options={options}
//         onChange={handleSelectChange}
//         value={selectedCarrier} // Set the value to the selected carrier
//         placeholder="Select Carrier ..."
//         className="w-96 mx-4 max-h[38px] border-[1px] border-textgray rounded-md"
//         required
//       />
//     </div>
//   );
// }
import React, { useEffect } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { GET_ALL_CARRIERS_QUERY } from "@/fetching/queries/user";

export function CarrierInfo({
  id,
  carrierEmail,
  carrierName,
  carrierNumber,
  carrierAddress,
  carrierCity,
  carrierState,
  carrierZipcode,
  update,
}) {
  const { data, loading, error } = useQuery(GET_ALL_CARRIERS_QUERY);

  let options = [];
  if (data && data?.getAllCarrier) {
    if (id) {
      console.log("id hai");
      // If ID is present, filter the carriers array to find the one with the matching ID
      const selectedCarrier = data.getAllCarrier.find(
        (carrier) => carrier.id == id
      );
      if (selectedCarrier) {
        options.push({
          value: selectedCarrier,
          label: `${selectedCarrier.name} -- Location: ${selectedCarrier.city}, ${selectedCarrier.state}`,
        });
      }
    } else {
      options = data.getAllCarrier.map((carrier) => ({
        value: carrier,
        label: `${carrier.name} -- Location: ${carrier.city}, ${carrier.state}`,
      }));
    }
  }
  useEffect(() => {
    if (id && options.length > 0) {
      // If ID is present and options are available, update carrier information
      const selectedCarrier = options[0];
      update({
        carrierEmail: selectedCarrier.value.email,
        carrierName: selectedCarrier.value.name,
        carrierNumber: selectedCarrier.value.number,
        carrierAddress: selectedCarrier.value.address,
        carrierCity: selectedCarrier.value.city,
        carrierState: selectedCarrier.value.state,
        carrierZipcode: selectedCarrier.value.zipcode,
      });
    }
  }, [id, options, update]);

  let selectedCarrier;

  if (id) {
    selectedCarrier = options[0];
  } else {
    selectedCarrier = options.find(
      (option) => option.value.name === carrierName
    );
  }

  const handleSelectChange = (newValue) => {
    console.log(newValue);
    if (newValue) {
      const carrier = newValue;
      update({
        carrierEmail: carrier.value.email,
        carrierName: carrier.value.name,
        carrierNumber: carrier.value.number,
        carrierAddress: carrier.value.address,
        carrierCity: carrier.value.city,
        carrierState: carrier.value.state,
        carrierZipcode: carrier.value.zipcode,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-white mb-8 font-semibold text-xl bg-borderGrey rounded-md w-1/4">
        Carrier Information
      </h2>
      {id ? (
        <Select
          options={options}
          value={selectedCarrier} // Set the value to the selected carrier
          placeholder="Select Carrier ..."
          className="w-96 mx-4 max-h[38px] border-[1px] border-textgray rounded-md "
          required
          defaultValue={options[0]}
        />
      ) : (
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectedCarrier} // Set the value to the selected carrier
          placeholder="Select Carrier ..."
          className="w-96 mx-4 max-h[38px] border-[1px] border-textgray rounded-md "
          required
        />
      )}
    </div>
  );
}
