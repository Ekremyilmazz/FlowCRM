export interface ActivityLog {
    id: number;
    user_id: number;
    action: string;
    ip_address: string;
    timestamp: string;
  }

  export interface CreateActivityLogInput {
    user_id: number;
    action: string;
    ip_address: string;
  }