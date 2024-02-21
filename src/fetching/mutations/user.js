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

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      password
      role_id {
        id
        name
      }
      name
      address
      state
      city
      status
      zipcode
      message
      number
      token
      created_at
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPasswordResolver($email: String!) {
    forgotPasswordResolver(email: $email) {
      success
      token
      message
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $resetToken: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      success
      message
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      address
      city
      created_at
      email
      number
      password
      role_id {
        name
        id
      }
      state
      zipcode
    }
  }
`;

export const INVITE_DRIVER_MUTATION = gql`
  mutation InviteDriver($email: String!) {
    inviteDriver(email: $email) {
      message
      success
    }
  }
`;

export const INVITE_SHIPPER_MUTATION = gql`
  mutation InviteShipper($email: String!) {
    inviteShipper(email: $email) {
      message
      success
    }
  }
`;
