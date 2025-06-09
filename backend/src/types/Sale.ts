export interface Sale {
    id: number;
    customer_id: number;
    user_id: number;
    amount: number;
    status: string;
    date: string; // ISO format : "2025-05-02"
}

export interface CreateSaleInput {
    customer_id: number;
    user_id: number;
    amount: number;
    status: string;
    date: string; // ISO format : "2025-05-02"
}