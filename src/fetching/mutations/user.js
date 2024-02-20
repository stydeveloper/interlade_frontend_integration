const { gql } = require("@apollo/client");

export const REGISTER_CARRIER = gql`
  mutation RegisterCarrier(
    $name: String
    $email: String
    $password: String
    $address: String
    $state: String
    $city: String
    $zipcode: String
    $number: String
    $planName: String
  ) {
    registerCarrier(
      name: $name
      email: $email
      password: $password
      address: $address
      state: $state
      city: $city
      zipcode: $zipcode
      number: $number
      planName: $planName
    ) {
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
      token
      created_at
      checkoutUrl
    }
  }
`;
