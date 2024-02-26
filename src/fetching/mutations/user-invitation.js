//bol invitation

import { gql } from "@apollo/client";

export const CREATE_USER_INVITTATION = gql`
  mutation CreateUserInvitations($email: String!, $bolId: ID!) {
    createUserInvitations(email: $email, bol_id: $bolId) {
      success
      message
    }
  }
`;
