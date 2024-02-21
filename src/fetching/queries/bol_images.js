import { gql } from "@apollo/client";

export const GET_BOLIMAGES_BY_BOLID = gql`
  query GetBolImagesByBolId($bolId: ID!) {
    getBolImagesByBolId(bol_id: $bolId) {
      filename
      id
      bol_id {
        id
      }
    }
  }
`;
