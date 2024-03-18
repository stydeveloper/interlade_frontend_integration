import { gql } from "@apollo/client";

export const GET_BOL_VERSION_BYIDS = gql`
  query GetBolVersionsByIDs($userId: ID, $bolId: ID) {
    getBolVersionsByIDs(user_id: $userId, bol_id: $bolId) {
      id
      bol_id {
        id
      }
      signature
    }
  }
`;
export const GET_BOL_VERSION_BY_USERID = gql`
  query GetBolVersionByUserId($userId: ID!) {
    getBolVersionByUserId(user_id: $userId) {
      id
      bol_id {
        id
      }
      user_id {
        id
      }
      created_at
      signature
    }
  }
`;



