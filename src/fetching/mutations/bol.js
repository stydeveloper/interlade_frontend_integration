const { gql } = require("@apollo/client");

export const CREATE_BOL_MUTATION = gql`
  mutation CreateBol($input: BolInput) {
    createBol(input: $input) {
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
        message
        number
        token
        created_at
      }
      shipper_id {
        id
        role_id {
          name
          id
        }
        name
        password
        address
        email
        state
        city
        zipcode
        status
        message
        number
        token
        created_at
      }
      consignee_id {
        id
        name
        role_id {
          id
          name
        }
        email
        password
        address
        state
        city
        status
        message
        zipcode
        number
        token
        created_at
      }
      weight
      volume
      quantity
      un_na_number
      hazard_class
      description
      packing_group
      package_type
      status
      price
      created_at
    }
  }
`;

export const CARRIER_AS_A_DRIVER = gql`
  mutation AssociateCarrierToBolResolver($bolId: ID!) {
    associateCarrierToBolResolver(bol_id: $bolId) {
      id
      driver_id {
        id
        name
      }
    }
  }
`;
