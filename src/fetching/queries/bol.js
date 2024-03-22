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
      last_opened
      updated_at
    }
  }
`;

export const GET_CURRENT_BOL_LOCATION = gql`
  query Query($bolId: ID!) {
    getCurrentBolLocation(bol_id: $bolId)
  }
`;

export const GET_ALL_BOLS_QUERY = gql`
  query getAllBols($filters: Filter) {
    getBols(filters: $filters) {
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
      last_opened
      updated_at
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
      created_at
    }
  }
`;

export const GET_ACTIVE_BOLS = gql`
  query GetActiveBols($filters: Filter) {
    getActiveBols(filters: $filters) {
      id
      carrier_id {
        id
        name
        email
        address
        state
        city
        number
        created_at
        zipcode
        role_id {
          id
          name
        }
      }
      shipper_id {
        id
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
        role_id {
          id
          name
        }
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
      driver_id {
        id
        name
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
      updated_at
      last_opened
    }
  }
`;

export const GET_BOLS_FOR_CARRIERS = gql`
  query GetBolsForCarriers {
    getBolsForCarriers {
      carrierId
      carrierName
      activeBolsCount
      completedBolsCount
      associatedDriverCount
    }
  }
`;

export const GET_ACTIVE_ROLES_BY_ROLE = gql`
  query GetActiveBolsByRole($id: ID!, $roleId: ID!) {
    getActiveBolsByRole(id: $id, role_id: $roleId) {
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
      driver_id {
        id
        name
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
      updated_at
      last_opened
    }
  }
`;

export const GET_COMPLETED_ROLES_BY_ROLE = gql`
  query GetCompletedBolsByRole($id: ID!, $roleId: ID!) {
    getCompletedBolsByRole(id: $id, role_id: $roleId) {
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
      driver_id {
        id
        name
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
      updated_at
      last_opened
    }
  }
`;

export const GET_COMPLETED_BOLS = gql`
  query GetCompletedBols($filters: Filter) {
    getCompletedBols(filters: $filters) {
      id
      carrier_id {
        id
        name
        email
        address
        state
        city
        number
        created_at
        zipcode
        role_id {
          id
          name
        }
      }
      shipper_id {
        id
        name
        email
        address
        state
        city
        zipcode
        number
        created_at
        role_id {
          id
          name
        }
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
      driver_id {
        id
        name
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
      updated_at
      last_opened
    }
  }
`;

export const GET_BOLS_FOR_DRIVERS = gql`
  query GetBolsForDrivers {
    getBolsForDrivers {
      driverId
      driverName
      activeBolsCount
      completedBolsCount
    }
  }
`;

export const GET_BOLS_FOR_SHIPPERS = gql`
  query GetBolsForShippers {
    getBolsForShippers {
      shipperId
      shipperName
      activeBolsCount
      completedBolsCount
      associatedDriverCount
    }
  }
`;

export const GET_BOL_BY_STATUS = gql`
  query GetBolsByStatus($status: String!) {
    getBolsByStatus(status: $status) {
      id
      status
      shipper_id {
        name
        address
      }
    }
  }
`;

export const GETBOL_BYID = gql`
  query GetBol($getBolId: ID!) {
    getBol(id: $getBolId) {
      id
      driver_id {
        id
      }
      carrier_id {
        id
      }
      consignee_id {
        id
      }
      status
    }
  }
`;

export const GET_DAILY_LOGS_DRIVER = gql`
  query GetDailyLogsDriver($userId: ID!) {
    getDailyLogsDriver(user_id: $userId) {
      id
      created_at
      driver_id {
        id
      }
      shipper_id {
        id
        name
      }
      consignee_id {
        id
        name
      }
      description
      updated_at
    }
  }
`;
export const BOL_DETAILS_PDF = gql`
  query GetBolDetailsPdf($bolId: ID!) {
    getBolDetailsPdf(bol_id: $bolId) {
      shipperEmail
      shipperName
      shipperNumber
      shipperAddress
      shipperCity
      shipperState
      shipperZipcode
      consigneeEmail
      consigneeName
      consigneeNumber
      consigneeAddress
      consigneeCity
      consigneeState
      consigneeZipcode
      carrierEmail
      carrierName
      carrierNumber
      carrierAddress
      carrierCity
      carrierState
      carrierZipcode
      quantity
      package_type
      volume
      weight
      hazard_class
      packing_group
      un_na_number
      description
      price
      created_at
      driverSignature
      consigneeSignature
    }
  }
`;
