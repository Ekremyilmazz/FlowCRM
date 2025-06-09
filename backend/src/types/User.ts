export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    password_hash: string;
}

export interface CreateUserInput {
    name: string;
    email: string;
    role: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface PublicUser {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}