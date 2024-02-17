// queries.js
import { gql } from "@apollo/client";

export const GET_BOL_BY_ID = gql`
  query GetBol($id: ID!) {
    getBol(id: $id) {
      id
      carrier_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
      }
      shipper_id {
        id
        name
        number
        email
        city
        address
        created_at
        role_id {
          id
          name
        }
        state
      }
      consignee_id {
        id
        role_id {
          id
          name
        }
        name
        email
        address
        state
        city
        zipcode
        number
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

export const GET_CURRENT_BOL_LOCATION = gql`
  query Query($bolId: ID!) {
    getCurrentBolLocation(bol_id: $bolId)
  }
`;

export const GET_ALL_BOLS_QUERY = gql`
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

export const GET_BOL_HISTORY_LOGS = gql`
  query GetBolHistoryLogs($bolId: ID!) {
    getBolHistoryLogs(bol_id: $bolId) {
      id
      bol_id {
        id
      }
      agent_id {
        id
        name
        role_id {
          id
          name
        }
      }
      time
      action
    }
  }
`;
