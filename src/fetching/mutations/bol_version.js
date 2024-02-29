import { gql } from "@apollo/client";

export const CREATE_BOL_VERSION = gql`
  mutation CreateBolVersion($signature: String!, $bolId: String!) {
    createBolVersion(signature: $signature, bol_id: $bolId) {
      id
      signature
      user_id {
        id
      }
      created_at
      bol_id {
        id
      }
    }
  }
`;
