import { gql } from "@apollo/client";

export const GET_ALL_NOTIFICATIONS = gql`
  query GetAllNotifications {
    getAllNotifications {
      id
      message
    }
  }
`;
export const GET_UNREAD_COUNT = gql`
  query Query {
    getUnreadCount
  }
`;
