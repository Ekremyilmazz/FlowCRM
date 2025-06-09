export interface Notification {
    id: number;
    user_id: number;
    message: string;
    is_read: boolean;
    created_at: string; // ISO format
  }

  export interface CreateNotificationInput {
    user_id: number;
    message: string;
    is_read?: boolean;
  }