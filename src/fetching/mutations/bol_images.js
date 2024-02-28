import { gql } from "@apollo/client";

export const UPLOAD_IMAGE = gql`
  mutation CreateBolImages($filename: String!, $bolId: String!) {
    createBolImages(filename: $filename, bol_id: $bolId) {
      id
      filename
      bol_id {
        id
      }
      message
    }
  }
`;
