export interface Note {
    id: number;
    customer_id: number;
    user_id: number;
    content: string;
    is_private: boolean;
}

export interface CreateNoteInput {
    customer_id: number;
    user_id: number;
    content: string;
    is_private?: boolean;
}
