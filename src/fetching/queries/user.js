import { gql } from "@apollo/client";

export const GET_ASSOCIATED_CARRIER_DETAILS_CARD = gql`
  query GetAssociatedCarriersDetails {
    getAssociatedCarriersDetails {
      userId
      userName
      activeBolsCount
      completedBolsCount
      associatedCarriersCount
    }
  }
`;
export const GET_ASSOCIATED_SHIPPER_DETAILS_CARD = gql`
  query GetAssociatedShipperDetails {
    getAssociatedShipperDetails {
      userId
      userName
      activeBolsCount
      completedBolsCount
      associatedShippersCount
      prepaidCount
    }
  }
`;
export const GET_ASSOCIATED_BOL_COUNT_DRIVER_CARD = gql`
  query GetBolStatusCount {
    getBolStatusCount {
      userId
      userName
      bolStatusCounts {
        AT_PICKUP
        IN_TRANSIT
        AT_DROPOFF
        CANCELLED
        DELIVERED
      }
    }
  }
`;
