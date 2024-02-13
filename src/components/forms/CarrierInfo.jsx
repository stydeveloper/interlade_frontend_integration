import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_CARRIERS_QUERY = gql`
  query GetAllCarrier {
    getAllCarrier {
      name
      email
      id
      role_id {
        id
        name
      }
      address
      city
      state
      zipcode
      number
    }
  }
`;

export function CarrierInfo({
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
  console.log(data);
  let options = [];
  if (data && data.getAllCarrier) {
    options = data.getAllCarrier.map((carrier) => ({
      value: carrier,
      label: `${carrier.name} -- Location: ${carrier.city}, ${carrier.state}`,
    }));
  }
  const handleSelectChange = (newValue) => {
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
      <Select
        options={options}
        onChange={handleSelectChange}
        placeholder="Select Carrier ..."
        className="w-96 mx-4 max-h[38px] border-[1px] border-textgray rounded-md"
        required
      />
    </div>
  );
}
