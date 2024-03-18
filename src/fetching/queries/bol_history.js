import { gql } from "@apollo/client";

export const GENERATE_BOL_STATUS_HISTORY = gql`
  query GenerateBolStatusHistory($bolId: ID!) {
    generateBolStatusHistory(bol_id: $bolId) {
      message
      time
    }
  }
`;
