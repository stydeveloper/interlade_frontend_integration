import { gql } from "@apollo/client";

export const GET_USER_SUB_BY_EMAIL = gql`
  query GetUsersSubByEmail($email: String!) {
    getUsersSubByEmail(email: $email) {
      id
      user_email {
        id
        name
        email
      }
      status
    }
  }
`;
