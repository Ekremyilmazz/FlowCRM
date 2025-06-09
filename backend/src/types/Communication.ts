export interface Communication {
    id: number;
    user_id: number;
    customer_id: number;
    type: string; // e.g: 'email', 'call', 'meeting'
    content: string;
    timestamp: string; // ISO format: "2025-05-01T14:00:00Z"
}

export interface CreateCommunicationInput {
    user_id: number;
    customer_id: number;
    type: string; // e.g: 'email', 'call', 'meeting'
    content: string;
}