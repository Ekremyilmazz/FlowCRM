export interface Task {
    id: number;
    assigned_to: number;
    title: string;
    priority: number; // e.g.: "low", "medium", "high"
    deadline: string; // ISO Date Format
    is_completed: boolean;
}

export interface CreateTaskInput {
    assigned_to: number;
    title: string;
    priority: number; // e.g.: "low", "medium", "high"
    deadline: string; // ISO Date Format
    is_completed?: boolean; // optional
}