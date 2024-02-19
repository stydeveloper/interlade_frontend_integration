import { gql } from "@apollo/client";

export const CREATE_SUBSCRIPTON = gql`
  mutation CreateSubscription($email: String!, $planName: String!) {
    createSubscription(email: $email, planName: $planName) {
      success
      message
      checkoutUrl
    }
  }
`;
