import { gql } from "@apollo/client";

export const MARK_ALL_AS_READ = gql`
  mutation MarkAllAsRead {
    markAllAsRead {
      success
      message
    }
  }
`;

export const DELETE_SINGLE = gql`
  mutation DeleteNotificationById($id: ID!) {
    deleteNotificationById(id: $id) {
      success
      message
    }
  }
`;
export const DELETE_ALL_NOTIFICATIONS = gql`
  mutation DeleteAllNotifications {
    deleteAllNotifications {
      success
      message
    }
  }
`;
