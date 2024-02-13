import Table from "./Tables";
import { activeMockData, carrierActiveMockData } from "./MockData";

import { gql, useQuery } from "@apollo/client";
import { Spin } from "antd";

const GET_ALL_BOLS_QUERY = gql`
  query getAllBols {
    getBols {
      id
      carrier_id {
        id
        role_id {
          id
          name
        }
        name
        email
        password
        address
        state
        city
        status
        zipcode
        number
        created_at
      }
      consignee_id {
        id
        role_id {
          id
          name
        }
        name
        email
        password
        address
        state
        city
        status
        zipcode
        number
        created_at
      }
      shipper_id {
        id
        role_id {
          id
          name
        }
        name
        email
        password
        address
        state
        city
        status
        zipcode
        number
        created_at
      }
      package_type
      packing_group
      quantity
      price
      description
      volume
      un_na_number
      status
      weight
      hazard_class
      created_at
    }
  }
`;

const RecentSection = () => {
  const { data, loading, error } = useQuery(GET_ALL_BOLS_QUERY);
  let allBols;
  if (data) {
    allBols = data.getBols;
    console.log(allBols);
  }

  return (
    <div className="flex flex-col items-center h-[75vh]">
      <p className="underline text-xl mb-8 mt-24 font-semibold">Recent B/Ls</p>
      {/* call to get table data should probably happen in the Table component based off whath type is passed to it */}
      {/* shipper/receiver's view */}
      {/* <a className="button__sign-up" href="/api/auth/signup">
        Sign Up
      </a> */}
      {loading ? (
        <Spin />
      ) : (
        <Table type="active" tableData={activeMockData} allBols={allBols} />
      )}
      {/* carrier's view*/}
      {/* <Table type="carrier-active" tableData={carrierActiveMockData}/> */}
    </div>
  );
};

export default RecentSection;
